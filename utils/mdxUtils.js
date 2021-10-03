import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.md?$/.test(path));

export function getAllPosts() {
  const fileNames = fs.readdirSync(POSTS_PATH)
  const allPostsData = fileNames
    .map(fileName => createPost(fileName))
    .filter(post => post.slug !== null && typeof post.slug !== 'undefined');
  // Sort posts by date
  return allPostsData.sort((a, b) => {

    if (a.published_on < b.published_on) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug) {
  return getAllPosts().find(post => post.slug === slug);
}

function createPost(fileName) {

    // Remove ".md" from file name to get id
    const postPath = fileName;
    const title = fileName.replace(/\.md$/, '');
    // Read markdown file as string
    const fullPath = path.join(POSTS_PATH, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      ...matterResult.data,
      postPath,
      title
    };
  };
