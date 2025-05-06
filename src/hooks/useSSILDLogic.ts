import { SSILDConfig, SSILDStatus } from '@/types/SSILDConfig'
import { useCallback, useState } from 'react'
import { useForm } from './useForm'
import { ssildManager, ssildStatusManager } from '@/mangers/instances'
import { useBackgroundNoiseContext } from '@/contexts/BackgroundNoiseContext'
import { useSSILDStatsTracker } from './useSSILDStatsTracker'

export const useSSILDLogic = (
  form: ReturnType<typeof useForm<SSILDConfig>>,
  tracking: ReturnType<typeof useSSILDStatsTracker>
) => {
  const { muteAllSounds, unmuteAllSounds } = useBackgroundNoiseContext()
  const [status, setStatus] = useState(SSILDStatus.IDLE)

  const stop = useCallback(() => {
    ssildManager.abort()
    setStatus(SSILDStatus.IDLE)
    ssildStatusManager.changeStatus(SSILDStatus.IDLE)
    tracking.stopTrackingSeconds()
  }, [tracking])

  const start = useCallback(async () => {
    const config = form.values
    ssildManager.initialize(config)
    tracking.clearStats()

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

    tracking.stopTrackingSeconds()
    tracking.setupTrackers()
    await ssildManager.start()

    stop()

    ssildManager.abort()
    speechSynthesis.cancel()

    if (config.muteBackgroundSoundsUponStop) {
      muteAllSounds()
    }
    tracking.stopTrackingSeconds()
  }, [form.values, stop, muteAllSounds, unmuteAllSounds, tracking])

  const resume = useCallback(() => {
    setStatus(SSILDStatus.RUNNING)
    ssildStatusManager.changeStatus(SSILDStatus.RUNNING)
    tracking.beginTrackingSeconds()
  }, [tracking])

  const pause = useCallback(() => {
    setStatus(SSILDStatus.PAUSED)
    ssildStatusManager.changeStatus(SSILDStatus.PAUSED)
    tracking.stopTrackingSeconds()
  }, [tracking])

  return { start, pause, stop, resume, status }
}
