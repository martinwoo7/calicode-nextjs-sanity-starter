import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { SharedPageProps } from '~/pages/_app'

import BlogIntro from '~/components/blog/Blog_Intro'
import MoreStories from '~/components/blog/More_Stories'
import HeroPost from '~/components/blog/Hero-Post'

export const getStaticProps: GetStaticProps<
  SharedPageProps & { posts: Post[] }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

const PostPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const [heroPost, ...morePosts] = posts

  return (
    <div className="max-w-7xl mx-auto md:px-16 px-6">
      <BlogIntro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.mainImage}
          date={heroPost._createdAt}
          author={null}
          slug={heroPost.slug.current}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </div>
  )
}

export default PostPage
