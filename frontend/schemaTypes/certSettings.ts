import { defineField, defineType } from 'sanity'

/**
 * Общие настройки сертификатов: подписант, тексты о прохождении и
 * расположение печати с подписью. Документ единственный в своём роде.
 *
 * Координаты задаются в миллиметрах по листу A4 альбомной ориентации
 * (297 x 210 мм): X от левого края, Y от верхнего, точка — центр
 * изображения. Так их можно снять линейкой с распечатанного образца,
 * не разбираясь в системе координат PDF.
 */
export default defineType({
  name: 'certSettings',
  title: 'Настройки сертификатов',
  type: 'document',
  groups: [
    { name: 'people', title: 'Подписант и тексты', default: true },
    { name: 'marks', title: 'Печать и подпись' },
  ],
  fields: [
    defineField({
      name: 'directorRu',
      title: 'Генеральный директор (рус)',
      type: 'string',
      group: 'people',
      initialValue: 'Малик Бакытбек',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'directorEn',
      title: 'Генеральный директор (англ)',
      type: 'string',
      group: 'people',
      initialValue: 'Malik Bakytbek',
    }),
    defineField({
      name: 'directorKz',
      title: 'Генеральный директор (каз)',
      type: 'string',
      group: 'people',
      initialValue: 'Малик Бақытбек',
    }),

    defineField({
      name: 'completedRu',
      title: 'Текст о прохождении (рус)',
      type: 'string',
      group: 'people',
      initialValue: 'успешно прошёл(а) курс обучения',
      description: 'Подставляется в форму выдачи, там его можно заменить для конкретного человека.',
    }),
    defineField({
      name: 'completedEn',
      title: 'Текст о прохождении (англ)',
      type: 'string',
      group: 'people',
      initialValue: 'has successfully completed the training course',
    }),
    defineField({
      name: 'completedKz',
      title: 'Текст о прохождении (каз)',
      type: 'string',
      group: 'people',
      initialValue: 'оқу курсын сәтті аяқтады',
    }),

    /* ---------------------------------------------------------------- *
     * Подпись                                                           *
     * ---------------------------------------------------------------- */

    defineField({
      name: 'signatureNote',
      title: 'Как это работает',
      type: 'string',
      group: 'marks',
      readOnly: true,
      initialValue:
        'Лист 297 x 210 мм. X — от левого края, Y — от верхнего, до центра картинки.',
      description:
        'Заданное здесь положение применяется ко всем сертификатам на всех трёх языках ' +
        'и действует, пока его не изменят. Чтобы проверить, нажмите «Образец» в разделе ' +
        'Сертификаты — придёт PDF с текущими настройками.',
    }),

    defineField({
      name: 'signatureShow',
      title: 'Ставить подпись',
      type: 'boolean',
      group: 'marks',
      initialValue: true,
    }),
    defineField({
      name: 'signatureImage',
      title: 'Файл подписи',
      type: 'image',
      group: 'marks',
      description: 'PNG с прозрачным фоном. Если не загружать, берётся файл по умолчанию. ' +
        'Пустые поля внутри картинки считаются её частью — обрежьте её вплотную к росчерку.',
      hidden: ({ document }) => document?.signatureShow === false,
    }),
    defineField({
      name: 'signatureX',
      title: 'Подпись: X, мм от левого края',
      type: 'number',
      group: 'marks',
      initialValue: 53.6,
      validation: (Rule) => Rule.min(0).max(297),
      hidden: ({ document }) => document?.signatureShow === false,
    }),
    defineField({
      name: 'signatureY',
      title: 'Подпись: Y, мм от верхнего края',
      type: 'number',
      group: 'marks',
      initialValue: 152.2,
      validation: (Rule) => Rule.min(0).max(210),
      hidden: ({ document }) => document?.signatureShow === false,
    }),
    defineField({
      name: 'signatureWidth',
      title: 'Подпись: ширина, мм',
      type: 'number',
      group: 'marks',
      initialValue: 42,
      description: 'Высота подбирается сама, пропорции сохраняются.',
      validation: (Rule) => Rule.min(1).max(200),
      hidden: ({ document }) => document?.signatureShow === false,
    }),

    /* ---------------------------------------------------------------- *
     * Печать                                                            *
     * ---------------------------------------------------------------- */

    defineField({
      name: 'stampShow',
      title: 'Ставить печать',
      type: 'boolean',
      group: 'marks',
      initialValue: true,
    }),
    defineField({
      name: 'stampImage',
      title: 'Файл печати',
      type: 'image',
      group: 'marks',
      description: 'PNG с прозрачным фоном. Если не загружать, берётся файл по умолчанию.',
      hidden: ({ document }) => document?.stampShow === false,
    }),
    defineField({
      name: 'stampX',
      title: 'Печать: X, мм от левого края',
      type: 'number',
      group: 'marks',
      initialValue: 88,
      validation: (Rule) => Rule.min(0).max(297),
      hidden: ({ document }) => document?.stampShow === false,
    }),
    defineField({
      name: 'stampY',
      title: 'Печать: Y, мм от верхнего края',
      type: 'number',
      group: 'marks',
      initialValue: 152,
      validation: (Rule) => Rule.min(0).max(210),
      hidden: ({ document }) => document?.stampShow === false,
    }),
    defineField({
      name: 'stampWidth',
      title: 'Печать: ширина, мм',
      type: 'number',
      group: 'marks',
      initialValue: 32,
      description: 'Высота подбирается сама, пропорции сохраняются.',
      validation: (Rule) => Rule.min(1).max(200),
      hidden: ({ document }) => document?.stampShow === false,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Настройки сертификатов' }),
  },
})
