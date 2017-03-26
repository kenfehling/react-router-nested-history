import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect} from 'react-redux'
import DumbContainer from './DumbContainer'
import {patternsMatch} from '../../util/url'
import CreateContainer from '../../model/actions/CreateContainer'
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'
import {Store} from '../../store/store'
import AddTitle from '../../model/actions/AddTitle'
import PathTitle from '../../model/PathTitle'
import State from '../../model/State'
import Action from '../../model/BaseAction'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import ComputedState from '../../model/ComputedState'
import {ComputedGroup} from '../../model/ComputedState'
import {
  getDispatch, createCachingSelector, getName, makeGetGroup,
  makeGetIsGroupActive, getGroupName
} from '../selectors'

export interface ContainerProps {
  children?: ReactNode
  name: string
  initialUrl: string
  patterns: string[]
  animate?: boolean
  isDefault?: boolean
  resetOnLeave?: boolean
  className?: string
  style?: any
}

type ContainerPropsWithStore = ContainerProps & {
  store: Store<State, Action, ComputedState>
  groupName: string
  initializing: boolean
  hideInactiveContainers: boolean
}

type ConnectedContainerProps = ContainerPropsWithStore & {
  pathname: string
  addTitle: (title:PathTitle) => any
  matchesLocation: boolean
  switchToContainer: () => void
}

class InnerSmartContainer extends Component<ConnectedContainerProps, undefined> {

  addTitleForPath(pathname:string) {
    const {addTitle} = this.props
    if (canUseDOM) {
      addTitle({
        pathname,
        title: document.title
      })
    }
  }

  componentDidUpdate() {
    const {patterns, pathname} = this.props
    if (pathname) {
      if (patternsMatch(patterns, pathname)) {
        this.addTitleForPath(pathname)
      }
    }
  }

  render() {
    const {initializing} = this.props
    if (initializing) {
      return <div></div>
    }
    else {
      const {animate=true} = this.props
      const props = {...this.props, animate}
      return <DumbContainer {...props} />
    }
  }
}

const matchesLocation = (group:ComputedGroup, isGroupActive:boolean,
                         pathname:string, patterns:string[]) => {
  const activeGroupUrl:string = group.activeUrl
  if (activeGroupUrl) {
    const isActiveInGroup:boolean = patternsMatch(patterns, activeGroupUrl)
    if (isActiveInGroup) {
      if (isGroupActive) {
        return pathname === activeGroupUrl
      }
      else {
        return true
      }
    }
    else {
      return false
    }
  }
  else {
    return false
  }
}

const makeGetActions = () => createCachingSelector(
  getName, getDispatch,
  (name, dispatch) => ({
    createContainer: (action:CreateContainer) => dispatch(action),
    addTitle: (title:PathTitle) => dispatch(new AddTitle(title)),
    switchToContainer: () => dispatch(new SwitchToContainer({name}))
  })
)

const makeMapStateToProps = () => {
  const getGroup = makeGetGroup(getGroupName)
  const getIsGroupActive = makeGetIsGroupActive()
  return (state:ComputedState, ownProps:ContainerPropsWithStore) => {
    const group = getGroup(state, ownProps)
    const isGroupActive = getIsGroupActive(state, ownProps)
    const pathname = state.activeUrl

    console.log(pathname)

    return {
      group,
      isGroupActive,
      pathname,
      matchesLocation: matchesLocation(group, isGroupActive, pathname, ownProps.patterns)
    }
  }
}

const mergeProps = (stateProps, dispatchProps,
                    ownProps:ContainerPropsWithStore):ConnectedContainerProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedSmartContainer = connect(
  makeMapStateToProps,
  makeGetActions,
  mergeProps
)(InnerSmartContainer)

export default class SmartContainer extends Component<ContainerProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    initializing: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedSmartContainer store={rrnhStore} {...context} {...this.props} />
  }
}