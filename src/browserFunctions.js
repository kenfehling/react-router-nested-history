// @flow
import createBrowserHistory from 'history/createBrowserHistory';
import type { Page } from './types';

let history = createBrowserHistory();

export function push(page: Page) {

  console.log(page);

  history.push(page.url, {id: page.id});
}

export const replace = (page: Page) => history.replace(page.url, {id: page.id});
export const go = (n:number) => history.go(n);
export const back = (n:number=1) => go(0 - n);
export const forward = (n:number=1) => go(n);