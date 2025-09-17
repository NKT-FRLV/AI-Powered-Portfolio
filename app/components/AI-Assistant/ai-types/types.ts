// Core types for AI Assistant components
import { tools } from '@/app/api/chat/tools';
import { InferUITools, UIDataTypes, UIMessage, UIMessagePart } from 'ai';


export type ChatTools = InferUITools<typeof tools>;

export type MyUIMessage = UIMessage<unknown, UIDataTypes, ChatTools>;
export type MyUIMessagePart = UIMessagePart<UIDataTypes, ChatTools>;
// Types for Chat Messages
// export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  role: MyUIMessage["role"];
  timestamp: Date;
  isTyping?: boolean;
  reactions?: string[];
}

// Adapter functions between our Message type and AI SDK UIMessage
export const messageToUIMessage = (message: Message): MyUIMessage => ({
  id: message.id,
  role: message.role,
  parts: [{ type: 'text', text: message.content }]
});

export const uiMessageToMessage = (uiMessage: MyUIMessage): Message => ({
  id: uiMessage.id,
  content: uiMessage.parts.find(part => part.type === 'text')?.text || '',
  role: uiMessage.role,
  timestamp: new Date(),
  isTyping: false,
  reactions: []
});

// Chat Container Types
export interface ChatContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Types for Chat Button Props
export interface ChatButtonProps {
  onMouseEnter: () => void;
  onClick: () => void;
  theme: string | undefined;
  isVisible?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  pulseEffect?: boolean;
  notificationCount?: number;
  showNotificationBadge?: boolean;
  playSoundOnNotification?: boolean;
  soundUrl?: string;
}


// Types for Settings
export interface ChatSettings {
  notificationSound: string;
  soundEnabled: boolean;
  saveChatHistory: boolean;
}
