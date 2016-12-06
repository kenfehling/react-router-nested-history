// @flow
import createBrowserHistory from 'history/createBrowserHistory';
import type { Page } from './types';

let history = createBrowserHistory();

export const push = (page:Page) => {
  const state = {id: page.id};
  history.push(page.url, state);
  const popStateEvent = new PopStateEvent('popstate', {state});
  dispatchEvent(popStateEvent);
};

export const replace = (page: Page) => history.replace(page.url, {id: page.id});
export const go = (n:number) => history.go(n);
export const back = (n:number=1) => go(0 - n);
export const forward = (n:number=1) => go(n);