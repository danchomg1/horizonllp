import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './sanity/structure'
import CertificatesTool from './sanity/tools/CertificatesTool'
import {DocumentsIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'Horizon_web',

  projectId: 'yhtytg6i',
  dataset: 'production',
  
  // ВАЖНО: Добавляем вот эту строчку!
  basePath: '/studio',

  plugins: [structureTool({structure}), visionTool()],

  // Реестр сертификатов: данные лежат в Postgres, поэтому это собственный
  // инструмент, а не тип документа Sanity.
  tools: (prev) => [
    ...prev,
    {
      name: 'certificates',
      title: 'Реестр сертификатов',
      icon: DocumentsIcon,
      component: CertificatesTool,
    },
  ],

  schema: {
    types: schemaTypes,
  },
})