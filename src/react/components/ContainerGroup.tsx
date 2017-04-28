import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose, getContext, renameProps} from 'recompose'
import SmartContainerGroup, {ContainerGroupProps} from './SmartContainerGroup'
import CreateGroup from '../../model/actions/CreateGroup'
import {Store} from '../../store'
import {
  getDispatch, createCachingSelector, getIsInitialized, getLoadedFromPersist
} from '../selectors'
import {createStructuredSelector} from 'reselect'
import {neverUpdate} from '../enhancers'

type GroupPropsWithStore = ContainerGroupProps & {
  store: Store
  parentGroup: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  createGroup: (action:CreateGroup) => void
  loadedFromPersist: boolean
  isInitialized: boolean
}

class InnerContainerGroup extends Component<ConnectedGroupProps, undefined> {

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
      createGroup,
      resetOnLeave,
      allowInterContainerHistory,
      gotoTopOnSelectActive,
      parentGroup,
      isDefault
    } = this.props

    createGroup(new CreateGroup({
      name,
      parentGroup,
      isDefault,
      resetOnLeave,
      allowInterContainerHistory,
      gotoTopOnSelectActive
    }))
  }

  render() {
    return <SmartContainerGroup {...this.props} />
  }
}

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    createGroup: (action:CreateGroup) => dispatch(action)
  })
)

const mapStateToProps = createStructuredSelector({
  isInitialized: getIsInitialized,
  loadedFromPersist: getLoadedFromPersist
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:GroupPropsWithStore):ConnectedGroupProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ContainerGroup = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerContainerGroup)

const enhance = compose(
  getContext({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string
  }),
  renameProps({
    rrnhStore: 'store',
    groupName: 'parentGroup'
  }),
  neverUpdate
)

export default enhance(ContainerGroup)