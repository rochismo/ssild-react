import { Box, Button, Flex, Heading, Separator, Tabs, VStack } from '@chakra-ui/react'

import './App.css'
import { SSILDSeparator } from './components/ui/SSILDSeparator'
import { CycleConfiguration } from './components/ControlPanel/CycleConfiguration'
import { CycleReminderConfiguration } from './components/ControlPanel/CycleReminderConfiguration'
import { VoiceConfiguration } from './components/ControlPanel/VoiceConfiguration'
import { useSSILDContext } from './contexts/SSILDContext'
import { CycleNumberConfiguration } from './components/ControlPanel/CycleConfiguration/CycleNumberConfiguration'
import { SSILDStatus } from './types/SSILDConfig'
import { useCallback, useMemo } from 'react'

function App() {
  const { form, start, pause, stop, status } = useSSILDContext()

  const toggle = useCallback(() => {
    if (status === SSILDStatus.RUNNING) {
      return pause()
    }

    start()
  }, [start, status, pause])

  const startSsildText = useMemo(() => {
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
          <Tabs.Root defaultValue={'cycles'} variant={'subtle'}>
            <Tabs.List alignContent={'center'} width="100%" justifyContent={'center'}>
              <Tabs.Trigger value="cycles">Cycle Configuration</Tabs.Trigger>
              <Tabs.Trigger value="reminders">Cycle Reminder Configuration</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              inset="0"
              _open={{
                animationName: 'fade-in, scale-in',
                animationDuration: '300ms',
              }}
              _closed={{
                animationName: 'fade-out, scale-out',
                animationDuration: '120ms',
              }}
              value="cycles"
            >
              <CycleConfiguration />
            </Tabs.Content>
            <Tabs.Content
              inset="0"
              _open={{
                animationName: 'fade-in, scale-in',
                animationDuration: '300ms',
              }}
              _closed={{
                animationName: 'fade-out, scale-out',
                animationDuration: '120ms',
              }}
              value="reminders"
            >
              <CycleReminderConfiguration />
            </Tabs.Content>
          </Tabs.Root>

          <SSILDSeparator text="Cycle Number Configuration" />

          <CycleNumberConfiguration />

          <SSILDSeparator text="Voice Configuration" />

          <VoiceConfiguration />

          <Separator flex="1" mt="5" mb="5" />

          <Flex justify={{ smTo2xl: 'center', base: 'space-between' }} flex="1" gap={{ base: '0', smTo2xl: '5' }}>
            <Button size="md" onClick={toggle}>
              {startSsildText}
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
