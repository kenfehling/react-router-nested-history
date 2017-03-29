import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect} from 'react-redux'
import {Store} from '../../store'
import ComputedState from '../../model/ComputedState'
import {createSelector} from 'reselect'
import {ComputedWindow} from '../../model/ComputedState'
import CloseWindow from '../../model/actions/CloseWindow'
import DumbHistoryWindow, {WindowPosition} from './DumbHistoryWindow'
import {moveWindow} from '../../actions/WindowActions'
import {Map} from 'immutable'
import {createCachingSelector, getDispatch} from '../selectors'
import SwitchToContainer from '../../model/actions/SwitchToContainer'

export interface WindowProps {
  forName: string
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

type WindowPropsWithStore = WindowProps & {
  store: Store
}

type ConnectedWindowProps = WindowPropsWithStore & {
  storedVisibile: boolean
  switchTo: () => void
  open: () => void
  close: () => void
  move: (position:WindowPosition) => void
}

const getForName = (state, props):string => props.forName
const getWindows = (state):Map<string, ComputedWindow> => state.windows
const getPositions = (state):Map<string, Object> => state.windowPositions

const makeGetWindow = () => createSelector(
  getForName, getWindows, getPositions,
  (forName, ws, ps) => {
    return {...ws.get(forName), position: ps[forName]}
  }
)

const makeGetActions = () => createCachingSelector(
  getForName, getDispatch,
  (forName, dispatch) => ({
    switchTo: () => dispatch(new SwitchToContainer({name: forName})),
    open: () => dispatch(new SwitchToContainer({name: forName})),
    close: () => dispatch(new CloseWindow({forName})),
    move: ({x, y}:WindowPosition) => dispatch(moveWindow(forName, x, y))
  })
)

const makeMapStateToProps = () => {
  const getWindow = makeGetWindow()
  return (state:ComputedState, ownProps:WindowPropsWithStore) => {
    const w:ComputedWindow & {position:Object} = getWindow(state, ownProps)
    return {
      storedVisible: w.visible,
      storedPosition: w.position,
      zIndex: w.zIndex,
      isOnTop: w.isOnTop
    }
  }
}

const mergeProps = (stateProps, dispatchProps,
                    ownProps:WindowPropsWithStore):ConnectedWindowProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedSmartHistoryWindow = connect(
  makeMapStateToProps,
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
    return (
      <ConnectedSmartHistoryWindow store={rrnhStore}
                                   {...context}
                                   {...this.props}
      />
    )
  }
}

export default SmartHistoryWindow