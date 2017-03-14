import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import DumbContainer from './DumbContainer'
import {renderToStaticMarkup} from 'react-dom/server'
import {patternsMatch} from '../../util/url'
import CreateContainer from '../../model/actions/CreateContainer'
import {canUseDOM} from 'history/ExecutionEnvironment'
import {Store} from '../../store/store'
import AddTitle from '../../model/actions/AddTitle'
import PathTitle from '../../model/PathTitle'
import State from '../../model/State'
import Action from '../../model/BaseAction'
import SwitchToGroup from '../../model/actions/SwitchToGroup'
import ComputedState from '../../model/ComputedState'
import {ComputedContainer} from '../../model/ComputedState'
import {createSelector} from 'reselect'
import {ComputedGroup} from '../../model/ComputedState'
import {
  getGroup, getContainer, getIsInitialized,
  getLoadedFromRefresh, getPathname, isGroupActive
} from '../selectors'

interface ContainerProps {
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
  createContainer: (action:CreateContainer) => void
  pathname: string
  addTitle: (title:PathTitle) => any
  isInitialized: boolean
  loadedFromRefresh: boolean
  matchesLocation: boolean
  switchToGroup: () => void
}

class InnerContainer extends Component<ConnectedContainerProps, undefined> {

  componentWillMount() {
    if (!this.props.loadedFromRefresh) {
      this.initialize()
    }
  }

  initialize() {
    const {
      store,
      children,
      name,
      patterns,
      initialUrl,
      animate=true,
      resetOnLeave=false,
      createContainer,
      groupName,
      initializing=false,
      isDefault=false
    } = this.props

    createContainer(new CreateContainer({
      name,
      groupName,
      initialUrl,
      patterns,
      resetOnLeave,
      isDefault
    }))

    if (initializing) {
      class T extends Component<undefined, undefined> {
        static childContextTypes = {
          ...DumbContainer.childContextTypes,
          rrnhStore: PropTypes.object.isRequired
        }

        getChildContext() {
          return {
            rrnhStore: store,
            groupName,
            animate,
            containerName: name,
            pathname: initialUrl,
            patterns: patterns
          }
        }

        render() {
          return <div>{children}</div>
        }
      }

      renderToStaticMarkup(<T />)
      this.addTitleForPath(initialUrl)
    }
  }

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
  const activeGroupUrl:string|null = group ? group.activeUrl : null
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

const selector = createSelector(
  getGroup, isGroupActive, getContainer, getIsInitialized, getLoadedFromRefresh, getPathname,
  (group:ComputedGroup, isGroupActive:boolean, container:ComputedContainer,
   isInitialized:boolean, loadedFromRefresh:boolean, pathname:string) => ({
    group,
    isGroupActive,
    isInitialized,
    loadedFromRefresh,
    pathname
  })
)

const mapStateToProps = (state:ComputedState, ownProps:ContainerPropsWithStore) => {
  const s = selector(state, ownProps)
  return {
    isInitialized: s.isInitialized,
    loadedFromRefresh: s.loadedFromRefresh,
    pathname: s.pathname,
    matchesLocation: matchesLocation(
        s.group, s.isGroupActive, s.pathname, ownProps.patterns)
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

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InnerContainer)

export default class Container extends Component<ContainerProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    initializing: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedContainer store={rrnhStore} {...context} {...this.props} />
  }
}