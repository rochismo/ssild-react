import { useSSILDContext } from '@/contexts/SSILDContext'
import { SSILDStatus } from '@/types/SSILDConfig'
import { Button } from '@chakra-ui/react'
import { useState, useCallback, useMemo, useEffect } from 'react'

export const SSILDStartButton = () => {
  const { form, ssild } = useSSILDContext()

  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null)

  const toggle = useCallback(() => {
    const status = ssild.status
    if (status === SSILDStatus.RUNNING) {
      return ssild.pause()
    }

    if (status === SSILDStatus.IDLE) {
      return ssild.start()
    }

    return ssild.resume()
  }, [ssild])

  const startSSILDText = useMemo(() => {
    const status = ssild.status
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
  }, [ssild.status, countdownSeconds])

  useEffect(() => {
    if (ssild.status !== SSILDStatus.STARTING || form.values.startDelay <= 0) return
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
  }, [form, ssild.status])

  return (
    <Button size="md" onClick={toggle} disabled={ssild.status === SSILDStatus.STARTING}>
      {startSSILDText}
    </Button>
  )
}
