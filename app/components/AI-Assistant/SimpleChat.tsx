"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Settings, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "./hooks/useSettings";
import { useNotificationSound } from "./hooks/useNotificationSound";
import { Suggestions, Suggestion } from "./Suggestions";
import { AnimatePresence } from "framer-motion";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatSettingsPanel from "./ChatSettingsPanel";

interface SimpleChatProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const SimpleChat = ({ isOpen, setIsOpen }: SimpleChatProps) => {
	const [showSettings, setShowSettings] = useState(false);

	const { settings, updateSettings } = useSettings();

	const { playSound } = useNotificationSound({
		soundEnabled: settings.soundEnabled,
		soundUrl: settings.notificationSound,
	});

	const { messages, sendMessage, status, setMessages } = useChat({
		onFinish: () => {
			if (settings.soundEnabled) playSound();
		},
	});

	const isLoading = status === "streaming" || status === "submitted";
	const isThinking = status === "submitted";

	// Мемоизированные константы
	const starterSuggestions = useMemo(() => [
		"Tell me about Nikita's skills",
		"What projects has he worked on?",
		"Show me his experience",
		"What technologies does he use?",
	], []);

	// Стабильные колбеки для предотвращения ререндеров
	const handleSuggestionClick = useCallback((suggestion: string) => {
		sendMessage({ text: suggestion });
	}, [sendMessage]);

	const handleMessageSubmit = useCallback((message: string) => {
		sendMessage({ text: message });
	}, [sendMessage]);

	const clearHistory = useCallback(() => {
		setMessages([]);
	}, [setMessages]);

	// Очистка истории при изменении настройки saveChatHistory или при закрытии чата
	useEffect(() => {
		if (!settings.saveChatHistory && !isOpen) {
			// Если сохранение отключено и чат закрыт, очищаем историю
			setMessages([]);
		}
	}, [settings.saveChatHistory, isOpen, setMessages]);

	// Очистка истории при отключении сохранения (даже если чат открыт)
	useEffect(() => {
		if (!settings.saveChatHistory) {
			setMessages([]);
			// Также очищаем localStorage на случай если useChat использует его
			if (typeof window !== 'undefined') {
				localStorage.removeItem('ai-chat');
				localStorage.removeItem('ai-chat-messages');
				localStorage.removeItem('chat-messages');
			}
		}
	}, [settings.saveChatHistory, setMessages]);

	if (!isOpen) return null;

	return (
		<div className="fixed bottom-0 right-0 z-50 w-full h-full bg-background/95 backdrop-blur-sm border rounded-none md:rounded-lg shadow-xl flex flex-col">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b bg-muted/50">
				<h3 className="font-semibold">AI Assistant</h3>
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowSettings(!showSettings)}
					>
						<Settings className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setIsOpen(false)}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="relative flex-1 h-full w-full flex flex-col justify-between overflow-y-auto">
				<AnimatePresence initial={false}>
					{/* Settings Panel */}
					{showSettings && (
						<ChatSettingsPanel
							settings={settings}
							onUpdateSettings={updateSettings}
							onClearHistory={clearHistory}
						/>
					)}
				</AnimatePresence>
				
				{/* Show suggestions when no messages */}
				{messages.length === 0 && (
					<div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
						<div className="text-center space-y-2">
							<div className="flex items-center justify-center gap-2 mb-4">
								<Sparkles className="h-6 w-6 text-primary" />
								<h2 className="text-xl font-semibold">
									How can I help you today?
								</h2>
							</div>
							<p className="text-muted-foreground text-sm">
								Hi! I'm Nikita's AI assistant. Ask me anything
								about his skills, projects, or experience!
							</p>
						</div>

						<Suggestions className="w-full">
							{starterSuggestions.map((suggestion) => (
								<Suggestion
									key={suggestion}
									suggestion={suggestion}
									onClick={handleSuggestionClick}
								/>
							))}
						</Suggestions>
					</div>
				)}

				{/* Messages */}
				{messages.length > 0 && (
					<ChatMessages
						messages={messages}
						isThinking={isThinking}
						isOpen={isOpen}
					/>
				)}
			</div>
			
			{/* Input */}
			<ChatInput onSubmit={handleMessageSubmit} isLoading={isLoading} />
		</div>
	);
};

export default SimpleChat;
