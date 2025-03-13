"use client";

import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./nav-link";
import { navItems } from "@/app/data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  isOpen: boolean;
  activeSection: string | null;
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  closeMobileMenu: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  activeSection,
  handleLinkClick,
  closeMobileMenu
}) => {

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) closeMobileMenu();
    }}>
      <SheetContent 
        side="left" 
        className={cn(
          "w-full sm:w-80 p-0",
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 data-[state=open]:animate-nav-in data-[state=closed]:animate-nav-out"
        )}
      >
        <motion.div 
          className="h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x);
            if (swipe > 100 || velocity.x > 200) {
              closeMobileMenu();
            }
          }}
        >
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-xl font-semibold">Navigation</SheetTitle>
            <SheetDescription>
              Navigate by sections
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-8rem)] px-6">
            <nav className="space-y-2 py-6">
              <AnimatePresence>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ 
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2 px-4",
                        "rounded-lg border-l-4",
                        "transition-all duration-200",
                        activeSection === item.id 
                          ? "border-l-primary bg-secondary/40" 
                          : "border-l-transparent hover:border-l-primary/50 hover:bg-secondary/20"
                      )}
                      asChild
                    >
                      <NavLink
                        id={item.id}
                        label={item.label}
                        isActive={activeSection === item.id}
                        onClick={handleLinkClick}
                      />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
          </ScrollArea>

          <div className="p-6 border-t">
            <SheetClose asChild>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={closeMobileMenu}
              >
                Close Menu
              </Button>
            </SheetClose>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation; 