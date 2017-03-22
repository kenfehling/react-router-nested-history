import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import DumbContainer from './DumbContainer'
import {patternsMatch} from '../../util/url'
import CreateContainer from '../../model/actions/CreateContainer'
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'
import {Store} from '../../store/store'
import AddTitle from '../../model/actions/AddTitle'
import PathTitle from '../../model/PathTitle'
import State from '../../model/State'
import Action from '../../model/BaseAction'
import SwitchToGroup from '../../model/actions/SwitchToGroup'
import ComputedState from '../../model/ComputedState'
import {ComputedGroup} from '../../model/ComputedState'
import {getGroup, getPathname, getIsGroupActive} from '../selectors'

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
  switchToGroup: () => void
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

const mapStateToProps = (state:ComputedState, ownProps:ContainerPropsWithStore) => {
  const group:ComputedGroup = getGroup(state, ownProps)
  const pathname:string = getPathname(state)
  const isGroupActive:boolean = getIsGroupActive(state, ownProps)
  return {
    group,
    isGroupActive,
    pathname,
    matchesLocation: matchesLocation(group, isGroupActive, pathname, ownProps.patterns)
  }
}

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:ContainerPropsWithStore) => ({
  createContainer: (action:CreateContainer) => dispatch(action),
  addTitle: (title:PathTitle) => dispatch(new AddTitle(title)),
  switchToGroup: () => dispatch(new SwitchToGroup({groupName: ownProps.groupName}))
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:ContainerPropsWithStore):ConnectedContainerProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedSmartContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
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