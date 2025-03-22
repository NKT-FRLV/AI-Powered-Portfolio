import { motion } from 'framer-motion';
import { translations } from '../translations';
import { VoiceControlsProps } from '../types';

/**
 * Voice controls component for text-to-speech functionality
 */
const VoiceControls = ({
  isSpeaking,
  speechSupported,
  speakMessage,
  currentMessage
}: VoiceControlsProps) => {
  if (!speechSupported) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-between px-4 py-2 border-t">
      <motion.button
        onClick={() => speakMessage(currentMessage)}
        className={`rounded-full p-2 ${isSpeaking ? 'bg-black text-white' : 'hover:bg-muted'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isSpeaking ? translations.stopSpeaking : translations.readAloud}
        title={isSpeaking ? translations.stopSpeaking : translations.readAloud}
      >
        {isSpeaking ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        )}
      </motion.button>
      
      <div className="text-xs text-muted-foreground">
        {isSpeaking ? translations.speaking : translations.textToSpeechAvailable}
      </div>
    </div>
  );
};

export default VoiceControls; 