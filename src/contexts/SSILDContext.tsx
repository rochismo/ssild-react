import { useForm } from '@/hooks/useForm'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SSILDConfig, SSILDStatus } from '@/types/SSILDConfig'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DEFAULT_CYCLE_TIME_SECONDS, DEFAULT_CYCLE_REMINDER_SECONDS } from '@/constants/SSILD_CONSTANTS'
import { useSSILDLogic } from '@/hooks/useSSILDLogic'

type SSILDContextValue = {
  form: ReturnType<typeof useForm<SSILDConfig>>
  voices: SpeechSynthesisVoice[]
  start: () => void
  pause: () => void
  stop: () => void
  status: SSILDStatus
}

const SSILDContext = createContext<SSILDContextValue | undefined>(undefined)

const defaultValues: SSILDConfig = {
  cycleTimes: {
    hearing: DEFAULT_CYCLE_TIME_SECONDS,
    sight: DEFAULT_CYCLE_TIME_SECONDS,
    touch: DEFAULT_CYCLE_TIME_SECONDS,
  },
  numberOfCycles: 3,
  unlimited: false,
  reminderTimes: {
    hearing: DEFAULT_CYCLE_REMINDER_SECONDS,
    sight: DEFAULT_CYCLE_REMINDER_SECONDS,
    touch: DEFAULT_CYCLE_REMINDER_SECONDS,
  },
  voice: '',
}

export const SSILDContextProvider = ({ children }: PropsWithChildren) => {
  const [config, saveConfig] = useLocalStorage<SSILDConfig>('ssild-config', defaultValues)
  const form = useForm<SSILDConfig>(config, defaultValues)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const ssildLogic = useSSILDLogic(form)

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      const voices = speechSynthesis.getVoices()
      setVoices(voices)
    }
  }, [])

  useEffect(() => {
    saveConfig(form.values)
  }, [form.values, saveConfig])

  return (
    <SSILDContext.Provider
      value={{
        form,
        voices,
        ...ssildLogic,
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
