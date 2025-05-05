import { VoiceSettings } from '@/types/SSILDConfig'

export async function speak(text: string, configuration: VoiceSettings) {
  return new Promise((r) => {
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = speechSynthesis.getVoices().find((x) => x.voiceURI === configuration.uri)
    utterance.volume = configuration.volume

    if (voice != null) {
      utterance.lang = voice.lang
      utterance.voice = voice
    }
    speechSynthesis.speak(utterance)
    utterance.onend = r
  })
}
