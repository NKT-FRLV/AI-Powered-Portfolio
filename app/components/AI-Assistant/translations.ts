export const translations = {
  // Main AI Assistant
  welcome: "Hello! I am AI-assistant of Nikita. How can I help you today?",
  settings: "Settings",
  close: "Close",
  notificationSettings: "Notification Settings",
  notificationSound: "Notification Sound",
  saveChatHistory: "Save Chat History",
  clearChatHistory: "Clear Chat History",
  keyboardShortcuts: "Keyboard Shortcuts",
  toggleChat: "Toggle chat",
  toggleSettings: "Toggle settings",
  closeChat: "Close chat",
  textToSpeechAvailable: "Text-to-speech available",
  speaking: "Speaking...",
  stopSpeaking: "Stop speaking",
  readAloud: "Read message aloud",
  newMessages: (count: number) => `You have ${count} new ${count === 1 ? 'message' : 'messages'}`,
  errorMessage: "Sorry, an error occurred. Please try again later.",
  
  // Chat Message Component
  you: "You",
  assistant: "Assistant",
  isTyping: "Assistant is typing",
  sentAt: "Sent at",
  addReaction: "Add reaction",
  reactWith: (emoji: string) => `React with ${emoji}`,
  closeReactionPicker: "Close reaction picker",
  messageReactions: "Message reactions",
  reaction: (emoji: string) => `${emoji} reaction. Click to toggle.`,
  
  // Message Input
  listenPlaceholder: "Listening...",
  inputPlaceholder: "Type your message...",
  startVoiceInput: "Start voice input",
  stopListening: "Stop listening",
  send: "Send"
}; 