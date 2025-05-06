import { useSSILDContext } from '@/contexts/SSILDContext'
import { formatDuration } from '@/utils/formatting'
import { Flex, Text } from '@chakra-ui/react'

export const Tracking = () => {
  const { tracking } = useSSILDContext()

  return (
    <Flex direction={'column'}>
      <Text>Time Spent: {formatDuration(tracking.seconds)}</Text>
      <Text>Cycles Undergone: {tracking.cycles}</Text>
    </Flex>
  )
}
