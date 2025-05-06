import { Flex, Text } from '@chakra-ui/react'
import { SSILDSeparator } from '../ui/SSILDSeparator'
import { ControlPanelTabs } from './ControlPanelTabs'
import { CycleNumberConfiguration } from './CycleConfiguration/CycleNumberConfiguration'
import { VoiceConfiguration } from './VoiceConfiguration'
import { useSSILDContext } from '@/contexts/SSILDContext'
import { formatDuration } from '@/utils/formatting'

export const SSILDControlPanel = () => {
  const { tracking } = useSSILDContext()
  return (
    <>
      <ControlPanelTabs />

      <SSILDSeparator text="Cycle Number Configuration" />

      <CycleNumberConfiguration />

      <SSILDSeparator text="Voice Configuration" />

      <VoiceConfiguration />

      <SSILDSeparator text="Session Tracking" />

      <Flex direction={'column'}>
        <Text>Time Spent: {formatDuration(tracking.seconds)}</Text>
        <Text>Cycles Undergone: {tracking.cycles}</Text>
      </Flex>
    </>
  )
}
