import { getLatestPosts } from '../../utils/mdxUtils'
import Link from 'next/link'

export default function Blog({posts}) {
  return (
    <>
      <h1>Latest blogs</h1>
      <ul>
        {posts.map(post => {
          return (<Link href={`blog/${post.id}`}><a>{post.id}</a></Link>)
        })}
      </ul>
    </>
  )
}

export const getStaticProps = async () => {
  const latestPosts = getLatestPosts();

  return {
    props: {
      posts: latestPosts
    },
  }
}
