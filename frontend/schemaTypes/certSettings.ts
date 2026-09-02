import { defineField, defineType } from 'sanity'

/**
 * Общие настройки сертификатов: сейчас это только подписант.
 * Тексты о прохождении живут отдельным справочником certCompletion.
 * Документ единственный в своём роде.
 */
export default defineType({
  name: 'certSettings',
  title: 'Настройки сертификатов',
  type: 'document',
  fields: [
    defineField({
      name: 'directorRu',
      title: 'Генеральный директор (рус)',
      type: 'string',
      initialValue: 'Малик Бакытбек',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'directorEn',
      title: 'Генеральный директор (англ)',
      type: 'string',
      initialValue: 'Malik Bakytbek',
    }),
    defineField({
      name: 'directorKz',
      title: 'Генеральный директор (каз)',
      type: 'string',
      initialValue: 'Малик Бақытбек',
    }),


  ],
  preview: {
    prepare: () => ({ title: 'Настройки сертификатов' }),
  },
})
