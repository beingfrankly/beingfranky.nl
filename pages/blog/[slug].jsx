import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import path from 'path'
import { getAllPosts, getPostBySlug, postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'

export default function BlogPost({ source, frontMatter, canonicalURL }) {
  return (
    <div className="blog-container">
      <Head>
        <title>{frontMatter.title}</title>
        <link rel="canonical" href={ canonicalURL } />
      </Head>
      <MDXRemote {...source} />
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug);
  const canonicalURL = `https://www.beingfrankly.nl/blog/${params.slug}`;
  const postFilePath = path.join(POSTS_PATH, `${post.postPath}`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      canonicalURL: canonicalURL
    },
  }
}

export const getStaticPaths = async () => {
  postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  const paths = getAllPosts().map(post => post.slug).map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}
