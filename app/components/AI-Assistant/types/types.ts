// Core types for AI Assistant components
import { UIMessage } from 'ai';

// Types for Chat Messages
export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  isTyping?: boolean;
  reactions?: string[];
}

// Adapter functions between our Message type and AI SDK UIMessage
export const messageToUIMessage = (message: Message): UIMessage => ({
  id: message.id,
  role: message.role,
  parts: [{ type: 'text', text: message.content }]
});

export const uiMessageToMessage = (uiMessage: UIMessage): Message => ({
  id: uiMessage.id,
  content: uiMessage.parts.find(part => part.type === 'text')?.text || '',
  role: uiMessage.role as MessageRole,
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
