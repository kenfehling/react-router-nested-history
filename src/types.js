// @flow

export interface Page {
  url: string,
  id: number,
  containerIndex: number
}

export interface History {
  back: Page[],
  current: Page,
  forward: Page[]
}

export interface Container {
  index: number,
  initialUrl: string,
  urlPatterns: string[],
  isDefault: boolean,
  history: History,
  groupIndex: number
}

export interface Group {
  index: number,
  containers: Container[],
  history: History
}

export interface State {
  groups: Group[],
  activeGroupIndex: number,
  lastPageId: number,
  lastAction: Object
}

export interface Step {
  fn: Function,
  args: any[]
}