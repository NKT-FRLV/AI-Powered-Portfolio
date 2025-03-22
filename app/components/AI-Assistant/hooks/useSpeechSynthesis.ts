import { useState, useRef, useEffect, useCallback } from 'react';

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechSynthesis: any;
    webkitSpeechSynthesis: any;
  }
}

/**
 * Custom hook for handling speech synthesis
 */
export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  // Reference to speech synthesis
  const synthRef = useRef<SpeechSynthesis | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    // Check for browser support
    const speechSynthesis = window.speechSynthesis;
    
    // Set support flags
    setSpeechSupported(!!speechSynthesis);
    
    if (speechSynthesis) {
      synthRef.current = speechSynthesis;
    }
    
    // Cleanup
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);
  
  // Speak message
  const speakMessage = useCallback((text: string) => {
    if (!synthRef.current) return;
    
    // If already speaking, stop speaking and return
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';
    
    // Try to find a voice that matches the language
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      const langVoices = voices.filter(voice => voice.lang.startsWith('en'));
      
      if (langVoices.length > 0) {
        utterance.voice = langVoices[0];
      }
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [isSpeaking]);

  return { isSpeaking, speechSupported, speakMessage };
} 