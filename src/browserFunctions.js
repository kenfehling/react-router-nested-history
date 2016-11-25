import createBrowserHistory from 'history/createBrowserHistory';

let history = createBrowserHistory();

export function push({url, id}) {
  history.push(url, {id});
}

export function replace({url, id}) {
  history.replace(url, {id});
}

export const go = (n) => history.go(n);
export const back = (n=1) => go(0 - n);
export const forward = (n=1) => go(n);