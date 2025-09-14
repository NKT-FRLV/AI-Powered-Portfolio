"use client";

import { ChatStatus } from "ai";
import {
	PromptInput,
	// PromptInputActionAddAttachments,
	// PromptInputActionMenu,
	// PromptInputActionMenuContent,
	// PromptInputActionMenuItem,
	// PromptInputActionMenuTrigger,
	PromptInputBody,
	PromptInputMessage,
	// PromptInputButton,
	// PromptInputMessage,
	PromptInputSubmit,
	PromptInputTextarea,
	// PromptInputToolbar,
	// PromptInputTools,
} from "@/components/ai-elements/prompt-input";
// import { Suggestion, Suggestions } from "./Suggestions";
import { useState } from "react";
// import { Button } from "@/components/ui/button";

interface ChatInputProps {
	onSubmit: (message: string) => void;
	isLoading: boolean;
	status: ChatStatus;
}

const ChatInput = ({ onSubmit, isLoading, status }: ChatInputProps) => {
	const [ text, setText ] = useState<string>("");
	// const [showSuggestions, setShowSuggestions] = useState(false);

	const handleSubmit = (message: PromptInputMessage) => {
		// Пока не обрабатываем файлы
		const hasText = Boolean(message.text);
    	// const hasAttachments = Boolean(message.files?.length);

		if (!hasText) return;
		onSubmit(message.text as string);
		setText("");
	};

	return (
		<div className="p-4 border-t">
			{/* <div className="flex items-center gap-2">
			<Button onClick={() => setShowSuggestions(!showSuggestions)} variant="outline">
				{showSuggestions ? "Hide suggestions" : "Show suggestions"}
			</Button>
			{showSuggestions && <Suggestions className="w-full">
				{[
					"Give me a 30-second pitch",
					"Show top 3 projects",
					"What’s his current tech stack?"
				].map((suggestion) => (
					<Suggestion
						key={suggestion}
						className="font-geist-sans"
						suggestion={suggestion}
						disabled={isLoading}
						onClick={onSubmit}
					/>
				))}
			</Suggestions>}
			</div> */}
			<PromptInput
				onSubmit={handleSubmit}
				className="relative w-full flex items-center gap-2 px-4"
			>
				<PromptInputBody className="w-full flex-1 flex items-center">
					<PromptInputTextarea value={text} onChange={(e) => setText(e.target.value)} />
				</PromptInputBody>
				{/* <PromptInputToolbar> */}
				{/* <PromptInputTools> */}
				{/* <PromptInputActionMenu>
			  <PromptInputActionMenuTrigger />
			  <PromptInputActionMenuContent>
				<PromptInputActionAddAttachments />
			  </PromptInputActionMenuContent>
			</PromptInputActionMenu> */}
				{/* </PromptInputTools> */}
				<PromptInputSubmit disabled={isLoading || text.length === 0} status={status} />
				{/* </PromptInputToolbar> */}
			</PromptInput>
		</div>
	);
};

export default ChatInput;
