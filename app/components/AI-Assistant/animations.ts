import { Variants } from 'framer-motion';

export const chatContainerVariants: Variants = {
  initial: { 
    opacity: 0,
    y: "100%",
    scale: 0.95
  },
  animate: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      damping: 20, 
      stiffness: 250,
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0,
    y: "100%",
    scale: 0.95,
    transition: { 
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

export const messageVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: (index: number) => ({ 
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
  }),
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2
    }
  }
};

export const cursorVariants: Variants = {
  blink: {
    opacity: [0, 1, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export const reactionPickerVariants: Variants = {
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