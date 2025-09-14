"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useCallback, useEffect } from "react";
import { Settings, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "./hooks/useSettings";
import { useNotificationSound } from "./hooks/useNotificationSound";
import { Suggestions, Suggestion } from "./Suggestions";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "@/components/ai-elements/loader";
import {
	Conversation,
	ConversationContent,
	ConversationEmptyState,
	ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatSettingsPanel from "./ChatSettingsPanel";

// const starterSuggestions = [
// 	"Tell me about Nikita's skills",
// 	"What projects has he worked on?",
// 	"Show me his experience",
// 	"What technologies does he use?",
// ];
const starterSuggestions = [
	"Give me a 30-second pitch",
	"Show his top 3 projects",
	"What’s his current tech stack?",
	"How has he impacted business metrics?",
	"Create Nikitas CV",
];

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

	// Стабильные колбеки для предотвращения ререндеров
	const handleSuggestionClick = useCallback(
		(suggestion: string) => {
			sendMessage({ text: suggestion });
		},
		[sendMessage]
	);

	const handleMessageSubmit = useCallback(
		(message: string) => {
			sendMessage({ text: message });
		},
		[sendMessage]
	);

	const clearHistory = useCallback(() => {
		setMessages([]);
	}, [setMessages]);

	// Очистка истории при изменении настройки saveChatHistory или при закрытии чата
	useEffect(() => {
		if (!settings.saveChatHistory) {
			// Если сохранение отключено и чат закрыт, очищаем историю
			setMessages([]);
		}
	}, [settings.saveChatHistory, setMessages]);

	// Очистка истории при отключении сохранения (даже если чат открыт)
	useEffect(() => {
		if (!settings.saveChatHistory) {
			setMessages([]);
			// Также очищаем localStorage на случай если useChat использует его
			if (typeof window !== "undefined") {
				localStorage.removeItem("ai-chat");
				localStorage.removeItem("ai-chat-messages");
				localStorage.removeItem("chat-messages");
			}
		}
	}, [settings.saveChatHistory, setMessages]);

	// useEffect(() => {
	// 	if (isOpen) {
	// 		document.body.style.overflow = 'hidden';
	// 	} else {
	// 		document.body.style.overflow = 'unset';
	// 	}

	// 	// Cleanup при размонтировании компонента
	// 	return () => {
	// 		document.body.style.overflow = 'unset';
	// 	};
	// }, [isOpen]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 500 }}
			className="fixed inset-0 z-50 w-full h-full bg-background/95 backdrop-blur-sm border rounded-none md:rounded-lg shadow-xl flex flex-col"
		>
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b bg-muted/50">
				<h3 className="font-semibold">AI Assistant</h3>
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="lg"
						onClick={() => setShowSettings(!showSettings)}
					>
						<Settings className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="lg"
						onClick={() => setIsOpen(false)}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Show dropdown menu */}
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

				{/* Show messages in conversation */}
				<Conversation
					className="relative w-full h-full"
					style={{ height: "500px" }}
				>
					<ConversationContent>
						{messages.length === 0 ? (
							<ConversationEmptyState className="absolute inset-0">
								<div className="flex-1 flex h-full flex-col items-center justify-center p-8 space-y-6">
									<div className="text-center space-y-2">
										<div className="flex items-center justify-center gap-2 mb-4">
											<Sparkles className="h-6 w-6 text-primary" />
											<h2 className="text-xl font-semibold">
												Feel free to ask anything about
												Nikita
											</h2>
											<Sparkles className="h-6 w-6 text-primary" />
										</div>
										<p className="text-muted-foreground text-sm">
											I’m your guide to his skills,
											projects, and impact.
										</p>
									</div>

									<Suggestions className="w-full">
										{starterSuggestions.map(
											(suggestion) => (
												<Suggestion
													key={suggestion}
													suggestion={suggestion}
													className="font-geist-sans"
													onClick={
														handleSuggestionClick
													}
												/>
											)
										)}
									</Suggestions>
								</div>
							</ConversationEmptyState>
						) : (
							// Main messages in conversation
							<>
								<ChatMessages
									messages={messages}
									// sendMessage={handleSuggestionClick}
									isReady={status === "ready"}
									isThinking={isThinking}
									isOpen={isOpen}
								/>
							</>
						)}
						{status === "submitted" && <Loader size={32} />}
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>
			</div>

			{/* Input */}
			<ChatInput onSubmit={handleMessageSubmit} isLoading={isLoading} status={status} />
		</motion.div>
	);
};

export default SimpleChat;
