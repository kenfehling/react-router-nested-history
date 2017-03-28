import * as React from 'react'
import {Component, PropTypes, ReactNode, ReactElement} from 'react'
import * as R from 'ramda'

export type OnContainerSwitchArgs = {
  currentContainerIndex: number
  currentContainerName: string
}

export type OnContainerSwitch = (args:OnContainerSwitchArgs) => void

export type GroupChildrenFunctionArgs = OnContainerSwitchArgs & {
  setCurrentContainerIndex: (index:number) => void
  setCurrentContainerName: (name:string) => void
}

export type ChildrenType =
  ReactNode | ((args:GroupChildrenFunctionArgs) => ReactElement<any>)

export interface DumbContainerGroupProps {
  groupName: string
  children?: ChildrenType
  currentContainerIndex?: number|undefined      // from user
  currentContainerName?: string|undefined       // from user
  onContainerActivate?: OnContainerSwitch       // from user
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

  update({currentContainerIndex, currentContainerName}:
         {currentContainerIndex:number|undefined, currentContainerName:string|undefined}) {
    if (this.props.onContainerActivate &&
        currentContainerIndex != null && currentContainerName) {
      this.props.onContainerActivate({
        currentContainerIndex,
        currentContainerName
      })
    }
  }

  componentDidMount() {
    const {
      storedCurrentContainerIndex,
      storedCurrentContainerName
    } = this.props
    this.update({
      currentContainerIndex: storedCurrentContainerIndex,
      currentContainerName: storedCurrentContainerName
    })
  }

  /**
   * II = Input Index
   * SI = Stored Index
   * IN = Input Name
   * SN = Stored Name
   */
  componentWillReceiveProps(nextProps) {
    const oldII:number|undefined = this.props.currentContainerIndex
    const oldSI:number|undefined = this.props.storedCurrentContainerIndex
    const newII:number|undefined = nextProps.currentContainerIndex
    const newSI:number|undefined = nextProps.storedCurrentContainerIndex
    const oldIN:string|undefined = this.props.currentContainerName
    const oldSN:string|undefined = this.props.storedCurrentContainerName
    const newIN:string|undefined = nextProps.currentContainerName
    const newSN:string|undefined = nextProps.storedCurrentContainerName
    if (newSI !== oldSI || newSN !== oldSN) {
      this.update({
        currentContainerIndex:newSI,
        currentContainerName: newSN
      })
    }
    else if (newII != null) {

      console.log(oldII, newII)

      this.props.switchToContainerIndex(newII)
    }
    else if (newIN) {

      console.log(oldIN, newIN)

      this.props.switchToContainerName(newIN)
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
      'currentContainerIndex',
      'currentContainerName',
      'onContainerActivate',
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