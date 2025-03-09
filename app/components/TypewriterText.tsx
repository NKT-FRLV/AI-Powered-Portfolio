"use client";

import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 40,
  className = "",
  onComplete
}) => {
  const [isComplete, setIsComplete] = useState(false);
  
  // Обработка завершения анимации
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <motion.div 
      className="typewriter-container"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <TypeAnimation
        sequence={[
          text,
          () => setIsComplete(true)
        ]}
        wrapper="span"
        speed={{ type: 'keyStrokeDelayInMs', value: speed }}
        cursor={false}
        className={`${className} message-appear`}
        style={{ display: 'inline-block', whiteSpace: 'pre-line' }}
      />
    </motion.div>
  );
};

export default TypewriterText; 