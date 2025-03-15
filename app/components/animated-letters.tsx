"use client";

import React, { useRef } from "react";


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
  nameEnd,
}: AnimatedLettersProps) => {
  // Используем useRef вместо useState для отслеживания состояния анимации
  // Это позволит избежать лишних ререндеров
  const animatedLettersRef = useRef<{[key: string]: boolean}>({});
  const animatingRef = useRef<{[key: string]: boolean}>({});

  // Функция для обработки наведения на букву
  const handleMouseEnter = (letterKey: string) => {
    // Отмечаем, что на букву навели курсор
    animatedLettersRef.current[letterKey] = true;
  };

  // Функция для обработки ухода курсора с буквы
  const handleMouseLeave = (letterKey: string) => {
    // Проверяем, что буква была наведена и сейчас не анимируется
    if (animatedLettersRef.current[letterKey] && !animatingRef.current[letterKey]) {
      // Отмечаем, что буква сейчас анимируется
      animatingRef.current[letterKey] = true;
      
      // Добавляем класс для анимации
      const element = document.getElementById(letterKey);
      if (element) {
        element.classList.add('animate-rubber');
        
        // Удаляем класс после завершения анимации
        setTimeout(() => {
          if (element) {
            element.classList.remove('animate-rubber');
            // Сбрасываем флаг анимации
            animatingRef.current[letterKey] = false;
          }
        }, 800); // Время анимации rubberBand
      }
    }
  };

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
        
        // Уникальный ключ для буквы
        const letterKey = `letter-${char}-${i}-${idx}`;
        
        return (
          <span
            id={letterKey}
            key={letterKey}
            className={charClasses}
            style={{
              // Используем CSS переменную для индекса буквы
              '--letter-index': i + idx,
              display: 'inline-block',
            } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(letterKey)}
            onMouseLeave={() => handleMouseLeave(letterKey)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};

export default AnimatedLetters; 