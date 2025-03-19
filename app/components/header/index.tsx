"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic'
import { motion } from "framer-motion";
import Logo from "./logo";
import Navigation from "./navigation";
import Socials from "./socials";
import ScrollIndicator from "./scroll-indicator";
import BurgerButton from "./burger-button";
import MobileNavigation from "./mobile-navigation";


const ThemeToggle = dynamic(() => import('@/app/components/header/theme-toggle'), { ssr: false })

// Интерфейс для свойств компонента Header
interface HeaderProps {
  activeSection: string | null;
  sectionsLoaded?: boolean;
  onSectionClick?: (sectionId: string) => void;
}

// Компонент Header с пропсами для управления активной секцией
const Header = ({ activeSection, sectionsLoaded = true, onSectionClick }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  // Закрываем мобильное меню при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Обработчик клика по ссылке навигации
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Проверяем, что секции загружены перед переходом
    if (!sectionsLoaded) {
      console.log('Sections not loaded yet, navigation disabled');
      return;
    }
    
    // Используем переданный обработчик клика, если доступен
    if (onSectionClick) {
      onSectionClick(sectionId);
      
      // Закрываем мобильное меню при клике на ссылку
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      return;
    }
    
    // Находим элемент секции по ID и прокручиваем к нему
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Закрываем мобильное меню при клике на ссылку
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  }, [sectionsLoaded, mobileMenuOpen, onSectionClick]);

  // Переключение состояния мобильного меню
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Закрытие мобильного меню
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm' 
            : 'bg-transparent shadow-none border-none'
        }`}
      >
        {/* Индикатор прокрутки */}
        <ScrollIndicator />
        
        <div className="container flex h-16 items-center justify-between">
          {/* Логотип */}
          <Logo />
          
          {/* Десктопная навигация */}
          <Navigation 
            activeSection={activeSection} 
            handleLinkClick={handleLinkClick} 
            sectionsLoaded={sectionsLoaded}
          />
          
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

            {/* Кнопка мобильного меню */}
            <BurgerButton isOpen={mobileMenuOpen} toggleMenu={toggleMobileMenu} />
          </motion.div>
        </div>
      </header>

      {/* Мобильная навигация */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        activeSection={activeSection} 
        handleLinkClick={handleLinkClick} 
        closeMobileMenu={closeMobileMenu}
        sectionsLoaded={sectionsLoaded}
      />
    </>
  );
}

// Экспортируем компонент
export default Header; 