let frenchVoice: SpeechSynthesisVoice | null = null;

function findFrenchVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'fr-FR') ??
    voices.find((v) => v.lang.startsWith('fr')) ??
    null
  );
}

export function initVoices(): Promise<void> {
  return new Promise((resolve) => {
    frenchVoice = findFrenchVoice();
    if (frenchVoice) {
      resolve();
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      frenchVoice = findFrenchVoice();
      resolve();
    };
    setTimeout(resolve, 2000);
  });
}

export function speak(text: string, slow = false) {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  if (frenchVoice) utterance.voice = frenchVoice;
  utterance.rate = slow ? 0.5 : 0.85;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}
