import { NextResponse } from "next/server";

// Типы для данных формы
type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    // Получаем данные из запроса
    const data: ContactFormData = await request.json();

    // Проверяем наличие обязательных полей
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Возвращаем успешный ответ, но сообщаем клиенту, что нужно использовать клиентскую отправку
    return NextResponse.json(
      { message: "Use client-side EmailJS" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    
    // Возвращаем ошибку
    return NextResponse.json(
      { error: "An error occurred while sending the message" },
      { status: 500 }
    );
  }
} 