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
        { error: "Пожалуйста, заполните все обязательные поля" },
        { status: 400 }
      );
    }

    // Возвращаем успешный ответ, но сообщаем клиенту, что нужно использовать клиентскую отправку
    return NextResponse.json(
      { message: "Используйте клиентскую отправку EmailJS" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    
    // Возвращаем ошибку
    return NextResponse.json(
      { error: "Произошла ошибка при отправке сообщения" },
      { status: 500 }
    );
  }
} 