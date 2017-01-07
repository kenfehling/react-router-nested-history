import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { back, getBackPage } from '../../main'

export default class BackLink extends Component {
  static propTypes = {
    children: Link.propTypes.children,  // TODO: Shouldn't be required
    nameFn: PropTypes.func
  }

  shouldComponentUpdate() {
    return false  // Don't disappear when transitioning back to previous page
  }

  onClick(event) {
    back()
    event.preventDefault()
  }

  render() {
    const {children, nameFn} = this.props
    const backPage = getBackPage()
    if (backPage) {
      return (<a href={backPage.url} onClick={this.onClick.bind(this)}>
        {children || nameFn ? nameFn({params: backPage.params}) : 'Back'}
      </a>)
    }
    else {
      return <span> </span>
    }

  }
}