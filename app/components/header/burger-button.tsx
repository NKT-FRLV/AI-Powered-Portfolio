"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface BurgerButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMenu}
      className={cn(
        "relative md:hidden rounded-full",
        "focus-visible:ring-1 focus-visible:ring-offset-1",
        "hover:bg-secondary/40",
        "backdrop-blur-sm",
        "transition-colors duration-300"
      )}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      <Menu 
        className={cn(
          "h-5 w-5 transition-transform duration-300",
          isOpen && "rotate-90"
        )} 
      />
    </Button>
  );
};

export default BurgerButton; 