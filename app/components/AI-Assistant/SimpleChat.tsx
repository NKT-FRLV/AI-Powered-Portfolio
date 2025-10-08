"use client";

import { useChat } from "@ai-sdk/react";
import {
	DefaultChatTransport,
	lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { useState, useCallback } from "react";
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
import { MyUIMessage } from "./ai-types/types";

const starterSuggestions = [
	"Give me a 30-second pitch",
	"Send Email to Nikita",
	"Show his top 3 projects",
	"What's his current tech stack?",
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

	const initialChatMessages = settings.saveChatHistory
		? (JSON.parse(
				localStorage.getItem("ai-chat-history") || "[]"
		  ) as MyUIMessage[])
		: [];

	const { messages, sendMessage, status, setMessages, addToolResult } =
		useChat<MyUIMessage>({
			messages: initialChatMessages,
			transport: new DefaultChatTransport({ api: "/api/chat" }),
			sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
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
			if (isLoading) return;
			sendMessage({ text: message });
		},
		[sendMessage, isLoading]
	);

	const clearHistory = useCallback(() => {
		setMessages([]);
		localStorage.removeItem("ai-chat-history");
	}, [setMessages]);

	const handleCloseChat = () => {
		setIsOpen(false);
		if (!settings.saveChatHistory) {
			localStorage.removeItem("ai-chat-history");
		} else {
			localStorage.setItem(
				"ai-chat-history",
				JSON.stringify(messages)
			);
		}
	}


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
						disabled={showSettings}
						onClick={() => setShowSettings(!showSettings)}
					>
						<Settings className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="lg"
						onClick={handleCloseChat}
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
							onClose={() => setShowSettings(false)}
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
													className={`font-geist-mono ${
														suggestion ===
														"Send Email to Nikita"
															? "border-blue-900/50 bg-blue-900/10"
															: ""
													}`}
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
									addToolResult={addToolResult}
								/>
							</>
						)}
						{status === "submitted" && <Loader size={32} />}
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>
			</div>

			{/* Input */}
			<ChatInput
				onSubmit={handleMessageSubmit}
				isLoading={isLoading}
				status={status}
			/>
		</motion.div>
	);
};

export default SimpleChat;
