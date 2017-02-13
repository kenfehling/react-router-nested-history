import * as React from 'react'
import { Component, ReactNode } from 'react'
import { back, getBackPage } from '../../main'

export interface BackLinkProps {
  children: ReactNode;
  nameFn: (params:Object) => string
}

export default class BackLink extends Component<BackLinkProps, undefined> {

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