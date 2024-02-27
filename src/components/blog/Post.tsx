import { useRouter } from 'next/router'
import Head from 'next/head'
import Error from 'next/error'
import PostHeader from './Post_Header'
import PostTitle from './Post_Title'
import PostBody from './Post_Body'
import SectionSeparator from '../Section_Separator'
import MoreStories from './More_Stories'
import Header from './Header'
import { urlForImage } from '~/lib/sanity.image'

import { type Post } from '~/lib/sanity.queries'

export default function PostPage({ data }) {
  const router = useRouter()
  console.log(data)
  const { post, morePosts } = data

  const slug = post?.slug
  if (!router.isFallback && !slug) {
    return <Error statusCode={404} />
  }

  return (
    <div className="container mx-auto px-5">
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading...</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>{`${post.title} | Next.js Blog Example `}</title>
              {post.mainImage && (
                <meta
                  key="ogImage"
                  property="og:image"
                  content={urlForImage(post.mainImage)
                    .width(1200)
                    .height(627)
                    .fit('crop')
                    .url()}
                />
              )}
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.mainImage}
              date={post._createdAt}
              author={null}
            />
            <PostBody content={post.body} />
          </article>
          <SectionSeparator />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </div>
  )
}
