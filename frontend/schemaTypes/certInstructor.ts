import { defineField, defineType } from 'sanity'

/**
 * Справочник преподавателей. Три написания одного человека нужны,
 * чтобы при выдаче можно было начать вводить на любом из языков,
 * а в бланк подставилось написание, соответствующее его языку.
 */
export default defineType({
  name: 'certInstructor',
  title: 'Преподаватели (сертификаты)',
  type: 'document',
  fields: [
    defineField({
      name: 'nameRu',
      title: 'ФИО (рус)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'ФИО (англ)',
      type: 'string',
    }),
    defineField({
      name: 'nameKz',
      title: 'ФИО (каз)',
      type: 'string',
    }),
    defineField({
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
      description: 'Неактивные не предлагаются при выдаче, но остаются у выданных сертификатов.',
    }),
  ],
  orderings: [
    { name: 'ru', title: 'По фамилии', by: [{ field: 'nameRu', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nameRu', subtitle: 'nameEn', active: 'active' },
    prepare: ({ title, subtitle, active }) => ({
      title: active === false ? `${title} (неактивен)` : title,
      subtitle,
    }),
  },
})
