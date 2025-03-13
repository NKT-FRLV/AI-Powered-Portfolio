"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { socialsLinks } from "../data";
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin, FaChevronUp } from 'react-icons/fa';

// Mapping string identifiers to icon components
const iconMap: Record<string, React.ElementType> = {
  'github': FaGithub,
  'instagram': FaInstagram,
  'telegram': FaTelegram,
  'linkedin': FaLinkedin,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t bg-[hsl(var(--muted))]/20">
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={scrollToTop}
          className="pointer-events-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-3 rounded-full shadow-lg"
          aria-label="Scroll to top"
        >
          <FaChevronUp size={20} />
        </motion.button>
      </div>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Nikita Frolov</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Frontend developer specializing in creating modern web applications using React, TypeScript, and Next.js.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Navigation</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#about" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                About Me
              </Link>
              <Link href="#education" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Education
              </Link>
              <Link href="#skills" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Skills
              </Link>
              <Link href="#projects" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Projects
              </Link>
              <Link href="#languages" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Languages
              </Link>
              <Link href="#contact" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Contact
              </Link>
            </nav>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Social Media</h3>
            <div className="flex space-x-4">
              {socialsLinks.map((social) => {
                const IconComponent = iconMap[social.icon] || FaGithub;
                
                return (
                  <a 
                    key={social.id} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                    aria-label={social.id}
                  >
                    <IconComponent size={25} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© {currentYear} Nikita Frolov. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 