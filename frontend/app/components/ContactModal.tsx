'use client';

import React, { useEffect, useState } from 'react';
import { X, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const t = {
  ru: {
    title: 'Оставить заявку',
    successTitle: 'Заявка принята!',
    successHeading: 'Спасибо!',
    successText: 'Мы получили вашу заявку.\nОкно закроется автоматически через 3 секунды...',
    successClose: 'Закрыть сейчас',
    labelName: 'Имя*',
    placeholderName: 'Как к Вам обращаться?',
    labelPhone: 'Телефон*',
    labelQuestion: 'По какому вопросу обращаетесь*',
    placeholderQuestion: 'Выберите из списка',
    options: ['Международные курсы', 'Онлайн курсы', 'Вакансии', 'Консалтинг и Технические услуги', 'СИЗ', 'Другое'],
    labelCompany: 'Компания',
    placeholderCompany: 'Название вашей компании',
    labelEmail: 'Почта',
    placeholderEmail: 'Ваш e-mail для ответа',
    labelComment: 'Комментарий',
    placeholderComment: 'Ваш вопрос или комментарий',
    submit: 'Оставить заявку',
    sending: 'Отправка...',
    errorGeneric: 'Ошибка отправки',
    errorText: 'Что-то пошло не так. Попробуйте позвонить нам.',
  },
  en: {
    title: 'Submit a Request',
    successTitle: 'Request Received!',
    successHeading: 'Thank you!',
    successText: 'We have received your request.\nThe window will close automatically in 3 seconds...',
    successClose: 'Close now',
    labelName: 'Name*',
    placeholderName: 'How should we address you?',
    labelPhone: 'Phone*',
    labelQuestion: 'Subject of enquiry*',
    placeholderQuestion: 'Select from list',
    options: ['International Courses', 'Online Courses', 'Careers', 'Consulting & Technical Services', 'PPE', 'Other'],
    labelCompany: 'Company',
    placeholderCompany: 'Your company name',
    labelEmail: 'Email',
    placeholderEmail: 'Your e-mail for reply',
    labelComment: 'Comment',
    placeholderComment: 'Your question or comment',
    submit: 'Submit Request',
    sending: 'Sending...',
    errorGeneric: 'Submission error',
    errorText: 'Something went wrong. Please try calling us.',
  },
} as const;

// Типы статусов формы
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactModal({ isOpen, onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'ru';
  const i = t[locale];

  // Сброс формы при закрытии/открытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Если открываем заново - сбрасываем статус
      setStatus('idle');
      // Сбрасываем телефон при открытии
      setPhoneValue('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]); 

  // --- ЛОГИКА МАСКИ ТЕЛЕФОНА ---
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // 1. Оставляем только цифры
    let numbers = input.replace(/\D/g, '');

    // 2. Обработка начала ввода (чтобы всегда было +7)
    if (numbers.length === 0) {
        setPhoneValue('');
        return;
    }

    if (numbers.length > 0 && (numbers[0] === '7' || numbers[0] === '8')) {
        numbers = numbers.substring(1);
    }
    
    // Ограничиваем длину (10 цифр после семерки)
    numbers = numbers.substring(0, 10);

    // 3. Формируем красивую строку
    let formatted = '+7';
    if (numbers.length > 0) {
        formatted += ` (${numbers.substring(0, 3)}`;
    }
    if (numbers.length >= 4) {
        formatted += `) ${numbers.substring(3, 6)}`;
    }
    if (numbers.length >= 7) {
        formatted += `-${numbers.substring(6, 8)}`;
    }
    if (numbers.length >= 9) {
        formatted += `-${numbers.substring(8, 10)}`;
    }

    setPhoneValue(formatted);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    
    const data = {
        name: formData.get('name'),
        phone: phoneValue, 
        question: formData.get('question'),
        company: formData.get('company'),
        email: formData.get('email'),
        comment: formData.get('comment'),
    };

    try {
        const res = await fetch('/api/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('send error');
        setStatus('success');
        setTimeout(() => { onClose(); }, 3000);

    } catch (error) {
        console.error(error);
        setStatus('error');
        setErrorMessage(i.errorText);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#F4F4F4] w-full max-w-[900px] rounded-[30px] shadow-2xl p-6 md:p-10 animate-in fade-in zoom-in-95 duration-200 min-h-[500px] flex flex-col">
        
        {/* Шапка */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
            <h2 className="text-[28px] md:text-[32px] font-bold text-black">
                {status === 'success' ? i.successTitle : i.title}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-black/50" />
            </button>
        </div>

        {/* --- УСПЕХ --- */}
        {status === 'success' && (
            <div className="flex-grow flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B0073] mb-2">{i.successHeading}</h3>
                <p className="text-gray-600 max-w-sm mb-8 whitespace-pre-line">{i.successText}</p>
                <button
                    onClick={onClose}
                    className="bg-[#0B0073] text-white px-8 py-3 rounded-[15px] hover:opacity-90 transition-opacity text-sm"
                >
                    {i.successClose}
                </button>
            </div>
        )}

        {/* --- ФОРМА --- */}
        {status !== 'success' && (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 flex-grow">

                {/* ЛЕВАЯ КОЛОНКА */}
                <div className="flex-1 flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">{i.labelName}</label>
                        <input name="name" type="text" required placeholder={i.placeholderName} className="input-style" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">{i.labelPhone}</label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            placeholder="+7 (___) ___-__-__"
                            className="input-style font-medium tracking-wide"
                            value={phoneValue}
                            onChange={handlePhoneChange}
                            maxLength={18}
                        />
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[14px] text-black pl-1">{i.labelQuestion}</label>
                        <div className="relative">
                            <select name="question" required className="input-style appearance-none cursor-pointer" defaultValue="">
                                <option value="" disabled hidden>{i.placeholderQuestion}</option>
                                {i.options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm animate-in shake">
                            <AlertCircle className="w-4 h-4" />
                            {errorMessage || i.errorGeneric}
                        </div>
                    )}

                    <div className="flex-grow md:hidden" />

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full h-[60px] bg-[#0B0073] text-white rounded-[15px] font-medium text-[18px] hover:bg-[#0B0073]/90 transition-all shadow-lg shadow-[#0B0073]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-auto"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {i.sending}
                            </>
                        ) : i.submit}
                    </button>
                </div>

                {/* ПРАВАЯ КОЛОНКА */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">{i.labelCompany}</label>
                        <input name="company" type="text" placeholder={i.placeholderCompany} className="input-style" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">{i.labelEmail}</label>
                        <input name="email" type="email" placeholder={i.placeholderEmail} className="input-style" />
                    </div>

                    <div className="flex flex-col gap-2 flex-grow h-full">
                        <label className="text-[14px] text-black pl-1">{i.labelComment}</label>
                        <textarea
                            name="comment"
                            placeholder={i.placeholderComment}
                            className="input-style h-full min-h-[150px] resize-none py-4 leading-relaxed"
                        />
                    </div>
                </div>
            </form>
        )}

      </div>

      <style jsx>{`
        .input-style {
            width: 100%;
            height: 50px;
            background-color: transparent;
            border: 1px solid #E0E0E0;
            border-radius: 15px;
            padding: 0 16px;
            color: black;
            transition: all 0.2s;
        }
        textarea.input-style {
            height: auto;
        }
        .input-style:focus {
            outline: none;
            border-color: #0B0073;
            background-color: white;
        }
        .input-style::placeholder {
            color: #9CA3AF;
        }
      `}</style>
    </div>
  );
}