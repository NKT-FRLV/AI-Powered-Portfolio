import React, { useCallback, memo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SiOpenai } from "react-icons/si";

interface ChatButtonProps {
  onClick: () => void;
  theme: string | undefined;
  isVisible?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  pulseEffect?: boolean;
  notificationCount?: number;
  showNotificationBadge?: boolean;
  playSoundOnNotification?: boolean;
  soundUrl?: string;
  enableHapticFeedback?: boolean;
  tooltipText?: string;
  showTooltip?: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ 
  onClick, 
  theme, 
  isVisible = true, 
  position = 'bottom-right',
  size = 'md',
  label = 'Open AI-assistant',
  pulseEffect = true,
  notificationCount = 0,
  showNotificationBadge = false,
  playSoundOnNotification = false,
  soundUrl = '/sounds/notification.mp3',
  enableHapticFeedback = true,
  tooltipText = 'Chat with AI Assistant',
  showTooltip = true
}) => {
  // Respect user's reduced motion preferences
  const prefersReducedMotion = useReducedMotion();
  
  // State to track if the button has been shown to the user
  const [hasBeenShown, setHasBeenShown] = useState(false);
  
  // Track if the button is focused via keyboard
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  
  // Track previous notification count to detect changes
  const prevNotificationCountRef = useRef(notificationCount);
  
  // Audio reference for notification sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // State to track if tooltip is visible
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  // Timeout reference for tooltip delay
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize the click handler to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    // Trigger haptic feedback on mobile devices if supported and enabled
    if (enableHapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(50); // Short vibration (50ms)
      } catch (error) {
        console.log('Haptic feedback not supported:', error);
      }
    }
    
    onClick();
  }, [onClick, enableHapticFeedback]);
  
  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    } else if (e.key === 'Escape') {
      // Hide tooltip on Escape key
      setIsTooltipVisible(false);
    } else if (e.key === 'Tab') {
      // If tooltip is visible and user is tabbing, hide tooltip
      if (isTooltipVisible) {
        setIsTooltipVisible(false);
      }
    }
  }, [onClick, isTooltipVisible]);
  
  // Handle mouse enter for tooltip
  const handleMouseEnter = useCallback(() => {
    if (showTooltip) {
      // Clear any existing timeout
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      
      // Set a timeout to show the tooltip after a delay
      tooltipTimeoutRef.current = setTimeout(() => {
        setIsTooltipVisible(true);
      }, 500); // 500ms delay before showing tooltip
    }
  }, [showTooltip]);
  
  // Handle mouse leave for tooltip
  const handleMouseLeave = useCallback(() => {
    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
    
    // Hide the tooltip immediately
    setIsTooltipVisible(false);
  }, []);
  
  // Clean up tooltip timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);
  
  // Mark the button as shown after it appears
  useEffect(() => {
    if (isVisible && !hasBeenShown) {
      setHasBeenShown(true);
    }
  }, [isVisible, hasBeenShown]);
  
  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined' && playSoundOnNotification) {
      try {
        audioRef.current = new Audio(soundUrl);
        
        // Add error handling for the audio element
        audioRef.current.addEventListener('error', (e) => {
          console.error('Error loading notification sound:', e);
          // Fallback to browser's default notification sound if available
          if ('Notification' in window && Notification.permission === 'granted') {
            try {
              // Create a silent notification as a fallback
              new Notification('New message', {
                silent: false,
                icon: '/nf-logo.svg'
              });
            } catch (notificationError) {
              console.error('Notification fallback failed:', notificationError);
            }
          }
        });
      } catch (error) {
        console.error('Could not initialize audio:', error);
      }
    }
    
    return () => {
      if (audioRef.current) {
        // Remove event listeners
        audioRef.current.removeEventListener('error', () => {});
        // Pause and nullify
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundUrl, playSoundOnNotification]);
  
  // Play sound when notification count increases
  useEffect(() => {
    if (
      playSoundOnNotification && 
      audioRef.current && 
      notificationCount > prevNotificationCountRef.current && 
      notificationCount > 0
    ) {
      // Reset audio to beginning if it's already playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      // Play notification sound
      const playPromise = audioRef.current.play();
      
      // Handle potential play() promise rejection (browsers require user interaction)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Audio playback was prevented by the browser:', error);
        });
      }
      
      // Trigger haptic feedback for notifications if supported and enabled
      if (enableHapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          // Pattern: vibrate 100ms, pause 50ms, vibrate 100ms
          navigator.vibrate([100, 50, 100]);
        } catch (error) {
          console.log('Haptic feedback not supported:', error);
        }
      }
    }
    
    // Update previous notification count reference
    prevNotificationCountRef.current = notificationCount;
  }, [notificationCount, playSoundOnNotification, enableHapticFeedback]);

  // Position mapping
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  // Size mapping
  const sizeClasses = {
    'sm': 'h-12 w-12',
    'md': 'h-16 w-16',
    'lg': 'h-20 w-20'
  };

  const iconSizes = {
    'sm': 'h-6 w-6',
    'md': 'h-8 w-8',
    'lg': 'h-10 w-10'
  };

  const badgeSizes = {
    'sm': 'h-5 w-5 text-xs',
    'md': 'h-6 w-6 text-xs',
    'lg': 'h-7 w-7 text-sm'
  };

  const badgePositions = {
    'sm': '-top-1 -right-1',
    'md': '-top-1.5 -right-1.5',
    'lg': '-top-2 -right-2'
  };
  
  // Tooltip position based on button position
  const tooltipPositionClasses = {
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6'
  };

  // Simplified animations if user prefers reduced motion
  const buttonVariants = {
    initial: prefersReducedMotion 
      ? { opacity: 0 } 
      : { scale: 0, opacity: 0 },
    animate: prefersReducedMotion
      ? { 
          opacity: 1,
          transition: { duration: 0.3 }
        }
      : { 
          scale: 1, 
          opacity: 1,
          transition: { 
            type: "spring", 
            stiffness: 100,
            damping: 15,
            mass: 1.2,
          } 
        },
    exit: prefersReducedMotion
      ? { opacity: 0, transition: { duration: 0.2 } }
      : { 
          scale: 0,
          opacity: 0,
          transition: { duration: 0.3, ease: "easeInOut" }
        },
    hover: prefersReducedMotion
      ? { }
      : { 
          scale: 1.05,
          boxShadow: theme === 'dark' 
            ? "0 0 20px 5px rgba(255,255,255,0.3)" 
            : "0 0 20px 5px rgba(0,0,0,0.2)",
          transition: { 
            duration: 0.3,
            ease: "easeOut" 
          }
        },
    tap: prefersReducedMotion
      ? { opacity: 0.8 }
      : { 
          scale: 0.95,
          transition: { 
            duration: 0.1,
            ease: "easeOut" 
          }
        },
    focus: {
      boxShadow: theme === 'dark'
        ? "0 0 0 3px rgba(255,255,255,0.5), 0 0 0 6px rgba(255,255,255,0.2)"
        : "0 0 0 3px rgba(0,0,0,0.3), 0 0 0 6px rgba(0,0,0,0.1)",
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };
  
  // Tooltip animation variants
  const tooltipVariants = {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  // Badge animation variants
  const badgeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        repeat: 3,
        repeatType: "loop" as const
      }
    }
  };

  // Disable or simplify animations based on user preference
  const glowVariants = !prefersReducedMotion && pulseEffect ? {
    animate: {
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror" as const
      }
    }
  } : { animate: {} };

  const iconVariants = !prefersReducedMotion ? {
    animate: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.75, 1],
        repeatType: "loop" as const
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  } : { animate: {}, hover: {} };

  const ringVariants = !prefersReducedMotion && pulseEffect ? {
    animate: {
      opacity: [0.2, 0.5, 0.2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror" as const
      }
    }
  } : { animate: {} };

  const radioWaveVariants = !prefersReducedMotion && pulseEffect ? {
    initial: { scale: 0.4, opacity: 0 },
    animate: (i: number) => ({
      scale: [0.8, 2],
      opacity: [0.6, 0],
      transition: {
        repeat: Infinity,
        repeatDelay: 2,
        duration: 5,
        delay: i * 1.5,
        ease: [0.2, 0.4, 0.6, 0.8],
        repeatType: "loop" as const
      }
    })
  } : { 
    initial: { opacity: 0 },
    animate: { opacity: 0 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren", 
        staggerChildren: prefersReducedMotion ? 0 : 0.1 
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        staggerDirection: -1
      }
    }
  };

  // Enhanced button classes with focus states
  const buttonClass = theme === 'dark' 
    ? `bg-black/80 backdrop-blur-md shadow-xl hover:shadow-2xl border border-white/30 
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 
       focus-visible:ring-offset-black ${isKeyboardFocused ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-black' : ''}`
    : `bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl border border-black/20 
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 
       focus-visible:ring-offset-white ${isKeyboardFocused ? 'ring-2 ring-black/50 ring-offset-2 ring-offset-white' : ''}`;

  // Add hover effect class for the button
  const hoverEffectClass = !prefersReducedMotion 
    ? 'transition-all duration-300' 
    : '';

  const glowClass = theme === 'dark'
    ? "absolute inset-0 rounded-full bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
    : "absolute inset-0 rounded-full bg-zinc-900/15 shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300";
    
  const ringClass = theme === 'dark'
    ? "absolute -inset-2 rounded-full border-2 border-white/15 transition-all duration-300"
    : "absolute -inset-2 rounded-full border-2 border-black/10 transition-all duration-300";

  const radioWaveClass = (index: number) => theme === 'dark'
    ? `absolute ${positionClasses[position]} rounded-full border ${index === 0 ? 'border-blue-400/40' : index === 1 ? 'border-indigo-400/30' : 'border-purple-400/20'} pointer-events-none`
    : `absolute ${positionClasses[position]} rounded-full border ${index === 0 ? 'border-blue-500/30' : index === 1 ? 'border-indigo-500/20' : 'border-purple-500/10'} pointer-events-none`;

  const waveSize = size === 'sm' ? 'h-12 w-12' : size === 'md' ? 'h-16 w-16' : 'h-20 w-20';
  
  // Tooltip class based on theme
  const tooltipClass = theme === 'dark'
    ? "bg-zinc-800 text-white border border-zinc-700 shadow-lg"
    : "bg-white text-zinc-800 border border-zinc-200 shadow-lg";

  // Get the current animation state based on keyboard focus
  const currentAnimationState = isKeyboardFocused ? "focus" : "animate";

  // Determine if we should show the notification badge
  const shouldShowBadge = showNotificationBadge && notificationCount > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-50"
          style={{ 
            bottom: position.includes('bottom') ? 24 : undefined,
            top: position.includes('top') ? 24 : undefined,
            right: position.includes('right') ? 24 : undefined,
            left: position.includes('left') ? 24 : undefined
          }}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {isTooltipVisible && showTooltip && (
              <motion.div
                id="chat-tooltip"
                role="tooltip"
                aria-hidden={!isTooltipVisible}
                className={`absolute ${tooltipPositionClasses[position]} z-50 px-3 py-2 rounded-md ${tooltipClass} text-sm whitespace-nowrap`}
                variants={tooltipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    {tooltipText}
                    {notificationCount > 0 && (
                      <span className="ml-1 font-medium">
                        ({notificationCount} new {notificationCount === 1 ? 'message' : 'messages'})
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTooltipVisible(false);
                    }}
                    className={`rounded-full p-0.5 ${theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-200'} transition-colors`}
                    aria-label="Close tooltip"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                {notificationCount > 0 && (
                  <div className="mt-1 text-xs opacity-80">
                    Click to open chat
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Radio waves (3 layers) - only shown if animation is enabled */}
          {pulseEffect && !prefersReducedMotion && [0, 1, 2].map((i) => (
            <motion.div
              key={`radio-wave-${i}`}
              className={`${radioWaveClass(i)} ${waveSize}`}
              variants={radioWaveVariants}
              custom={i}
              initial="initial"
              animate="animate"
              style={{
                boxShadow: theme === 'dark' 
                  ? `0 0 ${5 - i * 1}px ${i === 0 ? 'rgba(96,165,250,0.2)' : i === 1 ? 'rgba(129,140,248,0.15)' : 'rgba(168,85,247,0.1)'}` 
                  : `0 0 ${5 - i * 1}px ${i === 0 ? 'rgba(59,130,246,0.15)' : i === 1 ? 'rgba(99,102,241,0.1)' : 'rgba(147,51,234,0.05)'}`
              }}
            />
          ))}

          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate={currentAnimationState}
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={() => {
              // Only show focus styles when using keyboard navigation
              if (document.activeElement instanceof HTMLElement && 
                  document.activeElement.matches(':focus-visible')) {
                setIsKeyboardFocused(true);
              }
              
              // Show tooltip on focus as well
              if (showTooltip) {
                setIsTooltipVisible(true);
              }
            }}
            onBlur={() => {
              setIsKeyboardFocused(false);
              setIsTooltipVisible(false);
            }}
            className={`${buttonClass} relative ${sizeClasses[size]} rounded-full flex items-center justify-center`}
            aria-label={`${label}${notificationCount > 0 ? `, ${notificationCount} new messages` : ''}`}
            aria-haspopup="dialog"
            aria-expanded={isTooltipVisible}
            aria-describedby={isTooltipVisible ? "chat-tooltip" : undefined}
            aria-live={notificationCount > 0 ? "polite" : "off"}
            aria-atomic="true"
            aria-busy={isKeyboardFocused}
            aria-controls="chat-container"
            title={`${label}${notificationCount > 0 ? `, ${notificationCount} new messages` : ''}`}
            tabIndex={0}
            role="button"
            data-testid="chat-button"
          >
            {/* Notification badge */}
            <AnimatePresence>
              {shouldShowBadge && (
                <motion.div
                  className={`absolute ${badgePositions[size]} flex items-center justify-center rounded-full bg-red-500 text-white font-bold ${badgeSizes[size]} z-10`}
                  variants={badgeVariants}
                  initial="initial"
                  animate={notificationCount > 0 ? ["animate", "pulse"] : "animate"}
                  exit="exit"
                  aria-hidden="true"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </motion.div>
              )}
            </AnimatePresence>

            {pulseEffect && (
              <motion.div
                className={glowClass}
                variants={glowVariants}
                animate="animate"
              />
            )}
            
            {pulseEffect && (
              <motion.div
                className={ringClass}
                variants={ringVariants}
                animate="animate"
              />
            )}

            <motion.div className="relative z-10 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 opacity-60"
                animate={!prefersReducedMotion && pulseEffect ? {
                  opacity: [0.3, 0.6, 0.3],
                  transition: { 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    repeatType: "mirror" as const 
                  }
                } : {}}
              />
              
              {/* Add a subtle glow effect behind the icon */}
              {!prefersReducedMotion && (
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-radial from-blue-400/30 to-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2], 
                    scale: [0.8, 1.2, 0.8],
                    transition: { 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "loop" as const
                    }
                  }}
                />
              )}
              
              <motion.div
                variants={iconVariants}
                animate="animate"
                whileHover="hover"
                className={hoverEffectClass}
              >
                <SiOpenai 
                  className={`${iconSizes[size]} ${theme === 'dark' ? 'text-white' : 'text-zinc-800'} drop-shadow-md`}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ChatButton);