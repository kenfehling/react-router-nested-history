import * as React from 'react'
import {Component, PropTypes, Children, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import DumbContainerGroup, {
  OnContainerSwitch, ChildrenType
} from './DumbContainerGroup'
import Container from './Container'
import DumbContainer from './DumbContainer'
import {renderToStaticMarkup} from 'react-dom/server'
import * as R from 'ramda'
import CreateGroup from '../../model/actions/CreateGroup'
import createElement = React.createElement
import IUpdateData from '../../model/interfaces/IUpdateData'
import {Store} from '../../store'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import InitializedState from '../../model/InitializedState'

/**
 * Recursively gets the children of a component for simlated rendering
 * so that the containers are initialized even if they're hidden inside tabs
 */
function getChildren(component, depth:number=0) {
  if (!(component instanceof Component) && !component.type) {
    return []
  }
  if (component instanceof Container || component.type === Container ||
    component instanceof DumbContainer || component.type === DumbContainer ||
    (depth > 0 &&
    (component instanceof ContainerGroup || component.type === ContainerGroup ||
    component instanceof DumbContainerGroup || component.type === DumbContainerGroup))) {
    return [component]  // Stop if you find a Container or nested ContainerGroup
  }
  else if (component.props && component.props.children) {
    if (component.props.children instanceof Function) {
      return getChildren(createElement(component.props.children), depth + 1)
    }
    else {
      const children = Children.toArray(component.props.children)
      return R.flatten(children.map(c => getChildren(c, depth + 1)))
    }
  }
  else {  // no children
    return [component]
  }
}


export interface ContainerGroupProps {
  name: string,
  children?: ChildrenType,
  currentContainerIndex?: number
  currentContainerName?: string
  onContainerActivate?: OnContainerSwitch
  useDefaultContainer?: boolean
  resetOnLeave?: boolean
  hideInactiveContainers?: boolean
  gotoTopOnSelectActive?: boolean
}

type GroupPropsWithStore = ContainerGroupProps & {
  store: Store
}

type ConnectedGroupProps = GroupPropsWithStore & {
  createGroup: (action:CreateGroup) => void
  storedIndexedStackOrder: number[]
  storedCurrentContainerIndex: number
  storedCurrentContainerName: string|null
  switchToContainerIndex: (index:number) => void
  switchToContainerName: (name:string) => void
}

class ContainerGroup extends Component<ConnectedGroupProps, undefined> {
  constructor(props, context) {
    super(props, context)
    const {
      name,
      useDefaultContainer,
      resetOnLeave,
      gotoTopOnSelectActive,
      createGroup
    } = this.props

    const parentGroupName:string = this.context ?
      this.context.groupName : undefined
    const parentUsesDefault:boolean = this.context ?
      this.context.useDefaultContainer : undefined

    createGroup(new CreateGroup({
      name,
      parentGroupName,
      parentUsesDefault,
      resetOnLeave,
      gotoTopOnSelectActive
    }))

    class G extends Component<{children: ReactNode}, undefined> {
      static childContextTypes = {
        groupName: PropTypes.string.isRequired,
        useDefaultContainer: PropTypes.bool,
        initializing: PropTypes.bool
      }

      getChildContext() {
        return {
          groupName: name,
          useDefaultContainer,
          initializing: true
        }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    // Initialize the Containers in this group
    // (since most tab libraries lazy load tabs)
    const children = getChildren(this)
    children.forEach(c => renderToStaticMarkup(<G children={c} />))
  }

  render() {
    return  <DumbContainerGroup {...this.props} />
  }
}


const mapStateToProps = ({state}:IUpdateData,
                         ownProps:GroupPropsWithStore) => {
  const {name} = ownProps
  const isInitialized = state instanceof InitializedState
  const ccn = isInitialized ? state.getActiveContainerNameInGroup(name) : null
  return {
    storedIndexedStackOrder: state.getIndexedContainerStackOrderForGroup(name),
    storedCurrentContainerIndex: state.getActiveContainerIndexInGroup(name),
    storedCurrentContainerName: ccn
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
)(ContainerGroup)

export default class extends Component<ContainerGroupProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string,          // Parent group name (if any)
    useDefaultContainer: PropTypes.bool,  // From parent (if any)
    store: PropTypes.object.isRequired
  }

  render() {
    return <ConnectedContainerGroup {...this.context} />
  }
}