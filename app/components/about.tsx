'use client'

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const About = () => {
  // Define interests with their descriptions
  const interests = [
    { 
      name: "Ethical Coding", 
      description: "Committed to developing software with ethical considerations",
      bgClass: "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-800/40"
    },
    { 
      name: "Design Thinking", 
      description: "Using human-centered approach to solve complex problems",
      bgClass: "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40"
    },
    { 
      name: "Diving", 
      description: "Love exploring underwater worlds",
      bgClass: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40"
    },
    { 
      name: "Traveling", 
      description: "Discovering new places and cultures",
      bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
    },
    { 
      name: "Languages", 
      description: "Passionate about learning new languages",
      bgClass: "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40"
    },
    { 
      name: "Learning", 
      description: "Continuous knowledge seeker",
      bgClass: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40"
    }
  ];

  // Define tech stack with descriptions
  const techStack = [
    { 
      name: "Layout", 
      description: "HTML / CSS / TailwindCSS",
      bgClass: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40"
    },
    { 
      name: "JavaScript", 
      description: "Vanilla JS / ReactJS / NextJS / NodeJS",
      bgClass: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40"
    },
    {
      name: "Dev Tools",
      description: "I can use DevTools to debug and optimize my code",
      bgClass: "bg-gray-200/80 hover:bg-gray-400/90 dark:bg-gray-800/30 dark:hover:bg-gray-600/40"
    },
    { 
      name: "React", 
      description: "Building interactive UIs with components",
      bgClass: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40"
    },
    { 
      name: "TypeScript", 
      description: "Type-safe JavaScript for robust applications",
      bgClass: "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40"
    },
    { 
      name: "NextJS", 
      description: "React framework for production-grade applications",
      bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
    },
    { 
      name: "Redux", 
      description: "State management for complex applications",
      bgClass: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40"
    },
    { 
      name: "AI", 
      description: "Integrating AI-powered features into web applications",
      bgClass: "bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-800/40"
    },
    { 
      name: "Vector Databases", 
      description: "Working with vector embeddings for semantic search",
      bgClass: "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/40"
    },
    { 
      name: "MCP", 
      description: "Managing cloud processing infrastructure",
      bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
    },
    { 
      name: "MongoDB", 
      description: "Document-based database for flexible schemas",
      bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
    },
    { 
      name: "ThreeJS", 
      description: "Creating 3D visualizations for the web",
      bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
    },
    { 
      name: "Testing", 
      description: "Ensuring code quality through automated testing with Jest and Cypress",
      bgClass: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I'm a frontend developer with experience in creating modern web applications. My passion is to create intuitive and responsive user interfaces.
            </p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 md:gap-12"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-bold">My Approach</h3>
            <p className="text-muted-foreground">
              I strive to create clean, maintainable code that provides an excellent user experience. I pay special attention to details and always look for ways to optimize performance.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">My Goals</h3>
            <p className="text-muted-foreground">
              My goal is to constantly improve my skills and stay up-to-date with the latest trends in web development. I aim to create innovative solutions that help businesses grow and develop.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">My Interests</h3>
            <p className="text-muted-foreground">
              While programming, I'm passionate about ethical coding, design thinking, and continuous learning. But besides programming, I'm also passionate about Sports, Music, and Traveling, it's inspiring me to be creative.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${interest.bgClass}`}>
                        #{interest.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{interest.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">My Experience</h3>
            <p className="text-muted-foreground">
              I've worked on various projects, from small websites to complex web applications. My experience includes working with React, TypeScript, Next.js, and integrating AI technologies into web applications.
            </p>
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${tech.bgClass}`}>
                          #{tech.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tech.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 

export default About;