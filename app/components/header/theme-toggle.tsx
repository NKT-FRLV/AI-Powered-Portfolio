"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeTransitionWithAnimation } from "@/components/ui/shadcn-io/theme-toggle-button";
import { useEffect, useState, useCallback } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransitionWithAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Используем эффект переключения темы с circle-blur анимацией
    startTransition(
      () => setTheme(newTheme),
      'circle-blur',
      'top-right',
      undefined,
      theme as 'light' | 'dark'
    );
  }, [theme, setTheme, startTransition]);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="flex p-2 [&_svg]:size-6 md:[&_svg]:size-8 items-center justify-center rounded-full glass hover:bg-transparent"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 10 }}
          >
            <SunIcon className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 10 }}
          >
            <MoonIcon className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;