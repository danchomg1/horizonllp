'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavItemProps {
  label: string;
  children?: React.ReactNode;
}

export default function NavItem({ label, children }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div 
      // ВАЖНО: Здесь НЕТ relative! 
      // Это позволяет children (Dropdown) игнорировать границы этой кнопки 
      // и растягиваться на ширину Header.
      className="h-full flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Обертка для позиционирования текста и точки */}
      <div className="relative flex flex-col items-center">
        <Link 
          href="#" 
          className={`
            text-[16px] font-normal transition-colors tracking-tight whitespace-nowrap py-2
            ${isOpen ? 'text-[#0B0073]' : 'text-black hover:text-[#0B0073]'}
          `}
        >
          {label}
        </Link>

        {/* ТОЧКА 3x3px ВНИЗУ */}
        {isOpen && (
          <div className="absolute -bottom-1 w-[3px] h-[3px] bg-[#0B0073] rounded-full" />
        )}
      </div>
      
      {/* Выпадающее окно рендерится здесь, но позиционируется от Header */}
      {isOpen && children}
    </div>
  );
}