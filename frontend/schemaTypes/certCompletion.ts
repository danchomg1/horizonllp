import { defineField, defineType } from 'sanity'

/**
 * Справочник фраз о прохождении — строка под именем на бланке.
 *
 * Вариантов немного, но они разные: одним подтверждают прохождение курса,
 * другим — компетентность. Свободный ввод не годится по той же причине,
 * что у курсов: нужны все три языка сразу.
 */
export default defineType({
  name: 'certCompletion',
  title: 'Тексты о прохождении',
  type: 'document',
  fields: [
    defineField({
      name: 'textRu',
      title: 'Текст (рус)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textEn',
      title: 'Текст (англ)',
      type: 'string',
    }),
    defineField({
      name: 'textKz',
      title: 'Текст (каз)',
      type: 'string',
    }),

    defineField({
      name: 'isDefault',
      title: 'По умолчанию',
      type: 'boolean',
      initialValue: false,
      description:
        'Подставляется в форму выдачи и в строки таблицы, где текст не указан. '
        + 'Если отмечено несколько, берётся первый по алфавиту.',
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
    { name: 'ru', title: 'По тексту', by: [{ field: 'textRu', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'textRu', subtitle: 'textEn', active: 'active', isDefault: 'isDefault' },
    prepare: ({ title, subtitle, active, isDefault }) => ({
      title: [title, isDefault ? '— по умолчанию' : '', active === false ? '(неактивен)' : '']
        .filter(Boolean).join(' '),
      subtitle,
    }),
  },
})
