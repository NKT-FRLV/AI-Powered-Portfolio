"use client";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Message,
	MessageAvatar,
	MessageContent,
} from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { UIMessage } from "ai";

interface ChatMessagesProps {
	messages: UIMessage[];
	isThinking?: boolean;
	isOpen?: boolean;
	isReady?: boolean;
	sendMessage?: (message: string) => void;
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
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
						className="font-geist-sans text-sm font-medium md:font-bold md:text-lg"
					>
						{message.parts.map((part, i) => {
							// console.log(part.type);
							switch (part.type) {
								case "text": // we don't use any reasoning or tool calls in this example
									return (
										<Response key={`${message.id}-${i}`}>
											{part.text}
										</Response>
									);
								case "tool-sendEmail":
									return (
										<div key={`${message.id}-sendEmail`}>
											{JSON.stringify(part, null, 2)}
										</div>
									);

								default:
									return null;
							}
						})}
					</MessageContent>
					{message.role === "assistant" && (
						<MessageAvatar src={"/nf-logo.svg"} />
					)}
				</Message>
			))}

			{/* Loading indicator */}
			{/* {isThinking && (
          <Message from="assistant">
            <MessageContent>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium font-sans">AI responding</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            </MessageContent>
          </Message>
        )} */}
		</>
	);
};

ChatMessages.displayName = "ChatMessages";

export default ChatMessages;
