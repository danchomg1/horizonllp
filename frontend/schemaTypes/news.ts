import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: 'Новости / События',
  type: 'document',
  fields: [
    // 1. ЗАГОЛОВОК
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // 2. ССЫЛКА (SLUG)
    defineField({
      name: 'slug',
      title: 'Slug (Адрес страницы)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // 3. ДАТА ПУБЛИКАЦИИ
    defineField({
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'date', // Используем date (только число), либо datetime (с временем)
      validation: (Rule) => Rule.required(),
    }),

    // 4. ГЛАВНАЯ КАРТИНКА (ОБЛОЖКА)
    defineField({
      name: 'mainImage',
      title: 'Обложка новости',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // 5. КРАТКОЕ ОПИСАНИЕ (ПОДЗАГОЛОВОК)
    defineField({
      name: 'description',
      title: 'Краткое описание (Подзаголовок)',
      type: 'text',
      rows: 3,
      description: 'Этот текст выводится в списке новостей под заголовком.'
    }),

    // 6. ПОЛНЫЙ ТЕКСТ (Ваш новый RichText)
    defineField({
      name: 'body',
      title: 'Полный текст новости',
      type: 'richText', // Ссылаемся на созданный вами RichText.ts
    }),
  ],
})