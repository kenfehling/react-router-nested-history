// @flow
import * as types from "../constants/ActionTypes"
import { LOAD_FROM_URL, SET_ZERO_PAGE } from "../constants/ActionTypes"
import * as _ from 'lodash'

export const initialState:Object = {
  actions: [],
  zeroPage: null
}

const setActions = (state:Object, actions:Object[]) => ({...state, actions})
const addAction = (state:Object, action:Object) =>
    setActions(state, [...state.actions, action])

export default function(state:Object=initialState, action:Object) {
  if (action.type === SET_ZERO_PAGE) {
    return {...state, zeroPage: action.zeroPage}
  }
  else if (action.type === LOAD_FROM_URL) {
    if (action.fromRefresh) {
      return state
    }
    else {
      const actions:Object[] = _.initial(state.actions)
      const index:number = _.findIndex(actions, a => a.type === LOAD_FROM_URL)
      if (index === -1) {
        addAction(state, action)
      }
      else {
        setActions(state, state.actions.slice(0, index))
      }
    }
  }
  else if (_.includes(_.values(types), action.type)) {
    return addAction(state, action)
  }
  return state
}