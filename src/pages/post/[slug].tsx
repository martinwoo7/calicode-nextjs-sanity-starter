import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getPosts,
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  getOtherPost,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

import PostPage from '~/components/blog/Post'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
    otherPosts: Post[]
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const post = await getPost(client, params.slug)
  const otherPosts = await getOtherPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
      otherPosts,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  const data = { post: post, morePosts: props.otherPosts }
  return <PostPage data={data} />
  // return (
  //   <div>
  //     <h1>Hello</h1>
  //   </div>
  // )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
