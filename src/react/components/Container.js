import React, { Component, PropTypes } from 'react'
import { getOrCreateContainer } from '../../main'
import { patternsMatch } from "../../util/url"
import { modifyLocation } from "../../util/location"

const getKey = (groupIndex, locationIndex) => groupIndex + '_' + locationIndex

export default class Container extends Component {
  static contextTypes = {
    groupIndex: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    initializing: PropTypes.bool,
    useDefaultContainer: PropTypes.bool
  }

  static childContextTypes = {
    containerIndex: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    patterns: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    initialUrl: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    patterns: PropTypes.arrayOf(PropTypes.string),
    keepHistory: PropTypes.bool
  }

  static locations = {}  // Stays stored even if Container is unmounted

  constructor(props, context) {
    super(props, context)
    const patterns = this.getPatterns()
    const {initialUrl, keepHistory} = props
    const {groupIndex, useDefaultContainer=true} = context
    const container = getOrCreateContainer(
        groupIndex, initialUrl, patterns, useDefaultContainer, keepHistory)
    this.containerIndex = container.index
  }

  getChildContext() {
    return {
      containerIndex: this.containerIndex,
      location: this.getFilteredLocation(),
      patterns: this.getPatterns()
    }
  }

  getPatterns() {
    const {pattern, patterns=[]} = this.props
    return [...patterns, ...(pattern ? [pattern] : [])]
  }

  getFilteredLocation() {
    const patterns = this.getPatterns()
    const {initialUrl} = this.props
    const {location, groupIndex} = this.context
    const key = getKey(groupIndex, this.containerIndex)
    if (patternsMatch(patterns, location.pathname)) {
      Container.locations[key] = location
      return location
    }
    else {
      return Container.locations[key] || modifyLocation(location, initialUrl)
    }
  }

  render() {
    return this.context.initializing ? <div></div> :
        Array.isArray(this.props.children) ?
            <div>this.props.children</div> :
            this.props.children
  }
}