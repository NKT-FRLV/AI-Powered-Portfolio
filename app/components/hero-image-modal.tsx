"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/app/components/ui/button"
import { motion } from "framer-motion"
import { Camera } from "lucide-react"

export function HeroImageModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isHovered, setIsHovered] = useState(false)


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="sm" 
          variant="outline"
          className="text-xs h-8 px-4 w-fit sm:text-sm md:text-base md:h-10 md:px-4 lg:h-11 lg:px-6 font-bold relative overflow-hidden group border-primary/20 animate-button-glow"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Camera className={`w-4 h-4 mr-2 transition-all duration-300 ${isHovered ? 'text-primary' : 'opacity-70'}`} />
          <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Photo</span>
          <span className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] p-0 overflow-hidden bg-background/90 backdrop-blur-md data-[state=open]:animate-sheet-in data-[state=closed]:animate-sheet-out"
      >
        <motion.div
          className="flex flex-col h-full justify-center items-center py-12"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.4}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.y);
            if (swipe > 100 || velocity.y > 200) {
              setIsOpen(false);
            }
          }}
        >
          <SheetHeader className="p-6 shrink-0 w-full">
            <SheetTitle className="text-center text-xl md:text-2xl font-bold">My Photo</SheetTitle>
            <SheetDescription className="text-center text-sm md:text-base">
              Swipe down or drag to close
            </SheetDescription>
          </SheetHeader>
          <div className="relative w-full max-w-2xl aspect-[3/4] max-h-[60vh] overflow-hidden">
            <Image
              src="/nikita_color.webp"
              alt="Nikita Frolov"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="h-16 shrink-0 w-full" />
        </motion.div>
      </SheetContent>
    </Sheet>
  )
} 