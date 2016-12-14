import React, { Component, PropTypes } from 'react'
import { getOrCreateContainer } from '../../main'

export default class extends Component {
  static contextTypes = {
    groupIndex: PropTypes.number.isRequired,
    initializing: PropTypes.bool
  }

  static childContextTypes = {
    containerIndex: PropTypes.number.isRequired
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    initialUrl: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    patterns: PropTypes.arrayOf(PropTypes.string)
  }

  constructor(props, context) {
    super(props)
    const {groupIndex} = context
    const {initialUrl, pattern, patterns=[]} = this.props
    const p = [...patterns, ...(pattern ? [pattern] : [])]
    const container = getOrCreateContainer(groupIndex, initialUrl, p)
    this.containerIndex = container.index
  }

  getChildContext() {
    return {containerIndex: this.containerIndex}
  }

  render() {
    return <div>{this.context.initializing ? '' : this.props.children}</div>
  }
}