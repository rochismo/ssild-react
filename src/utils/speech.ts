export function speak(text: string, selectedVoiceUri: string = '') {
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = speechSynthesis.getVoices().find((x) => x.voiceURI === selectedVoiceUri)

  if (voice != null) {
    utterance.lang = voice.lang
    utterance.voice = voice
  }
  speechSynthesis.speak(utterance)
}
