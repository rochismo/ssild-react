import { useForm } from '@/hooks/useForm'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SSILDConfig, SSILDStatus } from '@/types/SSILDConfig'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import {
  DEFAULT_CYCLE_TIME_SECONDS,
  DEFAULT_CYCLE_REMINDER_SECONDS,
  DEFAULT_START_DELAY,
  DEFAULT_MAX_CYCLES,
} from '@/constants/SSILD_CONSTANTS'
import { useSSILDLogic } from '@/hooks/useSSILDLogic'
import { useSSILDStatsTracker } from '@/hooks/useSSILDStatsTracker'

type SSILDContextValue = {
  form: ReturnType<typeof useForm<SSILDConfig>>
  voices: SpeechSynthesisVoice[]
  ssild: ReturnType<typeof useSSILDLogic>
  isRunning: boolean
  tracking: ReturnType<typeof useSSILDStatsTracker>
}

const SSILDContext = createContext<SSILDContextValue | undefined>(undefined)

const defaultValues: SSILDConfig = {
  cycleTimes: {
    hearing: DEFAULT_CYCLE_TIME_SECONDS,
    sight: DEFAULT_CYCLE_TIME_SECONDS,
    touch: DEFAULT_CYCLE_TIME_SECONDS,
  },
  numberOfCycles: DEFAULT_MAX_CYCLES,
  unlimited: false,
  reminderTimes: {
    hearing: DEFAULT_CYCLE_REMINDER_SECONDS,
    sight: DEFAULT_CYCLE_REMINDER_SECONDS,
    touch: DEFAULT_CYCLE_REMINDER_SECONDS,
  },
  voice: {
    uri: '',
    volume: 1,
  },
  startDelay: DEFAULT_START_DELAY,
  muteBackgroundSoundsUponStop: false,
}

export const SSILDContextProvider = ({ children }: PropsWithChildren) => {
  const [config, saveConfig] = useLocalStorage<SSILDConfig>('ssild-config', defaultValues)
  const form = useForm<SSILDConfig>(config, defaultValues)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const tracking = useSSILDStatsTracker()
  const ssild = useSSILDLogic(form, tracking)

  const isRunning = ssild.status !== SSILDStatus.IDLE

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      const voices = speechSynthesis.getVoices()
      setVoices(voices)
    }
    speechSynthesis.getVoices()
  }, [])

  useEffect(() => {
    // Use JSON comparison to detect real changes
    const stored = localStorage.getItem('ssild-config')
    const parsed = stored ? JSON.parse(stored) : null
    const current = form.values

    if (JSON.stringify(parsed) !== JSON.stringify(current)) {
      saveConfig(current)
    }
  }, [form.values, saveConfig])

  return (
    <SSILDContext.Provider
      value={{
        form,
        voices,
        ssild,
        isRunning,
        tracking,
      }}
    >
      {children}
    </SSILDContext.Provider>
  )
}

export const useSSILDContext = () => {
  const context = useContext(SSILDContext)

  if (context == null) {
    throw new Error('Please use under SSILDContextProvider')
  }

  return context
}
