import { defineField, defineType } from 'sanity'

/**
 * Общие настройки сертификатов: подписант и тексты о прохождении,
 * которые подставляются в форму выдачи по умолчанию.
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

    defineField({
      name: 'completedRu',
      title: 'Текст о прохождении (рус)',
      type: 'string',
      initialValue: 'успешно прошёл(а) курс обучения',
      description: 'Подставляется в форму выдачи, там его можно заменить для конкретного человека.',
    }),
    defineField({
      name: 'completedEn',
      title: 'Текст о прохождении (англ)',
      type: 'string',
      initialValue: 'has successfully completed the training course',
    }),
    defineField({
      name: 'completedKz',
      title: 'Текст о прохождении (каз)',
      type: 'string',
      initialValue: 'оқу курсын сәтті аяқтады',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Настройки сертификатов' }),
  },
})
