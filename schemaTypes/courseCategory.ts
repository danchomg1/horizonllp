import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'courseCategory',
  title: 'Группа курсов (Категория)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название группы (например: NEBOSH)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'courses',
      title: 'Курсы в этой группе',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'course' }] // Ссылаемся на документ course из Шага 1
        }
      ]
    }),
  ],
})