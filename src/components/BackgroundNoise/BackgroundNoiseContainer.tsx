import { backgroundNoises } from '@/definitions/background-noise.definitions'
import { Button, Flex } from '@chakra-ui/react'
import { BackgroundNoiseElement } from './BackgroundNoiseElement'
import { useState } from 'react'

export const BackgroundNoiseContainer = () => {
  const [muted, setMuted] = useState(false)
  const [soundsPlaying, setSoundsPlaying] = useState<Set<string>>(new Set())

  const enlistSound = (slug: string) => {
    if (soundsPlaying.has(slug)) {
      return
    }
    setSoundsPlaying((prev) => new Set([...prev, slug]))
  }

  const delistSound = (slug: string) => {
    if (!soundsPlaying.has(slug)) {
      return
    }

    setSoundsPlaying((prev) => {
      const newSet = new Set(prev)
      newSet.delete(slug)
      return newSet
    })
  }

  return (
    <Flex direction="column" height="100%" py={5}>
      <Button disabled={soundsPlaying.size <= 0} onClick={() => setMuted((prev) => !prev)} alignSelf="center" mb={4}>
        {muted ? 'Resume All Sounds' : 'Mute All Sounds'}
      </Button>
      <Flex wrap="wrap" gap="10" overflowY="auto" justifyContent="center" flex="1">
        {backgroundNoises.map((sound) => {
          return (
            <BackgroundNoiseElement
              key={sound.slug}
              sound={sound}
              muted={muted}
              enlistSound={enlistSound}
              delistSound={delistSound}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
