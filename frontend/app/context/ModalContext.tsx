'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ContactModal from '../components/ContactModal'; // Импортируем твою модалку

// Описываем, что умеет наш контекст
interface ModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Якорь, по которому форма открывается сама - нужен для ссылок из писем и рассылок
const REQUEST_HASH = '#request';

// Провайдер - это "обертка", которая будет держать состояние окна
export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    // Убираем #request из адреса, иначе по той же ссылке форму не открыть повторно
    if (window.location.hash === REQUEST_HASH) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  // Открываем форму, если пришли по ссылке вида /horizon-university#request
  useEffect(() => {
    const openIfRequested = () => {
      if (window.location.hash === REQUEST_HASH) setIsOpen(true);
    };

    openIfRequested();
    window.addEventListener('hashchange', openIfRequested);
    return () => window.removeEventListener('hashchange', openIfRequested);
  }, []);

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