'use client';

import React, { useEffect, useState } from 'react';
import { X, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Типы статусов формы
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactModal({ isOpen, onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Состояние для телефона, чтобы управлять маской
  const [phoneValue, setPhoneValue] = useState('');

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

        if (!res.ok) throw new Error('Ошибка отправки');
        
        // УСПЕХ!
        setStatus('success');

        // Ждем 3 секунды и закрываем модалку автоматически
        setTimeout(() => {
            onClose(); 
        }, 3000);

    } catch (error) {
        console.error(error);
        setStatus('error');
        setErrorMessage('Что-то пошло не так. Попробуйте позвонить нам.');
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
                {status === 'success' ? 'Заявка принята!' : 'Оставить заявку'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-black/50" />
            </button>
        </div>

        {/* --- ВАРИАНТ 1: УСПЕХ --- */}
        {status === 'success' && (
            <div className="flex-grow flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B0073] mb-2">Спасибо!</h3>
                <p className="text-gray-600 max-w-sm mb-8">
                    Мы получили вашу заявку. <br/>
                    Окно закроется автоматически через 3 секунды...
                </p>
                <button 
                    onClick={onClose}
                    className="bg-[#0B0073] text-white px-8 py-3 rounded-[15px] hover:opacity-90 transition-opacity text-sm"
                >
                    Закрыть сейчас
                </button>
            </div>
        )}

        {/* --- ВАРИАНТ 2: ФОРМА --- */}
        {status !== 'success' && (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 flex-grow">
                
                {/* ЛЕВАЯ КОЛОНКА */}
                <div className="flex-1 flex flex-col gap-6">
                    
                    {/* Имя */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">Имя*</label>
                        <input name="name" type="text" required placeholder="Как к Вам обращаться?" className="input-style" />
                    </div>

                    {/* Телефон */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">Телефон*</label>
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

                    {/* Вопрос (ОБНОВЛЕННЫЙ СПИСОК) */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[14px] text-black pl-1">По какому вопросу обращаетесь*</label>
                        <div className="relative">
                            <select name="question" required className="input-style appearance-none cursor-pointer" defaultValue="">
                                <option value="" disabled hidden>Выберите из списка</option>
                                
                                <option value="Международные курсы">Международные курсы</option>
                                <option value="Вакансии">Вакансии</option>
                                {/* Объединенный пункт: */}
                                <option value="Консалтинг и Технические услуги">Консалтинг и Технические услуги</option>
                                <option value="СИЗ">СИЗ</option>
                                <option value="Другое">Другое</option>

                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Ошибка */}
                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm animate-in shake">
                            <AlertCircle className="w-4 h-4" />
                            {errorMessage || 'Ошибка отправки'}
                        </div>
                    )}

                    <div className="flex-grow md:hidden" />

                    {/* КНОПКА ОТПРАВКИ */}
                    <button 
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full h-[60px] bg-[#0B0073] text-white rounded-[15px] font-medium text-[18px] hover:bg-[#0B0073]/90 transition-all shadow-lg shadow-[#0B0073]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-auto"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Отправка...
                            </>
                        ) : (
                            'Оставить заявку'
                        )}
                    </button>
                </div>

                {/* ПРАВАЯ КОЛОНКА */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">Компания</label>
                        <input name="company" type="text" placeholder="Название вашей компании" className="input-style" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-black pl-1">Почта</label>
                        <input name="email" type="email" placeholder="Ваш e-mail для ответа" className="input-style" />
                    </div>

                    <div className="flex flex-col gap-2 flex-grow h-full">
                        <label className="text-[14px] text-black pl-1">Комментарий</label>
                        <textarea 
                            name="comment" 
                            placeholder="Ваш вопрос или комментарий" 
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