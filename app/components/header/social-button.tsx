
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

// Маппинг строковых идентификаторов на компоненты иконок
const iconMap: Record<string, React.ElementType> = {
  'github': FaGithub,
  'x': FaXTwitter ,
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
const SocialButton = ({ social, size }: { social: SocialLinkProps, size?: number }) => {
  const IconComponent = iconMap[social.icon] || FaGithub;
  
  return (
    <Button 
      key={social.id} 
      asChild
      variant="ghost"
      size='icon'
      className={`[&_svg]:size-${size} text-muted-foreground bg-transparent hover:bg-transparent hover:text-white hover:scale-110 will-change-transform transition-all duration-300`}
    >
      <a 
        href={social.link} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <IconComponent size={size} />
      </a>
    </Button>
  );
}

export default SocialButton; 