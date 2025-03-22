import { useState, useRef, useEffect, useCallback } from 'react';

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

/**
 * Custom hook for handling speech recognition (voice-to-text)
 */
export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Reference to speech recognition
  const recognitionRef = useRef<any>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    // Set support flags
    setRecognitionSupported(!!SpeechRecognition);
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      // Set up event handlers
      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const result = event.results[last];
        
        // Get transcript
        const text = result[0].transcript;
        setTranscript(text);
      };
      
      recognition.onend = () => {
        // Only set listening to false if we didn't manually stop it
        // This prevents it from stopping unexpectedly
        if (isListening) {
          // Restart recognition if it ended but we're still listening
          recognitionRef.current?.start();
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      // Store reference
      recognitionRef.current = recognition;
    }
    
    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isListening]);
  
  // Toggle listening
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      // Stop listening
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Start listening
      try {
        // Clear previous transcript
        setTranscript('');
        
        // Start recognition
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }, [isListening]);
  
  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return { 
    isListening, 
    recognitionSupported, 
    transcript, 
    toggleListening,
    resetTranscript
  };
} 