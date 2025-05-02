import { HStack, Separator, Text } from '@chakra-ui/react'

export const SSILDSeparator = ({ text }: { text: string }) => {
  return (
    <HStack>
      <Separator flex="1" />
      <Text flexShrink="0">{text}</Text>
      <Separator flex="1" />
    </HStack>
  )
}
