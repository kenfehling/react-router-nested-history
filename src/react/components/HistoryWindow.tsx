import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect, Dispatch} from 'react-redux'
import {Store} from '../../store'
import SmartHistoryWindow, {WindowProps} from './SmartHistoryWindow'
import CreateWindow from '../../model/actions/CreateWindow'
import {
  getDispatch, createCachingSelector,
  getIsInitializedAndLoadedFromRefresh
} from '../selectors'

type WindowPropsWithStore = WindowProps & {
  store: Store
  initializing: boolean
}

type ConnectedWindowProps = WindowPropsWithStore & {
  createWindow: (action:CreateWindow) => void
  isInitialized: boolean
  loadedFromRefresh: boolean
}

class InnerHistoryWindow extends Component<ConnectedWindowProps, undefined> {

  componentWillMount() {
    const {loadedFromRefresh, forName, visible} = this.props
    if (!loadedFromRefresh) {
      this.props.createWindow(new CreateWindow({forName, visible}))
    }
  }

  render() {
    return this.props.isInitialized ?
      <SmartHistoryWindow {...this.props} /> : <div></div>
  }
}

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    createWindow: (action:CreateWindow) => dispatch(action)
  })
)

const mergeProps = (stateProps, dispatchProps,
                    ownProps:WindowPropsWithStore):ConnectedWindowProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedHistoryWindow = connect(
  getIsInitializedAndLoadedFromRefresh,
  makeGetActions,
  mergeProps
)(InnerHistoryWindow)

class HistoryWindow extends Component<WindowProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    initializing: PropTypes.bool
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return  <ConnectedHistoryWindow store={rrnhStore} {...context} {...this.props} />
  }
}

export default HistoryWindow