import { DEFAULT_START_DELAY, MAX_CYCLES, MAX_START_DELAY, MIN_CYCLES } from '@/constants/SSILD_CONSTANTS'
import { useSSILDContext } from '@/contexts/SSILDContext'
import { Checkbox, Flex, NumberInput } from '@chakra-ui/react'

export const CycleNumberConfiguration = () => {
  const { form, isRunning } = useSSILDContext()
  return (
    <Flex direction="column" gap="6">
      <Flex alignContent={'space-between'} gap="5">
        <NumberInput.Root
          disabled={form.values.unlimited || isRunning}
          value={`${form.values.numberOfCycles}`}
          onValueChange={({ valueAsNumber: value }) => form.changeValue('numberOfCycles', value || 0)}
        >
          <NumberInput.Label>Number of Cycles</NumberInput.Label>
          <NumberInput.Input min={MIN_CYCLES} max={MAX_CYCLES}></NumberInput.Input>
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
        onValueChange={({ valueAsNumber: value }) => form.changeValue('startDelay', value || 0)}
      >
        <NumberInput.Label>Delay Start (sec)</NumberInput.Label>
        <NumberInput.Input min={DEFAULT_START_DELAY} max={MAX_START_DELAY}></NumberInput.Input>
      </NumberInput.Root>
    </Flex>
  )
}
