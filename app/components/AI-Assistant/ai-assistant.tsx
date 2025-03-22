"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import { useNotificationSound } from "./hooks/useNotificationSound";
import { useSettings } from "./hooks/useSettings";

// Components
import ChatButton from "./ChatButton";
import ChatContainer from "./ChatContainer";

// Types & utils
import { translations } from "./translations";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  // Get settings
  const { settings } = useSettings();
  
  // For notification sound when the chat is closed
  const { playSound } = useNotificationSound({ 
    soundEnabled: settings.soundEnabled, 
    soundUrl: settings.notificationSound 
  });
  
  // State
  const [unreadCount, setUnreadCount] = useState(0);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  
  // Keep track of isOpen state for effects
  const isOpenRef = useRef(isOpen);

  // Update ref when isOpen changes
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Effect to simulate a new message notification after initial load
  useEffect(() => {
    // Only runs once on component mount
    const simulateNewMessage = () => {
      // Use ref to access current isOpen value
      if (!isOpenRef.current) {
        // Add just 1 unread message
        setUnreadCount(1);
        
        const message = translations.newMessages(1);
        
        // Create screen reader announcement
        setAnnouncement(message);
        
        // Clear announcement after it's been read
        setTimeout(() => {
          setAnnouncement(null);
        }, 3000);
        
        // Play notification sound when simulating a new message
        if (settings.soundEnabled) {
          playSound();
        }
      }
    };

    // Create just one notification 7 seconds after initial mount
    const timer = setTimeout(simulateNewMessage, 7000);

    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, [playSound, settings.soundEnabled]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts when not in an input field
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Ctrl/Cmd + / to toggle chat
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Screen reader announcement */}
      <div 
        role="status" 
        aria-live="polite" 
        className="sr-only"
      >
        {announcement}
      </div>
      
      <AnimatePresence mode="wait">
        {!isOpen && (
          <ChatButton 
            onClick={() => setIsOpen(true)} 
            theme={currentTheme}
            position="bottom-right"
            size="md"
            label="Chat with AI Assistant"
            pulseEffect={true}
            notificationCount={unreadCount}
            showNotificationBadge={unreadCount > 0}
            playSoundOnNotification={settings.soundEnabled}
            soundUrl={settings.notificationSound}
          />
        )}
      </AnimatePresence>

      {/* Chat Container */}
      <ChatContainer 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
      />
    </>
  );
}

export default AiAssistant;