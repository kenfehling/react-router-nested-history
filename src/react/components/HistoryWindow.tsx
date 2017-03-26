import * as React from 'react'
import {Component, PropTypes} from 'react'
import {connect, Dispatch} from 'react-redux'
import {Store} from '../../store/store'
import ComputedState from '../../model/ComputedState'
import Action from '../../store/Action'
import State from '../../model/State'
import SmartHistoryWindow, {WindowProps} from './SmartHistoryWindow'
import CreateWindow from '../../model/actions/CreateWindow'

type WindowPropsWithStore = WindowProps & {
  store: Store<State, Action, ComputedState>
  initializing: boolean
}

type ConnectedWindowProps = WindowPropsWithStore & {
  createWindow: () => void
  isInitialized: boolean
  loadedFromRefresh: boolean
}

class InnerHistoryWindow extends Component<ConnectedWindowProps, undefined> {

  componentWillMount() {
    const {initializing, loadedFromRefresh} = this.props
    if (initializing && !loadedFromRefresh) {
      this.props.createWindow()
    }
  }

  render() {
    return this.props.isInitialized ?
      <SmartHistoryWindow {...this.props} /> : <div></div>
  }
}

const mapStateToProps = (state:ComputedState,
                         ownProps:WindowPropsWithStore) => ({
  loadedFromRefresh: state.loadedFromRefresh,
  isInitialized: state.isInitialized
})

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:WindowPropsWithStore) => ({
  createWindow: () => dispatch(new CreateWindow({
    forName: ownProps.forName,
    visible: ownProps.visible
  }))
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:WindowPropsWithStore):ConnectedWindowProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedHistoryWindow = connect(
  mapStateToProps,
  mapDispatchToProps,
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