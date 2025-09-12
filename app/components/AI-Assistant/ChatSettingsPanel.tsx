"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChatSettings } from "./types";

interface ChatSettingsPanelProps {
  settings: ChatSettings;
  onUpdateSettings: (newSettings: Partial<ChatSettings>) => void;
  onClearHistory: () => void;
}

const ChatSettingsPanel = memo(({ settings, onUpdateSettings, onClearHistory }: ChatSettingsPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: -10 }}
      exit={{ opacity: 0, y: -100 }}
      className="absolute top-0 right-0 left-0 p-4 border-b bg-black/95 space-y-3 z-10"
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Sound notifications</label>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onUpdateSettings({
              soundEnabled: !settings.soundEnabled,
            })
          }
        >
          {settings.soundEnabled ? "On" : "Off"}
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Save chat history</label>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onUpdateSettings({
              saveChatHistory: !settings.saveChatHistory,
            })
          }
        >
          {settings.saveChatHistory ? "On" : "Off"}
        </Button>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={onClearHistory}
        className="w-full"
      >
        Clear History
      </Button>
    </motion.div>
  );
});

ChatSettingsPanel.displayName = "ChatSettingsPanel";

export default ChatSettingsPanel;
