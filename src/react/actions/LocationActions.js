import { LOCATION_CHANGED } from '../constants/ActionTypes'

export const locationChanged = (location) => ({
  type: LOCATION_CHANGED,
  location
})

const locTrigger = (dispatch, e) => dispatch(locationChanged(e.detail.location))

export const listenToLocation = () => {
  return (dispatch) =>
    window.addEventListener('locationChange', locTrigger.bind({}, dispatch))
}

export const unlistenToLocation = () => {
  return (dispatch) =>
    window.removeEventListener('locationChange', locTrigger.bind({}, dispatch))
}