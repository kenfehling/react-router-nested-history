import { switchToTab } from '../../src/behaviors/defaultTabBehavior';

describe('default tab behavior', () => {
  it('behaves like it should', () => {
    expect(switchToTab({
      historyState: {
        browserHistory: {
          back: [],
          current: {url: '/a', tab: 0},
          forward: []
        },
        tabHistories: [
          {back: [], current: '/a', forward: []},
          {back: [], current: '/b', forward: []}
        ]
      },
      tab: 1
    }).browserHistory).toEqual({
      back: [{url: '/a', tab: 0}],
      current: {url: '/b', tab: 1},
      forward: []
    });

    expect(switchToTab({
      historyState: {
        browserHistory: {
          back: [{url: '/a', tab: 0}],
          current: {url: '/a/1', tab: 0},
          forward: [{url: '/a/2', tab: 0}]
        },
        tabHistories: [
          {back: ['/a'], current: '/a/1', forward: ['/a/2']},
          {back: [], current: '/b', forward: ['/b/1']},
        ]
      },
      tab: 1
    }).browserHistory).toEqual({
      back: [{url: '/a', tab: 0}, {url: '/a/1', tab: 0}],
      current: {url: '/b', tab: 1},
      forward: [{url: '/b/1', tab: 1}]
    });

    expect(switchToTab({
      historyState: {
        browserHistory: {
          back: [{url: '/a', tab: 0}],
          current: {url: '/b', tab: 1},
          forward: []
        },
        tabHistories: [
          {back: [], current: '/a', forward: []},
          {back: [], current: '/b', forward: []}
        ]
      },
      tab: 0
    }).browserHistory).toEqual({
      back: [],
      current: {url: '/a', tab: 0},
      forward: []
    });

    expect(switchToTab({
      historyState: {
        browserHistory: {
          back: [],
          current: {url: '/b', tab: 1},
          forward: []
        },
        tabHistories: [
          {back: ['/a'], current: '/a/1', forward: ['/a/2']},
          {back: [], current: '/b', forward: []},
        ],
      },
      tab: 0
    }).browserHistory).toEqual({
      back: [{url: '/a', tab: 0}],
      current: {url: '/a/1', tab: 0},
      forward: [{url: '/a/2', tab: 0}]
    });

    expect(switchToTab({
      historyState: {
        browserHistory: {
          back: [{url: '/a', tab: 0}],
          current: {url: '/b', tab: 1},
          forward: []
        },
        tabHistories: [
          {back: [], current: '/a', forward: []},
          {back: [], current: '/b', forward: []},
          {back: [], current: '/c', forward: []}
        ]
      },
      tab: 2
    }).browserHistory).toEqual({
      back: [{url: '/a', tab: 0}],
      current: {url: '/c', tab: 2},
      forward: []
    });

    expect(switchToTab({
      historyState: {
        browserHistory: {
          back: [{url: '/a', tab: 0}, {url: '/a/1', tab: 0}],
          current: {url: '/b', tab: 1},
          forward: []
        },
        tabHistories: [
          {back: ['/a'], current: '/a/1', forward: ['/a/2']},
          {back: [], current: '/b', forward: []},
          {back: [], current: '/c', forward: []}
        ]
      },
      tab: 2
    }).browserHistory).toEqual({
      back: [{url: '/a', tab: 0}, {url: '/a/1', tab: 0}],
      current: {url: '/c', tab: 2},
      forward: []
    });
  });
});