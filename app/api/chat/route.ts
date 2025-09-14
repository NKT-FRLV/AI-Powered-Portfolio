import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";
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
import { streamText, convertToModelMessages, stepCountIs, tool } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider"; // pnpm add @openrouter/ai-sdk-provider

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

// базовая схема для tool
const SendEmailToolInput = z.object({
	to: z.string().email(),
	subject: z.string(),
	text: z.string(),
	html: z.string().optional(),
	fromEmail: z.string().email(),
	fromName: z.string(),
	confirmed: z.boolean().default(false),
});

const tools = {
	askForConfirmation: tool({
		description:
			"Ask the user to confirm the email before sending. Always include a preview. and pass the data to fill the form preview.",
		inputSchema: z.object({
			fromEmail: z.string().email(),
			fromName: z.string(),
			subject: z.string(),
			text: z.string(),
			html: z.string().optional(),
		}),
		// нет execute => client-side tool
	}),

	sendEmail: tool({
		description:
			"Send a message to Nikita via email. Must be called only AFTER confirmation.",
		inputSchema: SendEmailToolInput,
		execute: async (args) => {
			if (!args.confirmed) {
				return `Not sending. Missing confirmation.`;
			}
			
			// Преобразуем SendEmailToolInput в ContactInput
			const contactInput = {
				message: args.text,
				email: args.fromEmail, // Email отправителя (пользователя чата)
				name: args.fromName,
				company: "Portfolio Visitor"
			};
			
			const result = await sendContactEmail(contactInput);
			return result.ok
				? `Email sent successfully.`
				: `Sorry, sending failed. Try later.`;
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

		IMPORTANT: after confirmation of sending email, DONT FORGET TO SEND EMAIL! SEND IT BY CALLING "sendEmail" Tool!
		
        When a user wants to contact Nikita or send him a message, follow this EXACT process:
        
        1. ALWAYS ask the user for their email address first, then show the preview of the message and call "askForConfirmation" Tool with:
           - fromEmail: User's email address (REQUIRED - ask for it)
           - fromName: User's name (ask for it)
           - subject: A clear, professional subject line
           - text: The message content in plain text
        
        2. Wait for user confirmation through responding Confirm or Cancel, if user confirms, dont forget to call "sendEmail" Tool in the next step.
		 
        3. If user confirms (confirmed: true), then call "sendEmail" Tool with:
           - subject: Same subject from askForConfirmation
           - text: Same text from askForConfirmation
           - fromEmail: Same fromEmail from askForConfirmation
           - fromName: Same fromName from askForConfirmation
           - confirmed: true
        
        4. If user denies, apologize and do NOT call "sendEmail"
        
        IMPORTANT: Never call "sendEmail" without first calling "askForConfirmation" and getting user approval!

        
        	${aiBehaviorGuidelines}
        
        	Remember: I'm representing a talented developer's portfolio. I'm confident, knowledgeable, and I know my stuff. I want you to walk away thinking "Damn, this Nikita guy sounds like someone I'd want on my team!"
		
    `;

		const response = streamText({
			model: openrouter.chat("deepseek/deepseek-chat-v3.1:free"),
			system: systemMessage,
			messages: convertToModelMessages(messages),
			tools,
			toolChoice: "auto",
			stopWhen: stepCountIs(5), // Позволяем до 5 шагов для подтверждения email
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
