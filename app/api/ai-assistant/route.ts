import { NextResponse } from "next/server";
import { skills, projects, myEducation, languages, aboutMe } from "./data";

// Удаляем инициализацию SDK
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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
    const { message } = await request.json();
    const nikitaData = getNikitaData();

    console.log(nikitaData);

    // Формируем системное сообщение для ChatGPT в зависимости от языка
    const systemMessage = `
        You are the AI assistant of ${nikitaData.name}, a ${nikitaData.role}. Your task is to help visitors of his portfolio by answering their questions about Nikita, his skills, experience, and projects.
        
        Here is information about Nikita:
        - Name: ${nikitaData.name}
        - Role: ${nikitaData.role}
        - Skills: ${nikitaData.skills.join(", ")}
        - Projects: ${JSON.stringify(nikitaData.projects)}
        - Education: ${JSON.stringify(nikitaData.education)}
        - Languages: ${nikitaData.languages.join(", ")}
        - About: ${nikitaData.about}
        
        Answer concisely, friendly, and informatively. If you are asked about something not related to Nikita or his work, politely redirect the conversation to the topic of Nikita's portfolio.
        Answer in language of the user.
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API returned ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content || 
      "Sorry, I couldn't formulate an answer. Please try asking your question differently.";

    return NextResponse.json({ message: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("Error processing request to AI assistant:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
} 