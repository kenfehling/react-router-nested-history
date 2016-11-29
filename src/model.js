// @flow

export type Page = {
  url: string,
  id: number,
  container: Container
}

export type History = {
  back: Page[],
  current: Page,
  forward: Page[]
}

export type ContainerConfig = {
  initialUrl: string,
  urlPatterns: string[],
  isdefault: boolean,
  group: number
}

export type Container = {
  initialUrl: string,
  urlPatterns: string[],
  isdefault: boolean,
  group: number,
  history: History
}

export type State = {
  browserHistory: History,
  containers: Container[],
  currentContainer: Container,
  lastId: number
}

export const defaultHistory : History = {
  back: [],
  current: defaultPage,
  forward: []
};

export const defaultContainer : Container = {
  initialUrl: '/',
  urlPatterns: '*',
  isdefault: true,
  group: 0,
  history: defaultHistory
};

export const defaultPage : Page = {
  url: '/',
  id: 0,
  container: defaultContainer
};

export const defaultState : State = {
  browserHistory: defaultHistory,
  containers: [],
  currentContainer: defaultContainer,
  lastId: 1
};