import React from 'react';
import { motion } from 'framer-motion';
import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  isLoading,
  onSubmit,
  onChange,
  inputRef
}) => {
  const buttonVariants = {
    idle: { scale: 0.95, opacity: 0.5 },
    active: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const planeIconVariants = {
    animate: {
      x: input.trim() ? [0, 5, 0] : 0,
      transition: {
        duration: 0.5,
        repeat: input.trim() ? Infinity : 0,
        repeatDelay: 3
      }
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="border-t p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={onChange}
          placeholder="Write a message..."
          className="flex-1 rounded-md border border-input bg-background/80 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium dark:bg-white dark:text-black bg-black text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          variants={buttonVariants}
          initial="idle"
          animate={input.trim() ? "active" : "idle"}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div variants={planeIconVariants} animate="animate">
            <PaperPlaneIcon className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </div>
    </motion.form>
  );
};

export default MessageInput; 