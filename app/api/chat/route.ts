import { NextResponse } from "next/server";
import { systemMessageWithNikitaData } from "./data";
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { MyUIMessage } from "@/app/components/AI-Assistant/ai-types/types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { tools } from "./tools";

const model = process.env.CHAT_MODEL || "deepseek/deepseek-chat-v3.1:free";

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 10;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		// console.log('Received body:', JSON.stringify(body, null, 2));

		// Handle useChat format
		const messages: MyUIMessage[] = body.messages || [];

		if (!Array.isArray(messages)) {
			console.error("Messages is not an array:", messages);
			return NextResponse.json(
				{ error: "Invalid messages format" },
				{ status: 400 }
			);
		}
		console.log("Last message", JSON.stringify(messages[messages.length - 1], null, 2));
		
		// Гвоздь программы streamText =)
		const response = streamText({
			model: openrouter.chat(model),
			system: systemMessageWithNikitaData,
			messages: convertToModelMessages(messages),
			tools,
			toolChoice: "auto",
			stopWhen: stepCountIs(8), // Позволяем до 8 шагов для цепочки askForConfirmation -> sendEmail
		});

		// console.log("response ai", response);

		return response.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Error processing request to AI assistant:", error);
		return NextResponse.json(
			{ error: "An error occurred while processing the request" },
			{ status: 500 }
		);
	}
}
