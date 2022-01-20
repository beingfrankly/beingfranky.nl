import Link from "next/link";
import React from "react";
import { getAllPosts } from "../../utils/mdx";
import { format } from "date-fns-tz";

export default function Blog({ posts }) {
  return (
    <>
      <div className="container flex flex-col items-center px-6 mx-auto">
        <h1 className="mb-10 text-4xl font-bold">Blog</h1>
        <ul role="list" className="inline-flex flex-col w-6/12 gap-6">
          {posts.map((post) => {
            return (
              <li key={post.frontmatter.slug}>
                <Link
                  href={`/blog/${encodeURIComponent(post.frontmatter.slug)}`}
                >
                  <a
                    className="relative block h-full bg-white border-2 group focus:outline-none focus:ring-4 hover:ring-4"
                    aria-label={post.frontmatter.title}
                  >
                    <div className="p-6">
                      <time
                        className="text-sm text-slate-500"
                        dateTime={post.frontmatter.publishedOn}
                      >
                        {format(
                          new Date(post.frontmatter.publishedOn),
                          "MMMM do, yyyy",
                          {
                            timeZone: "Europe/Amsterdam",
                          }
                        )}
                      </time>
                      <h3
                        className="mb-3 text-xl font-medium underline"
                        aria-describedby={`excerpt-${post.frontmatter.slug}`}
                      >
                        {post.frontmatter.title}
                      </h3>

                      <p id={`excerpt-${post.frontmatter.slug}`}>
                        {post.frontmatter.excerpt}
                      </p>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const latestPosts = getAllPosts();

  return {
    props: {
      posts: latestPosts,
    },
  };
};
