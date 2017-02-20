import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {switchToContainerIndex, switchToContainerName} from '../../main'
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
  useDefaultContainer?: boolean,
  hideInactiveContainers?: boolean,
  gotoTopOnSelectActive?: boolean,
  storedIndexedStackOrder: number[]
  storedCurrentContainerIndex: number,
  storedCurrentContainerName: string|null,
}

export default class DumbContainerGroup extends
    Component<DumbContainerGroupProps, undefined> {
  switchContainerIndex: (index:number) => void
  switchContainerName: (name:string) => void

  static childContextTypes = {
    groupName: PropTypes.string.isRequired,
    useDefaultContainer: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool
  }

  constructor(props:DumbContainerGroupProps) {
    super(props)
    this.switchContainerIndex = R.curry(switchToContainerIndex)(props.name)
    this.switchContainerName = R.curry(switchToContainerName)(props.name)
  }

  getChildContext() {
    const {
      name,
      useDefaultContainer=true,
      hideInactiveContainers=true,
    } = this.props
    return {
      groupName: name,
      useDefaultContainer,
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
      this.switchContainerIndex(newII)
    }
    else if (newIN && newIN !== oldIN && newIN !== newSN) {
      this.switchContainerName(newIN)
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
        setCurrentContainerIndex: this.switchContainerIndex,
        setCurrentContainerName: this.switchContainerName
      }
      return <div>{children(args)}</div>
    }
    else {
      return <div>{this.props.children}</div>
    }
  }
}