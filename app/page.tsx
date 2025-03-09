'use client';

import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Education from "./components/education";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Languages from "./components/languages";
import ContactForm from "./components/contact-form";
import Footer from "./components/footer";
import AiAssistant from "./components/ai-assistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Languages />
      <ContactForm />
      <Footer />
      <AiAssistant />
    </main>
  );
}
