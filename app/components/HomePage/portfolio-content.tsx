'use client';

import { Suspense, lazy, useEffect, useState, useCallback, useRef } from "react";
// import Header from "../header";
import Hero from "../hero";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import Header from "../header";
import About from "../about/about";
import Footer from "../footer";
import ScrollShivronButton from "../scroll-shivron/scroll-shivron-button";
// Используем приоритеты загрузки для компонентов
// Компоненты, которые видны сразу при загрузке страницы, импортируем напрямую
// Компоненты, которые видны при первом скролле, загружаем с высоким приоритетом
// const About = lazy(() => import("../about"));
const Education = lazy(() => import("../education/education"));
const Skills = lazy(() => import("../skills"));

// Компоненты, которые видны при дальнейшем скролле, загружаем с низким приоритетом
const Projects = lazy(() => import("../projects"));
const Languages = lazy(() => import("../languages"));
const ContactForm = lazy(() => import("../contact-form"));
// const Footer = lazy(() => import("../footer"));

// AI Assistant загружаем в отдельном чанке с ленивой загрузкой после рендеринга страницы
const AiAssistant = dynamic(() => import("../AI-Assistant/ai-assistant").then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => null,
  // Используем webpackChunkName для создания отдельного чанка
  // @ts-expect-error - Next.js dynamic import не поддерживает типизацию для webpackChunkName
  webpackChunkName: 'ai-assistant-chunk'
});

// Список секций для отслеживания
const sectionIds = ['about', 'education', 'skills', 'projects', 'languages', 'contact'];

// Функция для создания дебаунсера
const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const PortfolioContent = () => {
  // Используем состояние для отслеживания, загружены ли все компоненты
  const [isLoaded, setIsLoaded] = useState(false);
  // Состояние для отслеживания загрузки AI Assistant
  const [loadAiAssistant, setLoadAiAssistant] = useState(false);
  // Состояние для отслеживания активной секции
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Флаг для блокировки обновлений от обсервера после клика на ссылку
  const userScrollLock = useRef(false);
  const lockTimeout = useRef<NodeJS.Timeout | null>(null);

  // Функция для установки активной секции с дебаунсингом
  const debouncedSetActiveSection = debounce(
    (newSection: string | null) => {

      // Обновляем активную секцию только если нет блокировки
      if (!userScrollLock.current) {
        setActiveSection(newSection);
      }
    },
    500
  )

  // Используем useEffect для предварительной загрузки компонентов после монтирования
  useEffect(() => {
    // Функция для предварительной загрузки компонентов
    const preloadComponents = async () => {
      // Предварительно загружаем компоненты, но с низким приоритетом
      const promises = [
        // import("../about"),
        import("../education/education"),
        import("../skills"),
        import("../projects"),
        import("../languages"),
        import("../contact-form"),
      ];

      // Используем Promise.all для ожидания загрузки всех компонентов
      await Promise.all(promises);
      setIsLoaded(true);
      
      // После загрузки всех основных компонентов, разрешаем загрузку AI Assistant
      setLoadAiAssistant(true);
    };

    // Делаем функцию preloadComponents доступной глобально для использования в header.tsx
    if (typeof window !== 'undefined') {
      (window as any).preloadAllComponents = preloadComponents;
    }

    // Запускаем предварительную загрузку с задержкой, чтобы не блокировать основной рендеринг
    const timer = setTimeout(() => {
      preloadComponents();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Используем IntersectionObserver для отслеживания видимых секций
  useEffect(() => {
    // Only set up the observer when isLoaded is true AND after a small delay to ensure DOM rendering
    if (!isLoaded) return;
    
    // Add a small delay to ensure components are actually rendered in DOM
    const timer = setTimeout(() => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Секция с ID "${id}" не найдена в DOM`);
        }
      });
      
      const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -200px 0px',
        threshold: [0.1, 0.3, 0.5]
      };

      const observer = new IntersectionObserver((entries) => {
        // Не обновляем активную секцию, если установлена блокировка
        if (userScrollLock.current) return;
        
        // Фильтруем только видимые секции и сортируем по соотношению видимости
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        
        // Логируем видимые секции для отладки
        if (visibleSections.length > 0) {
          // console.log('Видимые секции:', visibleSections.map(section => section.target.id));
        }
        
        // Если есть видимые секции, устанавливаем первую как активную
        if (visibleSections.length > 0) {
          const newActiveSection = visibleSections[0].target.id;
          
          // Обновляем состояние с дебаунсингом, только если активная секция изменилась
          if (newActiveSection !== activeSection) {
            debouncedSetActiveSection(newActiveSection);
          }
        }
      }, observerOptions);

      // Observe sections that exist
      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          observer.observe(section);
        }
      });

      return () => observer.disconnect();
    }, 500); // 500ms delay to ensure DOM is updated
    
    return () => clearTimeout(timer);
  }, [isLoaded, activeSection, debouncedSetActiveSection]);

  // Обработчик перехода к секции
  const scrollToSection = useCallback((sectionId: string) => {
    // Блокируем обсервер на короткое время
    userScrollLock.current = true;
    
    // Очищаем предыдущий таймаут, если есть
    if (lockTimeout.current) {
      clearTimeout(lockTimeout.current);
    }
    
    // Устанавливаем активную секцию немедленно при клике
    setActiveSection(sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Разблокируем обсервер через 1.5 секунды
      // (время на завершение анимации прокрутки)
      lockTimeout.current = setTimeout(() => {
        userScrollLock.current = false;
      }, 1500);
    }
  }, []);

  const scrollToEdge = useCallback((direction: 'top' | 'bottom') => {
    // Блокируем обсервер на короткое время
    userScrollLock.current = true;
    
    // Очищаем предыдущий таймаут, если есть
    if (lockTimeout.current) {
      clearTimeout(lockTimeout.current);
    }
    
    // Устанавливаем активную секцию в зависимости от направления
    const targetSection = direction === 'top' ? sectionIds[0] : sectionIds[sectionIds.length - 1];
    setActiveSection(targetSection);
    
    // Выполняем скролл
    window.scrollTo({
      top: direction === 'top' ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
    
    // Разблокируем обсервер через 1.5 секунды
    lockTimeout.current = setTimeout(() => {
      userScrollLock.current = false;
    }, 1500);
  }, []);

  // Очищаем таймаут при размонтировании
  useEffect(() => {
    return () => {
      if (lockTimeout.current) {
        clearTimeout(lockTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <Header 
        activeSection={activeSection} 
        sectionsLoaded={isLoaded} 
        onSectionClick={scrollToSection}
      />
      <Hero />
      
      {/* Загружаем AI Assistant только после загрузки основных компонентов */}
      {loadAiAssistant && <AiAssistant />}

      <About />
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[400px] max-w-5xl" />}>
        { isLoaded && <Education />}
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[500px] max-w-5xl" />}>
        { isLoaded && <Skills />}
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[600px] max-w-5xl" />}>
        {isLoaded && <Projects />}
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[300px] max-w-5xl" />}>
        {isLoaded && <Languages />}
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[450px] max-w-5xl" />}>
        {isLoaded && <ContactForm />}
      </Suspense>

      <ScrollShivronButton isSectionsLoaded={isLoaded} scrollToEdge={scrollToEdge} />

      <Footer />
        
    </>
  );
}

export default PortfolioContent;