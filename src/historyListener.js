import createBrowserHistory from 'history/createBrowserHistory';

let history = createBrowserHistory();

export const setHistory = (h) => history = h;
export const listen = (fn) => history.listen(fn);
export const listenBefore = (fn) => history.listenBefore(fn);
export const push = (...args) => history.push(...args);
export const replace = (...args) => history.replace(...args);

export const listenPromise = () => new Promise(resolve => {
  const unListen = history.listen(location => {
    unListen();
    resolve(location);
  });
});