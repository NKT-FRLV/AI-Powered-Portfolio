import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import LoadingDots from './LoadingDots';
import TypewriterText from './TypewriterText';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  isTyping?: boolean;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, role, isTyping, index }) => {
  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3
      }
    },
    exit: { opacity: 0, y: -10 }
  };

  const messageClass = role === "user"
    ? "chat-message-user light:text-white dark:bg-white dark:text-zinc-900 rounded-[18px_18px_4px_18px] shadow-md"
    : "chat-message-assistant bg-muted/80 rounded-[18px_18px_18px_4px] shadow-sm border border-foreground/5";

  return (
    <motion.div
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`mb-4 flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-[80%] p-3 ${messageClass}`}
      >
        {isTyping ? (
          <LoadingDots />
        ) : (
          <Suspense fallback={<div>{content}</div>}>
            <TypewriterText text={content} />
          </Suspense>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatMessage; 