import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Событие',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название события',
      type: 'string',
    }),
    
    // --- ЗДЕСЬ БЫЛ СТАРЫЙ SLUG, МЫ ЕГО УДАЛИЛИ ---

    defineField({
      name: 'date',
      title: 'Дата проведения',
      type: 'datetime',
    }),
    
    // Оставляем старую картинку, если она нужна для превью в списке событий
    // Но лучше использовать heroImage для самой страницы
    defineField({
      name: 'image',
      title: 'Превью (квадратное)',
      type: 'image',
      options: { hotspot: true },
    }),
    
    defineField({
      name: 'description',
      title: 'Краткое описание',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // --- НОВЫЕ ПОЛЯ ДЛЯ СТРАНИЦЫ ---
    // Оставляем этот slug, так как он новее
    defineField({
      name: 'slug',
      title: 'Ссылка (Slug)',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroImage',
      title: 'Обложка страницы (Верхняя)',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'introTitle',
      title: 'Заголовок введения (например, "Введение")',
      type: 'string'
    }),
    defineField({
      name: 'introText',
      title: 'Текст введения',
      type: 'array', 
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'introIcon',
      title: 'Иконка справа от введения (Опционально)',
      type: 'image'
    }),
    defineField({
      name: 'pageTabs',
      title: 'Блок с вкладками',
      type: 'array',
      of: [{ type: 'tabItem' }] 
    }),
  ],
})