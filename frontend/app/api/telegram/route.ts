import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Читаем ключи прямо здесь, чтобы проверить, видит ли их сервер
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // ЛОГ В ТЕРМИНАЛ: Проверка наличия ключей
    console.log('--- НАЧАЛО ОТПРАВКИ ---');
    console.log('Token есть?', !!TELEGRAM_BOT_TOKEN); 
    console.log('Chat ID:', TELEGRAM_CHAT_ID);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('ОШИБКА: Нет ключей в .env.local');
      return NextResponse.json({ message: 'Config missing' }, { status: 500 });
    }

    const body = await req.json();
    const { name, phone, question, company, email, comment } = body;

    const text = `
<b>🔥 Новая заявка!</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
❓ <b>Вопрос:</b> ${question}
🏢 <b>Компания:</b> ${company || '-'}
📧 <b>Почта:</b> ${email || '-'}

📝 <b>Комментарий:</b>
${comment || '-'}
    `;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    // ЛОГ В ТЕРМИНАЛ: Результат от Телеграма
    const result = await response.json();
    console.log('Ответ Телеграма:', result);

    if (!response.ok) {
        // Если ошибка, выводим её в терминал
        console.error('Telegram API Error:', result);
        throw new Error('Telegram API Error');
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    console.error('ГЛОБАЛЬНАЯ ОШИБКА:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}