"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

// Интерфейс для документа
export interface DocumentPreviewProps {

  document: {
    path: string;
    name: string;
  } | null;
  isLoading: boolean;
  onClose: () => void;
  setIsLoading: (loading: boolean) => void;
}

// Компонент для предпросмотра документа
 const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  document, 
  isLoading, 
  onClose,
  setIsLoading
}) => {
  if (!document) return null;

  return (
    <AnimatePresence>
      {document && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-4xl h-[80vh] bg-[hsl(var(--background))] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between align-center p-4 border-b">
              <h3 className="text-xs md:text-sm lg:text-lg font-semibold max-w-[60%] truncate">{document.name}</h3>
              <div className="flex items-center gap-2">
                <a 
                  href={document.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                  aria-label="Open in new tab"
                  title="Open in new tab"
                >
                  <FaExternalLinkAlt className="h-5 w-5" />
                </a>
                <a 
                  href={document.path} 
                  download
                  className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                  aria-label="Download document"
                  title="Download document"
                >
                  <FaDownload className="h-5 w-5" />
                </a>
                <button 
                  onClick={onClose}
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
                src={document.path} 
                className="w-full h-full border-0" 
                title={document.name}
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
                          <a href="${document.path}" target="_blank" style="color: hsl(var(--primary)); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Open in new tab
                          </a>
                          <a href="${document.path}" download style="color: hsl(var(--primary)); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px;">
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
  );
}; 

export default DocumentPreview;