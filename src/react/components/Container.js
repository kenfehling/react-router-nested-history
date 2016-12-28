import React, { Component, PropTypes } from 'react'
import { getOrCreateContainer } from '../../main'
import {patternsMatch} from "../../util/url";
import {modifyLocation} from "../../util/location";

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
    location: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    initialUrl: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    patterns: PropTypes.arrayOf(PropTypes.string)
  }

  static locations = {}  // Stays stored even if a Container is unmounted

  getPatterns() {
    const {pattern, patterns=[]} = this.props
    return [...patterns, ...(pattern ? [pattern] : [])]
  }

  constructor(props, context) {
    super(props)
    const patterns = this.getPatterns()
    const {initialUrl} = this.props
    const {groupIndex, useDefaultContainer=true} = context
    const container = getOrCreateContainer(groupIndex, initialUrl, patterns, useDefaultContainer)
    this.containerIndex = container.index
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

  getChildContext() {
    return {
      containerIndex: this.containerIndex,
      location: this.getFilteredLocation()
    }
  }

  render() {
    return <div>{this.context.initializing ? '' : this.props.children}</div>
  }
}