'use client';

import React, { Suspense, lazy, useEffect, useState } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import dynamic from "next/dynamic";

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

// Компоненты-заглушки для отложенной загрузки с разными размерами
const ComponentSkeleton = ({ height = 400 }: { height?: number }) => (
  <div className="w-full py-12">
    <div style={{ height: `${height}px` }} className="w-full rounded-lg bg-muted/50 animate-pulse" />
  </div>
);

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
          setVisibleSections(prev => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }, observerOptions);

    // Наблюдаем за секциями
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
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

    // Запускаем предварительную загрузку с задержкой, чтобы не блокировать основной рендеринг
    const timer = setTimeout(() => {
      preloadComponents();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      
      <section id="education">
        <Suspense fallback={<ComponentSkeleton height={400} />}>
          <Education />
        </Suspense>
      </section>
      
      <section id="skills">
        <Suspense fallback={<ComponentSkeleton height={500} />}>
          <Skills />
        </Suspense>
      </section>
      
      <section id="projects">
        <Suspense fallback={<ComponentSkeleton height={600} />}>
          {visibleSections.education && <Projects />}
        </Suspense>
      </section>
      
      <section id="languages">
        <Suspense fallback={<ComponentSkeleton height={300} />}>
          {visibleSections.skills && <Languages />}
        </Suspense>
      </section>
      
      <section id="contact">
        <Suspense fallback={<ComponentSkeleton height={450} />}>
          {visibleSections.projects && <ContactForm />}
        </Suspense>
      </section>
      
      <section id="footer">
        <Suspense fallback={<ComponentSkeleton height={200} />}>
          {visibleSections.languages && <Footer />}
        </Suspense>
      </section>
      
      {/* Загружаем AI Assistant только после загрузки основных компонентов */}
      {isLoaded && <AiAssistant />}
    </main>
  );
}
