import * as React from 'react'
import {Component, ReactNode} from 'react'
import * as PropTypes from 'prop-types'
import * as omit from 'lodash.omit'

export interface DumbContainerProps {
  children?: ReactNode
  containerName: string
  animate?: boolean
  initialUrl: string
  patterns: string[]
  style?: any

  hideInactiveContainers?: boolean
  isDefault?: boolean

  activeUrl: string
  groupName: string
  isActiveInGroup: boolean
  matchesCurrentUrl: boolean
  switchToContainer: () => void
}

export default class DumbContainer extends Component<DumbContainerProps, undefined> {
  static childContextTypes = {
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired,
    pathname: PropTypes.string,
    patterns: PropTypes.arrayOf(PropTypes.string).isRequired,
    animate: PropTypes.bool.isRequired
  }

  getChildContext() {
    const {containerName, groupName, patterns, animate, activeUrl} = this.props
    return {
      pathname: activeUrl,
      containerName,
      groupName,
      patterns,
      animate
    }
  }

  render() {
    const {
      hideInactiveContainers,
      children,
      style={},
      switchToContainer,
      isActiveInGroup,
      ...divProps
    } = omit(this.props, [
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
      'isDefault',
      'isInitialized',
      'createContainer',
      'loadedFromPersist',
      'activeUrl',
      'matchesCurrentUrl',
      'storeSubscription'
    ])
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