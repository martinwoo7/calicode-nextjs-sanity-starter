import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import profile from './profile'
import job from './job'
import project from './project'

export const schemaTypes = [post, blockContent, profile, job, project]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, profile, job, project],
}
