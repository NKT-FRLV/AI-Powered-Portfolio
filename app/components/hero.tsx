"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedLetters from "@/app/components/animated-letters";
import { useAnimatedLetters } from "@/app/hooks/useAnimatedLetters";
import { HeroImageModal } from "@/app/components/hero-image-modal";
import { Button } from "@/app/components/ui/button";

export default function Hero() {
  const { letterClass } = useAnimatedLetters({
    triggerOnLoad: true,
    animationDuration: 2500,
  });

  // Текстовые массивы для анимации
  const hi = "Hi,".split('');
  const nameArray = "I'm <Nikita>".split('');
  const frontend = "Frontend Developer".split('');
  const fullText = "React • Network • UX/UI".split('');
  const aiIntegration = "AI Integrator".split('');

  // Находим индексы для имени и скобок в строке "I'm <Nikita>"
  const leftBracketIndex = nameArray.findIndex(char => char === '<');
  const rightBracketIndex = nameArray.findIndex(char => char === '>');
  const nameStartIndex = leftBracketIndex + 1;
  const nameEndIndex = rightBracketIndex - 1;

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Фоновое изображение для больших экранов */}
      <div className="absolute right-0 top-0 h-full hidden lg:flex items-center justify-end">
        <div className="relative h-full">
          <Image
            src="/nikita_color.webp"
            alt="Hero image"
            className="h-full w-auto object-contain opacity-60 dark:opacity-40"
            width={1000}
            height={1500}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-background/10"></div>
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-2 sm:space-y-4"
          >
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-base font-bold tracking-tighter xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl">
                <AnimatedLetters letterClass={letterClass} strArray={hi} idx={1} />
                <br/>
                <span className="block">
                  <AnimatedLetters 
                    letterClass={letterClass} 
                    strArray={nameArray} 
                    idx={1} 
                    bracketClass="bracket-class" 
                    nameClass="name-class"
                    nameStart={nameStartIndex}
                    nameEnd={nameEndIndex}
                  />
                </span>
                <br/>
                <AnimatedLetters letterClass={letterClass} strArray={frontend} idx={1} />
                <br/>
                <AnimatedLetters letterClass={letterClass} strArray={fullText} idx={1} />
                <br/>
                <AnimatedLetters letterClass={letterClass} strArray={aiIntegration} idx={1} />
              </h1>
              <p className="max-w-[600px] text-xs text-muted-foreground xs:text-sm sm:text-base md:text-lg lg:text-xl">
                Creating modern, responsive and accessible web applications using cutting-edge technologies.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-2 mt-8 xs:mt-10 sm:mt-4 min-[400px]:flex-row"
            >
              <Button 
                size="sm" 
                className="text-xs h-8 px-4 w-fit sm:text-sm md:text-base md:h-10 md:px-4 lg:h-11 lg:px-6 font-bold" 
                asChild
              >
                <a href="#contact">
                  Contact Me
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