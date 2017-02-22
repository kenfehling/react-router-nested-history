import {LOCATION_CHANGED, ADD_LOCATION_TITLE} from '../constants/ActionTypes'
import {Location} from 'history'
import {Dispatch} from 'react-redux';
import LocationState from '../model/LocationState'
import {LocationAction, AddTitleAction} from '../model/actions'
import LocationTitle from '../model/LocationTitle'
import {addChangeListener} from '../../main'
import IState from '../../model/IState'
declare const window

export const locationChanged = (pathname:string) : LocationAction => ({
  type: LOCATION_CHANGED,
  pathname
})

//const locTrigger = (dispatch, e) => dispatch(locationChanged(e.detail.location))

export const listenToLocation = () : (d:Dispatch<LocationState>) => void => {
  return (dispatch) => {
    addChangeListener((state:IState) => dispatch(locationChanged(state.activeUrl)))
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
