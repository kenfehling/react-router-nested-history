import * as actions from './actions/HistoryActions';
import { createStore } from 'redux';
import reducer from './reducers';

// TODO: This needs to be the same store always. Use the '../store' pattern?
const store = createStore(reducer);

export const switchToTab = (tab) => store.dispatch(actions.switchToTab(tab));
export const push = (url) => store.dispatch(actions.push(url));
export const go = (n=1) => store.dispatch(actions.go(n));
export const back = (n=1) => store.dispatch(actions.back(n));
export const forward = (n=1) => store.dispatch(actions.forward(n));