import {MOVE_WINDOW} from '../constants/ActionTypes'

export const moveWindow = (forName:string, x:number, y:number) => ({
  type: MOVE_WINDOW,
  forName,
  x,
  y
})