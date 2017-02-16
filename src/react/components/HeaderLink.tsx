import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {
  switchToContainerName, getContainerLinkUrl,
  isContainerActive
} from '../../main'
import SwitchToContainer from '../../model/actions/SwitchToContainer'

export interface HeaderLinkProps {
  children: ReactNode
  toContainer: string,
  className?: string,
  activeClassName?: string
}

export default class HeaderLink extends Component<HeaderLinkProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string.isRequired
  }

  componentDidMount() {
    if (this.context.groupName == null) {
      throw new Error('HeaderLink needs to be inside a ContainerGroup')
    }
  }

  onClick(event):void {
    const {groupName} = this.context
    const {toContainer} = this.props
    switchToContainerName(groupName, toContainer)
    event.preventDefault()
  }

  getClassName():string {
    const {groupName} = this.context
    const {toContainer, className, activeClassName} = this.props
    const isActive:boolean = isContainerActive(groupName, toContainer)
    return isActive && activeClassName ? activeClassName : className || ''
  }

  render() {
    const {groupName} = this.context
    const {children, toContainer, className} = this.props
    const url:string = getContainerLinkUrl(groupName, toContainer)
    return (
      <a href={url}
         className={this.getClassName()}
         onClick={this.onClick.bind(this)}>
        {children}
      </a>
    )
  }
}