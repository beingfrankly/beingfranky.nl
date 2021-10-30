import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { getAllPosts, getPostBySlug } from '../../utils/mdxUtils'

export default function BlogPost({ source, frontMatter, canonicalURL }) {
  return (
    <div className="blog-container">
      <Head>
        <title>{frontMatter.title} | BeingFrankly</title>
        <link rel="canonical" href={ canonicalURL } />
      </Head>
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const canonicalURL = `https://www.beingfrankly.nl/blog/${params.slug}`;

  const mdxSource = await serialize(post.content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: post.data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: post.data,
      canonicalURL: canonicalURL
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllPosts().map(post => post.data.slug).map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}
