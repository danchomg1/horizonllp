import { defineField, defineType } from 'sanity'

/**
 * Города для поля «Место проведения».
 *
 * Написания хранятся ровно в том виде, в каком печатаются на бланке
 * («г. Астана» / «Astana» / «Астана қаласы»), а страна подставляется перед
 * ними. Свободный ввод не годится: три языка руками не наберёшь одинаково.
 *
 * Онлайн и «место не указано» здесь не заводятся: это не города, а режимы
 * выдачи. В форме они стоят отдельными галочками над списком.
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
      description: 'Как на бланке: «Astana».',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameKz',
      title: 'Название (каз)',
      type: 'string',
      description: 'Как на бланке: «Астана қаласы».',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'country',
      title: 'Страна',
      type: 'reference',
      to: [{ type: 'certCountry' }],
      description:
        'Выберите из списка или заведите новую кнопкой «Create new» — '
        + 'она сразу появится в выборе при выдаче сертификата.',
      // Создание новой страны прямо из поля включено намеренно: города
      // добавляют пачками, и уходить в другой раздел ради страны неудобно.
      options: { disableNew: false },
      validation: (Rule) => Rule.required(),
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
    select: { title: 'nameRu', country: 'country.nameRu', order: 'order' },
    prepare: ({ title, country, order }) => ({
      title,
      subtitle: [country, order != null ? `№ ${order}` : null].filter(Boolean).join(' · '),
    }),
  },
})
