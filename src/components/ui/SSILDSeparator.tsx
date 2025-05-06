import { HStack, Separator, StackProps, Text } from '@chakra-ui/react'
import { ReactNode, RefAttributes } from 'react'

export const SSILDSeparator = ({
  text,
  stackProps = {},
}: {
  text: ReactNode
  stackProps?: StackProps & RefAttributes<HTMLDivElement>
}) => {
  return (
    <HStack {...stackProps}>
      <Separator flex="1" />
      <Text flexShrink="0">{text}</Text>
      <Separator flex="1" />
    </HStack>
  )
}
