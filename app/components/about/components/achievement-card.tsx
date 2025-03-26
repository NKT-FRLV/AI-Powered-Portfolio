'use client';
import { useRef, useState, useEffect, useId } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import IconComponent from './icon-component';
import { ProgressComparison } from './progress-comparison';
import { ChevronDown, X } from 'lucide-react';
import { AchievementCardProps } from '@/app/types/dataTypes';
import { AnimatePresence, motion } from 'framer-motion';

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
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  
  // Обработчик нажатия клавиши Escape для закрытия модального окна
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  // Функция для прямого открытия модального окна
  const handleOpen = () => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
      setIsOpen(true);
    }
  };

  // Константа для размера модального окна
  const modalWidth = 'min(90vw, 500px)';

  return (
    <>
      {/* Карточка-триггер, всегда остается в потоке документа */}
      <div className={cn("w-full", className)}>
        <Card>
          <button 
            className="w-full text-left" 
            id={`achievement-trigger-${id}`}
            ref={triggerRef}
            onClick={handleOpen}
          >
            <CardHeader className="flex flex-row items-center justify-between p-2.5 xs:p-3 sm:p-4 group cursor-pointer">
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                <div className={cn(
                  "flex items-center justify-center rounded-full bg-muted/50 p-1 xs:p-1.5 sm:p-2 transition-colors",
                  iconColor,
                  "group-hover:bg-muted/80"
                )}>
                  <IconComponent name={icon} size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs xs:text-sm sm:text-base font-medium line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground line-clamp-2">{shortDescription}</p>
                </div>
              </div>
              <ChevronDown className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all duration-200 group-hover:text-primary" />
            </CardHeader>
          </button>
        </Card>
      </div>
      
      {/* Модальное содержимое, которое показывается поверх других элементов */}
      <AnimatePresence>
        {isOpen && triggerRect && (
          <>
            {/* Затемнение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            {/* Контейнер модального окна с фиксированными размерами */}
            <div
              className="fixed z-[101] overflow-hidden"
              style={{ 
                position: 'fixed', 
                top: '50%', 
                left: '50%', 
                width: modalWidth,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Анимированное модальное окно */}
              <motion.div 
                ref={contentRef}
                initial={{ 
                  opacity: 0,
                  scale: 0.8,
                  x: triggerRect ? (triggerRect.left - window.innerWidth / 2 + triggerRect.width / 2) : 0,
                  y: triggerRect ? (triggerRect.top - window.innerHeight / 2 + triggerRect.height / 2) : 0,
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.8,
                  x: triggerRect ? (triggerRect.left - window.innerWidth / 2 + triggerRect.width / 2) : 0,
                  y: triggerRect ? (triggerRect.top - window.innerHeight / 2 + triggerRect.height / 2) : 0,
                }}
                transition={{ 
                  type: 'spring',
                  bounce: 0.1, 
                  duration: 0.4 
                }}
                className="w-full max-h-[80vh] overflow-auto"

              >
                <Card className="w-full border-0 will-change-[box-shadow] transition-none overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-10 p-2.5 xs:p-3 sm:p-4 border-b">
                    <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                      <div className={cn(
                        "flex items-center justify-center rounded-full bg-muted/50 p-1 xs:p-1.5 sm:p-2",
                        iconColor
                      )}>
                        <IconComponent name={icon} size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs xs:text-sm sm:text-base font-medium">{title}</h3>
                        <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">{shortDescription}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)} 
                      className="rounded-full p-1 hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4 xs:h-5 xs:w-5 text-muted-foreground" />
                    </button>
                  </CardHeader>
                  <CardContent className="p-2.5 xs:p-3 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-4">
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
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 