import { getAllPosts } from '../../utils/mdxUtils'
import Link from 'next/link'

export default function Blog({posts}) {
  return (
    <>
      <h1>Latest blogs</h1>
      <ul>
        {posts.map(post => {
          return (<li key={post.slug}><Link href={`/blog/${encodeURIComponent(post.slug)}`}><a>{post.title}</a></Link></li>)
        })}
      </ul>
    </>
  )
}

export const getStaticProps = async () => {
  const latestPosts = getAllPosts();

  return {
    props: {
      posts: latestPosts
    },
  }
}
