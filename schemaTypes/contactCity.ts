import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactCity',
  title: 'Контакты: Город',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'Название города (например: Астана)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officeName',
      title: 'Название офиса (например: Офис «HORIZON INC»)',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Адрес (например: ул. Амандосова 40а)',
      type: 'string',
    }),
    defineField({
      name: 'phones',
      title: 'Телефоны (каждый с новой строки)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Порядковый номер (для сортировки)',
      type: 'number',
      initialValue: 0,
    }),
  ],
})