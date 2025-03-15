import React from 'react';
import { motion } from 'framer-motion';
import { SiOpenai } from "react-icons/si";

interface ChatButtonProps {
  onClick: () => void;
  theme: string | undefined;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, theme }) => {
  const buttonVariants = {
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, // уменьшили жёсткость
        damping: 15,    // немного уменьшили затухание
        mass: 1.2,
      } 
    },
    exit: { 
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    hover: { 
      scale: 1.05,
      boxShadow: theme === 'dark' 
        ? "0 0 20px 5px rgba(255,255,255,0.3)" 
        : "0 0 20px 5px rgba(0,0,0,0.2)",
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1,
        ease: "easeOut" 
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    animate: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.75, 1]
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  const ringVariants = {
    animate: {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Варианты для радиоволн
  const radioWaveVariants = {
    initial: { scale: 0.4, opacity: 0 },
    animate: (i: number) => ({
      scale: [0.8, 2],
      opacity: [0.6, 0],
      transition: {
        repeat: Infinity,
        repeatDelay: 2,
        duration: 5,
        delay: i * 1.5,
        ease: [0.2, 0.4, 0.6, 0.8]
      }
    })
  };

  // Анимация появления контейнера
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren", 
        staggerChildren: 0.2 
      }
    }
  };

  const buttonClass = theme === 'dark' 
    ? "bg-black/80 backdrop-blur-md shadow-xl hover:shadow-2xl border border-white/30"
    : "bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl border border-black/20";

  const glowClass = theme === 'dark'
    ? "absolute inset-0 rounded-full bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
    : "absolute inset-0 rounded-full bg-zinc-900/15 shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300";
    
  const ringClass = theme === 'dark'
    ? "absolute -inset-2 rounded-full border-2 border-white/15 transition-all duration-300"
    : "absolute -inset-2 rounded-full border-2 border-black/10 transition-all duration-300";

  const radioWaveClass = (index: number) => theme === 'dark'
    ? `absolute bottom-6 right-6 rounded-full border ${index === 0 ? 'border-blue-400/40' : index === 1 ? 'border-indigo-400/30' : 'border-purple-400/20'} pointer-events-none`
    : `absolute bottom-6 right-6 rounded-full border ${index === 0 ? 'border-blue-500/30' : index === 1 ? 'border-indigo-500/20' : 'border-purple-500/10'} pointer-events-none`;

  return (
    <motion.div
      className="fixed bottom-2 right-2 z-50 flex items-center justify-center overflow-visible"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Радиоволны (3 слоя) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`radio-wave-${i}`}
          className={`${radioWaveClass(i)} h-16 w-16`}
          variants={radioWaveVariants}
          custom={i}
          initial="initial"
          animate="animate"
          style={{
            boxShadow: theme === 'dark' 
              ? `0 0 ${5 - i * 1}px ${i === 0 ? 'rgba(96,165,250,0.2)' : i === 1 ? 'rgba(129,140,248,0.15)' : 'rgba(168,85,247,0.1)'}` 
              : `0 0 ${5 - i * 1}px ${i === 0 ? 'rgba(59,130,246,0.15)' : i === 1 ? 'rgba(99,102,241,0.1)' : 'rgba(147,51,234,0.05)'}`
          }}
        />
      ))}

      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        whileTap="tap"
        onClick={onClick}
        className={`${buttonClass} relative overflow-visible fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full transition-shadow duration-300 ease-in-out`}
        aria-label="Open AI-assistant"
      >
        <motion.div
          className={glowClass}
          variants={glowVariants}
          animate="animate"
        />
        
        <motion.div
          className={ringClass}
          variants={ringVariants}
          animate="animate"
        />

        <motion.div className="relative z-10 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 opacity-60"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div
            variants={iconVariants}
            animate="animate"
            whileHover="hover"
          >
            <SiOpenai 
              className={`h-8 w-8 ${theme === 'dark' ? 'text-white' : 'text-zinc-800'} drop-shadow-md`}
            />
          </motion.div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ChatButton;