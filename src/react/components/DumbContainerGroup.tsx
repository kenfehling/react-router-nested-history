import * as React from 'react'
import {Component, PropTypes, ReactNode, ReactElement} from 'react'
import * as R from 'ramda'
import IContainer from '../../model/interfaces/IContainer'

export type OnContainerSwitchArgs = {
  currentContainerIndex: number|null
  currentContainerName: string|null
  stackOrder: IContainer[]|null
}

export type OnContainerSwitch = (args:OnContainerSwitchArgs) => void

export type ChildrenFunctionArgs = OnContainerSwitchArgs & {
  setCurrentContainerIndex: (index:number) => void
  setCurrentContainerName: (name:string) => void
}

export type ChildrenType =
  ReactNode | ((args:ChildrenFunctionArgs) => ReactElement<any>)

export interface DumbContainerGroupProps {
  name: string
  children?: ChildrenType
  currentContainerIndex?: number           // from user
  currentContainerName?: string            // from user
  onContainerActivate?: OnContainerSwitch  // from user
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
  storedStackOrder: IContainer[]|null
  storedCurrentContainerIndex: number|null
  storedCurrentContainerName: string|null
  style?: any

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

  update({currentContainerIndex, currentContainerName, stackOrder}:
         {currentContainerIndex:number|null, currentContainerName:string|null,
           stackOrder: IContainer[]|null}) {
    if (this.props.onContainerActivate &&
        currentContainerIndex != null && currentContainerName && stackOrder) {
      this.props.onContainerActivate({
        currentContainerIndex,
        currentContainerName,
        stackOrder
      })
    }
  }

  componentDidMount() {
    const {
      storedCurrentContainerIndex,
      storedCurrentContainerName,
      storedStackOrder
    } = this.props
    this.update({
      currentContainerIndex: storedCurrentContainerIndex,
      currentContainerName: storedCurrentContainerName,
      stackOrder: storedStackOrder
    })
  }

  componentWillReceiveProps(nextProps) {
    const oldII:number|undefined = this.props.currentContainerIndex
    const oldSI:number|null = this.props.storedCurrentContainerIndex
    const newII:number|undefined = nextProps.currentContainerIndex
    const newSI:number|null = nextProps.storedCurrentContainerIndex
    const oldIN:string|undefined = this.props.currentContainerName
    const oldSN:string|null = this.props.storedCurrentContainerName
    const newIN:string|undefined = nextProps.currentContainerName
    const newSN:string|null = nextProps.storedCurrentContainerName
    const oldStackOrder:IContainer[]|null = this.props.storedStackOrder
    const newStackOrder:IContainer[]|null = nextProps.storedStackOrder
    if (newSI !== oldSI || newSN !== oldSN ||
        !R.equals(oldStackOrder, newStackOrder)) {
      this.update({
        currentContainerIndex:newSI,
        currentContainerName: newSN,
        stackOrder: newStackOrder
      })
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
      'storedStackOrder',
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
      storedCurrentContainerName,
      storedStackOrder,
      switchToContainerName,
      switchToContainerIndex
    } = this.props

    if (children instanceof Function) {
      const args:ChildrenFunctionArgs = {
        currentContainerIndex: storedCurrentContainerIndex,
        currentContainerName: storedCurrentContainerName,
        stackOrder: storedStackOrder,
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