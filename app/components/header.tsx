"use client";

import React from "react";
import NextLink from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { socialsLinks } from "../data";
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { Link } from "@/app/components/ui/link";
import { Button } from "@/app/components/ui/button";

// Маппинг строковых идентификаторов на компоненты иконок
const iconMap: Record<string, React.ElementType> = {
  'github': FaGithub,
  'instagram': FaInstagram,
  'telegram': FaTelegram,
  'linkedin': FaLinkedin,
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mr-4 flex"
        >
          <NextLink href="/" className="flex items-center space-x-2">
            <Image 
              src="/nf-logo.svg" 
              alt="Nikita's Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
          </NextLink>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-6 text-sm"
        >
          <Link href="#about">
            About Me  
          </Link>
          <Link href="#education">
            Education
          </Link>
          <Link href="#skills">
            Skills
          </Link>
          <Link href="#projects">
            Projects
          </Link>
          <Link href="#languages">
            Languages
          </Link>
          <Link href="#contact">
            Contact
          </Link>
        </motion.nav>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:flex items-center gap-4">
            {socialsLinks.map((social) => {
              const IconComponent = iconMap[social.icon] || FaGithub;
              
              return (
                <Button 
                  key={social.id} 
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <a 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <IconComponent size={25} />
                  </a>
                </Button>
              );
            })}
          </div>
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  );
} 