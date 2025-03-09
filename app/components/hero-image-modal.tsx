"use client"

import React from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"

export function HeroImageModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          Посмотреть фото
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Моё фото</DialogTitle>
          <DialogDescription>
            Фотография Никиты Фролова
          </DialogDescription>
        </DialogHeader>
        <div className="relative h-[300px] w-full sm:h-[400px] overflow-hidden rounded-md">
          <Image
            src="/nikita_color.jpg"
            alt="Nikita Frolov"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 