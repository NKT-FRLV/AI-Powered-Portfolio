import { NextResponse } from "next/server";
import { skills, projects, myEducation, languages, aboutMe } from "./data";

import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";

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

		// Формируем системное сообщение для ChatGPT в зависимости от языка
		const systemMessage = `
        You are the AI assistant of ${nikitaData.name}, a ${
			nikitaData.role
		}. Your task is to help visitors of his portfolio by answering their questions about Nikita, his skills, experience, and projects.
        
        Here is information about Nikita:
        - Name: ${nikitaData.name}
        - Role: ${nikitaData.role}
        - Skills: ${nikitaData.skills.join(", ")}
        - Projects: ${JSON.stringify(nikitaData.projects)}
        - Education: ${JSON.stringify(nikitaData.education)}
        - Languages: ${nikitaData.languages.join(", ")}
        - About: ${nikitaData.about}
        
        Answer concisely, friendly, and informatively For an potential HR interviewer about Nikita. If you are asked about something not related to Nikita or his work, politely redirect the conversation to the topic of Nikita's portfolio.
        Answer in language of the user. But be easy talking, like with superiority. Becouse we are cool enough to feel free and confident.
    `;

		const response = streamText({
			model: openai("gpt-4.1-nano"),
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
