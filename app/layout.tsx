import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const exo2 = localFont({
  src: "./fonts/Exo2-VariableFont_wght.ttf",
  variable: "--font-exo2",
  display: "swap",
  preload: true,
});

const orbitron = localFont({
  src: "./fonts/Orbitron-VariableFont_wght.ttf",
  variable: "--font-orbitron",
  display: "swap",
  preload: true,
});

const rubikMonoOne = localFont({
  src: "./fonts/RubikMonoOne-Regular.ttf",
  variable: "--font-rubik",
  display: "swap",
  preload: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
};

export const metadata: Metadata = {
  title: "Nikita Frolov — Frontend Developer",
  description: "Portfolio of Nikita Frolov — frontend developer specializing in React, UI, UX and AI integration",
  keywords: "frontend, developer, React, UI, UX, AI, portfolio, Nikita Frolov",
  metadataBase: new URL("https://nikitafrolov.dev"),
  openGraph: {
    title: "Nikita Frolov — Frontend Developer",
    description: "Portfolio of Nikita Frolov — frontend developer specializing in React, UI, UX and AI integration",
    url: "https://nikitafrolov.dev",
    siteName: "Nikita Frolov Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/nf-logo.svg",
        width: 40,
        height: 40,
        alt: "Nikita Frolov Logo",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/nf-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/nf-logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: [
      {
        url: "/nf-logo.svg",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Nikita Frolov — Frontend Developer",
    description: "Portfolio of Nikita Frolov — frontend developer specializing in React, UI, UX and AI integration",
    images: ["/nf-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/nf-logo.svg" as="image" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        
        <link
          rel="icon"
          href="/nf-logo.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/nf-logo-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${exo2.variable} ${orbitron.variable} ${rubikMonoOne.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
