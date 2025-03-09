"use client";

import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cross2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { SiOpenai } from "react-icons/si";
import { useTheme } from "next-themes";
// Ленивая загрузка компонентов, которые не нужны при первоначальном рендеринге
const TypewriterText = lazy(() => import("./TypewriterText"));
const MessageSkeleton = lazy(() => import("./MessageSkeleton"));
import { useOptimistic } from "../hooks/useOptimistic";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
};

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  const initialMessages: Message[] = [
    {
      id: "welcome",
      content: "Hello! I am AI-assistant of Nikita. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
      isTyping: false,
    },
  ];
  
  // Используем ленивую инициализацию состояния для оптимизации
  const { 
    state: messages, 
    setState: setMessages, 
    isLoading
  } = useOptimistic<Message[]>(initialMessages);
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Прокрутка вниз при добавлении новых сообщений
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Фокус на поле ввода при открытии чата
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleCloseChat = () => {
    setIsOpen(false);
    setInput("");
    setMessages(initialMessages);
  }

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
      isTyping: false,
    };

    const userInput = input;
    setInput("");

    // Добавляем сообщение пользователя и индикатор печати
    setMessages([...messages, userMessage, {
      id: Date.now().toString() + "-typing",
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isTyping: true,
    }]);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("Error when receiving a response from the assistant");
      }

      const data = await response.json();

      // Заменяем индикатор печати на реальное сообщение
      setMessages(prev => {
        const newMessages = [...prev];
        const typingIndex = newMessages.findIndex(msg => msg.isTyping);
        
        if (typingIndex !== -1) {
          newMessages[typingIndex] = {
            id: Date.now().toString() + "-assistant",
            content: data.message,
            role: "assistant",
            timestamp: new Date(),
            isTyping: false,
          };
        }
        
        return newMessages;
      });
    } catch (error) {
      console.error("Error:", error);
      
      // Заменяем индикатор печати на сообщение об ошибке
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
          };
        }
        
        return newMessages;
      });
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.isTyping) {
      return (
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          <MessageSkeleton />
        </Suspense>
      );
    }
    
    return (
      <Suspense fallback={<div>{message.content}</div>}>
        <TypewriterText text={message.content} />
      </Suspense>
    );
  };

  const chatButtonClass = currentTheme === 'dark' 
    ? "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg chat-button hover:shadow-2xl border-2 border-white/20"
    : "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-black shadow-lg chat-button hover:shadow-2xl border-2 border-black/20";

  // Варианты анимации для кнопки и чата
  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      } 
    },
    exit: { 
      scale: 0,
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
    },
    tap: { scale: 0.9 }
  };

  const chatContainerVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Анимация для содержимого чата
  const chatContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  // Анимация для элементов внутри чата
  const chatItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="chat-button"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsOpen(true)}
            className={chatButtonClass}
            aria-label="Open AI-assistant"
          >
            <SiOpenai className="h-8 w-8" />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(var(--foreground-rgb), 0.2)",
                  "0 0 0 10px rgba(var(--foreground-rgb), 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chat-container"
            variants={chatContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-lg border bg-background shadow-xl chat-container"
          >
            <motion.div 
              variants={chatContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex h-full flex-col"
            >
              <motion.div 
                variants={chatItemVariants}
                className="flex items-center justify-between border-b p-4"
              >
                <h3 className="font-medium">AI-assistant of Nikita</h3>
                <button
                  onClick={handleCloseChat}
                  className="rounded-full p-1 hover:bg-muted"
                  aria-label="Close"
                >
                  <Cross2Icon className="h-4 w-4" />
                </button>
              </motion.div>

              <motion.div 
                variants={chatItemVariants}
                className="flex-1 overflow-y-auto p-4"
              >
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={`message-${message.id}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          delay: index * 0.1,
                          duration: 0.3
                        }
                      }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      } message-slide-in`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "chat-message-user"
                            : "chat-message-assistant"
                        }`}
                      >
                        {renderMessageContent(message)}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </motion.div>

              <motion.form 
                variants={chatItemVariants}
                onSubmit={handleSubmit} 
                className="border-t p-4"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write a message..."
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 chat-input"
                    disabled={isLoading}
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium dark:bg-white dark:text-black bg-black text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    aria-label="Send"
                    whileHover={{ 
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      opacity: input.trim() ? 1 : 0.5,
                      scale: input.trim() ? 1 : 0.95,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      animate={{ 
                        x: input.trim() ? [0, 5, 0] : 0 
                      }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: input.trim() ? Infinity : 0, 
                        repeatDelay: 3 
                      }}
                    >
                      <PaperPlaneIcon className="h-4 w-4 transition-colors duration-200" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}