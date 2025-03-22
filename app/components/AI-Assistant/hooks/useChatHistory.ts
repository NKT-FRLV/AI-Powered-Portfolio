import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types';

interface UseChatHistoryOptions {
  initialMessages: Message[];
  saveChatHistory: boolean;
}

/**
 * Custom hook for managing chat history
 */
export function useChatHistory({ initialMessages, saveChatHistory }: UseChatHistoryOptions) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  
  // Load saved chat history on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && saveChatHistory) {
      const savedChatHistory = localStorage.getItem('chatHistory');
      
      if (savedChatHistory) {
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
    }
  }, [saveChatHistory]);
  
  // Save chat history when messages change
  useEffect(() => {
    if (typeof window !== 'undefined' && saveChatHistory && messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages, saveChatHistory]);
  
  // Function to add a message
  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);
  
  // Function to update a message
  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === id ? { ...message, ...updates } : message
      )
    );
  }, []);
  
  // Function to clear chat history
  const clearHistory = useCallback(() => {
    setMessages(initialMessages);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatHistory');
    }
  }, [initialMessages]);
  
  // Function to add a reaction to a message
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
  }, []);

  return {
    messages,
    setMessages,
    addMessage,
    updateMessage,
    clearHistory,
    addReaction
  };
} 