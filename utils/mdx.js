const fs = require('fs');
const path = require("path");
const matter = require("gray-matter");
const { bundleMDX } = require("mdx-bundler");

const ROOT = process.cwd();
const POSTS_PATH = path.join(process.cwd(), "posts");

const getFileContent = (filename) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

const getCompiledMDX = async (content) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }
  // Add your remark and rehype plugins here
  const remarkPlugins = [];
  const rehypePlugins = [];

  try {
    return await bundleMDX(content, {
      xdmOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ];

        return options;
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getSinglePost = async (slug) => {
  const post = getAllPosts().find(p => p.frontmatter.slug === slug)
  const source = getFileContent(post.path);
  const { code, frontmatter } = await getCompiledMDX(source);

  return {
    frontmatter,
    code,
  };
};

const getAllPosts = () => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.md?$/.test(path))
    .map((fileName) => {
      const source = getFileContent(fileName);
      const { data } = matter(source);

      return {
        path: fileName,
        frontmatter: data
      };
    });
};

module.exports = { getSinglePost, getAllPosts }
