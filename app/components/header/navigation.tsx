"use client";

import React from "react";
import { motion } from "framer-motion";
import NavLink from "./nav-link";
import { navItems } from "@/app/data";

export interface NavItem {
  id: string;
  label: string;
}

interface NavigationProps {
  activeSection: string | null;
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, handleLinkClick }) => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hidden md:flex items-center gap-6 text-sm"
    >
      {navItems.map(item => (
        <NavLink
          key={item.id}
          id={item.id}
          label={item.label}
          isActive={activeSection === item.id}
          onClick={handleLinkClick}
        />
      ))}
    </motion.nav>
  );
};

export default Navigation; 