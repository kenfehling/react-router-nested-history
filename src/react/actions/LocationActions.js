import { LOCATION_CHANGED } from '../constants/ActionTypes'

const locationChanged = (event) => ({
  type: LOCATION_CHANGED,
  location: event.detail.location
})

export const listenToLocation = () => {
  return (dispatch) =>
    window.addEventListener('locationChange', event => dispatch(locationChanged(event)))
}