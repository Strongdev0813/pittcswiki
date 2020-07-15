import React from "react"
import Layout from "../layout"
import SEO from "../seo"
import Breadcrumb from "../breadcrumb"
import { Link } from "gatsby"
import FeedbackWidget from "../feedback"
import relatedGuidesParser from "../../utils/related-guides-parser"

export default function BlogPostLayout({
  frontmatter,
  isIndexPage,
  gitAuthorTime,
  lastUpdatedString,
  slug,
  fileType,
  children,
}) {
  const { title, subtitle, author } = frontmatter
  return (
    <Layout readingMode>
      <SEO title={title} />
      <Breadcrumb
        slug={slug}
        firstBreadCrumb={{ link: "/guides", text: "GUIDES" }}
      />
      <div className="blog-post-container">
        <div className="blog-post mb-8">
          <div className="frontmatter">
            <h1 className="title">{title}</h1>
            {author && <i className="sub-title">{author}</i>}
          </div>
          <FreshnessDisclaimer lastUpdated={gitAuthorTime} />
          <div className="mt-4 blog-post-content">{children}</div>
          <RelatedGuides related={frontmatter.related} />
          {!isIndexPage && (
            <>
              <div className={"my-8 sm:w-full md:w-auto"}>
                <FeedbackWidget />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <EditOnGithub
                  fileType={fileType}
                  slug={slug}
                  isIndexPage={isIndexPage}
                />
                {lastUpdatedString &&
                  !lastUpdatedString.includes("Invalid") && (
                    <div className="text-right">
                      Last updated: {lastUpdatedString}
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

const RelatedGuides = ({ related }) => {
  const links = relatedGuidesParser(related)

  if (!links || links.length === 0) return null

  return (
    <div className="text-sm border-t border-b py-4">
      <h4 className="mb-1">Related Resources</h4>
      <ul className="mb-0">
        {links.map(({ link, title }, i) =>
          !link || !title ? null : (
            <li key={i}>
              <Link to={link}>{title}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

const GITHUB_BASE_URL = `https://github.com/PittCSWiki/pittcswiki.github.io/tree/master/src/guides/`

const EditOnGithub = ({ fileType, slug, isIndexPage }) => {
  const parts = slug.split("/").filter((s) => s)
  let githubFileLink = parts.join("/")
  if (isIndexPage) {
    githubFileLink += "/index"
  }

  const gitHubLink = `${GITHUB_BASE_URL}${githubFileLink}${fileType}`

  return (
    <a
      target="_blank"
      className="text-gray-600 hidden md:inline"
      rel="noopener noreferrer"
      href={gitHubLink}
    >
      {EditIcon} Edit this page on GitHub
    </a>
  )
}

const EditIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    className="inline -mt-1"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
  </svg>
)

const FreshnessDisclaimer = ({ lastUpdated }) => {
  // How old do we consider something to display a banner? In  second
  const FRESHNESS_THRESHOLD_IN_DAYS = 200
  const diff = (new Date() - new Date(lastUpdated)) / (1000 * 60 * 60 * 24)
  if (isNaN(diff) || diff < FRESHNESS_THRESHOLD_IN_DAYS) return null

  return (
    <p className="bg-orange-200 text-orange-800 p-4">
      Head's up, this has not been updated in a while!
    </p>
  )
}
