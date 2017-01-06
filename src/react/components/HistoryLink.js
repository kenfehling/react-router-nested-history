import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { push } from '../../main'

export default class HistoryLink extends Component {
  static propTypes = Link.propTypes

  static contextTypes = {
    groupIndex: PropTypes.number.isRequired,
    containerIndex: PropTypes.number.isRequired,
    patterns: PropTypes.arrayOf(PropTypes.string)
  }

  componentDidMount() {
    if (this.context.groupIndex == null) {
      throw new Error("HistoryLink needs to be inside a ContainerGroup")
    }
    if (this.context.containerIndex == null) {
      throw new Error("HistoryLink needs to be inside a Container")
    }
  }

  onClick(event) {
    const {to} = this.props
    const {containerIndex, groupIndex, patterns} = this.context
    push(groupIndex, containerIndex, to, patterns)
    event.preventDefault()
  }

  render() {
    return <Link {...this.props} onClick={this.onClick.bind(this)} />
  }
}