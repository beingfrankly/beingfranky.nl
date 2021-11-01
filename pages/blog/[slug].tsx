import Head from 'next/head'
import { getMDXComponent } from 'mdx-bundler/client'
import React from 'react'
import { getAllPosts, getSinglePost } from '../../utils/mdx.js'

export const Post = ({ code, frontmatter, canonicalURL }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="blog-container">
      <Head>
        <title>{ frontmatter.title } | BeingFrankly</title>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <Component />
    </div>
  )
}

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ frontmatter }) => ({ params: { slug: frontmatter.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);
  return {
    props: { ...post },
  };
};

export default Post;
