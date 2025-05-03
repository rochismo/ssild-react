import { useSSILDContext } from '@/contexts/SSILDContext'
import { SSILDStatus } from '@/types/SSILDConfig'
import { Flex, Button } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'

export const SSILDActions = () => {
  const { form, start, pause, stop, status } = useSSILDContext()

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

    return 'Pause SSILD'
  }, [status])
  return (
    <Flex
      justify={{ smTo2xl: 'center', base: 'space-between', '2xlOnly': 'flex-start' }}
      w={['100%', '90%', '700px']}
      gap={{ base: '0', smTo2xl: '5', '2xlOnly': '5' }}
    >
      <Button size="md" onClick={toggle}>
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
