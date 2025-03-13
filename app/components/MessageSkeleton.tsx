"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MessageSkeletonProps {
  className?: string;
}

export const MessageSkeleton: React.FC<MessageSkeletonProps> = ({ className = "" }) => {
  return (
    <motion.div 
      className={`max-w-[80%] rounded-lg p-3 bg-muted ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-primary/30 animate-pulse"></div>
        <div className="text-sm text-muted-foreground">Thinking...</div>
      </div>
    </motion.div>
  );
};

export default MessageSkeleton; 