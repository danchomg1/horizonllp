import { defineField, defineType } from 'sanity'

/**
 * Города для поля «Место проведения».
 *
 * Написания хранятся ровно в том виде, в каком печатаются на бланке
 * («г. Астана» / «Astana» / «Астана қаласы»), а страна подставляется перед
 * ними. Свободный ввод не годится: три языка руками не наберёшь одинаково.
 *
 * Онлайн — тоже запись этого справочника, но с отметкой: у неё страна перед
 * названием не печатается.
 */
export default defineType({
  name: 'certCity',
  title: 'Города (сертификаты)',
  type: 'document',
  fields: [
    defineField({
      name: 'nameRu',
      title: 'Название (рус)',
      type: 'string',
      description: 'Как на бланке, вместе с сокращением: «г. Астана».',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Название (англ)',
      type: 'string',
    }),
    defineField({
      name: 'nameKz',
      title: 'Название (каз)',
      type: 'string',
    }),

    defineField({
      name: 'country',
      title: 'Страна',
      type: 'reference',
      to: [{ type: 'certCountry' }],
      description: 'При выдаче город предлагается только для выбранной страны.',
      hidden: ({ document }) => document?.online === true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.document as { online?: boolean })?.online) return true
          return value ? true : 'Выберите страну или отметьте «Онлайн»'
        }),
    }),

    defineField({
      name: 'online',
      title: 'Онлайн',
      type: 'boolean',
      initialValue: false,
      description: 'Обучение без места проведения. На бланке печатается одно слово, без страны.',
    }),

    defineField({
      name: 'order',
      title: 'Порядок в списке',
      type: 'number',
      initialValue: 100,
      description: 'Меньше — выше. Города с офисами держим наверху, остальные идут по алфавиту.',
    }),
  ],
  orderings: [
    { name: 'manual', title: 'Как в списке выдачи', by: [{ field: 'order', direction: 'asc' }, { field: 'nameRu', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nameRu', country: 'country.nameRu', online: 'online', order: 'order' },
    prepare: ({ title, country, online, order }) => ({
      title,
      subtitle: [online ? 'онлайн' : country, order != null ? `№ ${order}` : null].filter(Boolean).join(' · '),
    }),
  },
})
