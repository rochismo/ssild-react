import { VoiceSettings } from '@/types/SSILDConfig'

export function speak(text: string, configuration: VoiceSettings) {
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = speechSynthesis.getVoices().find((x) => x.voiceURI === configuration.uri)
  utterance.volume = configuration.volume

  if (voice != null) {
    utterance.lang = voice.lang
    utterance.voice = voice
  }
  speechSynthesis.speak(utterance)
}
