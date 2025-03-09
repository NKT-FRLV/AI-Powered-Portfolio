"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Используем более простой подход с типизацией
type ThemeProviderProps = React.PropsWithChildren<{
  [key: string]: any;
}>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
} 