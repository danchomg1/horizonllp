import { defineField, defineType } from 'sanity'

/**
 * Страны для поля «Место проведения».
 *
 * Место на бланке собирается из страны и города, а не вводится текстом:
 * так на всех трёх языках получается одинаковое написание, и его можно
 * поправить в одном месте.
 *
 * Новую страну можно завести и отсюда, и прямо из карточки города. Она сразу
 * появляется в выборе при выдаче сертификата — отдельно ничего включать
 * не нужно.
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
    // Переводы обязательны: без них на английском и казахском бланке
    // встанет русское написание страны.
    defineField({
      name: 'nameEn',
      title: 'Название (англ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameKz',
      title: 'Название (каз)',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
