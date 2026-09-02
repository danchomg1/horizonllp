import { defineField, defineType } from 'sanity'

/**
 * Справочник курсов для сертификатов.
 * Намеренно отдельный от типа `course`: там страницы сайта, здесь —
 * названия для печати в документе, включая курсы, которых на сайте нет.
 *
 * Срок действия и продолжительность закреплены за курсом: при выдаче они
 * не редактируются, поэтому здесь оба обязательны. «Действует до» считается
 * от даты выдачи, часы печатаются на бланке как есть.
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
      name: 'hours',
      title: 'Продолжительность, часов',
      type: 'number',
      initialValue: 8,
      description: 'Печатается на бланке. При выдаче не редактируется — это свойство курса, а не конкретной группы.',
      validation: (Rule) => Rule.required().integer().min(1).max(2000),
    }),

    defineField({
      name: 'perpetual',
      title: 'Бессрочный',
      type: 'boolean',
      initialValue: false,
      description: 'Сертификат по этому курсу не имеет срока действия.',
    }),
    defineField({
      name: 'validityYears',
      title: 'Срок действия, лет',
      type: 'number',
      initialValue: 3,
      description: 'Целое число лет. «Действует до» = дата выдачи плюс столько лет.',
      hidden: ({ document }) => document?.perpetual === true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.document as { perpetual?: boolean })?.perpetual) return true
          if (typeof value !== 'number') return 'Укажите срок действия или отметьте «Бессрочный»'
          if (!Number.isInteger(value) || value < 1 || value > 50) return 'Целое число от 1 до 50'
          return true
        }),
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
    select: {
      title: 'titleRu', subtitle: 'titleEn', active: 'active',
      perpetual: 'perpetual', years: 'validityYears', hours: 'hours',
    },
    prepare: ({ title, subtitle, active, perpetual, years, hours }) => {
      const term = [
        perpetual ? 'бессрочный' : years ? `${years} г.` : 'срок не задан',
        hours ? `${hours} ч.` : 'часы не заданы',
      ].join(' · ')
      return {
        title: active === false ? `${title} (неактивен)` : title,
        subtitle: [term, subtitle].filter(Boolean).join(' · '),
      }
    },
  },
})
