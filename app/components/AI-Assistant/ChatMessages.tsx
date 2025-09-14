"use client";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Message,
	MessageAvatar,
	MessageContent,
} from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Button } from "@/components/ui/button";
import { UIMessage } from "ai";

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
						className="font-geist-sans text-sm font-medium md:font-bold md:text-lg"
					>
						{message.parts.map((part, i) => {
							switch (part.type) {
								case "text":
									return (
										<Response key={`${message.id}-${i}`}>
											{part.text}
										</Response>
									);

								case "tool-askForConfirmation": {
									// part.args — то, что модель передала в tool (to, subject, text, html?)
									// part.state: 'call-arguments' | 'calling' | 'output-available'
									const awaiting =
										part.state !== "output-available";
									
									return (
										<div
											key={part.toolCallId}
											className="my-3 rounded-lg border p-4 w-fit"
										>
											<div className="flex items-center gap-2 text-sm font-medium mb-3 w-fit">
												<span>📧</span>
												<span>Confirm Email Sending</span>
											</div>
											<div className="space-y-2 text-sm">
											
											</div>

											{awaiting ? (
												<div className="mt-4 flex gap-3">
													<Button
														size="sm"
														className="cursor-pointer bg-green-600 hover:bg-green-700 text-white"
														onClick={() =>
															addToolResult?.({
																tool: "askForConfirmation",
																toolCallId:
																	part.toolCallId,
																output: {
																	confirmed:
																		true,
																},
															})
														}
													>
														<span className="mr-1">✅</span>
														Send Email
													</Button>
													<Button
														size="sm"
														className="cursor-pointer"
														variant="outline"
														onClick={() =>
															addToolResult?.({
																tool: "askForConfirmation",
																toolCallId:
																	part.toolCallId,
																output: {
																	confirmed:
																		false,
																	reason: "User cancelled",
																},
															})
														}
													>
														<span className="mr-1">❌</span>
														Cancel
													</Button>
												</div>
											) : (
												<div className="mt-3 p-2 bg-gray-100 rounded text-xs text-gray-600">
													<span className="font-medium">Status:</span>{" "}
													{(part as any).output?.confirmed ? (
														<span className="text-green-600">✅ Confirmed - Email will be sent</span>
													) : (
														<span className="text-red-600">❌ Cancelled by user</span>
													)}
												</div>
											)}
										</div>
									);
								}

								case "tool-sendEmail": {
									const output = (part as any).output;
									const isSuccess = typeof output === 'string' && output.includes('successfully');
									return (
										<div
											key={`${message.id}-sendEmail`}
											className={`my-3 rounded-lg border p-3 w-fit ${
												isSuccess 
													? 'border-green-200/50 text-green-800' 
													: 'border-red-200/50 text-red-800'
											}`}
										>
											<div className="text-xs uppercase text-muted-foreground mb-1">
												Email Status
											</div>
											<div className="text-sm">
												{isSuccess ? '✅ Email sent successfully!' : '❌ Failed to send email'}
											</div>
											{output && (
												<div className="text-xs mt-1 opacity-75">
													{output}
												</div>
											)}
										</div>
									);
								}

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

		</>
	);
};

ChatMessages.displayName = "ChatMessages";

export default ChatMessages;
