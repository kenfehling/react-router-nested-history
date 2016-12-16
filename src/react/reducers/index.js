import { LOCATION_CHANGED } from '../constants/ActionTypes'

const initialState = {
  location: window.location  // TODO: Is this the correct type of location object?
}

export default function(state=initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGED: return {...state, location: action.location}
  }
  return state
}