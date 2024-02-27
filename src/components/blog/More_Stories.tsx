import { Post } from '~/lib/sanity.queries'
import PostPlug from './Post_Plug'

const MoreStories = ({ posts }) => {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post: Post) => (
          <PostPlug
            key={post._id}
            title={post.title}
            coverImage={post.mainImage}
            date={post._createdAt}
            author={null}
            slug={post.slug.current}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
export default MoreStories
