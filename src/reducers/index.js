// @flow
import * as types from "../constants/ActionTypes"
import { SET_ZERO_PAGE, LOAD_FROM_URL, CLEAR_ACTIONS } from "../constants/ActionTypes"
import {KEEP_HISTORY_ON_FUTURE_VISIT} from "../constants/Settings"
import * as _ from 'lodash'
import type { Action } from '../types'

type ReducerState = {
  actions: Action[],
  zeroPage: string,
  lastUpdate: Date
}

export const initialState:ReducerState = {
  actions: [],
  zeroPage: '/',
  lastUpdate: new Date(0)
}

const setActions = (state:ReducerState, actions:Action[]) : ReducerState =>
    ({...state, actions})

const addAction = (state:ReducerState, action:Action) : ReducerState =>
    setActions(state, [...state.actions, action])

const cleanUpActions = (state:ReducerState)  : ReducerState => {
  const actions:Action[] = state.actions
  const index:number = _.findIndex(actions, a => a.type === LOAD_FROM_URL)
  if (index > 0) {
    return {...state, actions: actions.slice(0, index), lastUpdate: new Date(0)}
  }
  else {
    return state
  }
}

export default function(state:ReducerState=initialState, action:Action) {
  const {type, data} : {type:string, data:Object} = action
  switch (type) {
    case CLEAR_ACTIONS: return {...state, actions: []}
    case SET_ZERO_PAGE: return {...state, zeroPage: data.zeroPage}
    default: {
      if (_.includes(_.values(types), type)) {
        const shouldClean:boolean = type === LOAD_FROM_URL &&
            !action.fromRefresh && !KEEP_HISTORY_ON_FUTURE_VISIT
        const newState = shouldClean ? cleanUpActions(state) : state
        return {...addAction(newState, action), lastUpdate: new Date()}
      }
    }
  }
  return state
}