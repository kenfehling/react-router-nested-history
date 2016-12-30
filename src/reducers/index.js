// @flow
import * as types from "../constants/ActionTypes"
import { SET_ZERO_PAGE } from "../constants/ActionTypes"
import * as _ from 'lodash'
import type { Action } from '../types'

type ReducerState = {
  actions: Action[],
  zeroPage: string
}

export const initialState:ReducerState = {
  actions: [],
  zeroPage: null
}

const setActions = (state:ReducerState, actions:Action[]) => ({...state, actions})
const addAction = (state:ReducerState, action:Action) =>
    setActions(state, [...state.actions, action])

export default function(state:ReducerState=initialState, action:Action) {
  const {type, data} : {type:string, data:Object} = action
  if (type === SET_ZERO_PAGE) {
    return {...state, zeroPage: data.zeroPage}
  }
  else if (_.includes(_.values(types), type)) {
    return addAction(state, action)
  }
  return state
}