import {MOVE_WINDOW} from '../constants/ActionTypes'

export interface ReduxState {
  windowPositions
}

export const initialState:ReduxState = {
  windowPositions: {}
}

export default (state:ReduxState=initialState, action):ReduxState => {
  switch (action.type) {
    case MOVE_WINDOW:
      return {
        ...state,
        windowPositions: {
          ...state.windowPositions,
          [action.forName]: {x: action.x, y: action.y}
        }
      }
    default: return state
  }
}