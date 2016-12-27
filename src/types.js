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

export interface Step {
  fn: Function,
  args: any[]
}

export class State {
  groups: Group[];
  lastPageId: number;
  constructor({groups, lastPageId} : {groups:Group[]} & {lastPageId:number}) {
    this.groups = groups
    this.lastPageId = lastPageId
  }
}

export class UninitialzedState extends State {}

export class InitializedState extends State {
  browserHistory: History;
  lastUpdate: Date;
  activeGroupIndex: number;
  constructor({groups, lastPageId, browserHistory, lastUpdate, activeGroupIndex} :
      {groups:Group[]} & {lastPageId:number} & {browserHistory:History} &
          {lastUpdate:Date} & {activeGroupIndex:number}) {
    super({groups, lastPageId})
    this.browserHistory = browserHistory
    this.lastUpdate = lastUpdate
    this.activeGroupIndex = activeGroupIndex
  }
}
