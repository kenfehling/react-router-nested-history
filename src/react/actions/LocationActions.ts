import {LOCATION_CHANGED, ADD_LOCATION_TITLE} from '../constants/ActionTypes'
import {Location} from 'history'
import {Dispatch} from 'react-redux';
import LocationState from '../model/LocationState'
import {LocationAction, AddTitleAction} from '../model/actions'
import LocationTitle from '../model/LocationTitle'
declare const window

export const locationChanged = (location:Location) : LocationAction => ({
  type: LOCATION_CHANGED,
  location
})

const locTrigger = (dispatch, e) => dispatch(locationChanged(e.detail.location))

export const listenToLocation = () : (d:Dispatch<LocationState>) => void => {
  return (dispatch) => {
    window.addEventListener('locationChange', (e) => locTrigger(dispatch, e))
  }
}

export const unlistenToLocation = () : (d:Dispatch<LocationState>) => void => {
  return (dispatch) => {
    window.removeEventListener('locationChange', (e) => locTrigger(dispatch, e))
  }
}

export const addTitle = (title:LocationTitle) : AddTitleAction => ({
  type: ADD_LOCATION_TITLE,
  ...title
})
