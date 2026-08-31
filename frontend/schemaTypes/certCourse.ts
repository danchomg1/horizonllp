import { defineField, defineType } from 'sanity'

/**
 * Справочник курсов для сертификатов.
 * Намеренно отдельный от типа `course`: там страницы сайта, здесь —
 * названия для печати в документе, включая курсы, которых на сайте нет.
 */
export default defineType({
  name: 'certCourse',
  title: 'Курсы (сертификаты)',
  type: 'document',
  fields: [
    defineField({
      name: 'titleRu',
      title: 'Название (рус)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Название (англ)',
      type: 'string',
      description: 'Печатается на английском бланке.',
    }),
    defineField({
      name: 'titleKz',
      title: 'Название (каз)',
      type: 'string',
      description: 'Печатается на казахском бланке.',
    }),
    defineField({
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
      description: 'Неактивные курсы не предлагаются при выдаче, но остаются у выданных сертификатов.',
    }),
  ],
  orderings: [
    { name: 'ru', title: 'По названию', by: [{ field: 'titleRu', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'titleRu', subtitle: 'titleEn', active: 'active' },
    prepare: ({ title, subtitle, active }) => ({
      title: active === false ? `${title} (неактивен)` : title,
      subtitle,
    }),
  },
})
