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
import {createCachingSelector, getName, getDispatch} from '../selectors'
import {createSelector} from 'reselect'

export interface ContainerGroupPropsWithoutChildren {
  name: string

  currentContainerIndex?: number
  currentContainerName?: string
  onContainerActivate?: OnContainerSwitch
  resetOnLeave?: boolean
  allowInterContainerHistory?: boolean
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
  isDefault: boolean
}

export type ContainerGroupProps = ContainerGroupPropsWithoutChildren & {
  children?: ChildrenType
}

type GroupPropsWithStore = ContainerGroupProps & {
  store: Store<State, Action, ComputedState>
  parentGroupName: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  storedCurrentContainerIndex: number
  storedCurrentContainerName: string
  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
}

const getGroups = (state):Map<string, ComputedGroup> => state.groups

const makeGetGroup = () => createSelector(
  getName, getGroups,
  (name, groups):ComputedGroup => {
    const group:ComputedGroup|undefined = groups.get(name)
    if (!group) {
      throw new Error(`Group '${name}' not found`)
    }
    else {
      return group
    }
  }
)

const makeGetActions = () => createCachingSelector(
  getName, getDispatch,
  (groupName, dispatch) => ({
    createGroup: (action:CreateGroup) => dispatch(action),
    switchToContainerIndex: (index:number) => dispatch(new SwitchToContainer({
      groupName,
      index
    })),
    switchToContainerName: (name:string) => dispatch(new SwitchToContainer({
      groupName,
      name
    }))
  })
)

const makeMapStateToProps = () => {
  const getGroup = makeGetGroup()
  return (state:ComputedState, ownProps:GroupPropsWithStore) => {
    const group:ComputedGroup = getGroup(state, ownProps)
    return {
      storedCurrentContainerIndex: group.activeContainerIndex,
      storedCurrentContainerName: group.activeContainerName
    }
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
    return (
      <ConnectedContainerGroup parentGroupName={groupName}
                               store={rrnhStore}
                               {...this.props}
      />
    )
  }
}