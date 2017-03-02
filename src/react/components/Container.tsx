import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import DumbContainer from './DumbContainer'
import {renderToStaticMarkup} from 'react-dom/server'
import {patternsMatch} from '../../util/url'
import CreateContainer from '../../model/actions/CreateContainer'
import {canUseDOM} from 'history/ExecutionEnvironment'
import {Store} from '../../store'
import IUpdateData from '../../model/interfaces/IUpdateData'
import AddTitle from '../../model/actions/AddTitle'
import PathTitle from '../../model/interfaces/PathTitle'
import IState from '../../model/IState'
import InitializedState from '../../model/InitializedState'
import SwitchToGroup from '../../model/actions/SwitchToGroup'

interface ContainerProps {
  children?: ReactNode
  name: string
  animate?: boolean
  initialUrl: string
  patterns: string[]
  resetOnLeave?: boolean
  className?: string
  style?: any
}

type ContainerPropsWithStore = ContainerProps & {
  store: Store
  groupName: string
  initializing: boolean
  useDefaultContainer: boolean
  hideInactiveContainers: boolean
}

type ConnectedContainerProps = ContainerPropsWithStore & {
  createContainer: (action:CreateContainer) => void
  pathname: string
  addTitle: (title:PathTitle) => any
  isInitialized: boolean
  matchesLocation: boolean
  switchToGroup: () => void
}

class Container extends Component<ConnectedContainerProps, undefined> {
  addTitleForPath(pathname:string) {
    const {addTitle} = this.props
    if (canUseDOM) {
      addTitle({
        pathname,
        title: document.title
      })
    }
  }

  constructor(props) {
    super(props)
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
      useDefaultContainer=true
    } = this.props

    createContainer(new CreateContainer({
      name,
      groupName,
      initialUrl,
      patterns,
      resetOnLeave,
      useDefault: useDefaultContainer
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

const matchesLocation = (state:IState, groupName:string, patterns:string[]) => {
  const pathname:string = state.activeUrl
  const activeGroupUrl:string = state.getActiveUrlInGroup(groupName)
  const isActiveInGroup:boolean = patternsMatch(patterns, activeGroupUrl)
  const isGroupActive:boolean = state.urlMatchesGroup(pathname, groupName)
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

const mapStateToProps = ({state}:IUpdateData,
                         ownProps:ContainerPropsWithStore) => {
  const isInitialized:boolean = state instanceof InitializedState
  return {
    isInitialized: isInitialized,
    pathname: isInitialized ? state.activeUrl : null,
    matchesLocation: isInitialized ?
        matchesLocation(state, ownProps.groupName, ownProps.patterns) : false
  }
}

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>,
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
)(Container)

export default class extends Component<ContainerProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    initializing: PropTypes.bool,
    useDefaultContainer: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedContainer store={rrnhStore} {...context} {...this.props} />
  }
}