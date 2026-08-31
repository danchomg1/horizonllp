import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Horizon_web',

  projectId: 'yhtytg6i',
  dataset: 'production',
  
  // ВАЖНО: Добавляем вот эту строчку!
  basePath: '/studio',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})