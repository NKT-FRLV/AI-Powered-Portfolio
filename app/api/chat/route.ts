import { NextResponse } from "next/server";
import { skills, projects, myEducation, languages, aboutMe, aiBehaviorGuidelines } from "./data";

// import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider'; // pnpm add @openrouter/ai-sdk-provider

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
  });

export const maxDuration = 30;

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
		const messages: UIMessage[] = body.messages || [];
		
		if (!Array.isArray(messages)) {
			console.error('Messages is not an array:', messages);
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
        
        ${aiBehaviorGuidelines}
        
        Remember: I'm representing a talented developer's portfolio. I'm confident, knowledgeable, and I know my stuff. I want you to walk away thinking "Damn, this Nikita guy sounds like someone I'd want on my team!"
		
    `;

		const response = streamText({
			model: openrouter.chat('moonshotai/kimi-k2:free'),
			system: systemMessage,
			messages: convertToModelMessages(messages),
		});

		return response.toUIMessageStreamResponse();

	} catch (error) {
		console.error("Error processing request to AI assistant:", error);
		return NextResponse.json(
			{ error: "An error occurred while processing the request" },
			{ status: 500 }
		);
	}
}
