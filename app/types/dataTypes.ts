import { IconName } from "@/app/components/about/components/icon";

export interface AchievementCardProps {
    id?: string;
    title: string;
    shortDescription: string;
    icon: IconName;
    iconColor: string;
    problem: string;
    solution: string;
    result: string;
    metrics: {
      before: number;
      after: number;
      unit: string;
    };
    className?: string;
  }