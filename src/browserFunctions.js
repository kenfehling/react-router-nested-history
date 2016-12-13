// @flow
/* globals PopStateEvent, dispatchEvent */
declare var PopStateEvent:any;
declare var dispatchEvent:Function;

import createBrowserHistory from 'history/createBrowserHistory';
import type { Page } from './types';

let history = createBrowserHistory();

export const push = (page:Page, real:boolean=false) => {
  const state = {id: page.id, real};
  history.push(page.url, state);

  /*
  // TODO: With react-router 4.0.0-alpha.6 we should be able to get rid of this
  const popStateEvent = new PopStateEvent('popstate', {state: {state}});
  dispatchEvent(popStateEvent);
  */
};

export const replace = (page: Page) => history.replace(page.url, {id: page.id});
export const go = (n:number) => history.go(n);
export const back = (n:number=1) => go(0 - n);
export const forward = (n:number=1) => go(n);