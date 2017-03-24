import {MOVE_WINDOW, RESET_WINDOW_POSITIONS} from '../constants/ActionTypes'

export const moveWindow = (forName:string, x:number, y:number) => ({
  type: MOVE_WINDOW,
  forName,
  x,
  y
})

export const resetWindowPositions = () => ({
  type: RESET_WINDOW_POSITIONS
})