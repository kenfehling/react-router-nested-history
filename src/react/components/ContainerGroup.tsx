import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect, Dispatch} from 'react-redux'
import DumbContainerGroup, {
  OnContainerSwitch, ChildrenType
} from './DumbContainerGroup'
import CreateGroup from '../../model/actions/CreateGroup'
import IUpdateData from '../../store/IUpdateData'
import {Store} from '../../store/store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import InitializedState from '../../model/InitializedState'
import IContainer from '../../model/IContainer'
import Action from '../../model/BaseAction'
import State from '../../model/State'

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
  store: Store<State, Action>
  parentGroupName: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  createGroup: (action:CreateGroup) => void
  storedStackOrder: IContainer[]|null
  storedCurrentContainerIndex: number|null
  storedCurrentContainerName: string|null
  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
  loadedFromRefresh: boolean
}

class InnerContainerGroup extends Component<ConnectedGroupProps, undefined> {

  componentWillMount() {
    if (!this.props.loadedFromRefresh) {
      this.initialize()
    }
  }

  initialize() {
    const {
      name,
      resetOnLeave,
      allowInterContainerHistory,
      gotoTopOnSelectActive,
      createGroup,
      parentGroupName,
      isDefault
    } = this.props

    createGroup(new CreateGroup({
      name,
      parentGroupName,
      isDefault,
      resetOnLeave,
      allowInterContainerHistory,
      gotoTopOnSelectActive
    }))

    /*
     class G extends Component<{children: ReactNode}, undefined> {
       static childContextTypes = {
         rrnhStore: PropTypes.object.isRequired,
         groupName: PropTypes.string.isRequired,
         initializing: PropTypes.bool
       }

       getChildContext() {
         return {
           rrnhStore: store,
           groupName: name,
           initializing: true
         }
       }

       render() {
         const {children} = this.props
         return <div>{children}</div>
       }
     }

     // Initialize the Containers in this group
     // (since most tab libraries lazy load tabs)
     const cs = getChildren(this, [Container, DumbContainer],
        [ContainerGroup, DumbContainerGroup, WindowGroup])
     cs.forEach(c => renderToStaticMarkup(<G children={c} />))
     */
  }

  render() {
    return <DumbContainerGroup {...this.props} />
  }
}

const mapStateToProps = ({state}:IUpdateData<State, Action>,
                         ownProps:GroupPropsWithStore) => {
  const {name} = ownProps
  const isInitialized = state instanceof InitializedState
  return {
    loadedFromRefresh: state.loadedFromRefresh,
    storedStackOrder: state.getContainerStackOrderForGroup(name),
    storedCurrentContainerIndex: state.getActiveContainerIndexInGroup(name),
    storedCurrentContainerName: isInitialized ?
                                state.getActiveContainerNameInGroup(name) : null
  }
}

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData<State, Action>>,
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
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InnerContainerGroup)

export default class ContainerGroup extends Component<ContainerGroupProps, undefined> {
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