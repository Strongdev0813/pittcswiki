import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

library.add(fas)

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}, Made with{" "}
    <FontAwesomeIcon icon="heart" color="#F44336" /> by{" "}
    <a href="https://pittcsc.org">PittCSC</a>.{` `} 
    <p>(Unaffiliated with Pitt CS
    Department)</p>
  </footer>
)

export default Footer
