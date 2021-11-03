import Head from 'next/head'
import { getMDXComponent } from 'mdx-bundler/client'
import React from 'react'
import { getAllPosts, getSinglePost } from '../../utils/mdx.js'

export const Post = ({ code, frontmatter, canonicalUrl }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="blog-container">

      <Head>
        <title key="title">{frontmatter.title} | BeingFrankly</title>
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <meta name="description" content="Making accessibility more accessible for frontend developers." />
        <meta property="og:title" content={`${frontmatter.title} | BeingFrankly`} key="og-title" />
        <meta property="og:url" content={canonicalUrl} key="og-url"/>
        <meta property="og:description" content="Making accessibility more accessible for frontend developers." />
        <meta property="og:type" content="article" key="og-type" />
        <meta property="article:published_time" content={frontmatter.publishedOn} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="Making accessibility more accessible for frontend developers." />
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
  const canonicalUrl: string = `https://beingfrankly.nl/blog/${post.frontmatter.slug}`;

  return {
    props: { ...post, canonicalUrl: canonicalUrl },
  };
};

export default Post;
