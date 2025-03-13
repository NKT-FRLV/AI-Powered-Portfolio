import React from 'react';
import { motion } from 'framer-motion';
import { SiOpenai } from "react-icons/si";

interface ChatButtonProps {
  onClick: () => void;
  theme: string | undefined;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, theme }) => {
  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      } 
    },
    exit: { 
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.1,
    },
    tap: { scale: 0.9 }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const buttonClass = theme === 'dark' 
    ? "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 shadow-lg hover:shadow-2xl border border-zinc-600"
    : "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-2xl border border-zinc-200";

  const glowClass = theme === 'dark'
    ? "absolute inset-0 rounded-full bg-zinc-400/10"
    : "absolute inset-0 rounded-full bg-zinc-900/5";

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={buttonClass}
      aria-label="Open AI-assistant"
    >
      <SiOpenai 
        className={`h-8 w-8 ${theme === 'dark' ? 'text-white' : 'text-zinc-800'}`}
      />
      <motion.div
        className={glowClass}
        variants={glowVariants}
        animate="animate"
      />
    </motion.button>
  );
};

export default ChatButton; 