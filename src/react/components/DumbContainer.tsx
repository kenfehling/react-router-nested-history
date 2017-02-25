import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {
  getActiveUrlInGroup, urlMatchesGroup, switchToGroup,
  isInitialized
} from '../../main'
import { patternsMatch } from '../../util/url'
import * as R from 'ramda'

export interface DumbContainerProps {
  pathname: string
  children?: ReactNode
  name: string
  animate?: boolean,
  initialUrl: string
  patterns: string[]
  style?: any

  groupName: string
  useDefaultContainer?: boolean
  hideInactiveContainers?: boolean
}

export default class DumbContainer extends Component<DumbContainerProps, undefined> {
  private static locations = {}  // Stays stored even if Container is unmounted

  static childContextTypes = {
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    patterns: PropTypes.arrayOf(PropTypes.string).isRequired,
    animate: PropTypes.bool.isRequired
  }

  getChildContext() {
    const {name, groupName, patterns, animate} = this.props
    return {
      pathname: this.getFilteredLocation(),
      containerName: name,
      groupName,
      patterns,
      animate
    }
  }

  matchesCurrentUrl():boolean {
    const {patterns, pathname} = this.props
    return patternsMatch(patterns, pathname)
  }

  matchesLocation({groupName, patterns}):boolean {
    const {pathname} = this.props
    if (isInitialized()) {
      const activeGroupUrl:string = getActiveUrlInGroup(groupName)
      const isActiveInGroup:boolean = patternsMatch(patterns, activeGroupUrl)
      const isGroupActive:boolean = urlMatchesGroup(pathname, groupName)
      if (isActiveInGroup) {
        if (isGroupActive) {
          return pathname === activeGroupUrl
        }
        else {
          return true
        }
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  getKey():string {
    const {name, groupName} = this.props
    return groupName + '_' + name
  }

  getNewLocation():string {
    const {initialUrl, pathname} = this.props
    const key = this.getKey()
    if (pathname) {
      if (this.matchesCurrentUrl()) {        // If url matches container
        return pathname
      }
      else if (DumbContainer.locations[key]) {
        return DumbContainer.locations[key]  // Use old location
      }
    }
    return initialUrl                        // Use default location
  }

  saveLocation(pathname:string) {
    DumbContainer.locations[this.getKey()] = pathname
  }

  getFilteredLocation():string {
    const pathname:string = this.getNewLocation()
    this.saveLocation(pathname)
    return pathname
  }

  onClick() {
    const {groupName} = this.props
    switchToGroup(groupName)
  }

  render() {
    const {
      hideInactiveContainers,
      children,
      style,
      ...divProps
    } = R.omit([
      'animate',
      'resetOnLeave',
      'initialUrl',
      'patterns',
      'pathname',
      'addTitle',
      'groupName',
      'name',
      'isOnTop',
      'store',
      'initializing',
      'useDefaultContainer'
    ], this.props)
    if (!hideInactiveContainers || this.matchesLocation(this.props)) {
      return (
        <div {...divProps}
          onClick={this.onClick.bind(this)}
          style={{
               ...style,
               width: '100%',
               height: '100%',
               position: 'relative'
               /*

               position: 'inherit',
               overflow: 'hidden'
               */
             }}>
          {children}
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}