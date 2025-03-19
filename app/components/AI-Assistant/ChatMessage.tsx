import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ChatMessageProps {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
  index: number;
  bubbleClassName: string;
  reactions?: string[];
  onReactionAdd?: (emoji: string) => void;
  showReactions?: boolean;
  language?: 'en' | 'ru';
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  content,
  role,
  timestamp,
  isTyping,
  index,
  bubbleClassName,
  reactions = [],
  onReactionAdd,
  showReactions = true,
  language = 'en'
}) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  const availableReactions = ['👍', '❤️', '😊', '🎉', '🤔', '👏'];
  
  // Translations
  const translations = {
    en: {
      you: "You",
      assistant: "Assistant",
      isTyping: "Assistant is typing",
      sentAt: "Sent at",
      addReaction: "Add reaction",
      reactWith: (emoji: string) => `React with ${emoji}`,
      closeReactionPicker: "Close reaction picker",
      messageReactions: "Message reactions",
      reaction: (emoji: string) => `${emoji} reaction. Click to toggle.`
    },
    ru: {
      you: "Вы",
      assistant: "Ассистент",
      isTyping: "Ассистент печатает",
      sentAt: "Отправлено в",
      addReaction: "Добавить реакцию",
      reactWith: (emoji: string) => `Реагировать с ${emoji}`,
      closeReactionPicker: "Закрыть выбор реакций",
      messageReactions: "Реакции на сообщение",
      reaction: (emoji: string) => `Реакция ${emoji}. Нажмите, чтобы переключить.`
    }
  };
  
  const t = translations[language];
  
  const messageVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
        delay: index * 0.05 // Stagger effect based on message index
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2
      }
    }
  };
  
  const cursorVariants: Variants = {
    blink: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  const reactionPickerVariants: Variants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 10,
      transition: { 
        duration: 0.2
      }
    }
  };
  
  const toggleReactionPicker = () => {
    setShowReactionPicker(!showReactionPicker);
  };
  
  const handleReactionClick = (emoji: string) => {
    if (onReactionAdd) {
      onReactionAdd(emoji);
    }
    setShowReactionPicker(false);
  };
  
  const formattedTime = language === 'ru'
    ? format(timestamp, 'HH:mm', { locale: ru })
    : format(timestamp, 'h:mm a');
  
  return (
    <motion.div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={messageVariants}
      role="listitem"
      aria-label={`${role === 'user' ? t.you : t.assistant} at ${formattedTime}`}
    >
      <div className="flex flex-col max-w-[80%]">
        <div 
          className={`relative ${bubbleClassName}`}
          tabIndex={0}
          role="article"
          aria-labelledby={`message-${id}-sender`}
          aria-describedby={`message-${id}-content message-${id}-time`}
        >
          <span id={`message-${id}-sender`} className="sr-only">
            {role === 'user' ? t.you : t.assistant}
          </span>
          
          <div 
            className="whitespace-pre-wrap break-words"
            id={`message-${id}-content`}
          >
            {content}
            {isTyping && (
              <motion.span
                className="inline-block w-1.5 h-4 ml-0.5 bg-current"
                variants={cursorVariants}
                animate="blink"
              />
            )}
          </div>
          
          {showReactions && !isTyping && (
            <div className="absolute -bottom-6 right-0 flex items-center space-x-1">
              {reactions.length > 0 && (
                <div 
                  className="flex items-center bg-background/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 border shadow-sm"
                  aria-label={t.messageReactions}
                >
                  {Array.from(new Set(reactions)).map((emoji) => (
                    <div key={emoji} className="text-xs mx-0.5">
                      {emoji} {reactions.filter(r => r === emoji).length > 1 && reactions.filter(r => r === emoji).length}
                    </div>
                  ))}
                </div>
              )}
              
              <button
                onClick={toggleReactionPicker}
                className="text-xs bg-background/80 backdrop-blur-sm rounded-full p-1 border shadow-sm hover:bg-muted transition-colors"
                aria-label={t.addReaction}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </button>
              
              <AnimatePresence>
                {showReactionPicker && (
                  <motion.div
                    className="absolute -bottom-10 right-0 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 border shadow-md z-10"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={reactionPickerVariants}
                    role="menu"
                    aria-label={t.addReaction}
                  >
                    <div className="flex space-x-1.5">
                      {availableReactions.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleReactionClick(emoji)}
                          className="text-sm hover:scale-125 transition-transform"
                          aria-label={t.reactWith(emoji)}
                          role="menuitem"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        
        <div 
          className="text-xs text-muted-foreground mt-1 self-end"
          id={`message-${id}-time`}
          aria-label={`${t.sentAt} ${formattedTime}`}
        >
          {formattedTime}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;