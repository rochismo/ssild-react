import { useEffect, useRef } from 'react'

type AudioRef = React.RefObject<HTMLAudioElement | null>

const fadeAudio = (
  audio: HTMLAudioElement,
  targetVolume: number,
  duration: number,
  steps: number,
  onComplete?: () => void
): number => {
  const stepTime = duration / steps
  const startVolume = audio.volume
  const volumeStep = (targetVolume - startVolume) / steps
  let currentStep = 0

  const intervalId = window.setInterval(() => {
    if (!audio) {
      clearInterval(intervalId)
      return
    }

    currentStep++
    audio.volume = Math.min(1, Math.max(0, audio.volume + volumeStep))

    if (currentStep >= steps) {
      audio.volume = targetVolume
      clearInterval(intervalId)
      onComplete?.()
    }
  }, stepTime)

  return intervalId
}

type UseMuteEffectProps = {
  currentVolume: number
  glueAudioRef: AudioRef
  mainAudioRef: AudioRef
  muted: boolean
  glueShouldPlayRef: React.RefObject<boolean>
}

export const useMuteEffect = ({
  muted,
  currentVolume,
  glueAudioRef,
  mainAudioRef,
  glueShouldPlayRef,
}: UseMuteEffectProps) => {
  const fadeIntervalRef = useRef<number | null>(null)
  useEffect(() => {
    const glue = glueAudioRef.current
    const main = mainAudioRef.current
    if (!glue || !main) return

    const FADE_DURATION = 1000
    const FADE_STEPS = 20

    // Stop previous fade if needed
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }

    if (muted) {
      fadeIntervalRef.current = fadeAudio(main, 0, FADE_DURATION, FADE_STEPS)
      fadeAudio(glue, 0, FADE_DURATION, FADE_STEPS)
    } else {
      const prevVol = currentVolume
      const target = glueShouldPlayRef.current ? glue : main
      fadeIntervalRef.current = fadeAudio(target, prevVol, FADE_DURATION, FADE_STEPS)
    }

    return () => {
      if (fadeIntervalRef.current !== null) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted])
}
