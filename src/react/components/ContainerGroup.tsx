import * as React from 'react'
import {Component, PropTypes, Children, ReactNode} from 'react'
import {connect, Store} from 'react-redux'
import locationStore from '../store'
import DumbContainerGroup, {
  OnContainerSwitch,
  DumbContainerGroupProps, ChildrenType
} from './DumbContainerGroup'
import {
  getIndexedContainerStackOrder, getActivePageInGroup, getOrCreateGroup,
  getActiveContainerIndexInGroup, isInitialized, getActiveContainerNameInGroup,
} from '../../main'
import Container from './Container'
import DumbContainer from './DumbContainer'
import {renderToStaticMarkup} from 'react-dom/server'
import * as R from 'ramda'
import CreateGroup from '../../model/actions/CreateGroup'
import LocationState from '../model/LocationState'

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
    const children = Children.map(component.props.children, c => c)
    return R.flatten(children.map(c => getChildren(c, depth + 1)))  // grandkids
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

type CreatedGroupProps = ContainerGroupProps & {
  store: Store<LocationState>
}

const mapStateToProps = (state:LocationState,
                         ownProps:CreatedGroupProps):DumbContainerGroupProps => {
  const {name} = ownProps
  const initialized:boolean = isInitialized()
  return {
    name,
    storedCurrentContainerIndex: getActiveContainerIndexInGroup(name),
    storedCurrentContainerName: initialized ? getActiveContainerNameInGroup(name) : null,
    storedIndexedStackOrder: getIndexedContainerStackOrder(name)
  }
}

const ConnectedContainerGroup = connect(mapStateToProps)(DumbContainerGroup)

export default class ContainerGroup extends Component<ContainerGroupProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string,         // Parent group name (if any)
    useDefaultContainer: PropTypes.bool  // From parent (if any)
  }

  constructor(props, context) {
    super(props, context)
    const {
      name,
      useDefaultContainer,
      resetOnLeave,
      gotoTopOnSelectActive
    } = this.props

    const parentGroupName:string = this.context ?
      this.context.groupName : undefined
    const parentUsesDefault:boolean = this.context ?
      this.context.useDefaultContainer : undefined

    // Promises are too tricky here
    getOrCreateGroup(new CreateGroup({
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
    return (
      <ConnectedContainerGroup
          store={locationStore}
          {...this.props}
      />
    )
  }
}