import {MOVE_WINDOW, RESET_WINDOW_POSITIONS} from '../constants/ActionTypes'

export interface ReduxState {
  windowPositions
}

export const initialState:ReduxState = {
  windowPositions: {}
}

export default (state:ReduxState=initialState, action):ReduxState => {
  switch (action.type) {
    case MOVE_WINDOW: {
      return {
        ...state,
        windowPositions: {
          ...state.windowPositions,
          [action.forName]: {x: action.x, y: action.y}
        }
      }
    }
    case RESET_WINDOW_POSITIONS: return initialState
    default: return state
  }
}