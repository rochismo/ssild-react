import { backgroundNoises } from '@/definitions/background-noise.definitions'
import { useMutableSet } from '@/hooks/useMutableSet'
import { createContext, PropsWithChildren, useCallback, useContext } from 'react'

type BackgroundNoiseContextProps = {
  mutedSounds: Set<string>
  muteAllSounds: () => void
  unmuteAllSounds: () => void
  soundsPlaying: Set<string>
  enlistSound: (slug: string) => void
  delistSound: (slug: string) => void
  muteSound: (slug: string) => void
  unmuteSound: (slug: string) => void
}

const BackgroundNoiseContext = createContext<BackgroundNoiseContextProps | undefined>(undefined)

export const BackgroundNoiseContextProvider = ({ children }: PropsWithChildren) => {
  const [mutedSounds, muteSound, unmuteSound] = useMutableSet<string>()
  const [soundsPlaying, enlistSound, delistSound] = useMutableSet<string>()

  const muteAllSounds = useCallback(() => {
    backgroundNoises.forEach((bg) => {
      muteSound(bg.slug)
    })
  }, [muteSound])

  const unmuteAllSounds = useCallback(() => {
    backgroundNoises.forEach((bg) => unmuteSound(bg.slug))
  }, [unmuteSound])

  return (
    <BackgroundNoiseContext.Provider
      value={{
        delistSound,
        enlistSound,
        soundsPlaying,
        muteSound,
        unmuteSound,
        mutedSounds,
        unmuteAllSounds,
        muteAllSounds,
      }}
    >
      {children}
    </BackgroundNoiseContext.Provider>
  )
}

export const useBackgroundNoiseContext = () => {
  const context = useContext(BackgroundNoiseContext)

  if (!context) {
    throw new Error('Please use under BackgroundNoiseContextProvider')
  }

  return context
}
