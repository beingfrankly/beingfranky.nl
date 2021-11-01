import Link from 'next/link'
import React from 'react'
import { getAllPosts } from '../utils/mdx.js'

export default function Home({posts}) {
  return (
    <>
      <h1>Latest blogs</h1>
      <ul>
        {posts.map(post => {
          return (<li key={post.frontmatter.slug}><Link href={`/blog/${encodeURIComponent(post.frontmatter.slug)}`}><a>{post.frontmatter.title}</a></Link></li>)
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
