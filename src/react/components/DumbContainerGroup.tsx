import * as React from 'react'
import {Component, PropTypes, ReactNode, ReactElement} from 'react'
import * as R from 'ramda'

export type GroupChildrenFunctionArgs = {
  currentContainerIndex: number
  currentContainerName: string
  setCurrentContainerIndex: (index:number) => void
  setCurrentContainerName: (name:string) => void
}

export type ChildrenType =
  ReactNode | ((args:GroupChildrenFunctionArgs) => ReactElement<any>)

export interface DumbContainerGroupProps {
  groupName: string
  children?: ChildrenType
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
  storedCurrentContainerIndex: number
  storedCurrentContainerName: string
  style?: any

  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
}

export default class DumbContainerGroup extends
    Component<DumbContainerGroupProps, undefined> {

  static childContextTypes = {
    groupName: PropTypes.string.isRequired,
    hideInactiveContainers: PropTypes.bool,
    initializing: PropTypes.bool
  }

  getChildContext() {
    const {groupName, hideInactiveContainers=true} = this.props
    return {
      groupName,
      hideInactiveContainers,
    }
  }

  renderDiv(divChildren) {
    const {style={}, ...divProps} = R.omit([
      'groupName',
      'children',
      'storedCurrentContainerIndex',
      'hideInactiveContainers',
      'store',
      'isOnTop',
      'dispatch',
      'storedCurrentContainerName',
      'gotoTopOnSelectActive',
      'createGroup',
      'switchToContainerIndex',
      'switchToContainerName',
      'isDefault',
      'parentGroupName',
      'allowInterContainerHistory',
      'loadedFromRefresh',
      'isInitialized',
      'initializing',
      'storeSubscription'
  ], this.props)
    const divStyle={
      ...style,
      width: '100%',
      height: '100%',
      position: 'inherit',
      overflow: 'hidden'
    }
    return <div style={divStyle} {...divProps}>{divChildren}</div>
  }

  render() {
    const {
      children,
      storedCurrentContainerIndex,
      storedCurrentContainerName,
      switchToContainerName,
      switchToContainerIndex
    } = this.props

    if (children instanceof Function) {
      const args:GroupChildrenFunctionArgs = {
        currentContainerIndex: storedCurrentContainerIndex,
        currentContainerName: storedCurrentContainerName,
        setCurrentContainerIndex: switchToContainerIndex,
        setCurrentContainerName: switchToContainerName,
      }
      return this.renderDiv(children(args))
    }
    else {
      return this.renderDiv(children)
    }
  }
}