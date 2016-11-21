import { switchToTab, push, back, forward } from '../src/main';
import { getState, setState, clearState } from '../src/historyStore';

describe('main', () => {

  beforeEach(() => {
    setState({
      browserHistory: {
        back: [{url: '/a', tab: 0}, {url: '/a/1', tab: 0}],
        current: {url: '/b', tab: 1},
        forward: []
      },
      currentTab: 1,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0}],
          current: {url: '/a/1', tab: 0},
          forward: []
        }, {
          back: [],
          current: {url: '/b', tab: 1},
          forward: []
        }, {
          back: [],
          current: {url: '/c', tab: 2},
          forward: []
        }
      ]
    });
  });

  afterEach(() => {
    clearState();
  });

  it('switches tab', () => {
    switchToTab(2);
    expect(getState()).toEqual({
      browserHistory: {
        back: [{url: '/a', tab: 0}, {url: '/a/1', tab: 0}],
        current: {url: '/c', tab: 2},
        forward: []
      },
      currentTab: 2,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0}],
          current: {url: '/a/1', tab: 0},
          forward: []
        }, {
          back: [],
          current: {url: '/b', tab: 1},
          forward: []
        }, {
          back: [],
          current: {url: '/c', tab: 2},
          forward: []
        }
      ]
    });
  });

  it('pushes page', () => {
    push('/b/1');
    expect(getState()).toEqual({
      browserHistory: {
        back: [{url: '/a', tab: 0}, {url: '/a/1', tab: 0}, {url: '/b', tab: 1}],
        current: {url: '/b/1', tab: 1},
        forward: []
      },
      currentTab: 1,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0}],
          current: {url: '/a/1', tab: 0},
          forward: []
        }, {
          back: [{url: '/b', tab: 1}],
          current: {url: '/b/1', tab: 1},
          forward: []
        }, {
          back: [],
          current: {url: '/c', tab: 2},
          forward: []
        }
      ]
    });
  });

  it('goes back in history', () => {
    back();
    expect(getState()).toEqual({
      browserHistory: {
        back: [{url: '/a', tab: 0}],
        current: {url: '/a/1', tab: 0},
        forward: [{url: '/b', tab: 1}]
      },
      currentTab: 0,
      tabHistories: [
        {back: ['/a'], current: '/a/1', forward: []},
        {back: [], current: '/b', forward: []},
        {back: [], current: '/c', forward: []}
      ]
    });
  });

  it('goes forward in history', () => {
    forward();
    expect(getState()).toEqual({
      browserHistory: {
        back: [],
        current: {url: '/a', tab: 0},
        forward: [{url: '/a/1', tab: 0}]
      },
      currentTab: 0,
      tabHistories: [
        {
          back: [],
          current: {url: '/a', tab: 0},
          forward: [{url: '/a/1', tab: 0}]
        }, {
          back: [],
          current: {url: '/b', tab: 1},
          forward: []
        }, {
          back: [],
          current: {url: '/c', tab: 2},
          forward: []
        }
      ]
    });
  });

  it('goes back N pages in history', () => {

  });

  it('goes forward N pages in history', () => {

  });
});