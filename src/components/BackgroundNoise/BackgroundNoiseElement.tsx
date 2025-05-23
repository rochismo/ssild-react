import { useBackgroundNoiseContext } from '@/contexts/BackgroundNoiseContext'
import { BackgroundNoise } from '@/types/BackgroundNoise'
import { Box, Button, Flex, Slider } from '@chakra-ui/react'
import { useRef, useState, useEffect, useCallback, ReactEventHandler } from 'react'
import { GoMute, GoUnmute } from 'react-icons/go'

type Props = {
  sound: BackgroundNoise
}

export const BackgroundNoiseElement = ({ sound }: Props) => {
  const { enlistSound, delistSound, mutedSounds, muteSound, unmuteSound } = useBackgroundNoiseContext()
  const mainAudioRef = useRef<HTMLAudioElement>(null)
  const glueAudioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const hasStartedLoading = useRef(false)
  const glueShouldPlayRef = useRef(false)
  const isPlayingRef = useRef(false)
  const muted = mutedSounds.has(sound.slug)
  const volumeRef = useRef(0)

  const loadAudioSources = useCallback(async () => {
    try {
      const mainSrc = (await import(`@/assets/sounds/main/main-${sound.slug}.mp4`)).default
      const glueSrc = (await import(`@/assets/sounds/glues/glue-${sound.slug}.mp4`)).default

      const main = mainAudioRef.current
      const glue = glueAudioRef.current
      if (!main || !glue) return

      const waitUntilReady = (audio: HTMLAudioElement) =>
        new Promise<void>((resolve) => {
          const handler = () => {
            audio.removeEventListener('canplaythrough', handler)
            resolve()
          }
          audio.addEventListener('canplaythrough', handler)
        })

      main.src = mainSrc
      main.loop = true

      glue.src = glueSrc
      glue.loop = false

      await Promise.all([waitUntilReady(main), waitUntilReady(glue)])

      setIsLoaded(true)
    } catch (err) {
      console.warn('Failed to load audio:', err)
    }
  }, [sound.slug])

  useEffect(() => {
    if (volume > 0 && !hasStartedLoading.current) {
      hasStartedLoading.current = true
      loadAudioSources()
    }
  }, [volume, loadAudioSources])

  const playMain = () => {
    if (!mainAudioRef.current || !glueAudioRef.current) return

    if (glueShouldPlayRef.current && mainAudioRef.current.paused) {
      glueShouldPlayRef.current = false
      glueAudioRef.current.currentTime = 0
      try {
        mainAudioRef.current.currentTime = 5
      } catch {
        // Ignore
      }
    }

    mainAudioRef.current.play().catch(() => {})
  }

  const playGlue = () => {
    if (!glueAudioRef.current || !glueShouldPlayRef.current) return
    glueAudioRef.current.play().catch(() => {})
  }

  const handleMainPlaying: ReactEventHandler<HTMLAudioElement> = (e) => {
    const mainAudio = e.target as HTMLAudioElement
    const duration = mainAudio.duration
    const currentTime = mainAudio.currentTime
    const glueDuration = glueAudioRef.current?.duration ?? 0
    const glueShouldPlay = glueShouldPlayRef.current
    mainAudio.volume = volume

    // If glue is not playing and main is nearing end (within half of glue's duration), play glue
    if (!glueShouldPlay && currentTime > duration - glueDuration / 2) {
      if (glueAudioRef.current) {
        glueAudioRef.current.currentTime = 0
      }

      glueShouldPlayRef.current = true
      playGlue()
    }
  }

  const handleGluePlaying: ReactEventHandler<HTMLAudioElement> = (e) => {
    const glueAudio = e.target as HTMLAudioElement
    const duration = glueAudio.duration
    glueAudio.volume = volume

    // If the glue audio is more than halfway through, resume main playback and disable glue
    if (glueAudio.currentTime > duration / 2) {
      playMain()
      glueShouldPlayRef.current = false
    }
  }
  // useMuteEffect({ muted, setVolume, volumeRef, glueAudioRef, mainAudioRef, glueShouldPlayRef })

  useEffect(() => {
    const glue = glueAudioRef.current
    const main = mainAudioRef.current

    if (!glue || !main) {
      return
    }

    if (muted) {
      setVolume(0)
      glue.volume = 0
      main.volume = 0
      return
    }

    const previousVolume = volumeRef.current

    setVolume(previousVolume)
    if (glueShouldPlayRef.current) {
      glue.volume = previousVolume
    } else {
      main.volume = previousVolume
    }
  }, [muted])

  useEffect(() => {
    if (!isLoaded) return

    if (!isPlayingRef.current && volume > 0) {
      playMain()
      isPlayingRef.current = true
    }
  }, [isLoaded, volume])

  const handleVolume = useCallback(
    (e: { value: number[] }) => {
      volumeRef.current = volume
      const [newVol] = e.value
      if (newVol > 0.02) {
        enlistSound(sound.slug)
      } else {
        delistSound(sound.slug)
      }
      setVolume(newVol)

      if (muted) unmuteSound(sound.slug)
      if (mainAudioRef.current) mainAudioRef.current.volume = newVol
      if (glueAudioRef.current) glueAudioRef.current.volume = newVol
    },
    [delistSound, enlistSound, muted, sound.slug, unmuteSound, volume]
  )

  const toggleMute = useCallback(() => {
    if (!muted && volume !== 0) {
      muteSound(sound.slug)
      delistSound(sound.slug)
      return
    }

    if (volume === 0) {
      handleVolume({ value: [0.2] })
    }
    if (mutedSounds.has(sound.slug)) {
      unmuteSound(sound.slug)
    }
    enlistSound(sound.slug)
  }, [delistSound, enlistSound, handleVolume, muteSound, muted, mutedSounds, sound.slug, unmuteSound, volume])

  return (
    <Box w={'80%'}>
      <Flex gap="2">
        <Button
          rounded={'full'}
          mt="5"
          alignSelf={'flex-end'}
          size={'2xs'}
          bgColor={sound.slider.thumbBg}
          onClick={toggleMute}
        >
          {muted ? <GoUnmute /> : <GoMute />}
        </Button>
        <Slider.Root w="100%" value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolume}>
          <Slider.Label>{sound.displayName}</Slider.Label>
          <Slider.Control>
            <Slider.Track bg={sound.slider.trackBg}>
              <Slider.Range bg={sound.slider.trackRangeBg} />
            </Slider.Track>
            <Slider.Thumb index={0} boxSize={6} borderColor={sound.slider.thumbBg} shadow="md">
              <Box as={sound.slider.thumbIcon} />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </Flex>
      <audio ref={mainAudioRef} preload="auto" onTimeUpdate={handleMainPlaying} />
      <audio ref={glueAudioRef} preload="auto" onTimeUpdate={handleGluePlaying} />
    </Box>
  )
}
