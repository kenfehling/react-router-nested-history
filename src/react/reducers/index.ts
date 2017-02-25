import {LOCATION_CHANGED, ADD_LOCATION_TITLE} from '../constants/ActionTypes'
import LocationState from '../model/LocationState'
import LocationTitle from '../model/LocationTitle'
import {getTitleForUrl} from '../util/titles'
import Startup from '../../model/actions/Startup'
import {LocationAction} from '../model/actions'

const initialState:LocationState = {
  pathname: '/',
  lastAction: new Startup(),
  titles: []
}

export default function(state:LocationState=initialState, action:any):LocationState {
  switch (action.type) {
    case LOCATION_CHANGED:
      const a:LocationAction = action
      return {...state, pathname: a.state.activeUrl, lastAction: a.lastAction}
    case ADD_LOCATION_TITLE:
      const {pathname, title}:LocationTitle = action
      const existingTitle = getTitleForUrl(state.titles, pathname)
      return existingTitle ? state :
        {...state, titles: [...state.titles, {pathname, title}]}

  }
  return state
}