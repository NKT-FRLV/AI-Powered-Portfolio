"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUniversity, FaGraduationCap, FaSwimmer, FaFileAlt, FaChevronDown } from 'react-icons/fa';

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
export const EducationItem: React.FC<EducationItemProps> = ({ 
  edu, 
  index, 
  isOpen, 
  setIsOpen,
  openDocumentPreview 
}) => {
  const LogoComponent = logoMap[edu.logo] || FaUniversity;
  
  return (
    <motion.div 
      key={edu.title}
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
          <p className="text-[hsl(var(--muted-foreground))]">{edu.profesion}</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{edu.date}</p>
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
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-[hsl(var(--primary))] w-full origin-left"
                    variants={{
                      hover: { scaleX: 1 },
                      initial: { scaleX: 0 }
                    }}
                    initial="initial"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                  />
                </motion.div>
                <AnimatePresence initial={false}>
                  {isOpen[edu.title] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        opacity: { duration: 0.25 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 text-sm text-[hsl(var(--muted-foreground)] p-3 rounded-md bg-[hsl(var(--muted))]/30">
                        <p>{edu.info}</p>
                        {edu.documentationPath && (
                          <motion.button 
                            onClick={() => openDocumentPreview(edu.documentationPath!, edu.documentName!)}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 transition-colors"
                            aria-label={`View certificate for ${edu.title}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <FaFileAlt className="h-4 w-4" />
                            View Certificate
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 