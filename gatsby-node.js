/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const coursesPageTemplate = path.resolve(
    `src/components/templates/courses-template.js`
  )

  const guidePagesTemplate = path.resolve(
    "src/components/templates/guide-template.js"
  )

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              id
              type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter && node.frontmatter.type === "individual-course") {
        createPage({
          path: node.frontmatter.path,
          component: coursesPageTemplate,
          context: {
            courseId: node.frontmatter.id,
          },
        })
      } else {
        if (!node.frontmatter.title) {
          console.warn(
            node.fields.slug,
            " is missing a title in the frontmatter"
          )
        }
        createPage({
          path: node.fields.slug,
          component: guidePagesTemplate,
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      }
    })
  })
}
