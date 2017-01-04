import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { push } from '../../main'

export default class HistoryLink extends Component {
  static propTypes = Link.propTypes

  static contextTypes = {
    groupIndex: PropTypes.number.isRequired,
    containerIndex: PropTypes.number.isRequired
  }

  onClick(event) {
    const {to} = this.props
    const {containerIndex, groupIndex} = this.context
    push(groupIndex, containerIndex, to)
    event.preventDefault()
  }

  render() {
    return <Link {...this.props} onClick={this.onClick.bind(this)} />
  }
}