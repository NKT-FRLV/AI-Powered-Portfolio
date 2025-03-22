import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { chatContainerVariants } from "./animations"
import { ChatContainerProps, Message } from "./types"
import ChatHeader from './components/ChatHeader'
import SettingsPanel from './components/SettingsPanel'
import VoiceControls from './components/VoiceControls'
import MessageInput from './MessageInput'
import ChatBody from "./components/ChatBody";
import { translations } from './translations'
import { useSettings } from './hooks/useSettings'
import { useChatHistory } from './hooks/useChatHistory'
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis'
import { useNotificationSound } from './hooks/useNotificationSound'
import { useOptimistic } from 'react'

const ChatContainer = ({ isOpen, setIsOpen }: ChatContainerProps) => {
  // Use a ref for initialMessages to keep it stable between renders
  const initialMessagesRef = useRef<Message[]>([
    {
      id: "welcome",
      content: translations.welcome,
      role: "assistant",
      timestamp: new Date(),
      isTyping: false,
    },
  ]);

  // State
  const [input, setInput] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const { settings, updateSettings } = useSettings();
  
  const { 
    messages, 
    setMessages, 
    addReaction,
    clearHistory: clearChatHistory
  } = useChatHistory({ 
    initialMessages: initialMessagesRef.current, 
    saveChatHistory: settings.saveChatHistory 
  });

  // Notification sound for new messages when chat is open
  const { playSound } = useNotificationSound({ 
    soundEnabled: settings.soundEnabled, 
    soundUrl: settings.notificationSound 
  });

  // Use optimistic state for immediate UI updates
  const [optimisticMessages, setOptimisticMessages] = useOptimistic<Message[]>(messages);

  // Check if we're currently loading a response
  const isLoading = useRef(false);

  const { isSpeaking, speechSupported, speakMessage } = useSpeechSynthesis();

  // Get bubble style classes
  const getBubbleStyleClasses = useCallback((isUser: boolean) => {
    const baseClasses = isUser 
      ? `bg-black text-white` 
      : `bg-muted text-foreground`;
    
    // Only modern angled style
    return isUser 
      ? `${baseClasses} rounded-2xl rounded-tr-none px-4 py-2` 
      : `${baseClasses} rounded-2xl rounded-tl-none px-4 py-2`;
  }, []);

  // Handle chat close
  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
    setInput("");
    
    if (!settings.saveChatHistory) {
      setMessages(initialMessagesRef.current);
    }
  }, [settings.saveChatHistory, setMessages, setIsOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [optimisticMessages, isOpen]);

  // Focus input field when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts when chat is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts when chat is open
      if (!isOpen) return;
      
      // Escape to close chat
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseChat();
      }
      
      // Ctrl/Cmd + , to toggle settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        setShowSettings(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleCloseChat]);

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    if (!input.trim() || isLoading.current) return;

    isLoading.current = true;

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

    // Add user message to state
    setOptimisticMessages([...messages, userMessage]);

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

      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString() + "-assistant",
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
        isTyping: false,
        reactions: []
      };
      
      // Update both optimistic and real messages
      const newMessages = [...messages, userMessage, assistantMessage];
      setMessages(newMessages);
      setOptimisticMessages(newMessages);
      
      // Play notification sound for new AI message
      playSound();
      
    } catch (error) {
      console.error("Error:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        content: translations.errorMessage,
        role: "assistant",
        timestamp: new Date(),
        isTyping: false,
        reactions: []
      };
      
      // Update both optimistic and real messages
      const newMessages = [...messages, userMessage, errorMessage];
      setMessages(newMessages);
      setOptimisticMessages(newMessages);
      
      // Play notification sound even on error
      playSound();
    } finally {
      isLoading.current = false;
    }
  };

  if (!isOpen) return null;

  return (
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
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="flex h-full flex-col"
          >
            <ChatHeader 
              showSettings={showSettings} 
              setShowSettings={setShowSettings}
              onClose={handleCloseChat}
              title="AI-assistant of Nikita"
            />

            <div id="chat-description" className="sr-only">
              Chat with Nikita's AI assistant. Use keyboard shortcuts: Escape to close, Ctrl+Comma to toggle settings.
            </div>

            <AnimatePresence mode="wait">
              {showSettings ? (
                <SettingsPanel 
                  settings={settings}
                  updateSettings={updateSettings}
                  clearChatHistory={clearChatHistory}
                  hasMessages={optimisticMessages.length > 1}
                />
              ) : (
                <ChatBody 
                  messages={optimisticMessages}
                  addReaction={addReaction}
                  messagesEndRef={messagesEndRef}
                  getBubbleStyleClasses={getBubbleStyleClasses}
                />
              )}
            </AnimatePresence>

            {!showSettings && (
              <>
                <MessageInput
                  input={input}
                  isLoading={isLoading.current}
                  onSubmit={handleSubmit}
                  onChange={(e) => setInput(e.target.value)}
                  inputRef={inputRef}
                  accentColorClasses="bg-black hover:bg-black/80 focus:ring-black"
                  placeholder={translations.inputPlaceholder}
                  sendButtonLabel={translations.send}
                />
                
                {/* Voice and accessibility controls */}
                {speechSupported && optimisticMessages.length > 0 && !optimisticMessages[optimisticMessages.length - 1].isTyping && (
                  <VoiceControls 
                    isSpeaking={isSpeaking}
                    speechSupported={speechSupported}
                    speakMessage={speakMessage}
                    currentMessage={optimisticMessages[optimisticMessages.length - 1].content}
                  />
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ChatContainer