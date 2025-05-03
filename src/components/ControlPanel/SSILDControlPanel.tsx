import { SSILDSeparator } from '../ui/SSILDSeparator'
import { ControlPanelTabs } from './ControlPanelTabs'
import { CycleNumberConfiguration } from './CycleConfiguration/CycleNumberConfiguration'
import { VoiceConfiguration } from './VoiceConfiguration'

export const SSILDControlPanel = () => {
  return (
    <>
      <ControlPanelTabs />

      <SSILDSeparator text="Cycle Number Configuration" />

      <CycleNumberConfiguration />

      <SSILDSeparator text="Voice Configuration" />

      <VoiceConfiguration />
    </>
  )
}
