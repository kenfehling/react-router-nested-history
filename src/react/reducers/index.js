import { LOCATION_CHANGED } from '../constants/ActionTypes'

const initialState = {
  location: null
}

export default function(state=initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGED:
      console.log("Location changed", action.location)
      return {...state, location: action.location}
  }
  return state
}