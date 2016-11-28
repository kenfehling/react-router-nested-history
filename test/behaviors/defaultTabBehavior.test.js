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
          {
            back: [],
            current: {url: '/a', tab: 0},
            forward: []
          }, {
            back: [],
            current: {url: '/b', tab: 1},
            forward: []
          }
        ]
      },
      tab: {index: 1}
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
          {
            back: [{url: '/a', tab: 0}],
            current: {url: '/a/1', tab: 0},
            forward: [{url: '/a/2', tab: 0}]
          }, {
            back: [],
            current: {url: '/b', tab: 1},
            forward: [{url: '/b/1', tab: 1}]
          }
        ]
      },
      tab: {index: 1}
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
          {
            back: [],
            current: {url: '/a', tab: 0},
            forward: []
          }, {
            back: [],
            current: {url: '/b', tab: 1},
            forward: []
          }
        ]
      },
      tab: {index: 0}
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
          {
            back: [{url: '/a', tab: 0}],
            current: {url: '/a/1', tab: 0},
            forward: [{url: '/a/2', tab: 0}]
          }, {
            back: [],
            current: {url: '/b', tab: 1},
            forward: []
          },
        ],
      },
      tab: {index: 0}
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
          {
            back: [],
            current: {url: '/a', tab: 0},
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
      },
      tab: {index: 2}
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
          {
            back: [{url: '/a', tab: 0}],
            current: {url: '/a/1', tab: 0},
            forward: [{url: '/a/2', tab: 0}]
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
      },
      tab: {index: 2}
    }).browserHistory).toEqual({
      back: [{url: '/a', tab: 0}, {url: '/a/1', tab: 0}],
      current: {url: '/c', tab: 2},
      forward: []
    });
  });
});