import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {switchToContainerIndex} from '../../main'
import Page from '../../model/Page'
import Action from '../../model/Action'
import * as R from 'ramda'
import ReactElement = React.ReactElement

export type OnContainerSwitchArgs = {
  currentContainerIndex:number,
  indexedStackOrder:number[]
}

export type OnContainerSwitch = (args:OnContainerSwitchArgs) => void

export type ChildrenFunctionArgs = OnContainerSwitchArgs & {
  setCurrentContainerIndex: (index:number) => void
}

export type ChildrenType = ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface DumbContainerGroupProps {
  name: string,
  storedIndexedStackOrder: number[]
  storedCurrentContainerIndex: number,
  children?: ChildrenType,
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
  switchContainer: (index:number) => void

  static childContextTypes = {
    groupName: PropTypes.string.isRequired,
    useDefaultContainer: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool,
    activePage: PropTypes.object.isRequired,
    lastAction: PropTypes.object.isRequired
  }

  constructor(props:DumbContainerGroupProps) {
    super(props)
    this.switchContainer = R.curry(switchToContainerIndex)(props.name)
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
      this.switchContainer(newInput)
    }
  }

  render() {
    const {
      children,
      storedCurrentContainerIndex,
      storedIndexedStackOrder
    } = this.props

    if (children instanceof Function) {
      const args:ChildrenFunctionArgs = {
        currentContainerIndex: storedCurrentContainerIndex,
        indexedStackOrder: storedIndexedStackOrder,
        setCurrentContainerIndex: this.switchContainer
      }
      return <div>{children(args)}</div>
    }
    else {
      return <div>{this.props.children}</div>
    }
  }
}