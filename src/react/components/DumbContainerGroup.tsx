import * as React from 'react'
import {Component, PropTypes, ReactNode, ReactElement} from 'react'
import * as R from 'ramda'

export type OnContainerSwitchArgs = {
  currentContainerIndex:number,
  indexedStackOrder:number[]
}

export type OnContainerSwitch = (args:OnContainerSwitchArgs) => void

export type ChildrenFunctionArgs = OnContainerSwitchArgs & {
  setCurrentContainerIndex: (index:number) => void
  setCurrentContainerName: (name:string) => void
}

export type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface DumbContainerGroupProps {
  name: string,
  children?: ChildrenType,
  currentContainerIndex?: number,           // from user
  currentContainerName?: string,            // from user
  onContainerActivate?: OnContainerSwitch,  // from user
  hideInactiveContainers?: boolean,
  gotoTopOnSelectActive?: boolean,
  storedIndexedStackOrder: number[]
  storedCurrentContainerIndex: number,
  storedCurrentContainerName: string|null,
  style?: any,

  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
}

export default class DumbContainerGroup extends
    Component<DumbContainerGroupProps, undefined> {

  static childContextTypes = {
    groupName: PropTypes.string.isRequired,
    hideInactiveContainers: PropTypes.bool
  }

  getChildContext() {
    const {name, hideInactiveContainers=true} = this.props
    return {
      groupName: name,
      hideInactiveContainers
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
    const oldII:number|undefined = this.props.currentContainerIndex
    const oldSI:number = this.props.storedCurrentContainerIndex
    const newII:number = nextProps.currentContainerIndex
    const newSI:number = nextProps.storedCurrentContainerIndex
    const oldIN:string|undefined = this.props.currentContainerName
    const oldSN:string|null = this.props.storedCurrentContainerName
    const newIN:string = nextProps.currentContainerName
    const newSN:string = nextProps.storedCurrentContainerName
    const oldIndexedStackOrder:number[]|null = this.props.storedIndexedStackOrder
    const newIndexedStackOrder:number[] = nextProps.storedIndexedStackOrder
    if (newSI !== oldSI || newSN !== oldSN ||
        !R.equals(oldIndexedStackOrder, newIndexedStackOrder)) {
      this.update(newSI, newIndexedStackOrder)
    }
    else if (newII != null && newII !== oldII && newII !== newSI) {
      this.props.switchToContainerIndex(newII)
    }
    else if (newIN && newIN !== oldIN && newIN !== newSN) {
      this.props.switchToContainerName(newIN)
    }
  }

  renderDiv(divChildren) {
    const {style={}, ...divProps} = R.omit([
      'groupName',
      'children',
      'storedCurrentContainerIndex',
      'storedIndexedStackOrder',
      'hideInactiveContainers',
      'store',
      'isOnTop',
      'dispatch',
      'storedCurrentContainerName',
      'currentContainerIndex',
      'currentContainerName',
      'onContainerActivate',
      'gotoTopOnSelectActive',
      'createGroup',
      'switchToContainerIndex',
      'switchToContainerName',
      'isDefault',
      'parentGroupName',
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
      storedIndexedStackOrder,
      switchToContainerName,
      switchToContainerIndex
    } = this.props

    if (children instanceof Function) {
      const args:ChildrenFunctionArgs = {
        currentContainerIndex: storedCurrentContainerIndex,
        indexedStackOrder: storedIndexedStackOrder,
        setCurrentContainerIndex: switchToContainerIndex,
        setCurrentContainerName: switchToContainerName
      }
      return this.renderDiv(children(args))
    }
    else {
      return this.renderDiv(children)
    }
  }
}