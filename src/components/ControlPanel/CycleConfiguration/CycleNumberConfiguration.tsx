import { DEFAULT_START_DELAY, MAX_CYCLES, MAX_START_DELAY, MIN_CYCLES } from '@/constants/SSILD_CONSTANTS'
import { useSSILDContext } from '@/contexts/SSILDContext'
import { formatDuration } from '@/utils/formatting'
import { Checkbox, Flex, NumberInput, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

export const CycleNumberConfiguration = () => {
  const { form, isRunning } = useSSILDContext()

  const totalSecondsToSpendText = useMemo(() => {
    const cyclingSeconds = Object.values(form.values.cycleTimes).reduce((a, b) => a + b)

    if (form.values.unlimited) {
      return `${formatDuration(cyclingSeconds)} per cycle`
    }

    const totalAmountOfTime = cyclingSeconds * form.values.numberOfCycles
    return `${formatDuration(totalAmountOfTime)} throughout the cycles`
  }, [form.values])

  return (
    <Flex direction="column" gap="2">
      <Flex direction={'column'} gap="3">
        <Flex alignContent={'space-between'} gap="5">
          <NumberInput.Root
            disabled={form.values.unlimited || isRunning}
            value={`${form.values.numberOfCycles}`}
            min={MIN_CYCLES}
            max={MAX_CYCLES}
            onValueChange={({ valueAsNumber: value }) => form.changeValue('numberOfCycles', value || 0)}
          >
            <NumberInput.Label>Number of Cycles</NumberInput.Label>
            <NumberInput.Input></NumberInput.Input>
          </NumberInput.Root>

          <Checkbox.Root
            checked={form.values.unlimited}
            disabled={isRunning}
            onCheckedChange={(x) => form.changeValue('unlimited', x.checked as boolean)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Unlimited Cycles</Checkbox.Label>
          </Checkbox.Root>
        </Flex>

        <NumberInput.Root
          disabled={isRunning}
          value={`${form.values.startDelay}`}
          min={DEFAULT_START_DELAY}
          max={MAX_START_DELAY}
          onValueChange={({ valueAsNumber: value }) => form.changeValue('startDelay', value || 0)}
        >
          <NumberInput.Label>Delay Start (sec)</NumberInput.Label>
          <NumberInput.Input></NumberInput.Input>
        </NumberInput.Root>
      </Flex>

      <Text mb="2" fontSize={'sm'}>
        <b>*</b> You would approximately spend a total of {totalSecondsToSpendText}
      </Text>
    </Flex>
  )
}
