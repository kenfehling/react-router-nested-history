import { LOCATION_CHANGED } from '../constants/ActionTypes'

const initialState = {
  location: null
}

export default function(state=initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGED:
      return {...state, location: action.location}
  }
  return state
}