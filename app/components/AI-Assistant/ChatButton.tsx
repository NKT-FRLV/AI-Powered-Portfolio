import { useCallback, memo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SiOpenai } from "react-icons/si";
import { ChatButtonProps } from './ai-types/types';
import { useNotificationSound } from './hooks/useNotificationSound';

const ChatButton = ({ 
  onMouseEnter,
  onClick, 
  theme, 
  position = 'bottom-right',
  size = 'md',
  label = 'Open AI-assistant',
  pulseEffect = true,
  glowEffect = true,
  notificationCount = 0,
  showNotificationBadge = false,
  playSoundOnNotification = false,
  soundUrl = '/sounds/notification.mp3',
}: ChatButtonProps) => {
  // Respect user's reduced motion preferences
  const prefersReducedMotion = useReducedMotion();
  
  // Component state
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const prevNotificationCountRef = useRef(notificationCount);
  
  // Use notification sound hook
  const { playSound } = useNotificationSound({
    soundEnabled: playSoundOnNotification,
    soundUrl
  });
  
  // Handle click
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  
  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);
  
  // Play sound when notification count increases
  useEffect(() => {
    if (
      playSoundOnNotification && 
      notificationCount > prevNotificationCountRef.current && 
      notificationCount > 0
    ) {
      playSound();
    }
    
    prevNotificationCountRef.current = notificationCount;
  }, [notificationCount, playSoundOnNotification, playSound]);

  // Configuration objects
  const sizeConfig = {
    sizes: {
      'sm': 'h-12 w-12',
      'md': 'h-16 w-16',
      'lg': 'h-20 w-20'
    },
    icons: {
      'sm': 'h-6 w-6',
      'md': 'h-8 w-8',
      'lg': 'h-10 w-10'
    },
    badges: {
      size: {
        'sm': 'h-5 w-5 text-xs',
        'md': 'h-6 w-6 text-xs',
        'lg': 'h-7 w-7 text-sm'
      },
      position: {
        'sm': '-top-1 -right-1',
        'md': '-top-1.5 -right-1.5',
        'lg': '-top-2 -right-2'
      }
    }
  };

  // Animation variants with simplified logic
  const animations = {
    button: {
      initial: prefersReducedMotion 
        ? {} 
        : { scale: 0, rotate: -180, opacity: 0, boxShadow: 'none' },
      animate: prefersReducedMotion
        ? { opacity: 1, transition: { duration: 1 } }
        : { 
            scale: 1,  
            rotate: 0,
            opacity: 1,
            boxShadow: 'none',
            transition: {
              duration: 1,
              ease: "easeOut",
              opacity: { duration: 1, ease: "easeOut" },
              rotate: { duration: 1, ease: "easeOut" },
              scale: { 
                type: "spring", 
                stiffness: 150, 
                damping: 15,
                delay: 0.1
              }
            }
          },
      exit: prefersReducedMotion
        ? { }
        : { 
            scale: 0.6,
            opacity: 0,
            boxShadow: 'none',
            transition: {
              duration: 0.2,
              ease: "easeOut"
            }
          },
      hover: prefersReducedMotion
        ? {}
        : { 
            scale: 1.05,
            boxShadow: theme === 'dark' 
              ? "0 0 15px 6px rgba(255,255,255,0.25)" 
              : "0 0 15px 6px rgba(0,0,0,0.25)",
            transition: {
              boxShadow: {
                duration: 0.3,
                ease: "easeOut"
              },
              scale: {
                duration: 0.3,
                ease: "easeOut"
              }
            }
          },
      tap: prefersReducedMotion
        ? { opacity: 0.8 }
        : { 
            scale: 0.95,
            boxShadow: theme === 'dark' 
              ? "0 0 15px 4px rgba(255,255,255,0.2)" 
              : "0 0 15px 4px rgba(0,0,0,0.1)",
            transition: {
              duration: 0.1,
              ease: "easeOut"
            }
          },
      focus: {
        opacity: 1,
        boxShadow: theme === 'dark'
          ? "0 0 0 3px rgba(255,255,255,0.5), 0 0 0 6px rgba(255,255,255,0.2)"
          : "0 0 0 3px rgba(0,0,0,0.3), 0 0 0 6px rgba(0,0,0,0.1)",
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      }
    },
    badge: {
      initial: { scale: 0, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 15,
          delay: 0.3 // Появляется после основной анимации кнопки
        }
      },
      exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
      pulse: {
        scale: [1, 1.2, 1],
        transition: {
          duration: 0.6,
          repeat: 3,
          repeatType: "loop" as const,
          delay: 0.5 // Начинает пульсировать после появления
        }
      }
    },
  };

  // Simplified effects and pulse animations
  const pulseAnimations = !prefersReducedMotion && pulseEffect || glowEffect ? {
    glow: {
      initial: { opacity: 0, scale: 0.6 },
      animate: {
        opacity: [0, 0.4, 0.7, 0.4],
        filter: ["brightness(0)", "brightness(0.5)", "brightness(1.2)", "brightness(0)"],
        scale: [0.8, 1],
        transition: {
          opacity: {
            duration: 3,
            times: [0, 0.2, 0.5, 1],
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatType: "reverse" as const,
            delay: 0.4 // Начинается после появления кнопки
          },
          filter: {
            duration: 3,
            times: [0, 0.2, 0.5, 1],
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatType: "reverse" as const,
            delay: 0.4
          },
          scale: {
            duration: 0.5,
            ease: "easeOut",
            delay: 0.4
          }
        }
      }
    },
    ring: {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: [0, 0.2, 0.4, 0.2],
        scale: [0.9, 1, 1.05, 1],
        transition: {
          opacity: {
            duration: 4,
            times: [0, 0.2, 0.5, 1],
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatType: "reverse" as const,
            delay: 0.5 // Начинается после glow эффекта
          },
          scale: {
            duration: 4,
            times: [0, 0.2, 0.5, 1],
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatType: "reverse" as const,
            delay: 0.5
          }
        }
      }
    },
    wave: {
      initial: { scale: 0.4, opacity: 0 },
      animate: (i: number) => ({
        scale: [0.8, 1.5],
        opacity: [0, 0.6, 0],
        transition: {
          duration: 3,
          times: [0, 0.3, 1],
          repeat: Infinity,
          repeatDelay: 1,
          delay: 0.6 + (i * 0.6), // Увеличиваем дистанцию между волнами (было 0.2)
          ease: [0.4, 0, 0.2, 1],
          repeatType: "loop" as const
        }
      })
    }
  } : {
    glow: { initial: { opacity: 0 }, animate: { opacity: 0 } },
    ring: { initial: { opacity: 0 }, animate: { opacity: 0 } },
    wave: { initial: { opacity: 0 }, animate: { opacity: 0 } }
  };

  // Theme-based style classes
  const themeClasses = {
    button: theme === 'dark' 
      ? `bg-black/80 backdrop-blur-md border border-white/30 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 
         focus-visible:ring-offset-black ${isKeyboardFocused ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-black' : ''}`
      : `bg-white/90 backdrop-blur-md border border-black/20 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 
         focus-visible:ring-offset-white ${isKeyboardFocused ? 'ring-2 ring-black/50 ring-offset-2 ring-offset-white' : ''}`,
    glow: theme === 'dark'
      ? "absolute inset-0 rounded-full bg-white/15"
      : "absolute inset-0 rounded-full bg-zinc-900/15",
    ring: theme === 'dark'
      ? "absolute -inset-1.5 rounded-full border-2 border-white/15"
      : "absolute -inset-1.5 rounded-full border-2 border-black/10",
    radioWave: (index: number) => theme === 'dark'
      ? `absolute rounded-full border ${index === 0 ? 'border-blue-400/50' : index === 1 ? 'border-indigo-400/40' : 'border-purple-400/30'} pointer-events-none`
      : `absolute rounded-full border ${index === 0 ? 'border-blue-500/40' : index === 1 ? 'border-indigo-500/30' : 'border-purple-500/20'} pointer-events-none`
  };

  // Get the current animation state based on keyboard focus
  const currentAnimationState = useCallback(() => {
    if (isKeyboardFocused) return "focus";
    return "animate";
  }, [isKeyboardFocused]);

  // Determine if we should show the notification badge
  const shouldShowBadge = showNotificationBadge && notificationCount > 0;

  return (
        <motion.div
          onMouseEnter={onMouseEnter}
          className="fixed z-50"
          style={{ 
            bottom: position.includes('bottom') ? 24 : undefined,
            top: position.includes('top') ? 24 : undefined,
            right: position.includes('right') ? 24 : undefined,
            left: position.includes('left') ? 24 : undefined
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Radio waves (3 layers) - only shown if animation is enabled */}
          {pulseEffect && !prefersReducedMotion && [0, 1, 2].map((i) => (
            <motion.div
              key={`radio-wave-${i}`}
              className={`${themeClasses.radioWave(i)} ${sizeConfig.sizes[size]}`}
              variants={pulseAnimations.wave}
              custom={i}
              initial="initial"
              animate="animate"
              style={{
                boxShadow: theme === 'dark' 
                  ? `0 0 ${5 - i * 1}px ${i === 0 ? 'rgba(96,165,250,0.2)' : i === 1 ? 'rgba(129,140,248,0.15)' : 'rgba(168,85,247,0.1)'}` 
                  : `0 0 ${5 - i * 1}px ${i === 0 ? 'rgba(59,130,246,0.2)' : i === 1 ? 'rgba(99,102,241,0.15)' : 'rgba(147,51,234,0.1)'}`
              }}
            />
          ))}

          <motion.button
            variants={animations.button}
            initial="initial"
            animate={currentAnimationState()}
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onFocus={(e) => {
              // Проверяем, что фокус получен с клавиатуры
              if (!e.currentTarget.matches(':hover')) {
                setIsKeyboardFocused(true);
              }
            }}
            onBlur={() => {
              setIsKeyboardFocused(false);
            }}
            className={`${themeClasses.button} relative ${sizeConfig.sizes[size]} rounded-full flex items-center justify-center`}
            aria-label={`${label}${notificationCount > 0 ? `, ${notificationCount} new messages` : ''}`}
            aria-live={notificationCount > 0 ? "polite" : "off"}
            aria-atomic="true"
            aria-busy={isKeyboardFocused}
            aria-controls="chat-container"
            tabIndex={1}
            role="button"
            data-testid="chat-button"
          >
            {/* Notification badge */}
            <AnimatePresence>
              {shouldShowBadge && (
                <motion.div
                  className={`absolute ${sizeConfig.badges.position[size]} flex items-center justify-center rounded-full bg-red-500 text-white font-bold ${sizeConfig.badges.size[size]} z-10`}
                  variants={animations.badge}
                  initial="initial"
                  animate={notificationCount > 0 ? ["animate", "pulse"] : "animate"}
                  exit="exit"
                  aria-hidden="true"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Visual effects - only when pulse effect is enabled */}
            {glowEffect && (
              <>
                <motion.div
                  className={themeClasses.glow}
                  variants={pulseAnimations.glow}
                  initial="initial"
                  animate="animate"
                  style={{
                    boxShadow: theme === 'dark' 
                      ? "0 0 30px rgba(255,255,255,0.3)"
                      : "0 0 30px rgba(0,0,0,0.2)"
                  }}
                />
                
                <motion.div
                  className={themeClasses.ring}
                  variants={pulseAnimations.ring}
                  initial="initial"
                  animate="animate"
                />
              </>
            )}
              {/* Icon with animations */}
                <SiOpenai 
                  className={`${sizeConfig.icons[size]} ${theme === 'dark' ? 'text-white' : 'text-zinc-800'} drop-shadow-md`}
                />
          </motion.button>
        </motion.div>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(ChatButton);