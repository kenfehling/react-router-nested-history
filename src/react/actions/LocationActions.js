import { LOCATION_CHANGED } from '../constants/ActionTypes'

export const locationChanged = (location) => ({
  type: LOCATION_CHANGED,
  location
})

export const listenToLocation = () => {
  return (dispatch) =>
    window.addEventListener('locationChange',
        event => dispatch(locationChanged(event.detail.location)))
}