"use client";

import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaGit } from 'react-icons/fa';
import { SiTypescript, SiThreedotjs, SiRedux, SiOpenai, SiVite, SiWebpack, SiJest, SiCypress } from 'react-icons/si';
import { IoSparkles } from 'react-icons/io5';

// Маппинг строковых идентификаторов на компоненты иконок
const iconMap: Record<string, React.ElementType> = {
  'html5': FaHtml5,
  'css3': FaCss3Alt,
  'js': FaJsSquare,
  'typescript': SiTypescript,
  'nodejs': FaNodeJs,
  'react': FaReact,
  'redux': SiRedux,
  'git': FaGit,
  'github': FaGithub,
  'threejs': SiThreedotjs,
  'openai': SiOpenai,
  'webpack': SiWebpack,
  'vite': SiVite,
  'jest': SiJest,
  'cypress': SiCypress,
  'sparkles': IoSparkles,
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
            <p className="mx-auto max-w-[700px] text-[hsl(var(--muted-foreground))] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My technical skills and competencies
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || IoSparkles;
            
            return (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-lg border bg-[hsl(var(--background))] p-6 shadow-md hover:shadow-lg"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--muted))]">
                    <IconComponent className="h-6 w-6 text-[hsl(var(--foreground))]" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-lg font-bold">{skill.name}</h3>
                    <div className="h-2 w-full rounded-full bg-[hsl(var(--muted))]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05 + 0.5 }}
                        className="h-full rounded-full bg-[hsl(var(--primary))]"
                      />
                    </div>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{skill.percent}%</p>
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