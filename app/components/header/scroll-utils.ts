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
  console.log(`Scrolling to section: ${sectionId}`);
  
  // Предварительно загружаем компонент
  await preloadComponentForSection(sectionId);
  
  // Получаем элемент из нашего рефа или по ID
  const targetElement = sectionsRef.get(sectionId) || document.getElementById(sectionId);
  
  if (!targetElement) {
    console.error(`Section with id "${sectionId}" not found`);
    return;
  }
  
  console.log(`Found target element:`, targetElement);
  
  // Получаем текущую позицию прокрутки
  const currentScrollPosition = window.pageYOffset;
  console.log(`Current scroll position: ${currentScrollPosition}`);
  
  // Получаем позицию элемента относительно документа
  const elementRect = targetElement.getBoundingClientRect();
  console.log(`Element rect:`, elementRect);
  
  // Рассчитываем абсолютную позицию элемента
  const absoluteElementPosition = elementRect.top + window.pageYOffset;
  console.log(`Absolute element position: ${absoluteElementPosition}`);
  
  // Рассчитываем позицию с учетом высоты хедера (80px)
  const headerOffset = 80;
  const offsetPosition = absoluteElementPosition - headerOffset;
  
  console.log(`Target scroll position: ${offsetPosition}`);
  
  // Используем только один метод прокрутки
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}; 