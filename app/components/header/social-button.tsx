"use client";

import React, { memo } from "react";
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';
import { Button } from "@/app/components/ui/button";

// Маппинг строковых идентификаторов на компоненты иконок
const iconMap: Record<string, React.ElementType> = {
  'github': FaGithub,
  'instagram': FaInstagram,
  'telegram': FaTelegram,
  'linkedin': FaLinkedin,
};

// Типы для компонента
export interface SocialLinkProps {
  id: string;
  icon: string;
  link: string;
}

// Мемоизированный компонент SocialButton для предотвращения ненужных ререндеров
const SocialButton = memo(({ social }: { social: SocialLinkProps }) => {
  const IconComponent = iconMap[social.icon] || FaGithub;
  
  return (
    <Button 
      key={social.id} 
      asChild
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground"
    >
      <a 
        href={social.link} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <IconComponent size={25} />
      </a>
    </Button>
  );
});

SocialButton.displayName = 'SocialButton';

export default SocialButton; 