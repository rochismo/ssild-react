import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react'

import { useSSILDContext } from './contexts/SSILDContext'
import { SSILDStatus } from './types/SSILDConfig'
import { useCallback, useMemo } from 'react'
import { SSILDControlPanel } from './components/ControlPanel/SSILDControlPanel'

import './App.css'

function App() {
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
    <Flex minH="100vh" align="center" direction={'column'} gap="5" justify="center" p={4}>
      <Heading textAlign="center" size="4xl">
        SSILD Control Panel
      </Heading>{' '}
      <Box w={['100%', '90%', '700px']} p={6} rounded="2xl" shadow="xl" border={'solid'}>
        <VStack align="stretch">
          <SSILDControlPanel />

          <Flex justify={{ smTo2xl: 'center', base: 'space-between' }} flex="1" gap={{ base: '0', smTo2xl: '5' }}>
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
        </VStack>
      </Box>
    </Flex>
  )
}

export default App
