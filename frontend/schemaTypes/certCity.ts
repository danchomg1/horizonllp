import { defineField, defineType } from 'sanity'

/**
 * Справочник населённых пунктов для поля «Место проведения».
 * Русское написание сверяется со списком: если совпало — в казахский
 * и английский бланк подставляется готовый перевод, иначе значение
 * просто копируется и его можно поправить руками.
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
  ],
  orderings: [
    { name: 'ru', title: 'По названию', by: [{ field: 'nameRu', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nameRu', subtitle: 'nameKz' },
  },
})
