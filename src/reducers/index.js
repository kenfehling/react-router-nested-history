import * as actionTypes from "../constants/ActionTypes"
import * as _ from 'lodash'

const initialState = []

export default function(state=initialState, action) {
  if (_.includes(_.values(actionTypes), action.type)) {
    return [...state, action]
  }
  return state
}