const fs = require('fs');
const path = require('path');
const { getAllPosts } = require('../utils/mdx');

const SITEMAP_PATH = path.join(process.cwd(), 'public')
const DOMAIN = 'https://beingfrankly.nl';
const XML_HEADER = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

const HOME_NODE = `<url>
  <loc>https://beingfrankly.nl/</loc>
</url>`;

const BLOG_NODE = `<url>
  <loc>https://beingfrankly.nl/blog/</loc>
</url>`;

const xmlUrlWrapper = nodes => `${XML_HEADER}
  ${nodes}
  ${BLOG_NODE}
  ${HOME_NODE}
</urlset>`;

const xmlUrlNode = (post) => {
const loc = `${DOMAIN}/blog/${post.slug}/`;

  return `<url>
  <loc>${loc}</loc>
  <lastmod>${post.lastmod}</lastmod>
</url>`;
};

const createSitemap = (post) => {
  const lastmod = (post.frontmatter?.updatedOn) ? post.frontmatter.updatedOn : new Date(post.frontmatter.createdOn);

  return {
    slug: encodeURI(post.frontmatter.slug),
    lastmod: lastmod
  }
}

const posts = getAllPosts().map(post => createSitemap(post));
const nodes = posts.map(post => xmlUrlNode(post)).join('');

const generateSitemap = () => {
      fs.writeFile(`${SITEMAP_PATH}/sitemap.xml`, xmlUrlWrapper(nodes), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      })
    }

generateSitemap();
