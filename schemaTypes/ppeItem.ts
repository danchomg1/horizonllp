import { defineField, defineType } from 'sanity'

export default defineType({
  // ВАЖНО: Меняй это имя для каждого файла! 
  // (consultingItem, explosionItem, emergencyItem, engineeringItem, ppeItem)
  name: 'ppeItem', 
  title: 'СИЗ', // Меняй заголовок соответственно
  type: 'document',
  fields: [
    
    // --- 1. ДЛЯ ВЫПАДАЮЩЕГО МЕНЮ (В ШАПКЕ) ---
    defineField({
      name: 'title',
      title: 'Название услуги (в меню и заголовок страницы)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Краткое описание (в меню справа)',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Иконка/Картинка (в меню справа)',
      type: 'image',
    }),

    // --- 2. НАСТРОЙКИ СТРАНИЦЫ ---
    defineField({
      name: 'slug',
      title: 'Ссылка (Slug)',
      type: 'slug',
      options: { source: 'title' }, // Генерирует ссылку из названия
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroImage',
      title: 'Обложка страницы (Большая сверху)',
      type: 'image',
      options: { hotspot: true }
    }),

    // --- 3. ВВЕДЕНИЕ (ВНУТРИ СТРАНИЦЫ) ---
    defineField({
      name: 'introTitle',
      title: 'Заголовок блока введения',
      type: 'string'
    }),
defineField({
  name: 'introText',
  title: 'Текст введения',
  type: 'richText', // <-- Ссылаемся на наш новый тип
}),
    defineField({
      name: 'introIcon',
      title: 'Иконка справа от введения (Опционально)',
      type: 'image'
    }),

    // --- 4. ВКЛАДКИ (TABS) ---
    defineField({
      name: 'pageTabs',
      title: 'Блок с вкладками',
      type: 'array',
      of: [{ type: 'tabItem' }] // Ссылка на схему tabItem
    }),

    // --- 5. СОРТИРОВКА ---
    defineField({
      name: 'order',
      title: 'Порядковый номер',
      type: 'number',
      initialValue: 0
    })
  ]
})