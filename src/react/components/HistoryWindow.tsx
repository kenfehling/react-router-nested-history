import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Store} from '../../store'
import SmartHistoryWindow, {WindowProps} from './SmartHistoryWindow'
import CreateWindow from '../../model/actions/CreateWindow'
import {
  getDispatch, createCachingSelector, getIsInitialized, getLoadedFromPersist
} from '../selectors'
import {createStructuredSelector} from 'reselect'

type WindowPropsWithStore = WindowProps & {
  store: Store
}

type ConnectedWindowProps = WindowPropsWithStore & {
  createWindow: (action:CreateWindow) => void
  isInitialized: boolean
  loadedFromPersist: boolean
}

class InnerHistoryWindow extends Component<ConnectedWindowProps, undefined> {

  componentWillMount() {
    const {loadedFromPersist, isInitialized, forName, visible} = this.props
    if (!loadedFromPersist && !isInitialized) {
      this.props.createWindow(new CreateWindow({forName, visible}))
    }
  }

  render() {
    // @ts-ignore
    return <SmartHistoryWindow {...this.props} />
  }
}

const makeGetActions = () => createCachingSelector(
  getDispatch,
  (dispatch) => ({
    createWindow: (action:CreateWindow) => dispatch(action)
  })
)

const mapStateToProps = createStructuredSelector({
  isInitialized: getIsInitialized,
  loadedFromPersist: getLoadedFromPersist
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:WindowPropsWithStore):ConnectedWindowProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedHistoryWindow = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(InnerHistoryWindow as any) as any;

class HistoryWindow extends Component<WindowProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    return  <ConnectedHistoryWindow store={rrnhStore} {...context} {...this.props} />
  }
}

export default HistoryWindow