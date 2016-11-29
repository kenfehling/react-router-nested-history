// @flow

export type Page = {
  url: string,
  id: number,
  tab: Container
}

export type History ={
  back: Page[],
  current: Page,
  forward: Page[]
}

export type ContainerConfig = {
  initialUrl: string,
  urlPatterns: string[],
  isDefault: boolean,
  group: number
}

export type Container = {
  initialUrl: string,
  urlPatterns: string[],
  isDefault: boolean,
  group: number,
  history: History
}

export type State = {
  browserHistory: History,
  containers: Container[],
  currentContainer: ?Container,
  lastId: number
}

