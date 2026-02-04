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
    })
  ]
})