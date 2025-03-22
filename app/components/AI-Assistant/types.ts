import { RefObject, ChangeEvent, FormEvent } from "react";

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

// Types for Chat Message Props
export interface ChatMessageProps {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  isTyping?: boolean;
  index: number;
  bubbleClassName: string;
  reactions?: string[];
  onReactionAdd?: (emoji: string) => void;
  showReactions?: boolean;
}

// Types for Message Input Props
export interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  accentColorClasses?: string;
  isListening?: boolean;
  voiceSupported?: boolean;
  onVoiceToggle?: () => void;
  placeholder?: string;
  sendButtonLabel?: string;
}

// Types for Settings
export interface ChatSettings {
  notificationSound: string;
  soundEnabled: boolean;
  saveChatHistory: boolean;
}

// Types for Chat Header Props
export interface ChatHeaderProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  onClose: () => void;
  title: string;
}

// Types for Settings Panel Props
export interface SettingsPanelProps {
  settings: ChatSettings;
  updateSettings: (settings: Partial<ChatSettings>) => void;
  clearChatHistory: () => void;
  hasMessages: boolean;
}

// Types for Voice Controls Props
export interface VoiceControlsProps {
  isSpeaking: boolean;
  speechSupported: boolean;
  speakMessage: (text: string) => void;
  currentMessage: string;
} 