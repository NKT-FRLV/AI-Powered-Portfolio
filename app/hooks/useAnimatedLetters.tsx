"use client";

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseAnimatedLettersProps {
  threshold?: number;
  animationDuration?: number;
  triggerOnLoad?: boolean;
}

export const useAnimatedLetters = ({
  threshold = 0.6,
  animationDuration = 1700,
  triggerOnLoad = false,
}: UseAnimatedLettersProps) => {
  const [letterClass, setLetterClass] = useState(triggerOnLoad ? 'text-animate' : '');

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Если анимация должна начаться при загрузке или при попадании в область видимости
    if (triggerOnLoad || inView) {
      if (!triggerOnLoad) setLetterClass('text-animate');

      timer = setTimeout(() => {
        setLetterClass('text-animate-hover');
      }, animationDuration);
    }

    return () => clearTimeout(timer);
  }, [inView, triggerOnLoad, animationDuration]);

  return { 
    animationContainerRef: triggerOnLoad ? null : ref, 
    letterClass, 
    isInView: triggerOnLoad ? null : inView 
  };
}; 