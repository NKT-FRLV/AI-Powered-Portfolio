import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ChatMessageProps } from './types';
import { translations } from './translations';
import { messageVariants, cursorVariants, reactionPickerVariants } from './animations';

const ChatMessage = ({
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
}: ChatMessageProps) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  const availableReactions = ['👍', '❤️', '😊', '🎉', '🤔', '👏'];
  
  const toggleReactionPicker = () => {
    setShowReactionPicker(!showReactionPicker);
  };
  
  const handleReactionClick = (emoji: string) => {
    if (onReactionAdd) {
      onReactionAdd(emoji);
    }
    setShowReactionPicker(false);
  };
  
  const formattedTime = format(timestamp, 'h:mm a');
  
  return (
    <motion.div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={messageVariants}
      custom={index}
      role="listitem"
      aria-label={`${role === 'user' ? translations.you : translations.assistant} at ${formattedTime}`}
    >
      <div className="flex flex-col max-w-[80%]">
        <div 
          className={`relative ${bubbleClassName} chat-message`}
          tabIndex={0}
          role="article"
          aria-labelledby={`message-${id}-sender`}
          aria-describedby={`message-${id}-content message-${id}-time`}
        >
          <span id={`message-${id}-sender`} className="sr-only">
            {role === 'user' ? translations.you : translations.assistant}
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
                  aria-label={translations.messageReactions}
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
                aria-label={translations.addReaction}
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
                    aria-label={translations.addReaction}
                  >
                    <div className="flex space-x-1.5">
                      {availableReactions.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleReactionClick(emoji)}
                          className="text-sm hover:scale-125 transition-transform"
                          aria-label={translations.reactWith(emoji)}
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
          className="text-xs text-muted-foreground mt-1 self-start ml-2"
          id={`message-${id}-time`}
          aria-label={`${translations.sentAt} ${formattedTime}`}
        >
          {formattedTime}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;