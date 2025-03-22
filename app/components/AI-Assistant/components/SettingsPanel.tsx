import { motion } from 'framer-motion';
import { translations } from '../translations';
import { SettingsPanelProps } from '../types';

/**
 * Settings panel component for the chat interface
 */
const SettingsPanel = ({ 
  settings, 
  updateSettings, 
  clearChatHistory,
  hasMessages 
}: SettingsPanelProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex-1 overflow-y-auto p-4"
      id="settings-panel"
      role="region"
      aria-label="Chat settings"
      tabIndex={0}
    >
      <div className="space-y-6">                      
        <div>
          <h4 className="text-sm font-medium mb-2">{translations.notificationSettings}</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="sound-toggle" className="text-sm">
                {translations.notificationSound}
              </label>
              <button
                id="sound-toggle"
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-black' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="history-toggle" className="text-sm">
                {translations.saveChatHistory}
              </label>
              <button
                id="history-toggle"
                onClick={() => updateSettings({ saveChatHistory: !settings.saveChatHistory })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.saveChatHistory ? 'bg-black' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.saveChatHistory ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {hasMessages && (
              <button
                onClick={clearChatHistory}
                className="w-full mt-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                {translations.clearChatHistory}
              </button>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">{translations.keyboardShortcuts}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>{translations.toggleChat}</span>
              <kbd className="px-2 py-1 bg-muted rounded-md font-mono text-xs">
                {navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl'} + /
              </kbd>
            </div>
            
            <div className="flex items-center justify-between">
              <span>{translations.toggleSettings}</span>
              <kbd className="px-2 py-1 bg-muted rounded-md font-mono text-xs">
                {navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl'} + ,
              </kbd>
            </div>
            
            <div className="flex items-center justify-between">
              <span>{translations.closeChat}</span>
              <kbd className="px-2 py-1 bg-muted rounded-md font-mono text-xs">
                Esc
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPanel; 