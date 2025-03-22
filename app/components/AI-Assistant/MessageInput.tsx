import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { MessageInputProps } from "./types";

export default function MessageInput({
  input,
  isLoading,
  onSubmit,
  onChange,
  inputRef,
  accentColorClasses = "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
  placeholder,
  sendButtonLabel = "Send"
}: MessageInputProps) {


  
  return (
    <form 
      onSubmit={onSubmit} 
      className="border-t p-4"
      aria-label="Message input form"
      role="region"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={placeholder || "Type your message..."}
          value={input}
          onChange={onChange}
          disabled={isLoading}
          ref={inputRef}
          className={'flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'}
          aria-label="Message input"
          aria-disabled={isLoading}
          aria-required="true"
          autoComplete="off"
          spellCheck="true"
        />
        
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`rounded-md p-2 text-white ${accentColorClasses} ${
            isLoading || !input.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label={sendButtonLabel}
          aria-disabled={isLoading || !input.trim()}
          title={sendButtonLabel}
        >
          <PaperPlaneIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
} 