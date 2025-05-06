import { useBackgroundNoiseContext } from '@/contexts/BackgroundNoiseContext'
import { backgroundNoises } from '@/definitions/background-noise.definitions'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useEffect, useCallback, RefAttributes } from 'react'
import { GoMute, GoUnmute } from 'react-icons/go'

export const MuteAllSoundsButton = (props: ButtonProps & RefAttributes<HTMLButtonElement> = {}) => {
  const { mutedSounds, soundsPlaying, unmuteAllSounds, muteAllSounds } = useBackgroundNoiseContext()
  const areAllSoundsMuted = mutedSounds.size === backgroundNoises.length

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
    <Button disabled={soundsPlaying.size <= 0} onClick={toggleAllSounds} mb={4} {...props}>
      {areAllSoundsMuted ? <GoUnmute /> : <GoMute />}
      {areAllSoundsMuted ? 'Resume All Sounds' : 'Mute All Sounds'}
    </Button>
  )
}
