// @flow

export interface Page {
  url: string;
  id: number;
}

export interface BrowserPage extends Page {
  container: Container;
}

export interface History<P:Page> {
  back: P[];
  current: P;
  forward: P[];
}

export interface ContainerHistory extends History<Page> {}
export interface BrowserHistory extends History<BrowserPage> {}

export interface ContainerConfig {
  initialUrl: string;
  urlPatterns: string[];
}

export interface Container {
  initialUrl: string;
  urlPatterns: string[];
  isDefault: boolean;
  group: number;
  history: ContainerHistory;
}

export interface State {
  browserHistory: BrowserHistory;
  containers: Container[];
  lastId: number;
  lastGroup: number;
}

export interface StateSnapshot extends State {
  previousState: State,
  lastAction: Object
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