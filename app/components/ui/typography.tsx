"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'blockquote' | 'code' | 'lead' | 'large' | 'small' | 'muted';
  font?: 'rubik-mono' | 'orbitron' | 'geist-sans' | 'geist-mono';
  children: React.ReactNode;
  className?: string;
}

export function Typography({ 
  variant = 'p', 
  font = 'geist-sans',
  children, 
  className,
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  const fontClass = `font-${font}`;
  
  const variants = {
    h1: <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", fontClass, className)} {...props}>{children}</h1>,
    h2: <h2 className={cn("scroll-m-20 text-3xl font-semibold tracking-tight", fontClass, className)} {...props}>{children}</h2>,
    h3: <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", fontClass, className)} {...props}>{children}</h3>,
    h4: <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", fontClass, className)} {...props}>{children}</h4>,
    h5: <h5 className={cn("scroll-m-20 text-lg font-semibold tracking-tight", fontClass, className)} {...props}>{children}</h5>,
    h6: <h6 className={cn("scroll-m-20 text-base font-semibold tracking-tight", fontClass, className)} {...props}>{children}</h6>,
    p: <p className={cn("leading-7", fontClass, className)} {...props}>{children}</p>,
    blockquote: <blockquote className={cn("mt-6 border-l-2 pl-6 italic", fontClass, className)} {...props}>{children}</blockquote>,
    code: <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", fontClass, className)} {...props}>{children}</code>,
    lead: <p className={cn("text-xl text-muted-foreground", fontClass, className)} {...props}>{children}</p>,
    large: <div className={cn("text-lg font-semibold", fontClass, className)} {...props}>{children}</div>,
    small: <small className={cn("text-sm font-medium leading-none", fontClass, className)} {...props}>{children}</small>,
    muted: <p className={cn("text-sm text-muted-foreground", fontClass, className)} {...props}>{children}</p>,
  };

  return variants[variant];
}

export function FontShowcase() {
  return (
    <div className="space-y-8 p-6 bg-background rounded-lg shadow-sm">
      <div className="space-y-2">
        <Typography variant="h2">Font Showcase</Typography>
        <Typography variant="lead">Examples of all available fonts in the application</Typography>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Typography variant="h3" font="rubik-mono">Rubik Mono One</Typography>
          <Typography font="rubik-mono">
            This is Rubik Mono One font. It's used for headings and animated text.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            abcdefghijklmnopqrstuvwxyz
            0123456789
          </Typography>
        </div>
        
        <div className="space-y-2">
          <Typography variant="h3" font="orbitron">Orbitron</Typography>
          <Typography font="orbitron">
            This is Orbitron font. It's used for text blocks and input fields.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            abcdefghijklmnopqrstuvwxyz
            0123456789
          </Typography>
        </div>
        
        <div className="space-y-2">
          <Typography variant="h3" font="geist-sans">Geist Sans</Typography>
          <Typography font="geist-sans">
            This is Geist Sans font. It's used for chat messages and general text.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            abcdefghijklmnopqrstuvwxyz
            0123456789
          </Typography>
        </div>
        
        <div className="space-y-2">
          <Typography variant="h3" font="geist-mono">Geist Mono</Typography>
          <Typography font="geist-mono">
            This is Geist Mono font. It's used for code blocks and technical content.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            abcdefghijklmnopqrstuvwxyz
            0123456789
          </Typography>
        </div>
      </div>
    </div>
  );
} 