

export function pushState({url, tab, id}) {
  history.pushState({id}, "Title", url);
}

export const go = (n) => history.go(n);
export const back = (n=1) => go(0 - n);
export const forward = (n=1) => go(n);