"use client";

import { Response } from "@/components/ai-elements/response";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ai-elements/loader";
import { UIMessage } from "ai";

interface MessageCaseProps {
	part: UIMessage["parts"][0];
	messageId: string;
	partIndex: number;
	addToolResult?: (args: {
		tool: string;
		toolCallId: string;
		output: unknown;
	}) => void;
}

const MessageCase = ({ part, messageId, partIndex, addToolResult }: MessageCaseProps) => {

	switch (part.type) {
		case "text":
			return (
				<Response key={`${messageId}-${partIndex}`}>
					{part.text}
				</Response>
			);

		case "tool-askForConfirmation": {
			// part.args — то, что модель передала в tool (fromEmail, fromName, subject, text, html?)
			// part.state: 'call-arguments' | 'calling' | 'output-available'
			const awaiting = part.state === "input-streaming" || part.state === "input-available";
			const input = (part as any).input ?? {};
			
			return (
				<div
					key={part.toolCallId}
					className="my-3 rounded-lg border p-4 w-fit shadow-sm border-foreground-200/50"
				>
					<div className="flex items-center gap-2 text-sm font-medium mb-3 w-fit">
						<span>📧</span>
						<span>Confirm Email Sending</span>
					</div>
					<div className="space-y-2 text-sm">
						<div className="flex items-start gap-2">
							<span className="font-medium text-foreground-700 min-w-[60px]">From:</span>
							<span className="text-foreground-900">
								{input.fromName || "Anonymous"} 
								{input.fromEmail && ` <${input.fromEmail}>`}
							</span>
						</div>
						<div className="flex items-start gap-2">
							<span className="font-medium text-foreground-700 min-w-[60px]">To:</span>
							<span className="text-foreground-900">marbella.frolov@gmail.com</span>
						</div>
						<div className="flex items-start gap-2">
							<span className="font-medium text-foreground-700 min-w-[60px]">Subject:</span>
							<span className="text-foreground-900">{input.subject}</span>
						</div>
						<div className="mt-3">
							<span className="font-medium text-foreground-700 block mb-1">Message:</span>
							<div className="whitespace-pre-wrap text-xs bg-background p-3 rounded border text-foreground-800">
								{input.text}
							</div>
						</div>
					</div>

					{awaiting ? (
						<div className="mt-4 flex gap-3">
							<Button
								size="sm"
								className="cursor-pointer bg-green-600 hover:bg-green-700 text-white"
								onClick={() =>
									addToolResult?.({
										tool: "askForConfirmation",
										toolCallId: part.toolCallId,
										output: {
											confirmed: true,
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
										toolCallId: part.toolCallId,
										output: {
											confirmed: false,
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
						<div className="mt-3 p-2 rounded text-xs text-foreground-600">
							<span className="font-medium">Status:</span>{" "}
							{(part as any).output?.confirmed ? (
								<span className="text-green-600">✅ Confirmed - AI will now send the email automatically</span>
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
			const isPending = part.state === "input-streaming" || part.state === "input-available";
			const isSuccess = typeof output === 'string' && output.includes('successfully');
			
			return (
				<div
					key={`${messageId}-sendEmail`}
					className={`my-3 rounded-lg border p-3 w-fit shadow-sm ${
						isPending 
							? 'border-foreground-200/50 text-gray-600' 
							: isSuccess 
								? 'border-green-200/50 text-green-800' 
								: 'border-red-200/50 text-red-800'
					}`}
				>
					<div className="text-xs uppercase text-muted-foreground mb-1">
						Email Status
					</div>
					<div className="text-sm flex items-center gap-2">
						{isPending ? (
							<>
								<Loader size={16} />
								<span>Sending email...</span>
							</>
						) : isSuccess ? (
							<>
								<span>✅</span>
								<span>Email sent successfully!</span>
							</>
						) : (
							<>
								<span>❌</span>
								<span>Failed to send email</span>
							</>
						)}
					</div>
					{output && !isPending && (
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
};

MessageCase.displayName = "MessageCase";

export default MessageCase;
