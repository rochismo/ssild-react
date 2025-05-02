import { useSSILDContext } from '@/contexts/SSILDContext'
import { determineMaximumValue } from '@/utils/math'
import { Box, Flex, HStack, Separator, Slider } from '@chakra-ui/react'
import { ImEye } from 'react-icons/im'
import { MdHearing, MdTouchApp } from 'react-icons/md'

export const CycleReminderConfiguration = () => {
  const { form, isRunning } = useSSILDContext()
  return (
    <Flex justifyContent={'space-between'} direction={'column'} gap="3">
      <Slider.Root
        value={[form.values.reminderTimes.sight]}
        max={determineMaximumValue(form.values.cycleTimes.sight)}
        min={0}
        disabled={isRunning}
        onValueChange={({ value }) => form.changeValue('reminderTimes.sight', value[0])}
      >
        <Slider.Label>Eye Focus Reminder (sec)</Slider.Label>
        <Slider.Control>
          <Slider.Track bg="blue.100">
            <Slider.Range bg="blue.400" />
          </Slider.Track>
          <Slider.Thumb index={0} boxSize={6} borderColor="blue.400" shadow="md">
            <Box as={ImEye} />
          </Slider.Thumb>
        </Slider.Control>
        <HStack>
          <Slider.ValueText rounded="l1" />
          seconds
        </HStack>
      </Slider.Root>

      <Separator />

      <Slider.Root
        value={[form.values.reminderTimes.hearing]}
        max={determineMaximumValue(form.values.cycleTimes.hearing)}
        min={0}
        disabled={isRunning}
        onValueChange={({ value }) => form.changeValue('reminderTimes.hearing', value[0])}
      >
        <Slider.Label>Hearing Focus Reminder (sec)</Slider.Label>
        <Slider.Control>
          <Slider.Track bg="purple.100">
            <Slider.Range bg="purple.400" />
          </Slider.Track>
          <Slider.Thumb index={0} boxSize={6} bg="purple.400" shadow="md">
            <Box as={MdHearing} />
          </Slider.Thumb>
        </Slider.Control>
        <HStack>
          <Slider.ValueText rounded="l1" />
          seconds
        </HStack>
      </Slider.Root>

      <Separator />

      <Slider.Root
        value={[form.values.reminderTimes.touch]}
        max={determineMaximumValue(form.values.cycleTimes.touch)}
        min={0}
        disabled={isRunning}
        onValueChange={({ value }) => form.changeValue('reminderTimes.touch', value[0])}
      >
        <Slider.Label>Touch Focus Reminder (sec)</Slider.Label>
        <Slider.Control>
          <Slider.Track bg="orange.100">
            <Slider.Range bg="orange.400" />
          </Slider.Track>
          <Slider.Thumb index={0} boxSize={6} bg="orange.400" shadow="md">
            <Box as={MdTouchApp} />
          </Slider.Thumb>
        </Slider.Control>
        <HStack>
          <Slider.ValueText rounded="l1" />
          seconds
        </HStack>
      </Slider.Root>
    </Flex>
  )
}
