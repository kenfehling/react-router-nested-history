import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import DumbContainerGroup, {
  OnContainerSwitch, ChildrenType
} from './DumbContainerGroup'
import CreateGroup from '../../model/actions/CreateGroup'
import {Store} from '../../store/store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import ComputedState from '../../model/ComputedState'
import {ComputedGroup} from '../../model/ComputedState'
import {
  createCachingSelector, getDispatch, getGroupName, getGroup
} from '../selectors'

interface BaseGroupPropsWithoutChildren {
  currentContainerIndex?: number
  currentContainerName?: string
  onContainerActivate?: OnContainerSwitch
  resetOnLeave?: boolean
  allowInterContainerHistory?: boolean
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
  isDefault: boolean
}

export type ContainerGroupPropsWithoutChildren = BaseGroupPropsWithoutChildren & {
  name: string
}

export type ContainerGroupProps = BaseGroupPropsWithoutChildren & {
  children?: ChildrenType
  name: string
}

type GroupPropsWithStore = BaseGroupPropsWithoutChildren & {
  store: Store<State, Action, ComputedState>
  parentGroupName: string

  children?: ChildrenType
  groupName: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  storedCurrentContainerIndex: number
  storedCurrentContainerName: string
  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
}

const makeGetActions = () => createCachingSelector(
  getGroupName, getDispatch,
  (groupName, dispatch) => ({
    createGroup: (action:CreateGroup) => dispatch(action),
    switchToContainerIndex: (index:number) => dispatch(new SwitchToContainer({
      groupName,
      index
    })),
    switchToContainerName: (name:string) => dispatch(new SwitchToContainer({
      name
    }))
  })
)

const makeMapStateToProps =  (state:ComputedState, ownProps:GroupPropsWithStore) => {
  const group:ComputedGroup = getGroup(state, ownProps)
  return {
    storedCurrentContainerIndex: group.activeContainerIndex,
    storedCurrentContainerName: group.activeContainerName
  }
}

const mergeProps = (stateProps, dispatchProps,
                    ownProps:GroupPropsWithStore):ConnectedGroupProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedContainerGroup = connect(
  makeMapStateToProps,
  makeGetActions,
  mergeProps
)(DumbContainerGroup)

export default class SmartContainerGroup extends Component<ContainerGroupProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string,  // Parent group name (if any)
    rrnhStore: PropTypes.object.isRequired
  }

  render() {
    const {groupName, rrnhStore} = this.context
    const {name, ...props} = this.props
    return (
      <ConnectedContainerGroup parentGroupName={groupName}
                               groupName={name}
                               store={rrnhStore}
                               {...props}
      />
    )
  }
}