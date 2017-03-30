import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect} from 'react-redux'
import {Store} from '../../store'
import CloseWindow from '../../model/actions/CloseWindow'
import DumbHistoryWindow, {WindowPosition} from './DumbHistoryWindow'
import {moveWindow} from '../../actions/WindowActions'
import {
  createCachingSelector, getContainerName, getDispatch, getWindowIsOnTop,
  getWindowPosition, getWindowVisible, getWindowZIndex
} from '../selectors'
import SwitchToContainer from '../../model/actions/SwitchToContainer'
import {createStructuredSelector} from 'reselect'

interface BaseWindowProps {
  top?: number
  middle?: number
  bottom?:number
  left?: number
  center?: number
  right?: number
  draggable?: boolean
  draggableProps?: Object
  children?: ReactNode
  className?: string
  topClassName?: string
  visible?: boolean
  zIndex: number
  isOnTop: boolean
}

export type WindowProps = BaseWindowProps & {
  forName: string
}

type WindowPropsWithStore = WindowProps & {
  store: Store
  containerName: string
}

type ConnectedWindowProps = WindowPropsWithStore & {
  storedVisibile: boolean
  switchTo: () => void
  open: () => void
  close: () => void
  move: (position:WindowPosition) => void
}


const makeGetActions = () => createCachingSelector(
  getContainerName, getDispatch,
  (name, dispatch) => ({
    switchTo: () => dispatch(new SwitchToContainer({name})),
    open: () => dispatch(new SwitchToContainer({name})),
    close: () => dispatch(new CloseWindow({forName: name})),
    move: ({x, y}:WindowPosition) => dispatch(moveWindow(name, x, y))
  })
)

const mapStateToProps = createStructuredSelector({
  storedVisible: getWindowVisible,
  storedPosition: getWindowPosition,
  zIndex: getWindowZIndex,
  isOnTop: getWindowIsOnTop
})

const mergeProps = (stateProps, dispatchProps,
                    ownProps:WindowPropsWithStore):ConnectedWindowProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedSmartHistoryWindow = connect(
  mapStateToProps,
  makeGetActions,
  mergeProps
)(DumbHistoryWindow)

class SmartHistoryWindow extends Component<WindowProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    windowGroupWidth: PropTypes.number.isRequired,
    windowGroupHeight: PropTypes.number.isRequired
  }

  render() {
    const {rrnhStore, ...context} = this.context
    const {forName, ...props} = this.props
    return (
      <ConnectedSmartHistoryWindow store={rrnhStore}
                                   containerName={forName}
                                   {...context}
                                   {...props}
      />
    )
  }
}

export default SmartHistoryWindow