"use client";

import React from "react";
import { motion } from "framer-motion";

export interface NavLinkProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ id, label, isActive, onClick }) => {
  return (
    <motion.a
      key={id}
      href={`#${id}`}
      onClick={(e) => onClick(e, id)}
      className={`transition-colors text-sm relative ${
        isActive
          ? 'text-foreground font-medium' 
          : 'text-muted-foreground hover:text-foreground/80'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  );
};

export default NavLink; 