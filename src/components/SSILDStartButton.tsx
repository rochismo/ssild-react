import { useSSILDContext } from '@/contexts/SSILDContext'
import { SSILDStatus } from '@/types/SSILDConfig'
import { Button } from '@chakra-ui/react'
import { useState, useCallback, useMemo, useEffect } from 'react'

export const SSILDStartButton = () => {
  const { form, start, pause, status } = useSSILDContext()
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null)

  const toggle = useCallback(() => {
    if (status === SSILDStatus.RUNNING) {
      return pause()
    }

    start()
  }, [start, status, pause])

  const startSSILDText = useMemo(() => {
    if (status === SSILDStatus.IDLE) {
      return 'Start SSILD'
    }

    if (status === SSILDStatus.PAUSED) {
      return 'Resume SSILD'
    }

    if (status === SSILDStatus.STARTING) {
      if (countdownSeconds == null) return `Starting SSILD`
      return `Starting SSILD in ${countdownSeconds} second${countdownSeconds > 1 ? 's' : ''}`
    }

    return 'Pause SSILD'
  }, [status, countdownSeconds])

  useEffect(() => {
    if (status !== SSILDStatus.STARTING || form.values.startDelay <= 0) return
    setCountdownSeconds(() => {
      return form.values.startDelay
    })
    const interval = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev === null) return form.values.startDelay
        return prev - 1
      })
    }, 1_000)

    return () => {
      clearInterval(interval)
    }
  }, [form, status])

  return (
    <Button size="md" onClick={toggle} disabled={status === SSILDStatus.STARTING}>
      {startSSILDText}
    </Button>
  )
}
