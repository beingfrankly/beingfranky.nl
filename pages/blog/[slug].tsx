import { getMDXComponent } from "mdx-bundler/client";
import Head from "next/head";
import React from "react";
import AnchorLink from "../../components/anchor-link";
import { getAllPosts, getSinglePost } from "../../utils/mdx";
import { format } from "date-fns-tz";

export const Post = ({ code, frontmatter, canonicalUrl }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const HeadingEmpty: React.FC = () => null;

  const HeadingOne: React.FC = ({ children }) => (
    <>
      <h1 className="mb-2">{children}</h1>
      <div className="article-meta text-slate-500">
        {(frontmatter.modifiedOn.length > 0 && (
          <>
            <time dateTime={frontmatter.modifiedOn}>
              {format(new Date(frontmatter.modifiedOn), "MMMM do, yyyy", {
                timeZone: "Europe/Amsterdam",
              })}
            </time>
          </>
        )) || (
          <>
            <time dateTime={frontmatter.publishedOn}>
              {format(new Date(frontmatter.publishedOn), "MMMM do, yyyy", {
                timeZone: "Europe/Amsterdam",
              })}
            </time>
          </>
        )}
      </div>
    </>
  );

  return (
    <article className="mx-auto px-6 max-w-[65ch] prose prose-slate lg:prose-p:text-lg lg:prose-ul:text-lg lg:prose-ol:text-lg prose-code:bg-slate-100 prose-code:px-1 prose-code:py-1 prose-code:rounded-md">
      <Head>
        <title key="title">{frontmatter.title} | BeingFrankly</title>
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <meta
          name="description"
          content={frontmatter.excerpt}
          key="description"
        />
        <meta
          property="og:title"
          content={`${frontmatter.title} | BeingFrankly`}
          key="og-title"
        />
        <meta property="og:url" content={canonicalUrl} key="og-url" />
        <meta
          property="og:description"
          content={frontmatter.excerpt}
          key="og-description"
        />
        <meta property="og:type" content="article" key="og-type" />
        <meta
          property="article:published_time"
          content={frontmatter.publishedOn}
          key="article-published-time"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={frontmatter.excerpt}
          key="twitter-description"
        />
      </Head>

      <HeadingOne>{frontmatter.title}</HeadingOne>
      <Component components={{ a: AnchorLink, h1: HeadingEmpty }} />
    </article>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ frontmatter }) => ({
    params: { slug: frontmatter.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);
  const canonicalUrl: string = `${process.env.DOMAIN}/blog/${post.frontmatter.slug}`;

  return {
    props: { ...post, canonicalUrl: canonicalUrl },
  };
};

export default Post;
