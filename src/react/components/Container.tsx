import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose, getContext, renameProps} from 'recompose'
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
import {neverUpdate} from '../enhancers'

type ContainerPropsWithStore = ContainerProps & {
  store: Store
  groupName: string
}

type ConnectedContainerProps = ContainerPropsWithStore & {
  createContainer: (action:CreateContainer) => void
  isInitialized: boolean
  loadedFromPersist: boolean
}

class InnerContainer extends Component<ConnectedContainerProps, undefined> {

  shouldComponentUpdate() {
    return false
  }

  componentWillMount() {
    const {loadedFromPersist, isInitialized} = this.props
    if (!loadedFromPersist && !isInitialized) {
      this.initialize()
    }
  }

  initialize() {
    const {
      name,
      patterns,
      initialUrl,
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
  }

  render() {
    // @ts-ignore
    return <SmartContainer {...this.props} />
  }
}

const makeGetActions = () => createCachingSelector(
  getContainerName, getDispatch,
  (containerName, dispatch) => ({
    createContainer: (action:CreateContainer) => dispatch(action)
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

const Container = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerContainer as any)

const enhance = compose(
  getContext({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    hideInactiveContainers: PropTypes.bool
  }),
  renameProps({
    rrnhStore: 'store'
  }),
  neverUpdate
)

export default enhance(Container)