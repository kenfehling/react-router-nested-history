import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import SmartContainerGroup, {ContainerGroupProps} from './SmartContainerGroup'
import CreateGroup from '../../model/actions/CreateGroup'
import {Store} from '../../store'
import {
  getDispatch, createCachingSelector, getIsInitialized, getLoadedFromPersist
} from '../selectors'
import {createStructuredSelector} from 'reselect'

type GroupPropsWithStore = ContainerGroupProps & {
  store: Store
  parentGroupName: string
}

type ConnectedGroupProps = GroupPropsWithStore & {
  createGroup: (action:CreateGroup) => void
  loadedFromPersist: boolean
  isInitialized: boolean
}

class InnerContainerGroup extends Component<ConnectedGroupProps, undefined> {

  componentWillMount() {
    const { /*parentGroupName, */ loadedFromPersist, isInitialized} = this.props
    if ( /* !parentGroupName && */ !loadedFromPersist && !isInitialized) {
      this.initialize()
    }
  }

  initialize() {
    const {
      store,
      name,
      createGroup,
      resetOnLeave,
      allowInterContainerHistory,
      gotoTopOnSelectActive,
      parentGroupName,
      isDefault
    } = this.props

    createGroup(new CreateGroup({
      name,
      parentGroupName,
      isDefault,
      resetOnLeave,
      allowInterContainerHistory,
      gotoTopOnSelectActive
    }))

     class G extends Component<{children: ReactNode}, undefined> {
       static childContextTypes = {
         rrnhStore: PropTypes.object.isRequired,
         groupName: PropTypes.string.isRequired
       }

       getChildContext() {
         return {
           rrnhStore: store,
           groupName: name
         }
       }

       render() {
         const {children} = this.props
         return <div>{children}</div>
       }
     }
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

const ConnectedContainerGroup = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerContainerGroup)

export default class ContainerGroup extends Component<ContainerGroupProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string,  // Parent group name (if any)
    rrnhStore: PropTypes.object.isRequired
  }

  render() {
    const {groupName, rrnhStore} = this.context
    return (
      <ConnectedContainerGroup parentGroupName={groupName}
                               store={rrnhStore}
                               {...this.props}
      />
    )
  }
}