import { SSILDConfig, SSILDStatus } from '@/types/SSILDConfig'
import { useCallback, useState } from 'react'
import { useForm } from './useForm'
import { ssildManager, ssildStatusManager } from '@/mangers/instances'
import { useBackgroundNoiseContext } from '@/contexts/BackgroundNoiseContext'

export const useSSILDLogic = (form: ReturnType<typeof useForm<SSILDConfig>>) => {
  const { muteAllSounds, unmuteAllSounds } = useBackgroundNoiseContext()
  const [status, setStatus] = useState(SSILDStatus.IDLE)

  const stop = useCallback(() => {
    ssildManager.abort()
    setStatus(SSILDStatus.IDLE)
    ssildStatusManager.changeStatus(SSILDStatus.IDLE)
  }, [])

  const start = useCallback(async () => {
    const config = form.values
    ssildManager.initialize(config)

    if (config.startDelay > 0) {
      setStatus(SSILDStatus.STARTING)
    }
    const canContinue = await ssildManager.waitForStart()

    if (!canContinue) {
      return
    }

    if (config.muteBackgroundSoundsUponStop) {
      unmuteAllSounds()
    }

    setStatus(SSILDStatus.RUNNING)
    await ssildManager.start()

    stop()

    ssildManager.abort()
    speechSynthesis.cancel()

    if (config.muteBackgroundSoundsUponStop) {
      muteAllSounds()
    }
  }, [form.values, stop, muteAllSounds, unmuteAllSounds])

  const resume = useCallback(() => {
    setStatus(SSILDStatus.RUNNING)
    ssildStatusManager.changeStatus(SSILDStatus.RUNNING)
  }, [])

  const pause = useCallback(() => {
    setStatus(SSILDStatus.PAUSED)
    ssildStatusManager.changeStatus(SSILDStatus.PAUSED)
  }, [])

  return { start, pause, stop, resume, status }
}
