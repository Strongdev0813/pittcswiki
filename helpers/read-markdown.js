const fs = require("fs").promises
const path = require("path")
const { promisify } = require("util")
const glob = promisify(require("glob"))
const parseFrontMatter = require("gray-matter")
const parseRelatedLinksFromFrontmatter = require("../src/utils/related-guides-parser")
const parseMarkdownLinks = require("parse-markdown-links")

const BASE_PATH = path.join(__dirname, "..", "src")

// Gets all md and mdx files and returns their content
const getData = async (sources) => {
  const filePathsPromise = sources.map(async (source) => {
    // also reads .mdx files
    return await glob(path.join(source, "**/*.md*"))
  })
  const filesBySource = await Promise.all(filePathsPromise)
  const filesWithSlugs = filesBySource
    .map((files, i) => {
      const basePath = sources[i]
      return files.map((filePath) => ({
        slug: filePath.replace(basePath, ""),
        filePath: filePath,
      }))
    })
    .flat()
  return await Promise.all(
    filesWithSlugs.map(async (fileNode) => {
      return await fs.readFile(fileNode.filePath, "utf8").then((data) => ({
        pathSlug: fileNode.slug,
        data,
      }))
    })
  )
}

const parseSlug = (pathSlug) => {
  return pathSlug.replace(/\/index\.md$/g, "").replace(/\.mdx?$/g, "")
}

const parse = (data) => {
  return data.map((file) => {
    const frontmatter = parseFrontMatter(file.data).data
    const relatedGuidesLinks = parseRelatedLinksFromFrontmatter(
      frontmatter.related
    ).map((l) => l.link)
    const markdownLinks = parseMarkdownLinks(file.data) || []
    return {
      slug: parseSlug(file.pathSlug),
      rawMarkdownBody: file.data,
      title: frontmatter.title,
      links: relatedGuidesLinks.concat(markdownLinks),
    }
  })
}

module.exports = async function () {
  const data = await getData([
    path.join(BASE_PATH, "guides"),
    path.join(BASE_PATH, "pages"),
  ])
  return parse(data).concat([
    { slug: "/courses/", rawMarkdownBody: "", title: "generated" },
    { slug: "/about/", rawMarkdownBody: "", title: "generated" },
    { slug: "/guides/", rawMarkdownBody: "", title: "generated" },
  ])
}
