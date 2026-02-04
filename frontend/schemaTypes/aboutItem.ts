import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutItem',
  title: 'Меню: О нас (Страницы)',
  type: 'document',
  groups: [
    { name: 'menu', title: 'Для Меню (Шапка)' },
    { name: 'page', title: 'Контент Страницы' },
  ],
  fields: [
    // --- ПОЛЯ ДЛЯ МЕНЮ ---
    defineField({
      name: 'title',
      title: 'Название пункта (например: История, Миссия)',
      type: 'string',
      group: 'menu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Ссылка (Slug)',
      type: 'slug',
      group: 'menu',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Краткое описание (для предпросмотра в меню)',
      type: 'text',
      group: 'menu',
      rows: 3,
    }),
    defineField({
      name: 'dropdownImage',
      title: 'Мини-картинка (для меню)',
      type: 'image',
      group: 'menu',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Порядковый номер (для сортировки)',
      type: 'number',
      group: 'menu',
    }),

    // --- ПОЛЯ ДЛЯ САМОЙ СТРАНИЦЫ ---
    defineField({
      name: 'heroImage',
      title: 'Главная картинка страницы (Hero Banner)',
      type: 'image',
      group: 'page',
      options: { hotspot: true },
    }),
    
    // Блок вступления
    defineField({
      name: 'introTitle',
      title: 'Заголовок вступления',
      type: 'string',
      group: 'page',
    }),
    
    // ИСПРАВЛЕНИЕ 1: Используем richText вместо array/block
    defineField({
      name: 'introText',
      title: 'Текст вступления',
      type: 'richText', // <--- БЫЛО: type: 'array', of: [{type: 'block'}]
      group: 'page',
    }),

    defineField({
      name: 'introIcon',
      title: 'Иконка справа от вступления',
      type: 'image',
      group: 'page',
    }),

    // --- СЕКЦИЯ TABS (ВКЛАДКИ) ---
    defineField({
      name: 'pageTabs',
      title: 'Вкладки (Tabs Section)',
      type: 'array',
      group: 'page',
      of: [
        {
          type: 'object',
          title: 'Вкладка',
          fields: [
            defineField({
              name: 'tabTitle',
              title: 'Название вкладки',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            
            // ИСПРАВЛЕНИЕ 2: Используем richText и здесь
            defineField({
              name: 'tabContent',
              title: 'Содержимое вкладки',
              type: 'richText', // <--- БЫЛО: type: 'array', of: [{type: 'block'}]
            }),

            defineField({
              name: 'tabImage',
              title: 'Картинка вкладки (справа)',
              type: 'image',
            },)
          ],
        },
      ],
    }),
  ],
})