import * as React from 'react'
import { Component, PropTypes, ReactNode } from 'react'
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

  constructor(props, context) {
    super(props, context)
    const {
      children,
      name,
      patterns,
      initialUrl,
      animate=true,
      resetOnLeave=false,
      createContainer
    } = this.props
    const {
      groupName,
      initializing=false,
      useDefaultContainer=true
    } = this.context

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
        static childContextTypes = DumbContainer.childContextTypes

        getChildContext() {
          return {
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
    const {initializing} = this.context
    if (initializing) {
      return <div></div>
    }
    else {
      const {animate=true} = this.props
      const props = {...this.props, ...this.context, animate}
      return <DumbContainer {...props} />
    }
  }
}

const matchesLocation = (state:IState, groupName:string, patterns:string[]) => {
  const isInitialized:boolean = state instanceof InitializedState
  if (isInitialized) {
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
  else {
    return false
  }
}

const mapStateToProps = ({state}:IUpdateData,
                         ownProps:ContainerPropsWithStore) => ({
  pathname: state.activeUrl,
  matchesLocation: matchesLocation(state, ownProps.groupName, ownProps.patterns)
})

const mapDispatchToProps = (dispatch:Dispatch<IUpdateData>) => ({
  createContainer: (action:CreateContainer) => dispatch(action),
  addTitle: (title:PathTitle) => dispatch(new AddTitle(title))
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
    store: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    initializing: PropTypes.bool,
    useDefaultContainer: PropTypes.bool,
    hideInactiveContainers: PropTypes.bool
  }

  render() {
    return <ConnectedContainer {...this.context} />
  }
}