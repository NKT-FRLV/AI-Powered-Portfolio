import { ChangeEvent, FormEvent, RefObject } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

export interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  accentColorClasses?: string;
  isListening?: boolean;
  voiceSupported?: boolean;
  onVoiceToggle?: () => void;
  placeholder?: string;
  sendButtonLabel?: string;
}

export default function MessageInput({
  input,
  isLoading,
  onSubmit,
  onChange,
  inputRef,
  accentColorClasses = "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
  isListening = false,
  voiceSupported = false,
  onVoiceToggle,
  placeholder,
  sendButtonLabel = "Send"
}: MessageInputProps) {
  // Default placeholder text based on listening state
  const defaultPlaceholder = isListening ? "Listening..." : "Type your message...";
  
  return (
    <form 
      onSubmit={onSubmit} 
      className="border-t p-4"
      aria-label="Message input form"
      role="region"
    >
      <div className="flex items-center gap-2">
        {voiceSupported && (
          <motion.button
            type="button"
            onClick={onVoiceToggle}
            className={`rounded-full p-2 ${isListening ? accentColorClasses + ' text-white' : 'bg-muted hover:bg-muted/80'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            aria-pressed={isListening}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </motion.button>
        )}
        
        <input
          type="text"
          placeholder={placeholder || defaultPlaceholder}
          value={input}
          onChange={onChange}
          disabled={isLoading || isListening}
          ref={inputRef}
          className={`flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isListening ? 'border-blue-500 animate-pulse' : ''}`}
          aria-label="Message input"
          aria-disabled={isLoading || isListening}
          aria-required="true"
          autoComplete="off"
          spellCheck="true"
        />
        
        <button
          type="submit"
          disabled={isLoading || !input.trim() || isListening}
          className={`rounded-md p-2 text-white ${accentColorClasses} ${
            isLoading || !input.trim() || isListening ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label={sendButtonLabel}
          aria-disabled={isLoading || !input.trim() || isListening}
          title={sendButtonLabel}
        >
          <PaperPlaneIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
} 