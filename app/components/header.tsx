"use client";

import React, { useState, useEffect, memo } from "react";
import NextLink from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { socialsLinks } from "../data";
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { Link } from "@/app/components/ui/link";
import { Button } from "@/app/components/ui/button";

// Маппинг строковых идентификаторов на компоненты иконок
const iconMap: Record<string, React.ElementType> = {
  'github': FaGithub,
  'instagram': FaInstagram,
  'telegram': FaTelegram,
  'linkedin': FaLinkedin,
};

// Мемоизированный компонент SocialButton для предотвращения ненужных ререндеров
const SocialButton = memo(({ social }: { social: { id: string, icon: string, link: string } }) => {
  const IconComponent = iconMap[social.icon] || FaGithub;
  
  return (
    <Button 
      key={social.id} 
      asChild
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground"
    >
      <a 
        href={social.link} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <IconComponent size={25} />
      </a>
    </Button>
  );
});

SocialButton.displayName = 'SocialButton';

// Мемоизированный компонент Header для предотвращения ненужных ререндеров
function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Добавляем обработчик прокрутки для отслеживания положения страницы
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Добавляем слушатель события прокрутки с опцией passive для улучшения производительности
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Вызываем обработчик сразу для установки начального состояния
    handleScroll();

    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mr-4 flex"
        >
          <NextLink href="/" className="flex items-center space-x-2">
            <Image 
              src="/nf-logo.svg" 
              alt="Nikita's Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
              priority // Добавляем приоритет для загрузки логотипа
            />
          </NextLink>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-6 text-sm"
        >
          <Link href="#about">
            About Me  
          </Link>
          <Link href="#education">
            Education
          </Link>
          <Link href="#skills">
            Skills
          </Link>
          <Link href="#projects">
            Projects
          </Link>
          <Link href="#languages">
            Languages
          </Link>
          <Link href="#contact">
            Contact
          </Link>
        </motion.nav>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:flex items-center gap-4">
            {socialsLinks.map((social) => (
              <SocialButton key={social.id} social={social} />
            ))}
          </div>
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  );
}

// Экспортируем мемоизированный компонент
export default memo(Header); 