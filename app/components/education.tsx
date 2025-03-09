"use client";

import React from "react";
import { motion } from "framer-motion";
import { myEducation } from "../data";
import { FaUniversity, FaGraduationCap, FaSwimmer } from 'react-icons/fa';

// Mapping string identifiers to icon components
const logoMap: Record<string, React.ElementType> = {
  'university': FaUniversity,
  'graduation-cap': FaGraduationCap,
  'swimmer': FaSwimmer,
};

export default function Education() {
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
                    <details className="group cursor-pointer pt-2">
                      <summary className="font-medium text-[hsl(var(--primary))] hover:underline">
                        Learn More
                      </summary>
                      <div className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                        <p>{edu.info}</p>
                        {edu.documentationPath && (
                          <a 
                            href={edu.documentationPath} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center text-[hsl(var(--primary))] hover:underline"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    </details>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 