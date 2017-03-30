import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import DumbContainerGroup, {ChildrenType} from './DumbContainerGroup'
import CreateGroup from '../../model/actions/CreateGroup'
import {Store} from '../../store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import ComputedState from '../../model/ComputedState'
import {ComputedGroup} from '../../model/ComputedState'
import {
  createCachingSelector, getDispatch, getGroupName, getGroup,
  getCurrentContainerIndex, getCurrentContainerName
} from '../selectors'
import {createStructuredSelector} from 'reselect'

export interface BaseGroupPropsWithoutChildren {
  resetOnLeave?: boolean
  allowInterContainerHistory?: boolean
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
  isDefault: boolean
}

export type ContainerGroupProps = BaseGroupPropsWithoutChildren & {
  children?: ChildrenType
  name: string
}

type GroupPropsWithStore = BaseGroupPropsWithoutChildren & {
  store: Store
  parentGroupName: string

  children?: ChildrenType
  groupName: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  storedCurrentContainerIndex?: number
  storedCurrentContainerName?: string
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

const mapStateToProps = createStructuredSelector({
  storedCurrentContainerIndex: getCurrentContainerIndex,
  storedCurrentContainerName: getCurrentContainerName
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:GroupPropsWithStore):ConnectedGroupProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedContainerGroup = connect(
  mapStateToProps,
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