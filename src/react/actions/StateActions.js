import type { State } from '../../types';
import { SET_STATE, LOCATION_CHANGED } from '../constants/ActionTypes';

export const setState = (state:State) => ({
  type: SET_STATE,
  state
});

const locationChanged = (event) => ({
  type: LOCATION_CHANGED,
  location: event.detail.location
});

export const listenToLocation = () => {
  return (dispatch) =>
    window.addEventListener('locationChange', event => dispatch(locationChanged(event)));
};