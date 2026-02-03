import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'course',
  title: 'Курс (Единица)',
  type: 'document',
  icon: BookIcon,
  groups: [
    { name: 'dropdown', title: 'Для меню (Шапка)' },
    { name: 'page', title: 'Для страницы (Контент)' },
  ],
  fields: [
    // --- 1. ДЛЯ ВЫПАДАЮЩЕГО МЕНЮ ---
    defineField({
      name: 'title',
      title: 'Название курса',
      type: 'string',
      group: ['dropdown', 'page'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Ссылка (Slug)',
      type: 'slug',
      group: ['dropdown', 'page'],
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Логотип курса (для превью в меню)',
      type: 'image',
      group: 'dropdown',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Краткое описание (для превью в меню)',
      type: 'text',
      rows: 3,
      group: 'dropdown',
    }),
    defineField({
      name: 'details',
      title: 'Детали (например: "2 дня / Оффлайн")',
      type: 'string',
      group: 'dropdown',
    }),

    // --- 2. ДЛЯ СТРАНИЦЫ (DynamicPage) ---
    defineField({
      name: 'heroImage',
      title: 'Главная картинка (Hero)',
      type: 'image',
      group: 'page',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introTitle',
      title: 'Заголовок вступления',
      type: 'string',
      group: 'page',
    }),
    defineField({
      name: 'introText',
      title: 'Текст вступления',
      type: 'richText', // Твой компонент текста
      group: 'page',
    }),
    defineField({
      name: 'introIcon',
      title: 'Иконка справа от вступления',
      type: 'image',
      group: 'page',
    }),
    defineField({
      name: 'pageTabs',
      title: 'Вкладки с контентом',
      type: 'array',
      group: 'page',
      of: [{ type: 'tabItem' }] // Ссылка на tabs.ts
    }),
  ],
})