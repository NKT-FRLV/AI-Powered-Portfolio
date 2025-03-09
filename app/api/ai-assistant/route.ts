import { NextResponse } from "next/server";
import OpenAI from "openai";
import { skills, projects, myEducation, languages } from "../../data";
import fs from "fs";
import path from "path";

// Инициализация OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Кеш для хранения ответов на частые вопросы
const responseCache = new Map<string, string>();

// Функция для логирования расхода токенов
async function logTokenUsage(
  model: string,
  promptTokens: number,
  completionTokens: number,
  totalTokens: number,
  query: string
) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    model,
    promptTokens,
    completionTokens,
    totalTokens,
    cost: calculateCost(model, promptTokens, completionTokens),
    query: query.substring(0, 100) // Сохраняем только первые 100 символов запроса
  };

  const logDir = path.join(process.cwd(), "logs");
  const logFile = path.join(logDir, "token-usage.json");

  // Создаем директорию для логов, если она не существует
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Читаем существующие логи или создаем новый массив
  let logs = [];
  if (fs.existsSync(logFile)) {
    const fileContent = fs.readFileSync(logFile, "utf-8");
    logs = fileContent ? JSON.parse(fileContent) : [];
  }

  // Добавляем новую запись и сохраняем
  logs.push(logEntry);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), "utf-8");

  console.log(`Токены: ${totalTokens} (${promptTokens} промпт, ${completionTokens} ответ), Стоимость: $${logEntry.cost.toFixed(6)}`);
}

// Функция для расчета стоимости запроса
function calculateCost(model: string, promptTokens: number, completionTokens: number): number {
  // Цены на токены для разных моделей (в долларах США)
  const prices: Record<string, { prompt: number; completion: number }> = {
    "gpt-3.5-turbo": { prompt: 0.0000015, completion: 0.000002 },
    "gpt-4": { prompt: 0.00003, completion: 0.00006 },
    "gpt-4-turbo": { prompt: 0.00001, completion: 0.00003 },
  };

  const modelPrices = prices[model] || prices["gpt-3.5-turbo"]; // По умолчанию используем цены для gpt-3.5-turbo
  return promptTokens * modelPrices.prompt + completionTokens * modelPrices.completion;
}

// Функция для получения данных о Никите
function getNikitaData() {
  return {
    name: "Nikita Frolov",
    role: "Frontend Developer",
    skills: skills.map((skill) => `${skill.name} (${skill.percent}%)`),
    projects: projects.map((project) => ({
      title: project.title,
      description: project.description,
      technologies: project.tecnologies,
    })),
    education: myEducation.map((edu) => ({
      title: edu.title,
      profession: edu.profesion,
      date: edu.date,
      content: edu.content,
    })),
    languages: languages.map((lang) => `${lang.name} (${lang.percent}%)`),
  };
}

export async function POST(request: Request) {
  try {
    // Получаем сообщение пользователя из запроса
    const { message } = await request.json();

    // Проверяем кеш для быстрого ответа
    const cacheKey = message.toLowerCase().trim();
    if (responseCache.has(cacheKey)) {
      return NextResponse.json(
        { message: responseCache.get(cacheKey) },
        { status: 200 }
      );
    }

    // Получаем данные о Никите
    const nikitaData = getNikitaData();

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
        
        Answer concisely, friendly, and informatively. If you are asked about something not related to Nikita or his work, politely redirect the conversation to the topic of Nikita's portfolio.
        Answer in language of the user.
      `

    // Модель, которую будем использовать
    const model = "gpt-3.5-turbo";

    // Отправляем запрос к OpenAI API
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Получаем ответ от ChatGPT
    const aiResponse = completion.choices[0].message.content || "Извините, я не смог сформулировать ответ. Пожалуйста, попробуйте задать вопрос иначе.";

    // Логируем расход токенов
    await logTokenUsage(
      model,
      completion.usage?.prompt_tokens || 0,
      completion.usage?.completion_tokens || 0,
      completion.usage?.total_tokens || 0,
      message
    );

    // Кешируем ответ для будущих запросов
    responseCache.set(cacheKey, aiResponse);

    // Ограничиваем размер кеша
    if (responseCache.size > 100) {
      const firstKey = responseCache.keys().next().value;
      if (firstKey !== undefined) {
        responseCache.delete(firstKey);
      }
    }

    // Возвращаем ответ
    return NextResponse.json({ message: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при обработке запроса к AI-ассистенту:", error);
    
    // Возвращаем ошибку
    return NextResponse.json(
      { error: "Произошла ошибка при обработке запроса" },
      { status: 500 }
    );
  }
} 