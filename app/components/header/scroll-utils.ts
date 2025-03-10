"use client";

// Функция для предварительной загрузки компонентов перед прокруткой
export const preloadComponentForSection = async (sectionId: string) => {
  switch (sectionId) {
    case 'education':
      await import("../../components/education");
      break;
    case 'skills':
      await import("../../components/skills");
      break;
    case 'projects':
      await import("../../components/projects");
      break;
    case 'languages':
      await import("../../components/languages");
      break;
    case 'contact':
      await import("../../components/contact-form");
      break;
    case 'footer':
      await import("../../components/footer");
      break;
    default:
      break;
  }
};

// Функция для плавной прокрутки к секции
export const scrollToSection = async (
  sectionId: string, 
  sectionsRef: Map<string, HTMLElement>
) => {
  // Предварительно загружаем все компоненты
  if (typeof window !== 'undefined' && (window as any).preloadAllComponents) {
    await (window as any).preloadAllComponents();
  } else {
    // Используем локальную функцию как запасной вариант
    await preloadComponentForSection(sectionId);
  }
  
  // Получаем элемент из нашего рефа
  const targetElement = sectionsRef.get(sectionId) || document.getElementById(sectionId);
  if (!targetElement) return;
  
  // Получаем позицию элемента
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = targetPosition - 80; // Учитываем высоту хедера
  
  // Используем framer-motion для анимированной прокрутки
  const start = window.scrollY;
  const change = offsetPosition - start;
  const duration = 800; // ms
  let startTime: number | null = null;
  
  function animateScroll(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    
    // Функция плавности (easeInOutCubic)
    const t = elapsed / duration;
    const easeT = t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    window.scrollTo(0, start + change * easeT);
    
    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }
  
  requestAnimationFrame(animateScroll);
}; 