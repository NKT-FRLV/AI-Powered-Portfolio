"use client";

import React from "react";
import { motion } from "framer-motion";
import { languages } from "../data";
import Flags from 'react-world-flags';

export default function Languages() {
  return (
    <section id="languages" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Languages I speak</h2>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
          {languages.map((language, index) => (
            <motion.div 
              key={language.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border bg-[hsl(var(--background))] p-6 shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[hsl(var(--border))]">
                  <Flags code={language.code} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{language.name}</h3>
                  <div className="h-2 w-full rounded-full bg-[hsl(var(--muted))]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className="h-full rounded-full bg-[hsl(var(--primary))]"
                    />
                  </div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {language.percent >= 90 && "Fluently"}
                    {language.percent >= 70 && language.percent < 90 && "Advanced"}
                    {language.percent >= 50 && language.percent < 70 && "Average"}
                    {language.percent < 50 && "Basic"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 