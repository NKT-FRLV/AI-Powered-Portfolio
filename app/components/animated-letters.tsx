"use client";

import React from "react";


interface AnimatedLettersProps {
  letterClass: string;
  strArray: string[];
  idx: number;
  bracketClass?: string;
  nameClass?: string;
  nameStart?: number;
  nameEnd?: number;
}

const AnimatedLetters = ({ 
  letterClass, 
  strArray, 
  idx, 
  bracketClass = '', 
  nameClass = '',
  nameStart,
  nameEnd
}: AnimatedLettersProps) => {
  return (
    <span className="whitespace-nowrap">
      {strArray.map((char, i) => {
        // Определяем, является ли символ скобкой
        const isBracket = char === '<' || char === '>';
        
        // Определяем, является ли символ частью имени
        const isNamePart = nameStart !== undefined && 
                          nameEnd !== undefined && 
                          i >= nameStart && 
                          i <= nameEnd;
        
        // Формируем классы для символа
        let charClasses = letterClass;
        if (isBracket && bracketClass) charClasses += ` ${bracketClass}`;
        if (isNamePart && nameClass) charClasses += ` ${nameClass}`;
        
        return (
          <span
            key={`${char}-${i}`}
            className={charClasses}
            style={{
              // Используем CSS переменную для индекса буквы
              '--letter-index': i + idx,
              display: 'inline-block',
            } as React.CSSProperties}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};

export default AnimatedLetters; 