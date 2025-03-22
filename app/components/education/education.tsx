"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { myEducation } from "../../data";
import { EducationHeader } from "./EducationHeader";
import EducationItem from "./EducationItem";
// import { DocumentPreview } from "./DocumentPreview";

const DocumentPreview = dynamic(() => import("./DocumentPreview"), {
  ssr: false,
  loading: () => null,
});

const Education = () => {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const [previewDoc, setPreviewDoc] = useState<{path: string, name: string} | null>(null);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);
  const [isPreviewPreloaded, setIsPreviewPreloaded] = useState(false);

  const handleDownloadLazyComponent = async () => {
    await import("./DocumentPreview")
    setIsPreviewPreloaded(true);
  };




  const openDocumentPreview = (path: string, name: string) => {
    setIsLoadingDocument(true);
    // Добавляем префикс, если путь не начинается с /
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    setPreviewDoc({ path: fullPath, name });
  };

  const closeDocumentPreview = () => {
    setPreviewDoc(null);
    setIsLoadingDocument(false);
  };

  return (
    <section id="education" className="py-16 md:py-24 bg-[hsl(var(--muted))]/50">
      <div className="container px-4 md:px-6">
        <EducationHeader />
        <div
         className="mx-auto grid max-w-5xl gap-8 py-12"
         onMouseEnter={handleDownloadLazyComponent}
         >
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
        {isPreviewPreloaded && (
          <DocumentPreview 
            document={previewDoc}
            isLoading={isLoadingDocument}
            onClose={closeDocumentPreview}
            setIsLoading={setIsLoadingDocument}
        />
      )}
    </section>
  );
} 

export default Education;