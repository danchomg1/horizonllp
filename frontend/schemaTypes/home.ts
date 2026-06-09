import { defineField, defineType } from 'sanity'
// sanity/schemas/home.ts

export default {
  name: 'home',
  title: 'Главная страница',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок (H1, RU)',
      type: 'string',
      description: 'Например: HORIZON'
    },
    {
      name: 'titleEn',
      title: 'Заголовок (H1, EN)',
      type: 'string',
      description: 'e.g. HORIZON'
    },
    // --- НОВЫЕ ПОЛЯ ---
    {
      name: 'subtitle',
      title: 'Подзаголовок (H2, RU)',
      type: 'string',
      description: 'Например: LLP Consulting'
    },
    {
      name: 'subtitleEn',
      title: 'Подзаголовок (H2, EN)',
      type: 'string',
      description: 'e.g. LLP Consulting'
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
      title: 'Описание (RU)',
      type: 'text',
      description: 'Краткое описание компании или миссии'
    },
    {
      name: 'heroDescriptionEn',
      title: 'Описание (EN)',
      type: 'text',
      description: 'Short company description in English'
    },
    // ------------------

    // ... твои остальные поля
  ]
}