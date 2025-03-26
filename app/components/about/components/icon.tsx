'use client';
import {
  Code2, 
  Target, 
  Award, 
  Briefcase, 
  UserCheck, 
  Zap,
  Check,
  Code,
  Smartphone,
  Home,
  MessageSquareText,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export type IconName = 
  | "code2"
  | "target"
  | "award"
  | "briefcase"
  | "user-check"
  | "bolt" // for "Zap"
  | "sparkles"
  | "check-circle" // for "Check"
  | "code"
  | "device-mobile" // for "Smartphone"
  | "home"
  | "chat-bubble-left-right" // for "MessageSquareText"
  | "academic-cap" // for "GraduationCap"
  | "magnifying-glass" // for "Search"
  | "chart-bar" // for "BarChart"
  | "users";

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 24 }: IconProps) {
  const iconProps = {
    size,
    className: cn("flex-shrink-0", className)
  };

  switch (name) {
    case "code2":
      return <Code2 {...iconProps} />;
    case "target":
      return <Target {...iconProps} />;
    case "award":
      return <Award {...iconProps} />;
    case "briefcase":
      return <Briefcase {...iconProps} />;
    case "user-check":
      return <UserCheck {...iconProps} />;
    case "bolt":
      return <Zap {...iconProps} />;
    case "sparkles":
      return <Sparkles {...iconProps} />;
    case "check-circle":
      return <Check {...iconProps} />;
    case "code":
      return <Code {...iconProps} />;
    case "device-mobile":
      return <Smartphone {...iconProps} />;
    case "home":
      return <Home {...iconProps} />;
    case "chat-bubble-left-right":
      return <MessageSquareText {...iconProps} />;
    case "academic-cap":
      return <GraduationCap {...iconProps} />;
    // These aren't perfect mappings but you may want to replace with actual icons from lucide
    case "magnifying-glass":
      return <span className={cn("text-xl", className)}>🔍</span>;
    case "chart-bar":
      return <span className={cn("text-xl", className)}>📊</span>;
    case "users":
      return <span className={cn("text-xl", className)}>👥</span>;
    default:
      return null;
  }
}

export default Icon; 