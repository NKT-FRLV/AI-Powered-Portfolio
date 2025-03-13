"use client"

import React from "react"
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

export function HeroImageModal() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="sm" 
          className="text-xs h-8 px-4 w-fit sm:text-sm md:text-base md:h-10 md:px-4 lg:h-11 lg:px-6 font-bold"
        >
          Photo
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] p-0 overflow-hidden bg-background/80 backdrop-blur-sm data-[state=open]:animate-sheet-in data-[state=closed]:animate-sheet-out"
      >
        <div className="flex flex-col h-full justify-center items-center py-12">
          <SheetHeader className="p-6 shrink-0 w-full">
            <SheetTitle className="text-center">My photo</SheetTitle>
            <SheetDescription className="text-center">
              Photo of Nikita Frolov
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
        </div>
      </SheetContent>
    </Sheet>
  )
} 