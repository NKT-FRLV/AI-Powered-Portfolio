"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleIcon, Cross2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import TypewriterText from "./TypewriterText";
import MessageSkeleton from "./MessageSkeleton";
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
  const initialMessages: Message[] = [
    {
      id: "welcome",
      content: "Hello! I am AI-assistant of Nikita. How can I help you today?",
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
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Прокрутка вниз при добавлении новых сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Фокус на поле ввода при открытии чата
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

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
      return <MessageSkeleton />;
    }
    
    if (message.role === "assistant") {
      return (
        <>
          <TypewriterText 
            text={message.content} 
            speed={30} 
            className="text-sm"
          />
          <p className="mt-1 text-right text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </>
      );
    }
    
    return (
      <>
        <p className="text-sm">{message.content}</p>
        <p className="mt-1 text-right text-xs opacity-70">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </>
    );
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg chat-button"
        aria-label="Open AI-assistant"
      >
        <ChatBubbleIcon className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-lg border bg-background shadow-xl chat-container"
          >
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-medium">AI-assistant of Nikita</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-muted"
                aria-label="Close"
              >
                <Cross2Icon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "chat-message-user text-primary-foreground"
                          : "chat-message-assistant"
                      }`}
                    >
                      {renderMessageContent(message)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="border-t p-4">
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
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 chat-button"
                  aria-label="Send"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PaperPlaneIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}