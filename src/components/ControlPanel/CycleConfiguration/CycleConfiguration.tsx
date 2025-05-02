import { Flex } from '@chakra-ui/react'
import { SensesDurationConfiguration } from './SensesDurationConfiguration'

export const CycleConfiguration = () => {
  return (
    <Flex direction={'column'} gap="5">
      <SensesDurationConfiguration />
    </Flex>
  )
}
