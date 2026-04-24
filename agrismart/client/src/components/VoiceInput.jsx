import { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function VoiceInput({ onResult, placeholder = 'Speak...' }) {
  const [listening, setListening] = useState(false);
  const [supported] = useState(() => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const recRef = useRef(null);

  const toggle = () => {
    if (!supported) return;
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onResult(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    recRef.current = rec;
    setListening(true);
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? 'Stop listening' : 'Voice input'}
      className={`p-2 rounded-lg border transition-all duration-200 ${
        listening
          ? 'border-red-500/60 bg-red-900/30 text-red-400 animate-pulse'
          : 'border-green-700/40 bg-green-900/20 text-green-400 hover:border-green-500 hover:text-green-300'
      }`}
    >
      {listening ? <MicOff size={16} /> : <Mic size={16} />}
    </button>
  );
}
