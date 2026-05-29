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

    // === ENGLISH VERSION ===
    defineField({
      name: 'cityEn',
      title: 'City name (English)',
      type: 'string',
      group: 'english',
    }),
    defineField({
      name: 'officeNameEn',
      title: 'Office name (English)',
      type: 'string',
      group: 'english',
    }),
    defineField({
      name: 'addressEn',
      title: 'Address (English)',
      type: 'string',
      group: 'english',
    }),
  ],

  groups: [
    { name: 'english', title: 'English version' },
  ],
})