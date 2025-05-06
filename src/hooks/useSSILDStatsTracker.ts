import { ssildManager } from '@/mangers/instances'
import { useCallback, useRef, useState } from 'react'

export const useSSILDStatsTracker = () => {
  const [seconds, setSeconds] = useState(0)
  const [cycles, setCycles] = useState(0)
  const secondsTrackingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const beginTrackingSeconds = useCallback(() => {
    if (secondsTrackingIntervalRef.current == null) {
      secondsTrackingIntervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1_000)
    }
  }, [])

  const stopTrackingSeconds = useCallback(() => {
    if (secondsTrackingIntervalRef.current != null) {
      clearInterval(secondsTrackingIntervalRef.current)
      secondsTrackingIntervalRef.current = null
    }
  }, [])

  const incrementCycles = useCallback(() => {
    setCycles((c) => c + 1)
  }, [])

  const clearStats = useCallback(() => {
    setCycles(0)
    setSeconds(0)
  }, [])

  const setupTrackers = useCallback(() => {
    beginTrackingSeconds()
    ssildManager.onCycleCompleted = incrementCycles
  }, [beginTrackingSeconds, incrementCycles])

  return { seconds, cycles, setupTrackers, clearStats, stopTrackingSeconds, beginTrackingSeconds }
}
