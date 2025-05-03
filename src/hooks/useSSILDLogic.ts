import { SSILDConfig, SSILDStatus } from '@/types/SSILDConfig'
import { sleep } from '@/utils/threading'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from './useForm'
import { Path } from '@/types/utils'
import { speak } from '@/utils/speech'

const senses = ['sight', 'hearing', 'touch']

export const useSSILDLogic = (form: ReturnType<typeof useForm<SSILDConfig>>) => {
  const [status, setStatus] = useState(SSILDStatus.IDLE)
  const statusRef = useRef(status)
  const abortControllerRef = useRef<AbortController>(undefined)

  useEffect(() => {
    statusRef.current = status
  }, [status])
  const isPaused = useCallback(() => {
    return statusRef.current === SSILDStatus.PAUSED
  }, [])

  const isStopped = useCallback(() => {
    return statusRef.current === SSILDStatus.IDLE
  }, [])

  const waitWithPause = useCallback(
    async (seconds: number) => {
      const start = Date.now()
      while (Date.now() - start < seconds * 1000) {
        if (isStopped()) return false
        await sleep(0.1)
      }

      while (isPaused()) await sleep(0.1)
      if (isStopped()) return false
      return true
    },
    [isPaused, isStopped]
  )

  const start = useCallback(async () => {
    if (abortControllerRef.current != null) {
      abortControllerRef.current.abort()
    }
    // This function gets called upon resuming SSILD.
    // It must not be executed unless the status was IDLE
    if (!isStopped()) return

    const config = form.values
    if (config.startDelay !== 0) {
      setStatus(SSILDStatus.STARTING)

      const controller = new AbortController()
      abortControllerRef.current = controller

      try {
        await sleep(config.startDelay, abortControllerRef.current.signal)
      } catch {
        return
      }
    }

    if (isStopped()) {
      return
    }

    setStatus(SSILDStatus.RUNNING)
    do {
      for (let cycleNumber = 0; cycleNumber < config.numberOfCycles; cycleNumber++) {
        if (isStopped()) return

        for (const sense of senses) {
          if (isStopped()) return

          const senseTime = form.readValue(`cycleTimes.${sense}` as Path<SSILDConfig>) as number
          const senseReminderTime = form.readValue(`reminderTimes.${sense}` as Path<SSILDConfig>) as number

          // Initially speak the current sense
          speak(sense, config.voice)

          let reminderInterval: ReturnType<typeof setInterval> | null = null
          if (senseReminderTime > 0 && senseReminderTime < senseTime) {
            // Repeat the current sense as configured
            reminderInterval = setInterval(() => {
              if (!isPaused() && !isStopped()) {
                speak(sense, config.voice)
              }
            }, senseReminderTime * 1000)
          }

          const wasStopped = await waitWithPause(senseTime)
          if (reminderInterval) clearInterval(reminderInterval)
          if (!wasStopped) return
        }
      }
    } while (config.unlimited && !isStopped())

    setStatus(SSILDStatus.IDLE)
  }, [form, isPaused, isStopped, waitWithPause])

  const pause = useCallback(() => {
    setStatus(SSILDStatus.PAUSED)
  }, [])

  const stop = useCallback(() => {
    setStatus(SSILDStatus.IDLE)
  }, [])

  return { start, pause, stop, status }
}
