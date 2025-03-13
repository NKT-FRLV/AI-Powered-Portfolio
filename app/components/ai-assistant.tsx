"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useOptimistic } from "../hooks/useOptimistic";
import ChatButton from "./ChatButton";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";

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
  
  const { 
    state: messages, 
    setState: setMessages, 
    isLoading
  } = useOptimistic<Message[]>(initialMessages);
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleCloseChat = () => {
    setIsOpen(false);
    setInput("");
    setMessages(initialMessages);
  };

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("Error when receiving a response from the assistant");
      }

      const data = await response.json();

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

  const chatContainerVariants = {
    initial: { 
      opacity: 0,
      y: "100%",
      scale: 1
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
      y: "100%",
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen && (
          <ChatButton onClick={() => setIsOpen(true)} theme={currentTheme} />
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
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col"
            >
              <motion.div className="flex items-center justify-between border-b p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <h3 className="font-medium">AI-assistant of Nikita</h3>
                <motion.button
                  onClick={handleCloseChat}
                  className="rounded-full p-2 hover:bg-muted"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close"
                >
                  <Cross2Icon className="h-5 w-5" />
                </motion.button>
              </motion.div>

              <motion.div className="flex-1 overflow-y-auto p-4">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      {...message}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </motion.div>

              <MessageInput
                input={input}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onChange={(e) => setInput(e.target.value)}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}