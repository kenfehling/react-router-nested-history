import {LOCATION_CHANGED, ADD_LOCATION_TITLE} from '../constants/ActionTypes'
import {Dispatch} from 'react-redux';
import LocationState from '../model/LocationState'
import {LocationAction, AddTitleAction} from '../model/actions'
import LocationTitle from '../model/LocationTitle'
import {addChangeListener} from '../../main'
import IUpdateData from '../../model/interfaces/IUpdateData'
declare const window

export const locationChanged = (data:IUpdateData) : LocationAction => ({
  type: LOCATION_CHANGED,
  ...data
})

//const locTrigger = (dispatch, e) => dispatch(locationChanged(e.detail.location))

export const listenToLocation = () : (d:Dispatch<LocationState>) => void => {
  return (dispatch) => {
    addChangeListener((data:IUpdateData) => dispatch(locationChanged(data)))
  }
}

export const unlistenToLocation = () : (d:Dispatch<LocationState>) => void => {
  return (dispatch) => {
    // ???
  }
}

export const addTitle = (title:LocationTitle) : AddTitleAction => ({
  type: ADD_LOCATION_TITLE,
  ...title
})
