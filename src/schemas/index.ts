import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import profile from './profile'
import job from './job'

export const schemaTypes = [post, blockContent, profile, job]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, profile, job],
}
