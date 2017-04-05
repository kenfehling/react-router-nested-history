import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import DumbContainer from './DumbContainer'
import {renderToStaticMarkup} from 'react-dom/server'
import CreateContainer from '../../model/actions/CreateContainer'
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'
import {Store} from '../../store'
import AddTitle from '../../model/actions/AddTitle'
import PathTitle from '../../model/PathTitle'
import SmartContainer, {ContainerProps} from './SmartContainer'
import {
  getDispatch, createCachingSelector,
  getContainerName, getIsInitialized, getLoadedFromPersist,
} from '../selectors'
import {createStructuredSelector} from 'reselect'

type ContainerPropsWithStore = ContainerProps & {
  store: Store
  groupName: string
}

type ConnectedContainerProps = ContainerPropsWithStore & {
  createContainer: (action:CreateContainer) => void
  addTitle: (title:PathTitle) => any
  isInitialized: boolean
  loadedFromPersist: boolean
}

class InnerContainer extends Component<ConnectedContainerProps, undefined> {

  componentWillMount() {
    const {loadedFromPersist, isInitialized} = this.props
    if (!loadedFromPersist && !isInitialized) {
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
      isDefault=false
    } = this.props

    createContainer(new CreateContainer({
      name,
      group: groupName,
      initialUrl,
      patterns,
      resetOnLeave,
      isDefault
    }))

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
    return <SmartContainer {...this.props} />
  }
}

const makeGetActions = () => createCachingSelector(
  getContainerName, getDispatch,
  (containerName, dispatch) => ({
    createContainer: (action:CreateContainer) => dispatch(action),
    addTitle: (title:PathTitle) => dispatch(new AddTitle(title))
  })
)

const mapStateToProps = createStructuredSelector({
  isInitialized: getIsInitialized,
  loadedFromPersist: getLoadedFromPersist
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:ContainerPropsWithStore):ConnectedContainerProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedContainer = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerContainer)

export default class Container extends Component<ContainerProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    hideInactiveContainers: PropTypes.bool
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return <ConnectedContainer store={rrnhStore} {...context} {...this.props} />
  }
}