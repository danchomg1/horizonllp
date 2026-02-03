import { defineField, defineType } from 'sanity'
// sanity/schemas/home.ts

export default {
  name: 'home',
  title: 'Главная страница',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок (H1)',
      type: 'string',
      description: 'Например: HORIZON'
    },
    // --- НОВЫЕ ПОЛЯ ---
    {
      name: 'subtitle',
      title: 'Подзаголовок (H2)',
      type: 'string',
      description: 'Например: LLP Consulting'
    },
    {
      name: 'heroLogo',
      title: 'Логотип рядом с текстом',
      type: 'image',
      options: { hotspot: true }
    },
    // ------------------
    {
      name: 'heroImage',
      title: 'Главное изображение (справа)',
      type: 'image',
      options: { hotspot: true }
    },
// --- НОВОЕ ПОЛЕ ---
    {
      name: 'heroDescription',
      title: 'Описание (Текст под заголовком)',
      type: 'text', // Используем text для многострочного поля
      description: 'Краткое описание компании или миссии'
    },
    // ------------------
    
    // ... твои остальные поля
  ]
}