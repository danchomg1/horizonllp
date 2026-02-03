'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ContactModal from '../components/ContactModal'; // Импортируем твою модалку

// Описываем, что умеет наш контекст
interface ModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Провайдер - это "обертка", которая будет держать состояние окна
export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {/* Модальное окно живет ЗДЕСЬ, одно на весь сайт */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
}

// Хук, чтобы любая кнопка могла легко получить доступ к функции открытия
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}