import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import logo from "../images/logo.svg"
import "../styles/front-page.sass"

const FrontPageLinks = [
  {
    title: "Classes",
    links: [
      {
        name: "Courses",
        href: "courses",
      },
      {
        name: "(In Dev:) Scheduling Classes",
        href: "",
      },
    ],
  },
  {
    title: "Guides",
    links: [
      {
        name: "Resume",
        href: "resume",
      },
      {
        name: "More Guides...",
        href: "guide",
      },
    ],
  },
  {
    title: "Career",
    links: [
      {
        name: "(In Dev:) Interview Prep",
        href: "",
      },
      {
        name: "(In Dev:) Getting an Interview",
        href: "",
      },
      {
        name: "(In Dev:) Companies",
        href: "",
      },
    ],
  },
]

const LinkGroup = ({ header, links }) => (
  <div className="link-group">
    <h3>{header}</h3>
    <ul>
      {links.map((entry) => (
        <li>
          <Link to={entry.href}>{entry.name}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const LinkPanel = ({ data }) => {
  const linkGroups = data.map((entry) => (
    <LinkGroup header={entry.title} links={entry.links} />
  ))
  return <div className="link-group-container">{linkGroups}</div>
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="intro-block">
      <img src={logo} />
      <h1>Pitt CS Wiki!</h1>
    </div>

    <LinkPanel data={FrontPageLinks} />
  </Layout>
)

export default IndexPage
