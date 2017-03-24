import {MOVE_WINDOW} from '../constants/ActionTypes'
import {Map, fromJS} from 'immutable'

export interface ReduxState {
  windowPositions: Map<string, {x:number, y:number}>
}

export const initialState:ReduxState = {
  windowPositions: fromJS({})
}

export default (state:ReduxState=initialState, action):ReduxState => {
  switch (action.type) {
    case MOVE_WINDOW:
      return {
        ...state,
        windowPositions: state.windowPositions.set(action.forName, {
          x: action.x,
          y: action.y
        })
      }
    default: return state
  }
}