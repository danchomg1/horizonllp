import { defineField, defineType } from 'sanity'

/**
 * Страны для поля «Место проведения».
 *
 * Место на бланке собирается из страны и города, а не вводится текстом:
 * так на всех трёх языках получается одинаковое написание, и его можно
 * поправить в одном месте.
 */
export default defineType({
  name: 'certCountry',
  title: 'Страны (сертификаты)',
  type: 'document',
  fields: [
    defineField({
      name: 'nameRu',
      title: 'Название (рус)',
      type: 'string',
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
      name: 'order',
      title: 'Порядок в списке',
      type: 'number',
      initialValue: 100,
      description: 'Меньше — выше. Одинаковые значения сортируются по алфавиту.',
    }),
  ],
  orderings: [
    { name: 'manual', title: 'Как в списке выдачи', by: [{ field: 'order', direction: 'asc' }, { field: 'nameRu', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nameRu', subtitle: 'nameEn' },
  },
})
