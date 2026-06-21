import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Функция очистки текста от символов, которые ломают HTML Телеграма
const sanitize = (str: any) => {
  if (!str) return '-';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Смотрим в терминале, что пришло
    console.log('📝 Данные формы:', body);

    const { name, phone, question, company, email, comment } = body;

    // 1. Ключи
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT || '465';
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const EMAIL_TO = process.env.EMAIL_TO;

    // 2. ОТПРАВКА В ТЕЛЕГРАМ
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        // Очищаем данные перед вставкой в HTML
        const safeName = sanitize(name);
        const safePhone = sanitize(phone);
        const safeQuestion = sanitize(question);
        const safeCompany = sanitize(company);
        const safeEmail = sanitize(email);
        const safeComment = sanitize(comment);

        const text = `
<b>🔥 Новая заявка!</b>

👤 <b>Имя:</b> ${safeName}
📞 <b>Телефон:</b> ${safePhone}
❓ <b>Вопрос:</b> ${safeQuestion}
🏢 <b>Компания:</b> ${safeCompany}
📧 <b>Почта:</b> ${safeEmail}

📝 <b>Комментарий:</b>
${safeComment}
        `;

        try {
            const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'HTML',
                }),
            });

            // Логируем ответ Телеграма
            const tgData = await tgRes.json();
            if (!tgRes.ok) {
                console.error('❌ Ошибка Telegram:', tgData);
            } else {
                console.log('✅ Telegram отправлен');
            }
        } catch (e) {
            console.error('❌ Сбой отправки в Telegram:', e);
        }
    } else {
        console.log('⚠️ Нет ключей Telegram в .env');
    }

    // 3. ОТПРАВКА НА ПОЧТУ
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && EMAIL_TO) {
        try {
            const transporter = nodemailer.createTransport({
                host: SMTP_HOST,
                port: Number(SMTP_PORT),
                secure: true, 
                auth: { user: SMTP_USER, pass: SMTP_PASS },
            });

            const htmlContent = `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; border-left: 5px solid #0B0073;">
                        <h2 style="color: #0B0073; margin-top: 0;">Новая заявка с сайта</h2>
                        <p><strong>Имя:</strong> ${name}</p>
                        <p><strong>Телефон:</strong> <a href="tel:${phone}" style="color: #0B0073; font-weight: bold;">${phone}</a></p>
                        <p><strong>Email:</strong> ${email || '-'}</p>
                        <p><strong>Компания:</strong> ${company || '-'}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong>Тема:</strong><br>${question || '-'}
                        </div>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                            <strong>Комментарий:</strong><br>${comment || '-'}
                        </div>
                    </div>
                </div>
            `;

            const recipients = [EMAIL_TO, 'sales@horizon-llp.com']
              .filter(Boolean)
              .filter((v, i, arr) => arr.indexOf(v) === i)
              .join(', ');

            await transporter.sendMail({
                from: `"Horizon Website" <${SMTP_USER}>`,
                to: recipients,
                replyTo: email,
                subject: `🔥 Заявка: ${name} (${phone})`,
                text: `Имя: ${name}\nТелефон: ${phone}`,
                html: htmlContent,
            });
            console.log('✅ Почта отправлена');
        } catch (e) {
            console.error('❌ Ошибка отправки почты:', e);
        }
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    console.error('🔥 ГЛОБАЛЬНАЯ ОШИБКА:', error);
    return NextResponse.json({ message: 'Error', error: String(error) }, { status: 500 });
  }
}