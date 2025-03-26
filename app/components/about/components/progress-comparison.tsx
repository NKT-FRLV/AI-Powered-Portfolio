"use client";

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface ProgressComparisonProps {
  before: number;
  after: number;
  unit?: string;
  className?: string;
}

export function ProgressComparison({ before, after, unit = "%", className }: ProgressComparisonProps) {
  const difference = after - before;
  const increase = (difference / before) * 100;
  const isPositive = difference > 0;
  
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Задержка для запуска анимации, чтобы она началась после открытия
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={cn("space-y-1.5 xs:space-y-2", className)}>
      <div className="flex flex-col xs:flex-row xs:items-center justify-between text-[10px] xs:text-xs sm:text-sm gap-1">
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5">
          <span className="font-semibold">Before:</span>
          <div className="h-1.5 xs:h-2 sm:h-2.5 w-12 xs:w-16 sm:w-20 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-400 rounded-full transition-all duration-700 ease-out" 
              style={{ width: animate ? `${Math.min(100, before)}%` : '0%' }}
            ></div>
          </div>
          <span className="text-muted-foreground">{before}{unit}</span>
        </div>
        
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5">
          <span className="font-semibold">After:</span>
          <div className="h-1.5 xs:h-2 sm:h-2.5 w-12 xs:w-16 sm:w-20 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out delay-150",
                isPositive ? "bg-emerald-500" : "bg-rose-500"
              )}
              style={{ width: animate ? `${Math.min(100, after)}%` : '0%' }}
            ></div>
          </div>
          <span className="text-muted-foreground">{after}{unit}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center">
        <span className={cn(
          "text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm font-medium px-1.5 xs:px-2 py-0.5 rounded opacity-0 transition-opacity duration-300",
          isPositive ? "text-emerald-700 bg-emerald-100" : "text-rose-700 bg-rose-100",
          animate && "opacity-100 delay-300"
        )}>
          {isPositive ? "+" : ""}{difference.toFixed(0)}{unit} ({isPositive ? "+" : ""}{increase.toFixed(0)}%)
        </span>
      </div>
    </div>
  );
} 