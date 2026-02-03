'use client'; // Обязательно, так как используем хуки

import React from 'react';
import { useModal } from '../context/ModalContext'; // Импорт хука

// Расширяем стандартные пропсы кнопки, чтобы работали type="submit" и другие
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  // Флаг, чтобы принудительно НЕ открывать модалку (например, если кнопка делает что-то другое)
  noModal?: boolean; 
}

export default function Button({ children, className = '', onClick, type, noModal, ...props }: ButtonProps) {
  // Получаем функцию открытия окна из контекста
  const { openModal } = useModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Если передали свой onClick (какая-то особая логика), выполняем его и выходим
    if (onClick) {
      onClick(e);
      return;
    }

    // 2. Если это кнопка отправки формы (submit), модалку не открываем
    if (type === 'submit') {
      return;
    }

    // 3. Если специально попросили не открывать
    if (noModal) {
      return;
    }

    // 4. ВО ВСЕХ ОСТАЛЬНЫХ СЛУЧАЯХ - ОТКРЫВАЕМ МОДАЛКУ
    openModal();
  };

  return (
    <button 
      onClick={handleClick}
      type={type || 'button'} // По умолчанию button, чтобы не перезагружал страницу
      className={`
        /* БАЗА И ПОЗИЦИОНИРОВАНИЕ */
        group relative flex items-center justify-center
        overflow-hidden /* Важно: обрезаем все, что вылезает за границы */
        bg-[#0B0073] text-white font-medium text-[16px]
        shadow-xl transition-all duration-300
        
        /* РАЗМЕРЫ (Фиксированные) */
        w-[200px] h-[50px] rounded-[15px]
        
        /* ЭФФЕКТ ПРИ НАВЕДЕНИИ (ТЕНЬ) */
        /* Делаем тень более глубокой и чуть синеватой */
        hover:shadow-[0_10px_20px_rgba(11,0,115,0.4)]
        
        /* ЭФФЕКТ НАЖАТИЯ (ACTIVE) */
        /* Кнопка чуть сжимается при клике */
        active:scale-95
        
        ${className}
      `}
      {...props}
    >
      {/* 1. АНИМИРОВАННЫЙ ФОН (ЧЕРНЫЙ СЛОЙ) */}
      {/* Изначально он смещен вниз (translate-y-full). 
          При наведении (group-hover) он выезжает наверх (translate-y-0) */}
      <span className="absolute inset-0 w-full h-full bg-black transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0" />

      {/* 2. ТЕКСТ */}
      {/* relative z-10 нужно, чтобы текст был ПОВЕРХ черного фона */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}