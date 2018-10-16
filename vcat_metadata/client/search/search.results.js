import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as querystring from 'querystring'

import { Keyframe } from '../common'
import * as searchActions from './search.actions'

function SearchQuery({ query }) {
  if (!query) return null
  if (query.loading) {
    return <div className="searchQuery">Loading results...</div>
  }
  return (
    <div className="searchQuery">
      <img src={query.url} />
    </div>
  )
}

function SearchResults({ query, results, options }) {
  if (!query || query.reset || query.loading || !results) {
    return <div></div>
  }
  if (!query.loading && !results.length) {
    return <div>No results</div>
  }
  const searchResults = results.map(({ hash, frame }) => (
    <Keyframe
      key={hash + '_' + frame}
      sha256={hash}
      frame={frame}
      size={options.thumbnailSize}
      to={searchActions.publicUrl.browse(hash)}
    >
      <Link
        to={searchActions.publicUrl.searchByFrame(hash, frame)}
        className='btn'
      >
          Search
      </Link>
    </Keyframe>
  ))
  return (
    <div className="searchResults row">
      {searchResults}
    </div>
  )
}

class SearchResultsContainer extends Component {
  componentDidMount() {
    const qs = querystring.parse(this.props.location.search.substr(1))
    if (qs && qs.url) {
      this.props.actions.search(qs.url)
    }
    this.searchByHash()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.searchByHash()
    }
    // const qsOld = querystring.parse(prevProps.location.search.substr(1))
    // const qsNew = querystring.parse(this.props.location.search.substr(1))
    // if (qsOld && qsNew && qsNew.url && qsNew.url !== qsOld.url) {
    //   this.props.actions.search(qsNew.url)
    // }
  }

  searchByHash() {
    const { hash, frame } = this.props.match.params
    if (hash && frame) {
      this.props.actions.searchByFrame(hash, frame)
    }
  }

  render() {
    const { query, results } = this.props.query
    return (
      <div>
        <SearchQuery query={query} />
        <SearchResults
          {...this.props}
          query={query}
          results={results}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  query: state.search.query,
  options: state.search.options,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...searchActions }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer))
