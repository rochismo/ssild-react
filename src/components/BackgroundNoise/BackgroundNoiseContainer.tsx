import { backgroundNoises } from '@/definitions/background-noise.definitions'
import { Button, Checkbox, Flex } from '@chakra-ui/react'
import { BackgroundNoiseElement } from './BackgroundNoiseElement'
import { useBackgroundNoiseContext } from '@/contexts/BackgroundNoiseContext'
import { useSSILDContext } from '@/contexts/SSILDContext'
import { useCallback, useEffect } from 'react'

export const BackgroundNoiseContainer = () => {
  const { mutedSounds, soundsPlaying, unmuteAllSounds, muteAllSounds } = useBackgroundNoiseContext()
  const { form, isRunning } = useSSILDContext()
  const areAllSoundsMuted = mutedSounds.size === backgroundNoises.length
  console.log(soundsPlaying)
  useEffect(() => {
    if (soundsPlaying.size == 0 && mutedSounds.size > 0) {
      unmuteAllSounds()
    }
  }, [soundsPlaying, mutedSounds, unmuteAllSounds])

  const toggleAllSounds = useCallback(() => {
    if (mutedSounds.size) {
      return unmuteAllSounds()
    }

    muteAllSounds()
  }, [mutedSounds, muteAllSounds, unmuteAllSounds])

  return (
    <Flex direction="column" height="100%" py={5}>
      <Flex gap="5" width="100%" justifyContent={'center'} alignItems={'baseline'}>
        <Button disabled={soundsPlaying.size <= 0} onClick={toggleAllSounds} alignSelf="center" mb={4}>
          {areAllSoundsMuted ? 'Resume All Sounds' : 'Mute All Sounds'}
        </Button>
        <Checkbox.Root
          checked={form.values.muteBackgroundSoundsUponStop}
          disabled={isRunning}
          onCheckedChange={(x) => form.changeValue('muteBackgroundSoundsUponStop', x.checked as boolean)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Mute Sounds Upon Stop</Checkbox.Label>
        </Checkbox.Root>
      </Flex>

      <Flex wrap="wrap" gap="10" overflowY="auto" justifyContent="center" flex="1">
        {backgroundNoises.map((sound) => {
          return <BackgroundNoiseElement key={sound.slug} sound={sound} />
        })}
      </Flex>
    </Flex>
  )
}
