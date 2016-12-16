import React, { Component, PropTypes } from 'react'
import { getOrCreateContainer } from '../../main'
import {patternsMatch} from "../../util/url";

export default class Container extends Component {
  static contextTypes = {
    groupIndex: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    initializing: PropTypes.bool
  }

  static childContextTypes = {
    containerIndex: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    initialUrl: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    patterns: PropTypes.arrayOf(PropTypes.string)
  }

  getPatterns() {
    const {pattern, patterns=[]} = this.props
    return [...patterns, ...(pattern ? [pattern] : [])]
  }

  constructor(props, context) {
    super(props)
    const {groupIndex} = context
    const {initialUrl} = this.props
    const container = getOrCreateContainer(groupIndex, initialUrl, this.getPatterns())
    this.containerIndex = container.index
  }

  getFilteredLocation() {
    const patterns = this.getPatterns()
    const {location} = this.context
    if (patternsMatch(patterns, location.pathname)) {
      this.oldLocation = location
      return location
    }
    else if (this.oldLocation) {
      return this.oldLocation
    }
    else {
      return {...location, pathname: this.initialUrl}
    }
  }

  getChildContext() {
    return {
      containerIndex: this.containerIndex,
      location: this.getFilteredLocation()
    }
  }

  render() {

    console.log('RENDER C', this.props.initialUrl, this.context.initializing)

    return <div>{this.context.initializing ? '' : this.props.children}</div>
  }
}