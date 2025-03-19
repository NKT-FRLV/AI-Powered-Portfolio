'use client'

import { motion } from "framer-motion";

const About = () => {
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
              Besides programming, I'm passionate about diving, traveling, and learning new languages. These hobbies help me broaden my horizons and find inspiration for my projects.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">My Experience</h3>
            <p className="text-muted-foreground">
              I've worked on various projects, from small websites to complex web applications. My experience includes working with React, TypeScript, Next.js, and integrating AI technologies into web applications.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 

export default About;