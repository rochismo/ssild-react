import { Box, Tabs } from '@chakra-ui/react'
import { CycleConfiguration } from './CycleConfiguration'
import { CycleReminderConfiguration } from './CycleReminderConfiguration'

export const ControlPanelTabs = () => {
  return (
    <Tabs.Root defaultValue={'cycles'} variant={'subtle'}>
      <Tabs.List alignContent={'center'} width="100%" justifyContent={'center'}>
        <Tabs.Trigger value="cycles">Cycle Configuration</Tabs.Trigger>
        <Tabs.Trigger value="reminders">Cycle Reminder Configuration</Tabs.Trigger>
      </Tabs.List>
      <Box position={'relative'} width="full" minH="270px">
        <Tabs.Content
          inset="0"
          position={'absolute'}
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
          position={'absolute'}
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
      </Box>
    </Tabs.Root>
  )
}
