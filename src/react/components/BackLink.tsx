import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {back, getBackPageInGroup} from '../../main'

export interface BackLinkProps {
  children: ReactNode;
  nameFn: (params:Object) => string
}

export default class BackLink extends Component<BackLinkProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string.isRequired
  }

  componentDidMount() {
    if (this.context.groupName == null) {
      throw new Error('BackLink needs to be inside a ContainerGroup')
    }
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
    const {groupName} = this.context
    const backPage = getBackPageInGroup(groupName)
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