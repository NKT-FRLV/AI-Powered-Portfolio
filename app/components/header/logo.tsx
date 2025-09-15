"use client";

import React from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";

const Logo: React.FC = () => {
  return (
	// Уникальное появление логотипа .animate-logo-in
    <div className="flex animate-logo-in" >
      <NextLink href="/" className="flex items-center space-x-2">
        <motion.div
          whileTap={{ scale: 0.9 }}
          variants={{
            initial: { scale: 1, rotate: 0 },
            // animate: { 
            //   opacity: 1, 
            //   scale: 1, 
            //   rotate: 0,
            //   transition: { duration: 0.5 }
            // },
            hover: {
              scale: [1, 1.1, 1],
              rotate: [0, -10, 10, -5, 5, 0],
              transition: { duration: 0.8, repeat: Infinity, repeatType: "loop" }
            }
          }}
          initial="initial"
        //   animate="animate"
          whileHover="hover"
        >
           {/* Встроенный SVG, автоматически меняющий цвета при переключении темы */}
           <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors duration-300"
          >
            {/* 
              В circle и path добавлены классы, которые:
              - В светлой теме: fill-black stroke-white
              - В темной теме: fill-white stroke-black
            */}
            <circle
              cx="20"
              cy="20"
              r="19"
              className="fill-black dark:fill-white stroke-transparent dark:stroke-transparent"
              strokeWidth="4"
            />
            <path
              d="M10 28 L30 28"
              className="stroke-white dark:stroke-black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Буква N */}
            <path
              d="M13 12 L13 28 M13 12 L20 28 M20 12 L20 28"
              className="stroke-white dark:stroke-black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Буква F */}
            <path
              d="M23 12 L30 12 M23 12 L23 28 M23 20 L28 20"
              className="stroke-white dark:stroke-black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Декоративная точка */}
            <circle
              cx="20"
              cy="8"
              r="1.5"
              className="fill-white dark:fill-black"
            />
          </svg>
        </motion.div>
      </NextLink>
    </div>
  );
};

export default Logo;