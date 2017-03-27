import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import * as R from 'ramda'

export interface DumbContainerProps {
  pathname: string
  children?: ReactNode
  containerName: string
  animate?: boolean
  initialUrl: string
  patterns: string[]
  style?: any

  groupName: string
  isDefault?: boolean
  hideInactiveContainers?: boolean
  switchToContainer: () => void
  isActiveInGroup: boolean
  matchesCurrentUrl: boolean
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
    const {containerName, groupName, patterns, animate} = this.props
    return {
      pathname: this.getFilteredLocation(),
      containerName,
      groupName,
      patterns,
      animate
    }
  }

  getKey():string {
    const {containerName, groupName} = this.props
    return groupName + '_' + containerName
  }

  getNewLocation():string {
    const {initialUrl, pathname, matchesCurrentUrl} = this.props
    const key = this.getKey()
    if (pathname) {
      if (matchesCurrentUrl) {              // If url matches container
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

  render() {
    const {
      hideInactiveContainers,
      children,
      style={},
      switchToContainer,
      isActiveInGroup,
      ...divProps
    } = R.omit([
      'animate',
      'resetOnLeave',
      'initialUrl',
      'patterns',
      'pathname',
      'addTitle',
      'groupName',
      'containerName',
      'isOnTop',
      'store',
      'initializing',
      'isDefault',
      'isInitialized',
      'createContainer',
      'loadedFromRefresh',
      'group',
      'matchesCurrentUrl',
      'storeSubscription'
    ], this.props)
    if (!hideInactiveContainers || isActiveInGroup) {
      return (
        <div {...divProps}
             onMouseDown={switchToContainer}
             style={{
               ...style,
               width: '100%',
               height: '100%',
               position: 'relative'
               /*

               position: 'inherit',
               overflow: 'hidden'
               */
             }}
        >
          {children}
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}