const fs = require("fs");
const path = require('path');
const { getAllPosts } = require('../utils/mdxUtils');

const SITEMAP_PATH = path.join(process.cwd(), 'public')
const DOMAIN = 'https://www.beingfrankly.nl';
const XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

const xmlUrlWrapper = nodes => `${XML_HEADER}
  ${nodes}
</urlset>`;

const xmlUrlNode = (post) => {
const loc = `${DOMAIN}/blog/${post.slug}/`;

  return `<url>
  <loc>${loc}</loc>
  <lastmod>${post.lastmod}</lastmod>
</url>`;
};

const createSitemap = (post) => {
  return {
    slug: encodeURI(post.data.slug),
    lastmod: post.data.updatedOn
  }
}

const posts = getAllPosts().map(post => createSitemap(post));
const nodes = posts.map(post => xmlUrlNode(post))

const generateSitemap = () => {
      fs.writeFile(`${SITEMAP_PATH}/sitemap.xml`, xmlUrlWrapper(nodes), (err) => {
        if (err) throw err;
          console.log('The file has been saved!');
      })
    }

generateSitemap();
