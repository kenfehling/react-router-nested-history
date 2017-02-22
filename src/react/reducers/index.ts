import {LOCATION_CHANGED, ADD_LOCATION_TITLE} from '../constants/ActionTypes'
import LocationState from '../model/LocationState'
import {AddTitleAction, LocationAction} from '../model/actions'
import LocationTitle from '../model/LocationTitle'
import {getTitleForUrl} from '../util/titles'

const initialState:LocationState = {
  pathname: '/',
  titles: []
}

export default function(state:LocationState=initialState, action:any) {
  switch (action.type) {
    case LOCATION_CHANGED:
      return {...state, location: (action as LocationAction).pathname}
    case ADD_LOCATION_TITLE:
      const {pathname, title}:LocationTitle = action
      const existingTitle = getTitleForUrl(state.titles, pathname)
        return existingTitle ? state :
          {...state, titles: [...state.titles, {pathname, title}]}

  }
  return state
}