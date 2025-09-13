"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import { useNotificationSound } from "./hooks/useNotificationSound";
import { useSettings } from "./hooks/useSettings";

// Components
import ChatButton from "./ChatButton";
import SimpleChat from "./SimpleChat";


// Types & utils
import { translations } from "./plain-content/translations";

const AiAssistant = () => {
  // State for onHover PreLoad SimpleChat
  const [ isLoadedSimpleChat, setIsLoadedSimpleChat ] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const wasOpenOnce = useRef(false);

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
  
  // Добавляем ref для таймера
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Effect для симуляции нового сообщения
  useEffect(() => {
    // Очищаем предыдущий таймер если он существует
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }

    // Создаем новый таймер только если чат никогда не открывался
    if (!wasOpenOnce) {
      notificationTimerRef.current = setTimeout(() => {
        // Проверяем условия перед отправкой уведомления
        if (!isOpen && !wasOpenOnce) {
          setUnreadCount(1);
          const message = translations.newMessages(1);
          setAnnouncement(message);
          
          setTimeout(() => {
            setAnnouncement(null);
          }, 3000);
          
          if (settings.soundEnabled) {
            playSound();
          }
        }
      }, 7000);
    }

    // Очищаем таймер при размонтировании
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
        notificationTimerRef.current = null;
      }
    };
  }, [wasOpenOnce, isOpen, settings.soundEnabled, playSound]);

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
        if (!isLoadedSimpleChat) {
          setIsLoadedSimpleChat(true);
        }
        e.preventDefault();
        setIsOpen(prev => !prev);

      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoadedSimpleChat]);

  // Обновляем handleChatButtonClick
  const handleChatButtonClick = () => {
    // Очищаем таймер при открытии чата
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }
    
    setIsOpen(true);
    setUnreadCount(0);
    wasOpenOnce.current = true;
  };

  // Handle mouse enter to preload SimpleChat
  const handleMouseEnter = () => {
    setIsLoadedSimpleChat(true);
  };


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
            onMouseEnter={handleMouseEnter}
            onClick={handleChatButtonClick} 
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
	  <AnimatePresence mode="wait">
      {/* Chat Container */}
      {isLoadedSimpleChat && isOpen && (
        <SimpleChat 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
        />
      )}
	  </AnimatePresence>
    </>
  );
}

export default AiAssistant;
