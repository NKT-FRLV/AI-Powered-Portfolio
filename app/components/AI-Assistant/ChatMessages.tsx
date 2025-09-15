"use client";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Message,
	MessageAvatar,
	MessageContent,
} from "@/components/ai-elements/message";
import { UIMessage } from "ai";
import MessageCase from "./MessageCase";

interface ChatMessagesProps {
	messages: UIMessage[];
	isThinking?: boolean;
	isOpen?: boolean;
	isReady?: boolean;
	sendMessage?: (message: string) => void;
	addToolResult?: (args: {
		tool: string;
		toolCallId: string;
		output: unknown;
	}) => void;
}

const ChatMessages = ({ messages, addToolResult }: ChatMessagesProps) => {
	return (
		<>
			{messages.map((message) => (
				<Message
					from={message.role}
					key={message.id}
					className="flex items-start"
				>
					<MessageContent
						variant="flat"
						className="relative font-geist-sans text-sm font-medium md:font-bold md:text-lg"
					>
						{message.role === "assistant" && (
							// Avatar for mobile
							<MessageAvatar
								className="md:hidden"
								src={"/nf-logo.svg"}
							/>
						)}
						{message.parts.map((part, i) => (
							<MessageCase
								key={`${message.id}-${i}`}
								part={part}
								messageId={message.id}
								partIndex={i}
								addToolResult={addToolResult}
							/>
						))}
					</MessageContent>
					{message.role === "assistant" && (
						// Avatar for desktop
						<MessageAvatar
							className="hidden md:block"
							src={"/nf-logo.svg"}
						/>
					)}
				</Message>
			))}
		</>
	);
};

ChatMessages.displayName = "ChatMessages";

export default ChatMessages;
