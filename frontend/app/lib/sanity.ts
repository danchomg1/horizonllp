import { createClient } from 'next-sanity'
// ИЗМЕНЕНИЕ: Используем именованный импорт вместо дефолтного
import createImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'yhtytg6i', 
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// ИЗМЕНЕНИЕ: Используем новую функцию
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}