import { backgroundNoises } from '@/definitions/background-noise.definitions'
import { Flex } from '@chakra-ui/react'
import { BackgroundNoiseElement } from './BackgroundNoiseElement'

export const BackgroundNoiseContainer = () => {
  return (
    <Flex wrap={'wrap'} gap="10" overflowY="auto" height="100%" justifyContent={'center'} py={5}>
      {backgroundNoises.map((sound) => {
        return <BackgroundNoiseElement key={sound.slug} sound={sound} />
      })}
    </Flex>
  )
}
