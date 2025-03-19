"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My latest works and projects
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border bg-background shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col h-[calc(100%-15rem)]">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tecnologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between">
                    <a
                      href={project.urlDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Demo
                    </a>
                    <a
                      href={project.urlGitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 