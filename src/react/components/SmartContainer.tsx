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
import {
  getDispatch, createCachingSelector, makeGetGroup,
  makeGetIsActiveInGroup, makeGetMatchesCurrentUrl, getContainerName
} from '../selectors'

interface BaseContainerProps {
  children?: ReactNode
  initialUrl: string
  patterns: string[]
  animate?: boolean
  isDefault?: boolean
  resetOnLeave?: boolean
  className?: string
  style?: any
}

export type ContainerProps = BaseContainerProps & {
  name: string
}

type ContainerPropsWithStore = BaseContainerProps & {
  store: Store<State, Action, ComputedState>
  groupName: string
  containerName: string
  initializing: boolean
  hideInactiveContainers: boolean
}

type ConnectedContainerProps = ContainerPropsWithStore & {
  pathname: string
  isActiveInGroup: boolean
  matchesCurrentUrl: boolean
  addTitle: (title:PathTitle) => any
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

const makeGetActions = () => createCachingSelector(
  getContainerName, getDispatch,
  (containerName, dispatch) => ({
    createContainer: (action:CreateContainer) => dispatch(action),
    addTitle: (title:PathTitle) => dispatch(new AddTitle(title)),
    switchToContainer: () => dispatch(new SwitchToContainer({name: containerName}))
  })
)

const makeMapStateToProps = () => {
  const getGroup = makeGetGroup()
  const getIsActiveInGroup = makeGetIsActiveInGroup()
  const getMatchesCurrentUrl = makeGetMatchesCurrentUrl()
  return (state:ComputedState, ownProps:ContainerPropsWithStore) => {
    const group = getGroup(state, ownProps)
    const isActiveInGroup = getIsActiveInGroup(state, ownProps)
    const matchesCurrentUrl = getMatchesCurrentUrl(state, ownProps)

    const pathname = state.activeUrl  // TODO: Should this use a selector?

    return {
      group,
      pathname,
      isActiveInGroup,
      matchesCurrentUrl
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
    const {name, ...props} = this.props
    return <ConnectedSmartContainer store={rrnhStore}
                                    containerName={name}
                                    {...context}
                                    {...props}
    />
  }
}