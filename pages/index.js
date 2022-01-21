import Link from "next/link";
import React from "react";
import { getAllPosts } from "../utils/mdx.js";
import { format } from "date-fns-tz";

export default function Home({ posts }) {
  return (
    <>
      <div className="grid grid-flow-row gap-10 md:grid-flow-col place-items-center auto-rows-auto">
        <section className="grid items-center place-items-center">
          <div className="px-6 xl:w-9/12">
            <div className="mb-1 text-xl md:text-2xl md:mb-2 text-slate-600">
              Hi, I’m
            </div>
            <h1
              className="mb-2 text-4xl font-bold md:mb-4 md:text-6xl"
              aria-describedby="introduction"
            >
              Frank
            </h1>
            <p className="mb-4 text-3xl font-bold md:mb-6 md:text-5xl">
              I create content on accessibility
            </p>
            <p className="text-xl md:text-3xl text-slate-600" id="introduction">
              I’m a frontend developer & consultant based in The Netherlands.
              I’m currently writing about accessibility.
            </p>
          </div>
        </section>

        <aside className="flex flex-col px-6 md:items-center">
          <h2 className="mb-4 text-2xl font-semibold">Recently published</h2>
          <ul
            role="list"
            className="inline-flex flex-col gap-6 lg:gap-10 xl:w-9/12"
          >
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
        </aside>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const latestPosts = getAllPosts(2);

  return {
    props: {
      posts: latestPosts,
    },
  };
};
