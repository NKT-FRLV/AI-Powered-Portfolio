import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail, ContactInput } from "@/lib/resend";
import {
	skills,
	projects,
	myEducation,
	languages,
	aboutMe,
	aiBehaviorGuidelines,
} from "./data";
// import {
// 	type InferUITools,
// 	type ToolSet,
// 	type UIDataTypes,
// 	type UIMessage,
// 	convertToModelMessages,
// 	stepCountIs,
// 	streamText,
// 	tool,
//   } from 'ai';
import type { InferUITools, ToolSet, UIDataTypes, UIMessage } from "ai";
// import { openai } from "@ai-sdk/openai";
import {
	streamText,
	convertToModelMessages,
	stepCountIs,
	tool,
} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider"; // pnpm add @openrouter/ai-sdk-provider

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

// базовая схема для tool
const SendEmailToolInput = ContactInput.extend({
	confirmed: z.boolean().default(false),
});

const tools = {
	sendEmail: tool({
		description:
			"Send a message to Nikita via email. Use this when someone wants to contact Nikita. Always show a preview first, then ask for confirmation before sending.",
		inputSchema: SendEmailToolInput,

		execute: async (args: unknown) => {
			const parsed = SendEmailToolInput.safeParse(args);
			if (!parsed.success) {
				return `I had trouble understanding the email details. Please try again with proper information.`;
			}

			// Двухшаговое подтверждение (без него письмо не уйдёт)
			if (!parsed.data.confirmed) {
				console.log("⏳ Email needs confirmation");
				return `I need your confirmation to send this email. Please review the details and confirm with "yes" to send or "no" to cancel.`;
			}

			const result = await sendContactEmail(parsed.data);
			if (!result.ok) {
				return `Sorry, I couldn't send the email right now. There was a technical issue. Please try again later.`;
			}
			return `Great! I've successfully sent your message to Nikita. He should receive it shortly and will get back to you as soon as possible.`;
		},
	}),
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;

export type ChatMessage = UIMessage<UIDataTypes, ChatTools>;
export type ChatMessages = ChatMessage[];

// Функция для получения данных о Никите
function getNikitaData() {
	return {
		name: "Nikita Frolov",
		role: "Frontend Developer",
		skills: skills.map((skill) => `${skill.name} (${skill.percent}%)`),
		projects: projects,
		education: myEducation,
		languages: languages.map((lang) => `${lang.name} (${lang.percent}%)`),
		about: aboutMe,
	};
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		// console.log('Received body:', JSON.stringify(body, null, 2));

		// Handle useChat format
		const messages: ChatMessages = body.messages || [];

		if (!Array.isArray(messages)) {
			console.error("Messages is not an array:", messages);
			return NextResponse.json(
				{ error: "Invalid messages format" },
				{ status: 400 }
			);
		}

		const nikitaData = getNikitaData();

		// Формируем системное сообщение для AI-ассистента
		const systemMessage = `
        Hey there! I'm the AI assistant for ${nikitaData.name}, a ${
			nikitaData.role
		}. Think of me as Nikita's digital wingman - I'm here to help you learn about this awesome developer and his work. I'm like a Senior dev who's been around the block and knows how to talk shop without being boring.
        
        ## Who I Am:
        I'm Nikita's AI assistant, integrated into his portfolio. I know his work inside and out, and I'm here to give you the real scoop about his skills, projects, and experience. I talk like a confident Senior developer - knowledgeable, approachable, and not afraid to show some personality.
        
        ## About Nikita:
        - Name: ${nikitaData.name}
        - Role: ${nikitaData.role}
        - Skills: ${nikitaData.skills.join(", ")}
        - Projects: ${JSON.stringify(nikitaData.projects)}
        - Education: ${JSON.stringify(nikitaData.education)}
        - Languages: ${nikitaData.languages.join(", ")}
        - Full Background: ${nikitaData.about}
        
        ## Email Tool Behavior:
        When someone wants to send an email to Nikita, I should:
        1. First, show them a preview of what will be sent (like a real person would)
        2. Ask for confirmation in a natural, conversational way
        3. Only send the email after they confirm
        
        I should NEVER just call the tool without showing the preview first. Always be human-like and show what you're about to send.
        
        ${aiBehaviorGuidelines}
        
        Remember: I'm representing a talented developer's portfolio. I'm confident, knowledgeable, and I know my stuff. I want you to walk away thinking "Damn, this Nikita guy sounds like someone I'd want on my team!"
		
    `;

		const response = streamText({
			model: openrouter.chat("moonshotai/kimi-k2:free"),
			system: systemMessage,
			messages: convertToModelMessages(messages),
			tools,
			toolChoice: "auto",
			stopWhen: stepCountIs(5), // Позволяем до 3 шагов для подтверждения email
		});

		console.log("Response:", response);

		return response.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Error processing request to AI assistant:", error);
		return NextResponse.json(
			{ error: "An error occurred while processing the request" },
			{ status: 500 }
		);
	}
}
