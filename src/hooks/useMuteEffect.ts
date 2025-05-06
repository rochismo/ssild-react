import { useEffect, useRef, useState } from 'react'

type AudioRef = React.RefObject<HTMLAudioElement | null>

type FadeDirection = 'in' | 'out'

interface FadeAudioOptions {
  direction: FadeDirection
  duration: number // in milliseconds
  targetVolume?: number // Optional for 'in', default is 1
  interval?: number // in milliseconds, default is 50ms
}

function fadeAudio(
  audio: HTMLAudioElement,
  { direction, duration, targetVolume = 1, interval = 50 }: FadeAudioOptions
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isFinite(duration) || duration <= 0) {
      return reject(new Error('Duration must be a positive finite number.'))
    }

    if (!isFinite(targetVolume) || targetVolume < 0 || targetVolume > 1) {
      return reject(new Error('targetVolume must be a finite number between 0 and 1.'))
    }

    const steps = Math.max(1, Math.floor(duration / interval))
    const startVolume = direction === 'in' ? 0 : audio.volume
    const endVolume = direction === 'in' ? targetVolume : 0
    const volumeStep = (endVolume - startVolume) / steps

    let currentStep = 0
    let currentVolume = startVolume

    // Set initial volume explicitly
    audio.volume = startVolume

    const fadeInterval = setInterval(() => {
      currentStep++
      currentVolume += volumeStep
      currentVolume = Math.min(1, Math.max(0, currentVolume))
      audio.volume = currentVolume

      if (currentStep >= steps) {
        audio.volume = endVolume
        clearInterval(fadeInterval)
        resolve()
      }
    }, interval)
  })
}

type UseMuteEffectProps = {
  glueAudioRef: AudioRef
  mainAudioRef: AudioRef
  setVolume: (v: number) => void
  volumeRef: React.RefObject<number>
  muted: boolean
  glueShouldPlayRef: React.RefObject<boolean>
}

export const useMuteEffect = ({
  muted,
  setVolume,
  volumeRef,
  glueAudioRef,
  mainAudioRef,
  glueShouldPlayRef,
}: UseMuteEffectProps) => {
  const [isChangingVolumes, setIsChangingVolumes] = useState(false)
  const isProcessingRef = useRef(false)

  useEffect(() => {
    const glue = glueAudioRef.current
    const main = mainAudioRef.current

    if (!glue || !main) {
      return
    }
    const previousVolume = volumeRef.current

    async function processMute() {
      if (isProcessingRef.current || previousVolume === 0) {
        return
      }
      setIsChangingVolumes(true)
      isProcessingRef.current = true
      setVolume(0)
      await fadeAudio(glue!, { direction: 'out', duration: 500 })
      await fadeAudio(main!, { direction: 'out', duration: 500 })
      glue!.pause()
      main!.pause()
      isProcessingRef.current = false
      setIsChangingVolumes(false)
    }

    async function processUnmute() {
      if (isProcessingRef.current) {
        return
      }

      setIsChangingVolumes(true)
      isProcessingRef.current = true
      const target = glueShouldPlayRef.current ? glue! : main!
      setVolume(previousVolume)
      if (target.volume !== previousVolume && previousVolume !== 0) {
        await fadeAudio(target!, { direction: 'in', duration: 500, targetVolume: previousVolume })
      }

      isProcessingRef.current = false
      setIsChangingVolumes(false)
    }

    if (muted) {
      processMute()
      return
    }

    processUnmute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted])

  return { isChangingVolumes }
}
