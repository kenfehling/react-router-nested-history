import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import SmartContainerGroup, {ContainerGroupProps} from './SmartContainerGroup'
import CreateGroup from '../../model/actions/CreateGroup'
import {Store} from '../../store'
import {renderToStaticMarkup} from 'react-dom/server'
import WindowGroup from './WindowGroup'
import DumbContainerGroup from './DumbContainerGroup'
import DumbContainer from './DumbContainer'
import Container from './Container'
import {getChildren} from '../../util/children'
import waitForInitialization from '../waitForInitialization'
import HistoryWindow from './HistoryWindow'
import SmartContainer from './SmartContainer'
import {
  getDispatch, createCachingSelector,
  getIsInitializedAndLoadedFromRefresh
} from '../selectors'

type GroupPropsWithStore = ContainerGroupProps & {
  store: Store
  parentGroupName: string
  initializing: boolean
}

type ConnectedGroupProps = GroupPropsWithStore & {
  createGroup: (action:CreateGroup) => void
  loadedFromRefresh: boolean
  isInitialized: boolean
}

class InnerContainerGroup extends Component<ConnectedGroupProps, undefined> {

  componentWillMount() {
    const {parentGroupName, initializing, loadedFromRefresh} = this.props
    if ((!parentGroupName || initializing) && !loadedFromRefresh) {
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
         groupName: PropTypes.string.isRequired,
         initializing: PropTypes.bool
       }

       getChildContext() {
         return {
           rrnhStore: store,
           groupName: name,
           initializing: true
         }
       }

       render() {
         const {children} = this.props
         return <div>{children}</div>
       }
     }

     // Initialize the Containers in this group
     // (since most tab libraries lazy load tabs)
     const cs = [
       ...getChildren(this, [Container, SmartContainer, DumbContainer],
       [ContainerGroup, SmartContainerGroup, DumbContainerGroup, WindowGroup]),

       ...getChildren(this, [HistoryWindow],
         [ContainerGroup, SmartContainerGroup, DumbContainerGroup, WindowGroup])
      ]

      console.log(cs)

     cs.forEach(c => renderToStaticMarkup(<G children={c} />))
  }

  render() {
    return this.props.isInitialized ?
        <SmartContainerGroup {...this.props} /> : <div></div>
  }
}

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    createGroup: (action:CreateGroup) => dispatch(action)
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:GroupPropsWithStore):ConnectedGroupProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedContainerGroup = connect(
  getIsInitializedAndLoadedFromRefresh,
  makeGetActions,
  mergeProps
)(InnerContainerGroup)

export default class ContainerGroup extends Component<ContainerGroupProps, undefined> {
  static contextTypes = {
    groupName: PropTypes.string,  // Parent group name (if any)
    initializing: PropTypes.bool,  // Only if is a subgroup
    rrnhStore: PropTypes.object.isRequired
  }

  render() {
    const {groupName, rrnhStore, initializing} = this.context
    return (
      <ConnectedContainerGroup parentGroupName={groupName}
                               store={rrnhStore}
                               initializing={initializing}
                               {...this.props}
      />
    )
  }
}