import { defineType } from 'sanity'
import { PlayIcon, ImageIcon } from '@sanity/icons' // Импортируем иконки

export default defineType({
  name: 'richText',
  title: 'Текст',
  type: 'array',
  of: [
    // 1. ТЕКСТОВЫЙ БЛОК (Стили, которые вы настроили)
    {
      type: 'block',
      styles: [
        { title: 'Заголовок H1 (26px Medium)', value: 'h1' },
        { title: 'Подзаголовок H2 (22px Medium)', value: 'h2' },
        { title: 'Заголовок параграфа H3 (18px Regular)', value: 'h3' },
        { title: 'Основной текст (14px Regular)', value: 'normal' },
      ],
      lists: [
        { title: 'Маркированный список', value: 'bullet' },
        { title: 'Нумерованный список', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Жирный', value: 'strong' },
          { title: 'Курсив', value: 'em' },
        ],
      },
    },

    // 2. КАРТИНКИ (Обязательно нужны для новостей)
    {
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Описание (Alt)',
        }
      ]
    },

    // 3. YOUTUBE ВИДЕО
    {
      name: 'youtube',
      type: 'object',
      title: 'YouTube Видео',
      icon: PlayIcon,
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Ссылка на видео с YouTube',
        }
      ],
      preview: {
        select: {
          url: 'url'
        },
        prepare(selection) {
          return {
            title: 'YouTube Video',
            subtitle: selection.url
          }
        }
      }
    }
  ],
})