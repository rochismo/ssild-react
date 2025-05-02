import { MAX_CYCLES, MIN_CYCLES } from '@/constants/SSILD_CONSTANTS'
import { useSSILDContext } from '@/contexts/SSILDContext'
import { Checkbox, Flex, NumberInput } from '@chakra-ui/react'

export const CycleNumberConfiguration = () => {
  const { form } = useSSILDContext()
  return (
    <Flex alignContent={'space-between'} gap="5">
      <NumberInput.Root
        disabled={form.values.unlimited}
        onValueChange={({ valueAsNumber: value }) => form.changeValue('numberOfCycles', value)}
      >
        <NumberInput.Label>Number of Cycles</NumberInput.Label>
        <NumberInput.Input value={form.values.numberOfCycles} min={MIN_CYCLES} max={MAX_CYCLES}></NumberInput.Input>
      </NumberInput.Root>

      <Checkbox.Root
        checked={form.values.unlimited}
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
