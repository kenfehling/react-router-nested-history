import type { State } from '../../types';
import { SET_STATE } from '../constants/ActionTypes';

const initialState:?State = null;

export default function(state:?State=initialState, action) {
  switch (action.type) {
    case SET_STATE: return action.state;
  }
  return state;
}