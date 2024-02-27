export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

import type { GetStaticProps } from 'next'

import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getPosts,
  type Post,
  getProfile,
  type Profile,
  getJobs,
  type Job,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    profile: Profile[]
    job: Job[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const posts = await getPosts(client)
  const profile = await getProfile(client)
  const job = await getJobs(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      profile,
      job,
    },
  }
}
