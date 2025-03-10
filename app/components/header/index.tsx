"use client";

import React, { useState, useEffect, memo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "../theme-toggle";
import Logo from "./logo";
import Navigation from "./navigation";
import Socials from "./socials";
import ScrollIndicator from "./scroll-indicator";
import { scrollToSection } from "./scroll-utils";

// Мемоизированный компонент Header для предотвращения ненужных ререндеров
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  
  // Используем IntersectionObserver для отслеживания видимых секций
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -20% 0px', // Учитываем высоту хедера
      threshold: 0.1
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Наблюдаем за всеми секциями
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
      sectionsRef.current.set(section.id, section as HTMLElement);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, []);

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

  // Обработчик клика по ссылке
  const handleLinkClick = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    await scrollToSection(sectionId, sectionsRef.current);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      {/* Индикатор прокрутки */}
      <ScrollIndicator />
      
      <div className="container flex h-16 items-center justify-between">
        {/* Логотип */}
        <Logo />
        
        {/* Навигация */}
        <Navigation activeSection={activeSection} handleLinkClick={handleLinkClick} />
        
        {/* Правая часть хедера */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* Социальные ссылки */}
          <Socials />
          
          {/* Переключатель темы */}
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  );
}

// Экспортируем мемоизированный компонент
export default memo(Header); 