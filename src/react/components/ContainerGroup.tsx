import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import DumbContainerGroup, {
  OnContainerSwitch, ChildrenType
} from './DumbContainerGroup'
import Container from './Container'
import DumbContainer from './DumbContainer'
import {renderToStaticMarkup} from 'react-dom/server'
import CreateGroup from '../../model/actions/CreateGroup'
import createElement = React.createElement
import IUpdateData from '../../model/interfaces/IUpdateData'
import {Store} from '../../store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import InitializedState from '../../model/InitializedState'
import {getChildren} from '../../util/children'
import WindowGroup from './WindowGroup'
import IContainer from '../../model/interfaces/IContainer'

export interface ContainerGroupProps {
  name: string
  children?: ChildrenType
  currentContainerIndex?: number
  currentContainerName?: string
  onContainerActivate?: OnContainerSwitch
  resetOnLeave?: boolean
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
  isDefault: boolean
}

type GroupPropsWithStore = ContainerGroupProps & {
  store: Store
  parentGroupName: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  createGroup: (action:CreateGroup) => void
  storedStackOrder: IContainer[]|null
  storedCurrentContainerIndex: number|null
  storedCurrentContainerName: string|null
  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
}

class InnerContainerGroup extends Component<ConnectedGroupProps, undefined> {
  constructor(props) {
    super(props)
    const {
      store,
      name,
      resetOnLeave,
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
      gotoTopOnSelectActive
    }))

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
        return <div>{this.props.children}</div>
      }
    }

    // Initialize the Containers in this group
    // (since most tab libraries lazy load tabs)
    const cs = getChildren(this, [Container, DumbContainer],
                                 [ContainerGroup, DumbContainerGroup, WindowGroup])
    cs.forEach(c => renderToStaticMarkup(<G children={c} />))
  }

  render() {
    return  <DumbContainerGroup {...this.props} />
  }
}

const mapStateToProps = ({state}:IUpdateData,
                         ownProps:GroupPropsWithStore) => {
  const {name} = ownProps
  const isInitialized = state instanceof InitializedState
  return {
    storedStackOrder: state.getContainerStackOrderForGroup(name),
    storedCurrentContainerIndex: state.getActiveContainerIndexInGroup(name),
    storedCurrentContainerName: isInitialized ?
                                state.getActiveContainerNameInGroup(name) : null
  }
}

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>,
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