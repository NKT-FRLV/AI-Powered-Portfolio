"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Camera } from "lucide-react"

const HeroImageModal = () => {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="sm" 
          className="text-xs h-8 px-4 w-fit sm:text-sm md:text-base md:h-10 md:px-4 lg:h-11 lg:px-6 font-bold relative overflow-hidden group animate-glow hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary-foreground dark:hover:text-primary transition-all duration-300 ease-in-out"
        >
          <Camera className='w-4 h-4 mr-2 opacity-70' />
            Photo
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
          <div className="relative w-full aspect-[3/4] max-h-[60vh] overflow-hidden">
            <Image
              src="/gen-hero.webp"
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

export default HeroImageModal; 