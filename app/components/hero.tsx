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
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
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
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Creating modern, responsive and accessible web applications using cutting-edge technologies.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Button asChild>
                <a href="#contact">
                  Contact Me
                </a>
              </Button>
              <div className="block lg:hidden">
                <HeroImageModal />
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] overflow-hidden rounded-full border-2 border-border">
              <Image
                src="/nikita_color.webp"
                alt="Hero image"
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 