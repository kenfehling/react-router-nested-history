// @flow

import * as _ from 'lodash';
import store from './store';

export interface Page {
  url: string;
  id: number;
  container: Container;

  /*
  constructor(page: Page) {
    this.url = page.url;
    this.id = page.id;
    this.container = defaultContainer;
  }

  get container() : Container {
    const state = store.getState();
    return _.find(state.containers, c => c.history.current === this);
  }
  */
}

export interface History {
  back: Page[];
  current: Page;
  forward: Page[];
}

export interface ContainerConfig {
  initialUrl: string;
  urlPatterns: string[];
  isDefault: boolean;
  group: number;
}

export interface Container {
  initialUrl: string;
  urlPatterns: string[];
  isDefault: boolean;
  group: number;
  history: History;
}

export interface State {
  browserHistory: History;
  containers: Container[];
  currentContainer: Container;
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
  currentContainer: defaultContainer,
  lastId: 1
};
*/