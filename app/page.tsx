'use client';

import React, { Suspense, lazy, useEffect, useState } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import dynamic from "next/dynamic";
import { Skeleton } from "./components/ui/skeleton";

// Используем приоритеты загрузки для компонентов
// Компоненты, которые видны сразу при загрузке страницы, импортируем напрямую
// Компоненты, которые видны при первом скролле, загружаем с высоким приоритетом
const Education = lazy(() => import("./components/education"));
const Skills = lazy(() => import("./components/skills"));

// Компоненты, которые видны при дальнейшем скролле, загружаем с низким приоритетом
const Projects = lazy(() => import("./components/projects"));
const Languages = lazy(() => import("./components/languages"));
const ContactForm = lazy(() => import("./components/contact-form"));
const Footer = lazy(() => import("./components/footer"));

// AI Assistant загружаем с опцией ssr: false и с низким приоритетом
const AiAssistant = dynamic(() => import("./components/ai-assistant"), {
  ssr: false,
  loading: () => null
});


export default function Home() {
  // Используем состояние для отслеживания, загружены ли все компоненты
  const [isLoaded, setIsLoaded] = useState(false);
  // Используем состояние для отслеживания видимости секций
  const [visibleSections, setVisibleSections] = useState({
    education: false,
    skills: false,
    projects: false,
    languages: false,
    contact: false,
    footer: false
  });

  // Используем IntersectionObserver для отслеживания видимости секций
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            setVisibleSections(prev => ({
              ...prev,
              [sectionId]: true
            }));
          }
        }
      });
    }, observerOptions);

    // Даем время для рендеринга компонентов
    setTimeout(() => {
      // Наблюдаем за секциями
      const sections = document.querySelectorAll('section[id]');
      console.log('Observing sections:', Array.from(sections).map(section => section.id));
      
      sections.forEach(section => {
        sectionObserver.observe(section);
      });
    }, 500);

    return () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  // Используем useEffect для предварительной загрузки компонентов после монтирования
  useEffect(() => {
    // Функция для предварительной загрузки компонентов
    const preloadComponents = async () => {
      // Предварительно загружаем компоненты, но с низким приоритетом
      const promises = [
        import("./components/education"),
        import("./components/skills"),
        import("./components/projects"),
        import("./components/languages"),
        import("./components/contact-form"),
        import("./components/footer")
      ];

      // Используем Promise.all для ожидания загрузки всех компонентов
      await Promise.all(promises);
      setIsLoaded(true);
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

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[400px] max-w-5xl" />}>
        <Education />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[500px] max-w-5xl" />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[600px] max-w-5xl" />}>
        {(visibleSections.education || isLoaded) && <Projects />}
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[300px] max-w-5xl" />}>
        {(visibleSections.skills || isLoaded) && <Languages />}
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[450px] max-w-5xl" />}>
        {(visibleSections.projects || isLoaded) && <ContactForm />}
      </Suspense>
      
      <Suspense fallback={<Skeleton className="container mx-auto my-8 h-[200px] max-w-5xl" />}>
        {(visibleSections.languages || isLoaded) && <Footer />}
      </Suspense>
      
      {/* Загружаем AI Assistant только после загрузки основных компонентов */}
      {isLoaded && <AiAssistant />}
    </main>
  );
}
