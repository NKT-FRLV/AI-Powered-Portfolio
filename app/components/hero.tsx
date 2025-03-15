"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedLetters from "@/app/components/animated-letters";
import { useAnimatedLetters } from "@/app/hooks/useAnimatedLetters";
import { HeroImageModal } from "@/app/components/hero-image-modal";
import { Button } from "@/app/components/ui/button";
import { TypewriterText } from "@/app/components/TypewriterText";

export default function Hero() {
  const { letterClass } = useAnimatedLetters({
    triggerOnLoad: true,
    animationDuration: 2500,
  });

  const [showDescription, setShowDescription] = useState(false);


  // Show description after name animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescription(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Текстовые массивы для анимации
  const hi = "Hi,".split('');
  const nameArray = "I'm <Nikita>".split('');
  const frontend = "Web Developer".split('');
  const fullText = "React • Network • UX/UI".split('');
  const aiIntegration = "AI Integrator".split('');

  // Находим индексы для имени и скобок в строке "I'm <Nikita>"
  const leftBracketIndex = nameArray.findIndex(char => char === '<');
  const rightBracketIndex = nameArray.findIndex(char => char === '>');
  const nameStartIndex = leftBracketIndex + 1;
  const nameEndIndex = rightBracketIndex - 1;

  // Добавляем классы для анимации при наведении
  const nameHoverClass = "hover:text-primary transition-colors duration-300";
  const frontendHoverClass = "hover:text-primary transition-colors duration-300";
  
  // Добавляем классы для тени текста
  const textShadowClass = "drop-shadow-sm";
  const nameTextShadowClass = "drop-shadow-md";

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Shadow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl light:bg-black"></div>
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl light:bg-black"></div>
      </div>

      {/* Фоновое изображение для больших экранов */}
      <div className="absolute right-0 top-0 h-full hidden lg:flex items-center justify-end">
        <motion.div 
          className="relative h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Image
            src="/nikita_color.webp"
            alt="Hero image"
            className="h-full w-auto object-contain opacity-60 dark:opacity-40 transition-opacity duration-500"
            width={1000}
            height={1500}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-background/10"></div>
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-2 sm:space-y-4"
          >
            <div className="space-y-2 xs:space-y-4 sm:space-y-6 md:space-y-8">
              <h1 className="font-bold tracking-tighter flex flex-col gap-2 xs:gap-3 sm:gap-5 md:gap-6">
                <AnimatedLetters 
                  letterClass={`${letterClass} text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-muted-foreground`} 
                  strArray={hi} 
                  idx={1} 
                />
                
                <span className="block relative">
                  <AnimatedLetters 
                    letterClass={`${letterClass} text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${nameTextShadowClass}`} 
                    strArray={nameArray} 
                    idx={1} 
                    bracketClass="bracket-class text-primary/70" 
                    nameClass={`name-class font-extrabold ${nameHoverClass} text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-foreground`}
                    nameStart={nameStartIndex}
                    nameEnd={nameEndIndex}
                  />
                </span>
                
                <AnimatedLetters 
                  letterClass={`${letterClass} text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${frontendHoverClass} ${textShadowClass}`} 
                  strArray={frontend} 
                  idx={1} 
                />
                
                <div className="mt-2 opacity-80 flex flex-col gap-2 xs:gap-3 sm:gap-4">
                  <AnimatedLetters 
                    letterClass={`${letterClass} text-base xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-muted-foreground/80`} 
                    strArray={fullText} 
                    idx={1} 
                  />
                  <AnimatedLetters 
                    letterClass={`${letterClass} text-base xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold`} 
                    strArray={aiIntegration} 
                    idx={1} 
                  />
                </div>
              </h1>
              <div className="h-[60px] sm:h-[80px] flex items-center">
                {showDescription && (
                  <TypewriterText 
                    text="Creating modern, responsive and accessible web applications using cutting-edge technologies."
                    speed={30}
                    className="max-w-[600px] text-xs text-muted-foreground xs:text-sm sm:text-base md:text-lg lg:text-xl"
                  />
                )}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3 mt-8 xs:mt-10 sm:mt-4 min-[400px]:flex-row"
            >
              <Button 
                size="sm" 
                className="text-xs h-8 px-4 w-fit sm:text-sm md:text-base md:h-10 md:px-4 lg:h-11 lg:px-6 font-bold relative overflow-hidden group animate-button-glow" 
                asChild
              >
                <a href="#contact" className="relative z-10">
                  <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-300">Contact Me</span>
                  <span className="absolute inset-0 bg-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </a>
              </Button>
              <div className="block lg:hidden w-fit">
                <HeroImageModal />
              </div>
            </motion.div>
          </motion.div>
          {/* Пустой div для сохранения сетки на больших экранах */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
} 