import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {switchToContainerIndex} from '../../main'
import Page from '../../model/Page'
import Action from '../../model/Action'
import * as R from 'ramda'

export type OnContainerSwitch =
    (data:{currentContainerIndex:number, indexedStackOrder:number[]}) => void

export interface DumbContainerGroupProps {
  name: string,
  storedIndexedStackOrder: number[]
  storedCurrentContainerIndex: number,
  children?: ReactNode,
  currentContainerIndex?: number,  // from user
  onContainerActivate?: OnContainerSwitch,  // from user
  useDefaultContainer?: boolean,
  hideInactiveContainers?: boolean,
  gotoTopOnSelectActive?: boolean,
  storedActivePage: Page|null,
  storedLastAction: Action
}

export default class DumbContainerGroup extends
    Component<DumbContainerGroupProps, undefined> {

  static childContextTypes = {
    groupName: PropTypes.string.isRequired,
    useDefaultContainer: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool,
    activePage: PropTypes.object.isRequired,
    lastAction: PropTypes.object.isRequired
  }

  getChildContext() {
    const {
      name,
      useDefaultContainer=true,
      hideInactiveContainers=true,
      storedActivePage,
      storedLastAction
    } = this.props
    return {
      groupName: name,
      useDefaultContainer,
      hideInactiveContainers,
      activePage: storedActivePage,
      lastAction: storedLastAction
    }
  }

  update(currentContainerIndex:number, indexedStackOrder:number[]) {
    if (this.props.onContainerActivate) {
      this.props.onContainerActivate({currentContainerIndex, indexedStackOrder})
    }
  }

  componentDidMount() {
    const {storedCurrentContainerIndex, storedIndexedStackOrder} = this.props
    this.update(storedCurrentContainerIndex, storedIndexedStackOrder)
  }

  componentWillReceiveProps(nextProps) {
    const {name} = this.props
    const oldInput:number|undefined = this.props.currentContainerIndex
    const oldStored:number = this.props.storedCurrentContainerIndex
    const newInput:number = nextProps.currentContainerIndex
    const newStored:number = nextProps.storedCurrentContainerIndex
    const oldIndexedStackOrder:number[]|null = this.props.storedIndexedStackOrder
    const newIndexedStackOrder:number[] = nextProps.storedIndexedStackOrder
    if (newStored !== oldStored ||
        !R.equals(oldIndexedStackOrder, newIndexedStackOrder)) {
      this.update(newStored, newIndexedStackOrder)
    }
    else if (newInput != null && newInput !== oldInput && newInput !== newStored) {
      switchToContainerIndex(name, newInput)
    }
  }

  render() {
    /*
     return Array.isArray(this.props.children) ?
     <div>{this.props.children}</div> :
     this.props.children
     */
    return <div>{this.props.children}</div>
    // TODO: Does wrapping in a div mess up styling?
    // TODO: Maybe allow for custom className and/or component (div, etc.)
  }
}