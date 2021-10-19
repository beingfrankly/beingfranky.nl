const { getAllPosts } = require('../utils/mdxUtils');

const DOMAIN = 'https://www.beingfrankly.nl';
const XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

// const formatDate = date => `${date.toISOString().split('.')[0]}+0:00`;

const xmlUrlWrapper = nodes => `${XML_HEADER}
  ${nodes}
</urlset>`;

const xmlUrlNode = (post) => {
  // const url = `${post.slug}${post.slug === '/' ? '' : '/'}`;
  const loc = `${DOMAIN}/blog/${post.slug}`;
  // const priority = getPriority(post.slug);

  return `<url>
  <loc>${loc}</loc>
  <lastmod>${post.lastmod}</lastmod>
</url>`;
};

const createSitemap = (post) => {
  return {
    slug: post.slug,
    lastmod: post.updated_at
  }
}

const posts = getAllPosts().map(post => createSitemap(post));
// console.log(getAllPosts());
// console.log(posts);

const nodes = posts.map(post => xmlUrlNode(post))
console.log(nodes);
