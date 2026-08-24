import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tabItem',
  title: 'Вкладка',
  type: 'object',
  fields: [
    defineField({
      name: 'tabTitle',
      title: 'Название вкладки',
      type: 'string',
    }),
    // ВАЖНО: Здесь должно быть 'richText', а не 'array'
    defineField({
      name: 'tabContent',
      title: 'Текст вкладки',
      type: 'richText', 
    }),
    defineField({
      name: 'tabImage',
      title: 'Картинка справа (опционально)',
      type: 'image',
    }),

    // === ENGLISH VERSION ===
    defineField({
      name: 'tabTitleEn',
      title: 'Tab title (English)',
      type: 'string',
    }),
    defineField({
      name: 'tabContentEn',
      title: 'Tab content (English)',
      type: 'richText',
    }),

    // === KAZAKH VERSION ===
    defineField({
      name: 'tabTitleKz',
      title: 'Tab title (Kazakh)',
      type: 'string', group: 'kazakh' }),
    defineField({
      name: 'tabContentKz',
      title: 'Tab content (Kazakh)',
      type: 'richText', group: 'kazakh' }),
  ],

  groups: [
    { name: 'english', title: 'English version' },
    { name: 'kazakh', title: 'Қазақша нұсқа' },
  ],
})
