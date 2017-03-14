import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect, Dispatch} from 'react-redux'
import {createSelector} from 'reselect'
import DumbContainerGroup, {
  OnContainerSwitch, ChildrenType
} from './DumbContainerGroup'
import CreateGroup from '../../model/actions/CreateGroup'
import {Store} from '../../store/store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import IContainer from '../../model/IContainer'
import Action from '../../model/BaseAction'
import State from '../../model/State'
import ComputedState from '../../model/ComputedState'
import {ComputedGroup} from '../../model/ComputedState'
import {getGroup} from '../selectors'

export interface ContainerGroupProps {
  name: string
  children?: ChildrenType
  currentContainerIndex?: number
  currentContainerName?: string
  onContainerActivate?: OnContainerSwitch
  resetOnLeave?: boolean
  allowInterContainerHistory?: boolean
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
  isDefault: boolean
}

type GroupPropsWithStore = ContainerGroupProps & {
  store: Store<State, Action, ComputedState>
  parentGroupName: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  storedStackOrder: IContainer[]|null
  storedCurrentContainerIndex: number|null
  storedCurrentContainerName: string|null
  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
}

const selector = createSelector(getGroup, (group:ComputedGroup) => ({
  storedStackOrder: group ? group.stackOrder : null,
  storedCurrentContainerIndex: group ? group.activeContainerIndex : null,
  storedCurrentContainerName: group ? group.activeContainerName : null
}))

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:GroupPropsWithStore) => ({
  createGroup: (action:CreateGroup) => dispatch(action),
  switchToContainerIndex: (index:number) => dispatch(new SwitchToContainer({
    groupName: ownProps.name,
    index
  })),
  switchToContainerName: (name:string) => dispatch(new SwitchToContainer({
    groupName: ownProps.name,
    name
  }))
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:GroupPropsWithStore):ConnectedGroupProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedContainerGroup = connect(
  selector,
  mapDispatchToProps,
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