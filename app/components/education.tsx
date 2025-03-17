"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { myEducation } from "../data";
import { EducationHeader } from "./education/EducationHeader";
import { EducationItem } from "./education/EducationItem";
import { DocumentPreview } from "./education/DocumentPreview";

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
        <EducationHeader />
        <div className="mx-auto grid max-w-5xl gap-8 py-12">
          {myEducation.map((edu, index) => (
            <EducationItem 
              key={edu.title}
              edu={edu}
              index={index}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              openDocumentPreview={openDocumentPreview}
            />
          ))}
        </div>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <DocumentPreview 
            document={previewDoc}
            isLoading={isLoading}
            onClose={closeDocumentPreview}
            setIsLoading={setIsLoading}
          />
        )}
      </AnimatePresence>
    </section>
  );
} 