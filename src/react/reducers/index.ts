import {LOCATION_CHANGED, ADD_LOCATION_TITLE} from '../constants/ActionTypes'
import LocationState from '../model/LocationState'
import {AddTitleAction, LocationAction} from '../model/actions'
import LocationTitle from '../model/LocationTitle'
import {getTitleForUrl} from '../util/titles'
import {createLocation} from 'history'

const initialState:LocationState = {
  location: createLocation('/'),
  titles: []
}

export default function(state:LocationState=initialState, action:any) {
  switch (action.type) {
    case LOCATION_CHANGED:
      return {...state, location: (action as LocationAction).location}
    case ADD_LOCATION_TITLE:
      const {url, title}:LocationTitle = action
      const existingTitle = getTitleForUrl(state.titles, url)
        return existingTitle ? state :
          {...state, titles: [...state.titles, {url, title}]}

  }
  return state
}