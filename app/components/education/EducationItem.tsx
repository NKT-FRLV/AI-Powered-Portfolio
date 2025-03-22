"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaGraduationCap, FaSwimmer, FaChevronDown } from 'react-icons/fa';
import dynamic from "next/dynamic";

const EducationExtraInfo = dynamic(() => import("./EducationExtraInfo"), {
  ssr: false, // Компонент не нужен при SSR
  loading: () => null,
});

// Mapping string identifiers to icon components
const logoMap: Record<string, React.ElementType> = {
  'university': FaUniversity,
  'graduation-cap': FaGraduationCap,
  'swimmer': FaSwimmer,
};

// Интерфейс для элемента образования
export interface EducationItemProps {
  edu: {
    title: string;
    profesion: string;
    date: string;
    content: string;
    logo: string;
    info?: string;
    documentationPath?: string;
    documentName?: string;
  };
  index: number;
  isOpen: Record<string, boolean>;
  setIsOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  openDocumentPreview: (path: string, name: string) => void;
}

// Компонент для отображения элемента образования
const EducationItem = ({ 
  edu, 
  index, 
  isOpen, 
  setIsOpen,
  openDocumentPreview 
}: EducationItemProps) => {
  const LogoComponent = logoMap[edu.logo] || FaUniversity;
  
  const [isPreloaded, setIsPreloaded] = useState(false);

  const handleDownloadLazyComponent = async () => {
    await import("./EducationExtraInfo")
    setIsPreloaded(true); // Подготовка компонента к моментальному рендеру
  };

  return (
    <motion.div 
      key={edu.title}
      onMouseEnter={handleDownloadLazyComponent}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.21, 0.45, 0.32, 0.9]
      }}
      className="group relative overflow-hidden rounded-lg border bg-[hsl(var(--background))] p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--muted))]">
          <LogoComponent className="h-8 w-8 text-[hsl(var(--foreground))]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{edu.title}</h3>
          <p className="text-[hsl(var(--muted-foreground))] font-black text-xl">{edu.profesion}</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] font-black text-xl">{edu.date}</p>
          <p className="text-[hsl(var(--muted-foreground))]">{edu.content}</p>
          <div className="group cursor-pointer pt-2">
            {edu.info && (
              <>
                <motion.div
                  className="relative inline-flex items-center font-medium text-[hsl(var(--primary))] py-1 px-2 rounded-md hover:bg-[hsl(var(--primary))]/10 transition-colors"
                  onClick={() => setIsOpen(prev => ({ ...prev, [edu.title]: !prev[edu.title] }))}
                  initial={false}
                  whileHover="hover"
                >
                  <span className="mr-1">Learn More</span>
                  <motion.span
                    className="ml-2"
                    animate={isOpen[edu.title] ? "open" : "closed"}
                    variants={{
                      closed: { rotate: 0 },
                      open: { rotate: 180 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="h-4 w-4" />
                  </motion.span>
                </motion.div>
                
                  { isPreloaded && (
                    <EducationExtraInfo 
                      isOpen={isOpen[edu.title]}
                      info={edu.info}
                      documentationPath={edu.documentationPath}
                      documentName={edu.documentName}
                      openDocumentPreview={openDocumentPreview}
                      title={edu.title}
                      style={{ display: isOpen[edu.title] ? "block" : "none" }}
                    />
                  )}

              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 

export default EducationItem;