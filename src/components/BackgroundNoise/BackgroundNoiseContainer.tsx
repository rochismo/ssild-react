import { backgroundNoises } from '@/definitions/background-noise.definitions'
import { Flex } from '@chakra-ui/react'
import { BackgroundNoiseElement } from './BackgroundNoiseElement'
import { MuteAllSoundsButton } from '../ControlPanel/BackgroundNoiseConfiguration/MuteAllSoundsButton'

export const BackgroundNoiseContainer = () => {
  return (
    <Flex direction="column" height="100%" py={5}>
      <MuteAllSoundsButton alignSelf={'center'} />

      <Flex wrap="wrap" gap="10" overflowY="auto" justifyContent="center" flex="1">
        {backgroundNoises.map((sound) => {
          return <BackgroundNoiseElement key={sound.slug} sound={sound} />
        })}
      </Flex>
    </Flex>
  )
}
