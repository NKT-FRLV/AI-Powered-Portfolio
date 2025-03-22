import { RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from '../ChatMessage';
import { Message } from '../types';

interface ChatBodyProps {
  messages: Message[];
  addReaction: (messageId: string, emoji: string) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  getBubbleStyleClasses: (isUser: boolean) => string;
}

/**
 * Chat body component that renders all messages
 */
const ChatBody = ({ 
  messages, 
  addReaction, 
  messagesEndRef,
  getBubbleStyleClasses
}: ChatBodyProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-y-auto p-4"
      role="log"
      aria-live="polite"
      aria-atomic="false"
      aria-relevant="additions"
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            {...message}
            index={index}
            bubbleClassName={getBubbleStyleClasses(message.role === 'user')}
            onReactionAdd={(emoji) => addReaction(message.id, emoji)}
            showReactions={!message.isTyping}
          />
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} tabIndex={-1} aria-hidden="true" />
    </motion.div>
  );
};

export default ChatBody; 