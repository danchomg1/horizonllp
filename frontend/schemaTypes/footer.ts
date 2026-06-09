import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Футер',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Логотип в футере',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'columns',
      title: 'Колонки меню',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Колонка',
        fields: [
          { name: 'title', title: 'Заголовок (RU)', type: 'string' },
          { name: 'titleEn', title: 'Заголовок (EN)', type: 'string' },
          {
            name: 'links',
            title: 'Пункты меню (RU)',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'linksEn',
            title: 'Пункты меню (EN)',
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