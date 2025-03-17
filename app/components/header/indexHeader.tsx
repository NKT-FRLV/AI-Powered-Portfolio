"use client";

import { useState, useEffect, memo, useRef, useCallback } from "react";
import dynamic from 'next/dynamic'
import { motion } from "framer-motion";
import Logo from "./logo";
import Navigation from "./navigation";
import Socials from "./socials";
import ScrollIndicator from "./scroll-indicator";
import { scrollToSection } from "./scroll-utils";
import BurgerButton from "./burger-button";
import MobileNavigation from "./mobile-navigation";


const ThemeToggle = dynamic(() => import('@/app/components/theme-toggle'), { ssr: false })

// Мемоизированный компонент Header для предотвращения ненужных ререндеров
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  
  // Используем IntersectionObserver для отслеживания видимых секций
  useEffect(() => {
    // Массив для хранения видимых секций и их соотношений видимости
    let visibleSections: { id: string; ratio: number }[] = [];
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -300px 0px', // Увеличиваем нижний отступ для лучшего определения
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Используем несколько порогов для более плавного перехода
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Обновляем массив видимых секций
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        
        console.log(`Section ${sectionId} intersection: ${entry.isIntersecting ? 'YES' : 'NO'}, ratio: ${entry.intersectionRatio.toFixed(2)}`);
        
        // Если секция входит в область видимости
        if (entry.isIntersecting) {
          // Добавляем или обновляем секцию в массиве видимых секций
          const existingIndex = visibleSections.findIndex(section => section.id === sectionId);
          if (existingIndex >= 0) {
            visibleSections[existingIndex].ratio = entry.intersectionRatio;
          } else {
            visibleSections.push({ id: sectionId, ratio: entry.intersectionRatio });
          }
        } else {
          // Удаляем секцию из массива видимых секций
          visibleSections = visibleSections.filter(section => section.id !== sectionId);
        }
      });
      
      console.log('Visible sections:', visibleSections.map(s => `${s.id} (${s.ratio.toFixed(2)})`).join(', '));
      
      // Если есть видимые секции, выбираем ту, которая имеет наибольшее соотношение видимости
      if (visibleSections.length > 0) {
        // Сортируем по соотношению видимости (от большего к меньшему)
        visibleSections.sort((a, b) => b.ratio - a.ratio);
        
        // Устанавливаем активную секцию
        const newActiveSection = visibleSections[0].id;
        if (newActiveSection !== activeSection) {
          console.log(`Setting active section: ${newActiveSection} (ratio: ${visibleSections[0].ratio.toFixed(2)})`);
          setActiveSection(newActiveSection);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Даем время для рендеринга компонентов
    setTimeout(() => {
      // Наблюдаем за всеми секциями
      const sections = document.querySelectorAll('section[id]');
      console.log('Observing sections:', Array.from(sections).map(section => section.id));
      
      // Очищаем и заполняем sectionsRef
      sectionsRef.current.clear();
      
      sections.forEach(section => {
        observer.observe(section);
        sectionsRef.current.set(section.id, section as HTMLElement);
      });
      
      console.log('Registered sections in sectionsRef:', Array.from(sectionsRef.current.keys()));
    }, 500);

    return () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, [activeSection]); // Добавляем activeSection в зависимости, чтобы обновлять наблюдатель при изменении активной секции

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

  // Обработчик клика по ссылке
  const handleLinkClick = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    console.log(`Link clicked for section: ${sectionId}`);
    
    // Если секция не найдена в рефе, попробуем найти ее по ID
    if (!sectionsRef.current.has(sectionId)) {
      const section = document.getElementById(sectionId);
      if (section) {
        console.log(`Adding section ${sectionId} to sectionsRef`);
        sectionsRef.current.set(sectionId, section);
      }
    }
    
    await scrollToSection(sectionId, sectionsRef.current);
  }, []);

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
        ref={headerRef}
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
      />
    </>
  );
}

// Экспортируем мемоизированный компонент
export default memo(Header); 