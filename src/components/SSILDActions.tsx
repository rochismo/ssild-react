import { useSSILDContext } from '@/contexts/SSILDContext'
import { SSILDStatus } from '@/types/SSILDConfig'
import { Flex, Button } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const SSILDActions = () => {
  const { form, start, pause, stop, status } = useSSILDContext()
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
    <Flex
      justify={{ smTo2xl: 'center', base: 'space-between', '2xlOnly': 'flex-start' }}
      w={['100%', '90%', '700px']}
      gap={{ base: '0', smTo2xl: '5', '2xlOnly': '5' }}
    >
      <Button size="md" onClick={toggle} disabled={status === SSILDStatus.STARTING}>
        {startSSILDText}
      </Button>

      {status === SSILDStatus.IDLE && (
        <Button size="md" onClick={() => form.reset()}>
          Reset Settings
        </Button>
      )}

      {status !== SSILDStatus.IDLE && (
        <Button size="md" onClick={stop}>
          Stop SSILD
        </Button>
      )}
    </Flex>
  )
}
