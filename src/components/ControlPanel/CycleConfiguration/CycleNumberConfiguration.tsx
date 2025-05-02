import { MAX_CYCLES, MIN_CYCLES } from '@/constants/SSILD_CONSTANTS'
import { useSSILDContext } from '@/contexts/SSILDContext'
import { Checkbox, Flex, NumberInput } from '@chakra-ui/react'

export const CycleNumberConfiguration = () => {
  const { form, isRunning } = useSSILDContext()
  return (
    <Flex alignContent={'space-between'} gap="5">
      <NumberInput.Root
        disabled={form.values.unlimited || isRunning}
        onValueChange={({ valueAsNumber: value }) => form.changeValue('numberOfCycles', value)}
      >
        <NumberInput.Label>Number of Cycles</NumberInput.Label>
        <NumberInput.Input value={form.values.numberOfCycles} min={MIN_CYCLES} max={MAX_CYCLES}></NumberInput.Input>
      </NumberInput.Root>

      <Checkbox.Root
        checked={form.values.unlimited}
        disabled={isRunning}
        defaultChecked={false}
        onCheckedChange={(x) => form.changeValue('unlimited', x.checked as boolean)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Unlimited Cycles</Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  )
}
