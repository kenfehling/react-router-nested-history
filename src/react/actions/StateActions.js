import type { State } from '../../types';
import { SET_STATE } from '../constants/ActionTypes';

export const setState = (state:State) => ({
  type: SET_STATE,
  state
});