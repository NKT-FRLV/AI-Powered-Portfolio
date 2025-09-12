"use client";

import React from "react";
import { motion } from "framer-motion";

export interface NavLinkProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  disabled?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ id, label, isActive, onClick, disabled = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick(e, id);
  };

  return (
    <motion.a
      key={id}
      href={`#${id}`}
      onClick={handleClick}
      className={`transition-colors text-sm relative will-change-transform py-1 ${
        isActive
          ? 'text-foreground font-medium' 
          : 'text-muted-foreground hover:text-foreground/80'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      whileHover={{ scale: disabled ? 1.0 : 1.05 }}
      whileTap={{ scale: disabled ? 1.0 : 0.95 }}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full w-full"
          layoutId="activeNavIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />
      )}
    </motion.a>
  );
};

export default NavLink; 