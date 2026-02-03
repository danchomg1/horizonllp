import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Футер',
  type: 'document',
  fields: [
    defineField({
      name: 'columns',
      title: 'Колонки меню',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Колонка',
        fields: [
          { name: 'title', title: 'Заголовок', type: 'string' },
          { 
            name: 'links', 
            title: 'Пункты меню', 
            type: 'array', 
            of: [{ type: 'string' }] 
          }
        ]
      }]
    }),
    defineField({
      name: 'socials',
      title: 'Ссылки на соцсети',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ]
    }),
    defineField({
      name: 'copyright',
      title: 'Текст копирайта',
      type: 'string',
      initialValue: '© 2026 Horizon LLP Consulting'
    })
  ]
})