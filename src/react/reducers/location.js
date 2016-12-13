import { LOCATION_CHANGED } from '../constants/ActionTypes'

const initialState = null

export default function(state=initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGED: return action.location
  }
  return state
}