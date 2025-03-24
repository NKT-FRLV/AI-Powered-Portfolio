'use client'

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import InfoCard from "./components/info-card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Icon } from "@/app/components/about/components/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { ChevronDown } from "lucide-react";
import {
  achievements,
  interests,
  techStack,
  characterTraits,
  workPreferences,
  aboutContent
} from "@/app/data";
import { AchievementCard } from "./components/achievement-card";

function About() {
  return (
    <TooltipProvider>
      <section id="about" className="py-12 sm:py-16 md:py-24">
        <div className="container px-3 sm:px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 text-center"
          >
            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-2xl xs:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <p className="mx-auto max-w-[700px] text-sm xs:text-base text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {aboutContent.shortBio}
              </p>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-3 xs:gap-4 sm:gap-6 py-6 xs:py-8 sm:py-12 md:grid-cols-2 lg:grid-cols-4"
          >
            <InfoCard 
              icon="code2"
              title="My Approach"
              content={aboutContent.approach}
              iconColor="text-blue-500"
            />
            <InfoCard 
              icon="target"
              title="My Goals"
              content={aboutContent.goals}
              iconColor="text-emerald-500"
            />
            <InfoCard 
              icon="award"
              title="My Experience"
              content={aboutContent.experience}
              iconColor="text-amber-500"
            />
            <InfoCard 
              icon="briefcase"
              title="Work Environment"
              content="I prefer a working environment with open communication and opportunities for continuous growth."
              iconColor="text-purple-500"
            />
          </motion.div>

          {/* Character Traits and Work Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-2"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="traits">
                <AccordionTrigger className="text-base sm:text-lg font-semibold px-2 xs:px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex items-center">
                    <Icon name="user-check" className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span>My Core Qualities</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 xs:px-3 sm:px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-3 sm:gap-4 mb-4 sm:mb-8">
                    {characterTraits.map((trait) => (
                      <div 
                        key={trait.trait}
                        className="flex items-start gap-2 xs:gap-3 p-2 xs:p-3 sm:p-4 rounded-lg border bg-background/40 backdrop-blur-sm"
                      >
                        <Icon name={trait.icon as any} className={`mt-0.5 sm:mt-1 ${trait.color}`} size={16} />
                        <div>
                          <h4 className="text-sm xs:text-base sm:text-lg font-medium">{trait.trait}</h4>
                          <p className="text-xs xs:text-sm text-muted-foreground">{trait.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-primary">💼</span> Work Preferences
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {workPreferences.map((pref) => (
                  <Tooltip key={pref.preference}>
                    <TooltipTrigger asChild>
                      <div className={`group flex items-center gap-1 sm:gap-2 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all hover:shadow-md ${pref.bgClass}`}>
                        <Icon name={pref.icon as any} size={16} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:scale-110" />
                        <span className="font-medium text-xs sm:text-sm">{pref.preference}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{pref.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mx-auto max-w-5xl py-12"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <Icon name="award" className="text-primary sm:w-6 sm:h-6" size={20} />
              <span>Professional Achievements</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {achievements.map(({ id, title, shortDescription, icon, iconColor, problem, solution, result, metrics }) => (
                <AchievementCard 
                  key={id} 
                  title={title} 
                  shortDescription={shortDescription} 
                  icon={icon} 
                  iconColor={iconColor} 
                  problem={problem} 
                  solution={solution} 
                  result={result} 
                  metrics={metrics} 
                  className="bg-background/40 backdrop-blur-sm overflow-hidden"
                />
              ))}
            </div>
          </motion.div>

          {/* Tech Stack and Interests */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-2"
          >
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-1 sm:gap-2">
                <Icon name="sparkles" className="text-primary sm:w-5 sm:h-5" size={16} />
                <span>My Interests</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {interests.map((interest) => (
                  <Tooltip key={interest.name}>
                    <TooltipTrigger asChild>
                      <span className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 hover:shadow-sm ${interest.bgClass}`}>
                        #{interest.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{interest.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-1 sm:gap-2">
                <Icon name="code" className="text-primary sm:w-5 sm:h-5" size={16} />
                <span>Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techStack.map((tech) => (
                  <Tooltip key={tech.name}>
                    <TooltipTrigger asChild>
                      <span className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 hover:shadow-sm ${tech.bgClass}`}>
                        #{tech.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tech.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
} 

export default About;