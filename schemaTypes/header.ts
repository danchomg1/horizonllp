import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Настройки Шапки',
  type: 'document',
  fields: [
    defineField({
      name: 'scrollLogo',
      title: 'Логотип при скролле',
      description: 'Логотип, который появляется слева при прокрутке страницы. (Рекомендуемый размер: ширина около 100-180px)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})