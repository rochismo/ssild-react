export function speak(text: string, selectedVoiceName: string = '') {
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = speechSynthesis.getVoices().find((x) => x.name === selectedVoiceName)

  if (voice != null) {
    utterance.voice = voice
  }
  speechSynthesis.speak(utterance)
}
