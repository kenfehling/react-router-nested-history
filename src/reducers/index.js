import * as actionTypes from "../constants/ActionTypes"
import * as _ from 'lodash'

export const initialState = {
  actions: []
}

export default function(state=initialState, action) {
  if (_.includes(_.values(actionTypes), action.type)) {
    return {...state, actions: [...state.actions, action]}
  }
  return state
}