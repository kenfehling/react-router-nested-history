import { switchToTab, push, back, forward } from '../src/main';
import { getState, setState, clearState } from '../src/historyStore';

describe('main', () => {

  beforeEach(() => {
    setState({
      browserHistory: {
        back: [{url: '/a', tab: 0, id: 1}, {url: '/a/1', tab: 0, id: 4}],
        current: {url: '/b', tab: 1, id: 2},
        forward: [{url: '/b/1', tab: 1, id: 5}]
      },
      currentTab: 1,
      lastId: 5,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0, id: 1}],
          current: {url: '/a/1', tab: 0, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/b', tab: 1, id: 2},
          forward: [{url: '/b/1', tab: 1, id: 5}]
        }, {
          back: [],
          current: {url: '/c', tab: 2, id: 3},
          forward: []
        },
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
        back: [{url: '/a', tab: 0, id: 1}, {url: '/a/1', tab: 0, id: 4}],
        current: {url: '/c', tab: 2, id: 3},
        forward: []
      },
      currentTab: 2,
      lastId: 5,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0, id: 1}],
          current: {url: '/a/1', tab: 0, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/b', tab: 1, id: 2},
          forward: [{url: '/b/1', tab: 1, id: 5}]
        }, {
          back: [],
          current: {url: '/c', tab: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('pushes page', () => {
    push('/b/2');
    expect(getState()).toEqual({
      browserHistory: {
        back: [
          {url: '/a', tab: 0, id: 1},
          {url: '/a/1', tab: 0, id: 4},
          {url: '/b', tab: 1, id: 2}
        ],
        current: {url: '/b/2', tab: 1, id: 6},
        forward: []
      },
      currentTab: 1,
      lastId: 6,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0, id: 1}],
          current: {url: '/a/1', tab: 0, id: 4},
          forward: []
        }, {
          back: [{url: '/b', tab: 1, id: 2}],
          current: {url: '/b/2', tab: 1, id: 6},
          forward: []
        }, {
          back: [],
          current: {url: '/c', tab: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('goes back in history', () => {
    back();
    expect(getState()).toEqual({
      browserHistory: {
        back: [{url: '/a', tab: 0, id: 1}],
        current: {url: '/a/1', tab: 0, id: 4},
        forward: [{url: '/b', tab: 1, id: 2}, {url: '/b/1', tab: 1, id: 5}]
      },
      currentTab: 0,
      lastId: 5,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0, id: 1}],
          current: {url: '/a/1', tab: 0, id: 4},
          forward: []
        }, {
          back: [],
          current: {url: '/b', tab: 1, id: 2},
          forward: [{url: '/b/1', tab: 1, id: 5}]
        }, {
          back: [],
          current: {url: '/c', tab: 2, id: 3},
          forward: []
        }
      ]
    });
  });

  it('goes forward in history', () => {
    forward();
    expect(getState()).toEqual({
      browserHistory: {
        back: [
          {url: '/a', tab: 0, id: 1},
          {url: '/a/1', tab: 0, id: 4},
          {url: '/b', tab: 1, id: 2}
        ],
        current: {url: '/b/1', tab: 1, id: 5},
        forward: []
      },
      currentTab: 1,
      lastId: 5,
      tabHistories: [
        {
          back: [{url: '/a', tab: 0, id: 1}],
          current: {url: '/a/1', tab: 0, id: 4},
          forward: []
        }, {
          back: [{url: '/b', tab: 1, id: 2}],
          current: {url: '/b/1', tab: 1, id: 5},
          forward: []
        }, {
          back: [],
          current: {url: '/c', tab: 2, id: 3},
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