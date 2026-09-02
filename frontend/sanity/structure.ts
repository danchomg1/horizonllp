import type { StructureResolver } from 'sanity/structure'

/**
 * Меню Studio.
 *
 * Своя структура полностью заменяет список по умолчанию, поэтому здесь
 * перечислены ВСЕ типы документов: если тип не упомянуть, он пропадёт
 * из меню. Существующие пункты оставлены как были, справочники
 * сертификатов собраны в отдельную папку.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Контент')
    .items([
      S.documentTypeListItem('home').title('Главная страница'),
      S.documentTypeListItem('header').title('Настройки шапки'),
      S.documentTypeListItem('footer').title('Футер'),

      S.divider(),

      S.documentTypeListItem('news').title('Новости / События'),
      S.documentTypeListItem('aboutItem').title('Меню: О нас'),
      S.documentTypeListItem('courseCategory').title('Группы курсов'),
      S.documentTypeListItem('course').title('Курсы'),
      S.documentTypeListItem('consultingItem').title('Консалтинг'),
      S.documentTypeListItem('explosionItem').title('Взрывозащита'),
      S.documentTypeListItem('emergencyItem').title('Аварийное реагирование'),
      S.documentTypeListItem('engineeringItem').title('Инжиниринг'),
      S.documentTypeListItem('ppeItem').title('СИЗ'),
      S.documentTypeListItem('contactCity').title('Контакты: города'),

      S.divider(),

      S.documentTypeListItem('page').title('Страницы'),
      S.documentTypeListItem('event').title('События'),

      S.divider(),

      S.listItem()
        .title('Сертификаты')
        .child(
          S.list()
            .title('Сертификаты')
            .items([
              S.documentTypeListItem('certCourse').title('Курсы'),
              S.documentTypeListItem('certInstructor').title('Преподаватели'),
              S.documentTypeListItem('certCity').title('Города'),
              S.documentTypeListItem('certCompletion').title('Тексты о прохождении'),

              S.divider(),

              // Настройки существуют в единственном экземпляре,
              // поэтому открываем документ напрямую, минуя список.
              S.listItem()
                .title('Настройки')
                .id('certSettings')
                .child(
                  S.document()
                    .schemaType('certSettings')
                    .documentId('certSettings')
                    .title('Настройки сертификатов'),
                ),
            ]),
        ),
    ])
