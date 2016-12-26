// @flow

export interface Action {
  type: string,
  time: Date,
  data: any
}

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

interface BaseState {
  groups: Group[],
  lastPageId: number
}

export type UninitialzedState = BaseState

export type InitializedState = {
  browserHistory: History,
  lastUpdate: Date,
  activeGroupIndex: number
} & BaseState

export type State = InitializedState | UninitialzedState

export interface Step {
  fn: Function,
  args: any[]
}