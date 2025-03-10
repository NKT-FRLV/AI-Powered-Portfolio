"use client";

import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import NavLink from "./nav-link";

export interface NavItem {
  id: string;
  label: string;
}

interface NavigationProps {
  activeSection: string | null;
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'languages', label: 'Languages' },
  { id: 'contact', label: 'Contact' }
];

const Navigation: React.FC<NavigationProps> = ({ activeSection, handleLinkClick }) => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hidden md:flex items-center gap-6 text-sm"
    >
      <LayoutGroup id="navigation">
        {navItems.map(item => (
          <NavLink
            key={item.id}
            id={item.id}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={handleLinkClick}
          />
        ))}
      </LayoutGroup>
    </motion.nav>
  );
};

export default Navigation; 