import React, { useState, useEffect, createRef } from "react"
import {
  InstantSearch,
  Index,
  connectStateResults,
  Hits,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import Input from "./input"
import PageHit from "./hit-comps"
import AlgoliaPoweredBy from "../../images/algolia-nebula-blue-full-logo.svg"

const HitsWrapper = ({ show, children }) => (
  <div className={"search-results " + (show ? "flex" : "hidden")}>
    {children}
  </div>
)
const PoweredBy = () => (
  <img
    className="w-24 ml-auto m-3"
    alt="Search powered By Algolia"
    src={AlgoliaPoweredBy}
  ></img>
)

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? (
      children
    ) : (
      <div className="p-4"> No results for '{state.query}' </div>
    )
)

const useClickOutside = (ref, handler, events) => {
  // This is used so you can click outside of search results to
  // on focus the search results
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = (event) =>
    !ref.current.parentElement.parentElement.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

const INDEX_NAME = "AllGuides"

export default function Search({ collapse }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  useClickOutside(ref, () => setFocus(false))

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={INDEX_NAME}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <Input
        onFocus={() => setFocus(true)}
        focusref={ref}
        {...{ collapse, focus }}
      />
      <HitsWrapper show={query.length > 0 && focus}>
        <Index indexName={INDEX_NAME}>
          <Results>
            <Hits hitComponent={PageHit(() => setFocus(false))} />
          </Results>
        </Index>
        <PoweredBy />
      </HitsWrapper>
    </InstantSearch>
  )
}
