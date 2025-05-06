import { Checkbox, Flex, useMediaQuery } from '@chakra-ui/react'
import { MuteAllSoundsButton } from './MuteAllSoundsButton'
import { useSSILDContext } from '@/contexts/SSILDContext'

export const BackgroundNoiseConfiguration = () => {
  const { form, isRunning } = useSSILDContext()
  const [isLargerThan30rem] = useMediaQuery(['(min-width: 30rem)'])
  return (
    <Flex gap="5" width="100%" alignItems={'baseline'} mt="5" flexDirection={isLargerThan30rem ? 'row' : 'column'}>
      <MuteAllSoundsButton />
      <Checkbox.Root
        checked={form.values.muteBackgroundSoundsUponStop}
        disabled={isRunning}
        onCheckedChange={(x) => form.changeValue('muteBackgroundSoundsUponStop', x.checked as boolean)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Mute Sounds On Session End</Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  )
}
