import { SSILDSeparator } from '../ui/SSILDSeparator'
import { ControlPanelTabs } from './ControlPanelTabs'
import { CycleNumberConfiguration } from './CycleConfiguration/CycleNumberConfiguration'
import { VoiceConfiguration } from './VoiceConfiguration'
import { Tracking } from './Tracking'
import { BackgroundNoiseConfiguration } from './BackgroundNoiseConfiguration'

export const SSILDControlPanel = () => {
  return (
    <>
      <ControlPanelTabs />

      <SSILDSeparator text="Cycle Number Configuration" stackProps={{ my: '5' }} />

      <CycleNumberConfiguration />

      <SSILDSeparator text="Voice Configuration" stackProps={{ my: '5' }} />

      <VoiceConfiguration />

      <SSILDSeparator text="Background Noise Configuration" stackProps={{ my: '5' }} />

      <BackgroundNoiseConfiguration />

      <SSILDSeparator text="Session Tracking" stackProps={{ my: '5' }} />

      <Tracking />
    </>
  )
}
