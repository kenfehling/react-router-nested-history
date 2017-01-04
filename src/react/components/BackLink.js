import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { back } from '../../main'

export default class BackLink extends Component {
  static propTypes = Link.propTypes

  onClick(event) {
    back()
    event.preventDefault()
  }

  render() {
    const {to, children} = this.props
    return (<a href={to} onClick={this.onClick.bind(this)}>
      {children}
    </a>)
  }
}