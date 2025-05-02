import { Box, Flex, HStack, Separator, Slider } from '@chakra-ui/react'
import { MdHearing, MdTouchApp } from 'react-icons/md'
import { ImEye } from 'react-icons/im'
import { useSSILDContext } from '@/contexts/SSILDContext'
import { MAX_SENSE_SECONDS, MIN_SENSE_SECONDS } from '@/constants/SSILD_CONSTANTS'
import { SSILDConfig } from '@/types/SSILDConfig'
import { Path } from '@/types/utils'
import { determineMaximumValue } from '@/utils/math'

export const SensesDurationConfiguration = () => {
  const { form, isRunning } = useSSILDContext()

  const changeSenseDuration = (key: Path<SSILDConfig>, values: number[]) => {
    const [value] = values
    form.changeValue(key, value)

    const reminderValueKey = key.replace('cycleTimes', 'reminderTimes') as Path<SSILDConfig>
    const reminderValue = form.readValue(reminderValueKey) as number
    console.log({
      reminderValueKey,
      reminderValue,
      value,
      shouldChange: reminderValue > value,
      nextValue: determineMaximumValue(value),
    })
    if (reminderValue > value) {
      form.changeValue(reminderValueKey, determineMaximumValue(value))
    }
  }

  return (
    <Flex justifyContent={'space-between'} direction={'column'} gap="3">
      <Slider.Root
        value={[form.values.cycleTimes.sight]}
        max={MAX_SENSE_SECONDS}
        min={MIN_SENSE_SECONDS}
        disabled={isRunning}
        onValueChange={({ value }) => changeSenseDuration('cycleTimes.sight', value)}
      >
        <Slider.Label>Sight Focus Duration (sec)</Slider.Label>
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
        value={[form.values.cycleTimes.hearing]}
        max={MAX_SENSE_SECONDS}
        min={MIN_SENSE_SECONDS}
        disabled={isRunning}
        onValueChange={({ value }) => changeSenseDuration('cycleTimes.hearing', value)}
      >
        <Slider.Label>Hearing Focus Duration (sec)</Slider.Label>
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
        value={[form.values.cycleTimes.touch]}
        max={MAX_SENSE_SECONDS}
        min={MIN_SENSE_SECONDS}
        disabled={isRunning}
        onValueChange={({ value }) => changeSenseDuration('cycleTimes.touch', value)}
      >
        <Slider.Label>Touch Focus Duration (sec)</Slider.Label>
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
