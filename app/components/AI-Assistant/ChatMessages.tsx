"use client";

import React, { memo, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Response } from "./Response";
import { UIMessage } from "ai";

interface ChatMessagesProps {
  messages: UIMessage[];
  isThinking: boolean;
  isOpen: boolean;
}

const ChatMessages = memo(({ messages, isThinking, isOpen }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Оптимизированный скролл - только при изменении количества сообщений
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isOpen]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 chat-message ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted text-foreground rounded-tl-none"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap break-words font-medium leading-relaxed font-sans">
                {message.role === "user" ? (
                  message.parts?.find((part) => part.type === "text")?.text || ""
                ) : (
                  <Response className="font-sans">
                    {message.parts?.find((part) => part.type === "text")?.text || ""}
                  </Response>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-2xl rounded-tl-none px-4 py-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium font-sans">AI responding</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
});

ChatMessages.displayName = "ChatMessages";

export default ChatMessages;
