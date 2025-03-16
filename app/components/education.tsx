"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { myEducation } from "../data";
import { FaUniversity, FaGraduationCap, FaSwimmer, FaFileAlt, FaTimes, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

// Mapping string identifiers to icon components
const logoMap: Record<string, React.ElementType> = {
  'university': FaUniversity,
  'graduation-cap': FaGraduationCap,
  'swimmer': FaSwimmer,
};

export default function Education() {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const [previewDoc, setPreviewDoc] = useState<{path: string, name: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Блокируем прокрутку страницы, когда открыто модальное окно
  useEffect(() => {
    if (previewDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewDoc]);

  const openDocumentPreview = (path: string, name: string) => {
    setIsLoading(true);
    // Добавляем префикс, если путь не начинается с /
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    setPreviewDoc({ path: fullPath, name });
  };

  const closeDocumentPreview = () => {
    setPreviewDoc(null);
    setIsLoading(false);
  };

  return (
    <section id="education" className="py-16 md:py-24 bg-[hsl(var(--muted))]/50">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
            <p className="mx-auto max-w-[700px] text-[hsl(var(--muted-foreground))] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My educational journey and professional training
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12">
          {myEducation.map((edu, index) => {
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
                className="group relative overflow-hidden rounded-lg border bg-[hsl(var(--background))] p-6 shadow-md hover:shadow-lg"
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
                            className="font-medium text-[hsl(var(--primary))] hover:underline"
                            onClick={() => setIsOpen(prev => ({ ...prev, [edu.title]: !prev[edu.title] }))}
                            initial={false}
                          >
                            Learn More
                          </motion.div>
                          <AnimatePresence initial={false}>
                            {isOpen[edu.title] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  opacity: { duration: 0.2 }
                                }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 text-sm text-[hsl(var(--muted-foreground)]">
                                  <p>{edu.info}</p>
                                  {edu.documentationPath && (
                                    <button 
                                      onClick={() => openDocumentPreview(edu.documentationPath, edu.documentName)}
                                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 transition-colors"
                                      aria-label={`View certificate for ${edu.title}`}
                                    >
                                      <FaFileAlt className="h-4 w-4" />
                                      View Certificate
                                    </button>
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
          })}
        </div>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={closeDocumentPreview}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-4xl h-[80vh] bg-[hsl(var(--background))] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold">{previewDoc.name}</h3>
                <div className="flex items-center gap-2">
                  <a 
                    href={previewDoc.path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                    aria-label="Open in new tab"
                    title="Open in new tab"
                  >
                    <FaExternalLinkAlt className="h-5 w-5" />
                  </a>
                  <a 
                    href={previewDoc.path} 
                    download
                    className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                    aria-label="Download document"
                    title="Download document"
                  >
                    <FaDownload className="h-5 w-5" />
                  </a>
                  <button 
                    onClick={closeDocumentPreview}
                    className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                    aria-label="Close preview"
                    title="Close preview"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="h-[calc(100%-4rem)] w-full bg-[hsl(var(--muted))]">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--muted))]/50">
                    <div className="w-12 h-12 border-4 border-[hsl(var(--primary))]/20 border-t-[hsl(var(--primary))] rounded-full animate-spin"></div>
                  </div>
                )}
                <iframe 
                  src={previewDoc.path} 
                  className="w-full h-full border-0" 
                  title={previewDoc.name}
                  onLoad={() => setIsLoading(false)}
                  onError={(e) => {
                    setIsLoading(false);
                    // Если iframe не загрузился, показываем сообщение об ошибке
                    const target = e.target as HTMLIFrameElement;
                    if (target.contentDocument) {
                      target.contentDocument.body.innerHTML = `
                        <div style="display: flex; height: 100%; align-items: center; justify-content: center; flex-direction: column; color: #666; font-family: system-ui, sans-serif;">
                          <p style="font-size: 18px; margin-bottom: 16px;">Failed to load document</p>
                          <div style="display: flex; gap: 16px;">
                            <a href="${previewDoc.path}" target="_blank" style="color: hsl(var(--primary)); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                              Open in new tab
                            </a>
                            <a href="${previewDoc.path}" download style="color: hsl(var(--primary)); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                              Download document
                            </a>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 