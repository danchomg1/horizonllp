'use client';

import { useState } from 'react';
import { urlFor } from '../lib/sanity';
import Button from './Button';
import ContactModal from './ContactModal'; // Импортируем модалку

interface HeroProps {
  title: string;
  image: any;
}

export default function HeroSection({ title, image }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center -mt-[100px] relative z-0">
        <div className="w-full max-w-[1300px] px-4 md:px-0 relative h-[500px]">
            
            {/* Картинка */}
            <div className="absolute inset-0 w-full h-full rounded-b-[15px] overflow-hidden">
                {image ? (
                  <img 
                      src={urlFor(image).url()} 
                      alt={title}
                      className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Вырез */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[71px] z-10 pointer-events-none">
                 <img src="/hero-cutout.svg" alt="" className="w-full h-full block" />
            </div>

            {/* КНОПКА ОТКРЫТИЯ МОДАЛКИ */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
                <Button onClick={() => setIsModalOpen(true)}>
                   Оставить заявку
                </Button>
            </div>
        </div>
      </div>

      {/* Сама МОДАЛКА */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}