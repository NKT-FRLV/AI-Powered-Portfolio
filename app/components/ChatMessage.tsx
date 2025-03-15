import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export interface ChatMessageProps {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
  index: number;
  bubbleClassName?: string;
  reactions?: string[];
  onReactionAdd?: (emoji: string) => void;
  showReactions?: boolean;
  language?: 'en' | 'ru';
}

export default function ChatMessage({
  id,
  content,
  role,
  timestamp,
  isTyping,
  index,
  bubbleClassName,
  reactions = [],
  onReactionAdd,
  showReactions = true,
  language = 'en',
}: ChatMessageProps) {
  const isUser = role === "user";
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  // Default bubble classes if no custom classes are provided
  const defaultBubbleClasses = isUser
    ? "bg-blue-500 text-white rounded-2xl rounded-tr-none px-4 py-2"
    : "bg-muted text-foreground rounded-2xl rounded-tl-none px-4 py-2";

  // Available reactions
  const availableReactions = ["👍", "❤️", "😂", "😮", "😢", "👏"];
  
  // Translations
  const translations = {
    en: {
      you: "You",
      assistant: "Assistant",
      isTyping: "Assistant is typing",
      sentAt: "Sent at",
      addReaction: "Add reaction",
      reactWith: (emoji: string) => `React with ${emoji}`,
      closeReactionPicker: "Close reaction picker",
      messageReactions: "Message reactions",
      reaction: (emoji: string) => `${emoji} reaction. Click to toggle.`
    },
    ru: {
      you: "Вы",
      assistant: "Ассистент",
      isTyping: "Ассистент печатает",
      sentAt: "Отправлено в",
      addReaction: "Добавить реакцию",
      reactWith: (emoji: string) => `Реагировать с ${emoji}`,
      closeReactionPicker: "Закрыть выбор реакций",
      messageReactions: "Реакции на сообщение",
      reaction: (emoji: string) => `Реакция ${emoji}. Нажмите, чтобы переключить.`
    }
  };
  
  const t = translations[language];
  
  // Format time with localization
  const formattedTime = format(timestamp, "HH:mm", {
    locale: language === 'ru' ? ru : undefined
  });

  return (
    <motion.div
      className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      role="listitem"
      aria-label={`${isUser ? t.you : t.assistant} at ${formattedTime}`}
    >
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div 
          className={`relative ${bubbleClassName || defaultBubbleClasses}`}
          onDoubleClick={() => showReactions && onReactionAdd && setShowReactionPicker(true)}
          tabIndex={0}
          role="article"
          aria-labelledby={`message-${id}-sender`}
          aria-describedby={`message-${id}-content message-${id}-time`}
        >
          <span id={`message-${id}-sender`} className="sr-only">
            {isUser ? t.you : t.assistant}
          </span>
          
          {isTyping ? (
            <div 
              className="flex items-center space-x-1"
              aria-label={t.isTyping}
              role="status"
            >
              <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-current"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-current"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          ) : (
            <div 
              className="whitespace-pre-wrap break-words"
              id={`message-${id}-content`}
            >
              {content}
            </div>
          )}
          
          {/* Reaction picker */}
          <AnimatePresence>
            {showReactionPicker && (
              <motion.div 
                className="absolute bottom-full left-0 mb-2 flex space-x-1 bg-background/80 backdrop-blur-sm p-1 rounded-full shadow-lg border"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.15 }}
                role="menu"
                aria-label={t.addReaction}
              >
                {availableReactions.map(emoji => (
                  <button
                    key={emoji}
                    className="hover:bg-muted p-1 rounded-full transition-colors"
                    onClick={() => {
                      onReactionAdd?.(emoji);
                      setShowReactionPicker(false);
                    }}
                    aria-label={t.reactWith(emoji)}
                    role="menuitem"
                  >
                    {emoji}
                  </button>
                ))}
                <button
                  className="hover:bg-muted p-1 rounded-full transition-colors text-xs"
                  onClick={() => setShowReactionPicker(false)}
                  aria-label={t.closeReactionPicker}
                  role="menuitem"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Display reactions */}
        {reactions.length > 0 && (
          <div 
            className="flex mt-1 space-x-1"
            aria-label={t.messageReactions}
          >
            {reactions.map((emoji, i) => (
              <motion.button
                key={`${emoji}-${i}`}
                className="bg-background/80 backdrop-blur-sm rounded-full px-1 border shadow-sm text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => onReactionAdd?.(emoji)}
                aria-label={t.reaction(emoji)}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        )}
        
        <div 
          className="mt-1 text-xs text-muted-foreground"
          id={`message-${id}-time`}
          aria-label={`${t.sentAt} ${formattedTime}`}
        >
          {formattedTime}
        </div>
      </div>
    </motion.div>
  );
} 