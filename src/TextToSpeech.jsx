import React, { useState, useEffect } from 'react';
import { Volume2, StopCircle } from 'lucide-react';

const TextToSpeech = ({ text, className = "", size = 16, color = "text-slate-400" }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);

  useEffect(() => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesisAvailable(true);
    }
  }, []);

  const handleSpeak = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to select a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google US English') || 
      voice.name.includes('Samantha') || 
      voice.lang === 'en-US'
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for learning purposes

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!speechSynthesisAvailable) return null;

  return (
    <button 
      onClick={handleSpeak}
      className={`p-1.5 rounded-full transition-all hover:bg-slate-100 ${color} ${className}`}
      title={isSpeaking ? "Stop listening" : "Listen to pronunciation"}
    >
      {isSpeaking ? (
        <StopCircle size={size} className="text-red-500 animate-pulse" />
      ) : (
        <Volume2 size={size} />
      )}
    </button>
  );
};

export default TextToSpeech;
