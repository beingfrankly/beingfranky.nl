const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// POSTS_PATH is useful when you want to get the path to a specific file
const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.md?$/.test(path));

  // console.log(postFilePaths);

const getAllPosts = () => {
  const fileNames = postFilePaths;

  // console.log(fileNames);


  const allPostsData = fileNames
    .map(fileName => createPost(fileName))
    .filter(post => post.data.slug !== null && typeof post.data.slug !== 'undefined');

  return allPostsData.sort((a, b) => {

    if (a.data.published_on < b.data.published_on) {
      return 1
    } else {
      return -1
    }
  })
}

const getPostBySlug = (slug) => {
  return getAllPosts().find(post => post.data.slug === slug);
}

const createPost = (fileName) => {

    // Remove ".md" from file name to get id
    const postPath = fileName;
    const title = fileName.replace(/\.md$/, '');
    // Read markdown file as string
    const fullPath = path.join(POSTS_PATH, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);
    // console.log({data});
    // Combine the data with the id

    const post = {
      data,
      content,
      postPath,
      title
    }

    return post;
  };

  module.exports = {getAllPosts, getPostBySlug, postFilePaths}
