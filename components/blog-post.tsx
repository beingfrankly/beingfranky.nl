import Link from "next/link";
import React from "react";

const BlogPost: React.FC<{ title: string; excerpt: string; href: string }> = ({
  children,
  title,
  excerpt,
  href,
}) => {
  return (
    <Link href={href}>
      <a>
        <h3>{title}</h3>
        <p id="excerpt">{excerpt}</p>
      </a>
    </Link>
  );
};

export default BlogPost;
