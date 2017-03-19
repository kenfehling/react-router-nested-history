import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect, Dispatch} from 'react-redux'
import DumbContainer from './DumbContainer'
import {renderToStaticMarkup} from 'react-dom/server'
import CreateContainer from '../../model/actions/CreateContainer'
import {canUseDOM} from 'history/ExecutionEnvironment'
import {Store} from '../../store/store'
import AddTitle from '../../model/actions/AddTitle'
import PathTitle from '../../model/PathTitle'
import State from '../../model/State'
import Action from '../../model/BaseAction'
import ComputedState from '../../model/ComputedState'
import SmartContainer, {ContainerProps} from './SmartContainer'
import waitForInitialization from '../waitForInitialization'

type ContainerPropsWithStore = ContainerProps & {
  store: Store<State, Action, ComputedState>
  groupName: string
  initializing: boolean
}

type ConnectedContainerProps = ContainerPropsWithStore & {
  createContainer: (action:CreateContainer) => void
  addTitle: (title:PathTitle) => any
  isInitialized: boolean
  loadedFromRefresh: boolean
}

class InnerContainer extends Component<ConnectedContainerProps, undefined> {

  componentWillMount() {
    const {initializing, loadedFromRefresh} = this.props
    if (initializing && !loadedFromRefresh) {
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

  render() {
    return this.props.isInitialized ?
        <SmartContainer {...this.props} /> : <div></div>
  }
}

const mapStateToProps = (state:ComputedState) => ({
  loadedFromRefresh: state.loadedFromRefresh,
  isInitialized: state.isInitialized
})

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:ContainerPropsWithStore) => ({
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