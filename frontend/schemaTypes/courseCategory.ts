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
      of: [{ type: 'reference', to: [{ type: 'course' }] }]
    }),

    // === ENGLISH VERSION ===
    defineField({
      name: 'titleEn',
      title: 'Group name (English)',
      type: 'string',
    }),

    // === KAZAKH VERSION ===
    defineField({
      name: 'titleKz',
      title: 'Group name (Kazakh)',
      type: 'string', group: 'kazakh' }),
  ],

  groups: [
    { name: 'english', title: 'English version' },
    { name: 'kazakh', title: 'Қазақша нұсқа' },
  ],
})
