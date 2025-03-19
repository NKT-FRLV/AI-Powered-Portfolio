"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useOptimistic } from "../../hooks/useOptimistic";
import ChatButton from "./ChatButton";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
  reactions?: string[];
};

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Simple internationalization support
type Language = 'en' | 'ru';

const translations = {
  en: {
    welcome: "Hello! I am AI-assistant of Nikita. How can I help you today?",
    settings: "Settings",
    close: "Close",
    accentColor: "Accent Color",
    bubbleStyle: "Chat Bubble Style",
    modern: "Modern (Angled)",
    rounded: "Rounded",
    classic: "Classic",
    notificationSettings: "Notification Settings",
    notificationSound: "Notification Sound",
    hapticFeedback: "Haptic Feedback",
    saveChatHistory: "Save Chat History",
    enableBrowserNotifications: "Enable Browser Notifications",
    clearChatHistory: "Clear Chat History",
    keyboardShortcuts: "Keyboard Shortcuts",
    toggleChat: "Toggle chat",
    toggleSettings: "Toggle settings",
    closeChat: "Close chat",
    textToSpeechAvailable: "Text-to-speech available",
    speaking: "Speaking...",
    newMessages: (count: number) => `You have ${count} new ${count === 1 ? 'message' : 'messages'}`,
    errorMessage: "Sorry, an error occurred. Please try again later."
  },
  ru: {
    welcome: "Привет! Я ИИ-ассистент Никиты. Чем я могу помочь вам сегодня?",
    settings: "Настройки",
    close: "Закрыть",
    accentColor: "Цвет акцента",
    bubbleStyle: "Стиль сообщений",
    modern: "Современный (Угловой)",
    rounded: "Закругленный",
    classic: "Классический",
    notificationSettings: "Настройки уведомлений",
    notificationSound: "Звук уведомлений",
    hapticFeedback: "Тактильный отклик",
    saveChatHistory: "Сохранять историю чата",
    enableBrowserNotifications: "Включить уведомления браузера",
    clearChatHistory: "Очистить историю чата",
    keyboardShortcuts: "Горячие клавиши",
    toggleChat: "Переключить чат",
    toggleSettings: "Переключить настройки",
    closeChat: "Закрыть чат",
    textToSpeechAvailable: "Доступно озвучивание текста",
    speaking: "Говорю...",
    newMessages: (count: number) => `У вас ${count} ${count === 1 ? 'новое сообщение' : count >= 2 && count <= 4 ? 'новых сообщения' : 'новых сообщений'}`,
    errorMessage: "Извините, произошла ошибка. Пожалуйста, попробуйте позже."
  }
};

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  // Add language state
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];
  
  const initialMessages: Message[] = [
    {
      id: "welcome",
      content: t.welcome,
      role: "assistant",
      timestamp: new Date(),
      isTyping: false,
    },
  ];
  
  const { 
    state: messages, 
    setState: setMessages, 
    isLoading
  } = useOptimistic<Message[]>(initialMessages);
  
  const [unreadCount, setUnreadCount] = useState(0);
  
  const [notificationSound, setNotificationSound] = useState('/sounds/notification.mp3');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [hapticEnabled, setHapticEnabled] = useState(true);
  
  const [notificationPermission, setNotificationPermission] = useState<'default' | 'granted' | 'denied'>('default');
  
  const [showSettings, setShowSettings] = useState(false);
  
  const [accentColor, setAccentColor] = useState<'blue' | 'purple' | 'green' | 'pink' | 'orange'>('blue');
  
  const [bubbleStyle, setBubbleStyle] = useState<'rounded' | 'modern' | 'classic'>('modern');
  
  const [saveChatHistory, setSaveChatHistory] = useState(false);
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add state for screen reader announcements
  const [announcement, setAnnouncement] = useState<string | null>(null);
  
  // Ref для хранения актуального значения isOpen
  const isOpenRef = useRef(isOpen);
  // Обновляем ref при изменении isOpen
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Add state for voice input and speech synthesis
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  // Reference to speech recognition and synthesis
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  
  // Audio reference for notification sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Function to play notification sound
  const playNotificationSound = useCallback(() => {
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        // Create new audio instance if not exists
        if (!audioRef.current) {
          audioRef.current = new Audio(notificationSound);
        }
        
        // Reset audio to beginning if it's already playing
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        
        // Play notification sound
        const playPromise = audioRef.current.play();
        
        // Handle potential play() promise rejection
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Audio playback was prevented by the browser:', error);
          });
        }
      } catch (error) {
        console.error('Could not play notification sound:', error);
      }
    }
  }, [soundEnabled, notificationSound]);
  
  const requestNotificationPermission = useCallback(async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        
        if (permission === 'granted') {
          setSoundEnabled(true);
          localStorage.setItem('chatSoundEnabled', 'true');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem('chatNotificationSound');
      const soundEnabledPref = localStorage.getItem('chatSoundEnabled');
      const hapticEnabledPref = localStorage.getItem('chatHapticEnabled');
      const savedAccentColor = localStorage.getItem('chatAccentColor');
      const savedBubbleStyle = localStorage.getItem('chatBubbleStyle');
      const saveChatHistoryPref = localStorage.getItem('chatSaveChatHistory');
      const savedChatHistory = localStorage.getItem('chatHistory');
      
      if (savedSound) {
        setNotificationSound(savedSound);
      }
      
      if (soundEnabledPref !== null) {
        setSoundEnabled(soundEnabledPref === 'true');
      }
      
      if (hapticEnabledPref !== null) {
        setHapticEnabled(hapticEnabledPref === 'true');
      }
      
      if (savedAccentColor) {
        setAccentColor(savedAccentColor as any);
      }
      
      if (savedBubbleStyle) {
        setBubbleStyle(savedBubbleStyle as any);
      }
      
      if (saveChatHistoryPref !== null) {
        setSaveChatHistory(saveChatHistoryPref === 'true');
      }
      
      if (saveChatHistory && savedChatHistory) {
        try {
          const parsedHistory = JSON.parse(savedChatHistory);
          const messagesWithDateObjects = parsedHistory.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDateObjects);
        } catch (error) {
          console.error('Error parsing saved chat history:', error);
        }
      }
      
      if ('Notification' in window) {
        setNotificationPermission(Notification.permission);
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatNotificationSound', notificationSound);
      localStorage.setItem('chatSoundEnabled', String(soundEnabled));
      localStorage.setItem('chatHapticEnabled', String(hapticEnabled));
      localStorage.setItem('chatAccentColor', accentColor);
      localStorage.setItem('chatBubbleStyle', bubbleStyle);
      localStorage.setItem('chatSaveChatHistory', String(saveChatHistory));
    }
  }, [notificationSound, soundEnabled, hapticEnabled, accentColor, bubbleStyle, saveChatHistory]);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && saveChatHistory && messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages, saveChatHistory]);
  
  const clearChatHistory = useCallback(() => {
    setMessages(initialMessages);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatHistory');
    }
  }, [initialMessages, setMessages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
    setInput("");
    
    if (!saveChatHistory) {
      setMessages(initialMessages);
    }
    
    setUnreadCount(0);
  }, [saveChatHistory, initialMessages, setMessages]);

  // Add function to handle message reactions
  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages(prev => {
      return prev.map(message => {
        if (message.id === messageId) {
          const reactions = message.reactions || [];
          // Toggle reaction
          const newReactions = reactions.includes(emoji)
            ? reactions.filter(r => r !== emoji)
            : [...reactions, emoji];
          
          return {
            ...message,
            reactions: newReactions
          };
        }
        return message;
      });
    });
  }, [setMessages]);

  // Функция для вызова вибрации устройства
  const triggerHapticFeedback = useCallback((pattern: number | number[] = 50) => {
    if (hapticEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        console.log('Haptic feedback not supported:', error);
      }
    }
  }, [hapticEnabled]);

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
      isTyping: false,
      reactions: []
    };

    const userInput = input;
    setInput("");

    // Add typing indicator with realistic typing simulation
    setMessages([...messages, userMessage]);

    try {
      // Start API request
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("Error when receiving a response from the assistant");
      }

      const data = await response.json();

      // Immediately set the full response
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.push({
          id: Date.now().toString() + "-assistant",
          content: data.message,
          role: "assistant",
          timestamp: new Date(),
          isTyping: false,
          reactions: []
        });
        
        // Вызываем легкую вибрацию, когда ассистент завершил ответ
        triggerHapticFeedback(70);
        
        // Воспроизводим звук уведомления при получении сообщения от ассистента
        playNotificationSound();
        
        return newMessages;
      });
      
    } catch (error) {
      console.error("Error:", error);
      
      setMessages(prev => {
        const newMessages = [...prev];
        const typingIndex = newMessages.findIndex(msg => msg.isTyping);
        
        if (typingIndex !== -1) {
          newMessages[typingIndex] = {
            id: Date.now().toString() + "-error",
            content: "Sorry, an error occurred. Please try again later.",
            role: "assistant",
            timestamp: new Date(),
            isTyping: false,
            reactions: []
          };
          
          // Вызываем вибрацию при ошибке (другой паттерн)
          triggerHapticFeedback([70, 50, 70]);
          
          // Воспроизводим звук уведомления даже при ошибке
          playNotificationSound();
        }
        
        return newMessages;
      });
    }
  };

  // Effect to handle single notification message after initial load
  useEffect(() => {
    // Вызывается только один раз при монтировании компонента
    const simulateNewMessage = () => {
      // Используем ref для доступа к актуальному значению isOpen
      if (!isOpenRef.current) {
        // Добавляем только 1 непрочитанное сообщение
        setUnreadCount(1);
        
        // Сохраняем локальную копию t.newMessages для использования внутри эффекта
        const message = translations[language].newMessages(1);
        
        // Create screen reader announcement
        setAnnouncement(message);
        
        // Clear announcement after it's been read
        setTimeout(() => {
          setAnnouncement(null);
        }, 3000);
      }
    };

    // Создаем только одно уведомление через 7 секунд после первого монтирования компонента
    const timer = setTimeout(simulateNewMessage, 7000);

    // Очищаем таймер при размонтировании
    return () => clearTimeout(timer);
    // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const chatContainerVariants = {
    initial: { 
      opacity: 0,
      y: "100%",
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 250,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      y: "100%",
      scale: 0.95,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const getAccentColorClasses = useCallback(() => {
    switch (accentColor) {
      case 'purple':
        return 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-500';
      case 'green':
        return 'bg-green-500 hover:bg-green-600 focus:ring-green-500';
      case 'pink':
        return 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-500';
      case 'orange':
        return 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500';
      case 'blue':
      default:
        return 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500';
    }
  }, [accentColor]);
  
  const getBubbleStyleClasses = useCallback((isUser: boolean) => {
    const baseClasses = isUser 
      ? `${getAccentColorClasses()} text-white` 
      : `bg-muted text-foreground`;
    
    switch (bubbleStyle) {
      case 'rounded':
        return `${baseClasses} rounded-2xl px-4 py-2`;
      case 'classic':
        return `${baseClasses} rounded-md px-3 py-2`;
      case 'modern':
      default:
        return isUser 
          ? `${baseClasses} rounded-2xl rounded-tr-none px-4 py-2` 
          : `${baseClasses} rounded-2xl rounded-tl-none px-4 py-2`;
    }
  }, [bubbleStyle, getAccentColorClasses]);

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
      
      // Escape to close chat
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleCloseChat();
      }
      
      // Ctrl/Cmd + , to toggle settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',' && isOpen) {
        e.preventDefault();
        setShowSettings(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleCloseChat]);

  // Initialize speech recognition and synthesis with language support
  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    // Set support flags
    setVoiceSupported(!!SpeechRecognition);
    setSpeechSupported(!!speechSynthesis);
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'ru' ? 'ru-RU' : 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    if (speechSynthesis) {
      synthRef.current = speechSynthesis;
    }
    
    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [language]);
  
  // Toggle voice input
  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);
  
  // Speak message with language support
  const speakMessage = useCallback((text: string) => {
    if (!synthRef.current) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = language === 'ru' ? 'ru-RU' : 'en-US';
    
    // Try to find a voice that matches the language
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      const langVoices = voices.filter(voice => voice.lang.startsWith(language === 'ru' ? 'ru' : 'en'));
      
      if (langVoices.length > 0) {
        utterance.voice = langVoices[0];
      }
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [language]);

  // Initialize audio for notification sound
  useEffect(() => {
    if (typeof window !== 'undefined' && soundEnabled) {
      try {
        audioRef.current = new Audio(notificationSound);
        
        // Add error handling for the audio element
        audioRef.current.addEventListener('error', (e) => {
          console.error('Error loading notification sound:', e);
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
  }, [notificationSound, soundEnabled]);
  
  // Update language settings in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('chatLanguage');
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
        setLanguage(savedLanguage as Language);
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatLanguage', language);
      
      // Update welcome message when language changes
      if (messages.length > 0 && messages[0].id === 'welcome') {
        const updatedMessages = [...messages];
        updatedMessages[0] = {
          ...updatedMessages[0],
          content: t.welcome
        };
        setMessages(updatedMessages);
      }
    }
  }, [language]);

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
            playSoundOnNotification={soundEnabled}
            soundUrl={notificationSound}
            enableHapticFeedback={hapticEnabled}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={chatContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-0 right-0 z-50 flex flex-col rounded-lg border bg-background/80 backdrop-blur-sm shadow-xl md:bottom-6 md:right-6 md:h-[500px] md:w-[350px] h-full w-full"
            id="chat-container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            aria-describedby="chat-description"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex h-full flex-col"
            >
              <motion.div className="flex items-center justify-between border-b p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <h3 className="font-medium" id="chat-title">AI-assistant of Nikita</h3>
                <div className="flex items-center gap-2">
                  {/* Language toggle */}
                  <motion.button
                    onClick={() => setLanguage(prev => prev === 'en' ? 'ru' : 'en')}
                    className="rounded-full p-2 hover:bg-muted"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
                    title={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
                  >
                    <span className="font-bold text-sm">
                      {language === 'en' ? 'RU' : 'EN'}
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`rounded-full p-2 ${showSettings ? getAccentColorClasses() + ' text-white' : 'hover:bg-muted'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={showSettings ? `${t.close} ${t.settings} (Ctrl+,)` : `${t.settings} (Ctrl+,)`}
                    title={showSettings ? `${t.close} ${t.settings} (Ctrl+,)` : `${t.settings} (Ctrl+,)`}
                    aria-pressed={showSettings}
                    aria-controls="settings-panel"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleCloseChat}
                    className="rounded-full p-2 hover:bg-muted"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`${t.close} (Esc)`}
                    title={`${t.close} (Esc)`}
                  >
                    <Cross2Icon className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>

              <div id="chat-description" className="sr-only">
                Chat with Nikita's AI assistant. Use keyboard shortcuts: Escape to close, Ctrl+Comma to toggle settings.
              </div>

              <AnimatePresence mode="wait">
                {showSettings ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex-1 overflow-y-auto p-4"
                    id="settings-panel"
                    role="region"
                    aria-label="Chat settings"
                    tabIndex={0}
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">{t.accentColor}</h4>
                        <div className="flex gap-2">
                          {['blue', 'purple', 'green', 'pink', 'orange'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setAccentColor(color as any)}
                              className={`h-8 w-8 rounded-full transition-all ${
                                accentColor === color 
                                  ? 'ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110' 
                                  : 'hover:scale-110'
                              } ${
                                color === 'blue' ? 'bg-blue-500' :
                                color === 'purple' ? 'bg-purple-500' :
                                color === 'green' ? 'bg-green-500' :
                                color === 'pink' ? 'bg-pink-500' :
                                'bg-orange-500'
                              }`}
                              aria-label={`${color} theme`}
                              title={`${color} theme`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">{t.bubbleStyle}</h4>
                        <div className="flex flex-col gap-2">
                          {[
                            { id: 'modern', label: t.modern },
                            { id: 'rounded', label: t.rounded },
                            { id: 'classic', label: t.classic }
                          ].map((style) => (
                            <button
                              key={style.id}
                              onClick={() => setBubbleStyle(style.id as any)}
                              className={`text-left px-3 py-2 rounded-md transition-all ${
                                bubbleStyle === style.id 
                                  ? getAccentColorClasses() + ' text-white' 
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                            >
                              {style.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">{t.notificationSettings}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label htmlFor="sound-toggle" className="text-sm">
                              {t.notificationSound}
                            </label>
                            <button
                              id="sound-toggle"
                              onClick={() => setSoundEnabled(!soundEnabled)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                soundEnabled ? getAccentColorClasses() : 'bg-muted'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label htmlFor="haptic-toggle" className="text-sm">
                              {t.hapticFeedback}
                            </label>
                            <button
                              id="haptic-toggle"
                              onClick={() => setHapticEnabled(!hapticEnabled)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                hapticEnabled ? getAccentColorClasses() : 'bg-muted'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  hapticEnabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label htmlFor="history-toggle" className="text-sm">
                              {t.saveChatHistory}
                            </label>
                            <button
                              id="history-toggle"
                              onClick={() => setSaveChatHistory(!saveChatHistory)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                saveChatHistory ? getAccentColorClasses() : 'bg-muted'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  saveChatHistory ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          {notificationPermission !== 'granted' && (
                            <button
                              onClick={requestNotificationPermission}
                              className={`w-full mt-2 px-4 py-2 rounded-md ${getAccentColorClasses()} text-white`}
                            >
                              {t.enableBrowserNotifications}
                            </button>
                          )}
                          
                          {messages.length > 1 && (
                            <button
                              onClick={clearChatHistory}
                              className="w-full mt-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                            >
                              {t.clearChatHistory}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">{t.keyboardShortcuts}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>{t.toggleChat}</span>
                            <kbd className="px-2 py-1 bg-muted rounded-md font-mono text-xs">
                              {navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl'} + /
                            </kbd>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span>{t.toggleSettings}</span>
                            <kbd className="px-2 py-1 bg-muted rounded-md font-mono text-xs">
                              {navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl'} + ,
                            </kbd>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span>{t.closeChat}</span>
                            <kbd className="px-2 py-1 bg-muted rounded-md font-mono text-xs">
                              Esc
                            </kbd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 overflow-y-auto p-4"
                    role="log"
                    aria-live="polite"
                    aria-atomic="false"
                    aria-relevant="additions"
                  >
                    <AnimatePresence initial={false}>
                      {messages.map((message, index) => (
                        <ChatMessage
                          key={message.id}
                          {...message}
                          index={index}
                          bubbleClassName={getBubbleStyleClasses(message.role === 'user')}
                          onReactionAdd={(emoji) => addReaction(message.id, emoji)}
                          showReactions={!message.isTyping}
                          language={language}
                        />
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} tabIndex={-1} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>

              {!showSettings && (
                <>
                  <MessageInput
                    input={input}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                    onChange={(e) => setInput(e.target.value)}
                    inputRef={inputRef as React.RefObject<HTMLInputElement>}
                    accentColorClasses={getAccentColorClasses()}
                    isListening={isListening}
                    voiceSupported={voiceSupported}
                    onVoiceToggle={toggleVoiceInput}
                    placeholder={isListening 
                      ? language === 'ru' ? "Слушаю..." : "Listening..." 
                      : language === 'ru' ? "Введите сообщение..." : "Type your message..."
                    }
                    sendButtonLabel={language === 'ru' ? "Отправить" : "Send"}
                  />
                  
                  {/* Voice and accessibility controls - only show text-to-speech here */}
                  {speechSupported && messages.length > 0 && !messages[messages.length - 1].isTyping && (
                    <div className="flex items-center justify-between px-4 py-2 border-t">
                      <motion.button
                        onClick={() => speakMessage(messages[messages.length - 1].content)}
                        className={`rounded-full p-2 ${isSpeaking ? getAccentColorClasses() + ' text-white' : 'hover:bg-muted'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isSpeaking 
                          ? language === 'ru' ? "Остановить озвучивание" : "Stop speaking" 
                          : language === 'ru' ? "Озвучить последнее сообщение" : "Read last message aloud"
                        }
                        title={isSpeaking 
                          ? language === 'ru' ? "Остановить озвучивание" : "Stop speaking" 
                          : language === 'ru' ? "Озвучить последнее сообщение" : "Read last message aloud"
                        }
                        disabled={isSpeaking}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                      </motion.button>
                      
                      <div className="text-xs text-muted-foreground">
                        {isSpeaking && t.speaking}
                        {!isSpeaking && t.textToSpeechAvailable}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}