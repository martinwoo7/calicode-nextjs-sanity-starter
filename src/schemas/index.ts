import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import profile from './profile'
import jobs from './jobs'

export const schemaTypes = [post, blockContent, profile, jobs]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, profile, jobs],
}
