'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icon } from '@/app/components/about/components/icon';
import { ProgressComparison } from '@/app/components/about/components/progress-comparison';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { AchievementCardProps } from '@/app/types/dataTypes';

export function AchievementCard({
  title,
  shortDescription,
  icon,
  iconColor,
  problem,
  solution,
  result,
  metrics,
  className,
}: AchievementCardProps) {
  const id = React.useId();
  
  return (
    <Collapsible className={cn("w-full", className)} id={`achievement-${id}`}>
      <Card>
        <CollapsibleTrigger className="w-full text-left" id={`achievement-trigger-${id}`}>
          <CardHeader className="flex flex-row items-center justify-between p-2.5 xs:p-3 sm:p-4 group cursor-pointer">
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
              <div className={cn(
                "flex items-center justify-center rounded-full bg-muted/50 p-1 xs:p-1.5 sm:p-2 transition-colors",
                iconColor,
                "group-hover:bg-muted/80"
              )}>
                <Icon name={icon} size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-xs xs:text-sm sm:text-base font-medium line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground line-clamp-2">{shortDescription}</p>
              </div>
            </div>
            <ChevronDown className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all duration-200 group-hover:text-primary data-[state=open]:rotate-180" />
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent id={`achievement-content-${id}`}>
          <CardContent className="p-2.5 xs:p-3 sm:p-4 pt-0 space-y-2 xs:space-y-3 sm:space-y-4">
            <ProgressComparison 
              before={metrics.before} 
              after={metrics.after} 
              unit={metrics.unit || "%"} 
            />
            
            <div className="grid gap-1 xs:gap-1.5 sm:gap-2 text-[10px] xs:text-xs sm:text-sm">
              <div>
                <h4 className="font-semibold text-[11px] xs:text-xs sm:text-sm">Problem:</h4>
                <p className="text-muted-foreground">{problem}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[11px] xs:text-xs sm:text-sm">Solution:</h4>
                <p className="text-muted-foreground">{solution}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[11px] xs:text-xs sm:text-sm">Result:</h4>
                <p className="text-muted-foreground">{result}</p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
} 