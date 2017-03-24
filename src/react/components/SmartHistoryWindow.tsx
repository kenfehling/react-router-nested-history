import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import {connect, Dispatch} from 'react-redux'
import {Store} from '../../store/store'
import ComputedState from '../../model/ComputedState'
import Action from '../../store/Action'
import State from '../../model/State'
import {createSelector} from 'reselect'
import {ComputedWindow} from '../../model/ComputedState'
import CloseWindow from '../../model/actions/CloseWindow'
import DumbHistoryWindow from './DumbHistoryWindow'
import {ComputedContainer} from '../../model/ComputedState'
import {moveWindow} from '../../actions/WindowActions'
import {ReduxState} from '../../reducers/index'

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
}

type WindowPropsWithStore = WindowProps & {
  store: Store<State, Action, ComputedState>
  stackOrder: ComputedContainer[]
  setCurrentContainerName: (name:string) => void
}

type ConnectedWindowProps = WindowPropsWithStore & {
  storedVisibile: boolean
  close: () => void
}

export const getWindow = (state:ComputedState, ownProps):ComputedWindow => {
  return state.windows.get(ownProps.forName)
}

const selector = createSelector(getWindow, (w:ComputedWindow) => ({
  window: w
}))

const mapStateToProps = (state:ComputedState, ownProps:WindowPropsWithStore) => {
  const s = selector(state, ownProps)
  return {
    storedVisible: s.window.visible,
    storedPosition: state.windowPositions.get(ownProps.forName)
  }
}

const mapDispatchToProps = (dispatch:Dispatch<ComputedState>,
                            ownProps:WindowPropsWithStore) => {
  const {forName, setCurrentContainerName} = ownProps
  return {
    open: () => setCurrentContainerName(forName),
    close: () => dispatch(new CloseWindow({forName})),
    move: ({x, y}:{x:number, y:number}) => dispatch(moveWindow(forName, x, y))
  }
}

const mergeProps = (stateProps, dispatchProps,
                    ownProps:WindowPropsWithStore):ConnectedWindowProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

const ConnectedSmartHistoryWindow = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DumbHistoryWindow)

class SmartHistoryWindow extends Component<WindowProps, undefined> {
  static contextTypes = {
    rrnhStore: PropTypes.object.isRequired,
    stackOrder: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCurrentContainerName: PropTypes.func.isRequired,
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