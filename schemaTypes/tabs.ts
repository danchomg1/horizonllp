import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tabs',
  title: 'Вкладка',
  type: 'object',
  fields: [
    defineField({
      name: 'title', // Заголовок вкладки (на кнопке)
      title: 'Название вкладки',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content', // То, что внутри вкладки
      title: 'Содержимое вкладки',
      type: 'richText', // Ссылаемся на твой RichText
    }),
  ],
})