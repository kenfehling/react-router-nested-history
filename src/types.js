// @flow

export interface IncomingPage {
  url: string;
  id: number;
}

export interface Page extends IncomingPage {
  containerIndex: number;
}

export interface History {
  back: Page[];
  current: Page;
  forward: Page[];
}

export interface ContainerConfig {
  initialUrl: string;
  urlPatterns: string[];
}

export interface Container {
  index: number;
  initialUrl: string;
  urlPatterns: string[];
  isDefault: boolean;
  history: History;
  groupIndex: number;
}

export interface Group {
  index: number,
  containers: Container[],
  history: History
}

export interface State {
  groups: Group[];
  activeGroupIndex: number;
  lastId: number;
}

export interface StateSnapshot extends State {
  previousState: State,
  lastAction: Object
}

export interface Step {
  fn: Function,
  args: any[]
}

/*
export interface Behavior {
  switchToContainer(state: State, tab: Container) : State
}
*

/*
export const defaultHistory : History = {
  back: [],
  current: null,
  forward: []
};

export const defaultContainer : Container = {
  initialUrl: '/',
  urlPatterns: ['*'],
  isDefault: true,
  group: 0,
  history: defaultHistory
};

export const defaultPage : Page = new Page({
  url: '/',
  id: 0,
  container: defaultContainer
});

export const defaultState : State = {
  browserHistory: defaultHistory,
  containers: [],
  lastId: 1
};
*/