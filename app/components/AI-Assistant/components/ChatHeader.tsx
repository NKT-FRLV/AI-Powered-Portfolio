import { motion } from 'framer-motion';
import { Cross2Icon } from "@radix-ui/react-icons";
import { translations } from '../translations';
import { ChatHeaderProps } from '../types';

/**
 * Header component for the chat interface
 */
const ChatHeader = ({ 
  showSettings, 
  setShowSettings, 
  onClose, 
  title = "AI-assistant of Nikita"
}: ChatHeaderProps) => {
  return (
    <motion.div 
      className="flex items-center justify-between border-b p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <h3 className="font-medium" id="chat-title">{title}</h3>
      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => setShowSettings(!showSettings)}
          className={`rounded-full p-2 ${showSettings ? 'bg-black text-white' : 'hover:bg-muted'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={showSettings ? `${translations.close} ${translations.settings} (Ctrl+,)` : `${translations.settings} (Ctrl+,)`}
          title={showSettings ? `${translations.close} ${translations.settings} (Ctrl+,)` : `${translations.settings} (Ctrl+,)`}
          aria-pressed={showSettings}
          aria-controls="settings-panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </motion.button>
        
        <motion.button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-muted"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`${translations.close} (Esc)`}
          title={`${translations.close} (Esc)`}
        >
          <Cross2Icon className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatHeader; 