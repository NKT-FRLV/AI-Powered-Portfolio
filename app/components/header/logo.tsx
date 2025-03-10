"use client";

import React from "react";
import NextLink from "next/link";
import Image from 'next/image';
import { motion } from "framer-motion";

const Logo: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mr-4 flex"
    >
      <NextLink href="/" className="flex items-center space-x-2">
        <motion.div
          whileTap={{ scale: 0.9 }}
          variants={{
            initial: { opacity: 0, scale: 0.8, rotate: -10 },
            animate: { 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: { duration: 0.5 }
            },
            hover: {
              scale: 1.1,
              rotate: [0, -10, 10, -5, 5, 0],
              transition: { duration: 0.5, repeat: Infinity, repeatType: "loop" }
            }
          }}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Image 
            src="/nf-logo.svg" 
            alt="Nikita's Logo" 
            width={40} 
            height={40} 
            className="rounded-full"
            priority // Добавляем приоритет для загрузки логотипа
          />
        </motion.div>
      </NextLink>
    </motion.div>
  );
};

export default Logo; 