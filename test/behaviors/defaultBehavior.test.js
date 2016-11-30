import { switchToContainer } from '../../src/behaviors/defaultBehavior';

describe('default container behavior', () => {
  it('behaves like it should', () => {
    expect(switchToContainer({
      historyState: {
        browserHistory: {
          back: [],
          current: {url: '/a', container: 0},
          forward: []
        },
        containerHistories: [
          {
            back: [],
            current: {url: '/a', container: 0},
            forward: []
          }, {
            back: [],
            current: {url: '/b', container: 1},
            forward: []
          }
        ]
      },
      container: {index: 1}
    }).browserHistory).toEqual({
      back: [{url: '/a', container: 0}],
      current: {url: '/b', container: 1},
      forward: []
    });

    expect(switchToContainer({
      historyState: {
        browserHistory: {
          back: [{url: '/a', container: 0}],
          current: {url: '/a/1', container: 0},
          forward: [{url: '/a/2', container: 0}]
        },
        containerHistories: [
          {
            back: [{url: '/a', container: 0}],
            current: {url: '/a/1', container: 0},
            forward: [{url: '/a/2', container: 0}]
          }, {
            back: [],
            current: {url: '/b', container: 1},
            forward: [{url: '/b/1', container: 1}]
          }
        ]
      },
      container: {index: 1}
    }).browserHistory).toEqual({
      back: [{url: '/a', container: 0}, {url: '/a/1', container: 0}],
      current: {url: '/b', container: 1},
      forward: [{url: '/b/1', container: 1}]
    });

    expect(switchToContainer({
      historyState: {
        browserHistory: {
          back: [{url: '/a', container: 0}],
          current: {url: '/b', container: 1},
          forward: []
        },
        containerHistories: [
          {
            back: [],
            current: {url: '/a', container: 0},
            forward: []
          }, {
            back: [],
            current: {url: '/b', container: 1},
            forward: []
          }
        ]
      },
      container: {index: 0}
    }).browserHistory).toEqual({
      back: [],
      current: {url: '/a', container: 0},
      forward: []
    });

    expect(switchToContainer({
      historyState: {
        browserHistory: {
          back: [],
          current: {url: '/b', container: 1},
          forward: []
        },
        containerHistories: [
          {
            back: [{url: '/a', container: 0}],
            current: {url: '/a/1', container: 0},
            forward: [{url: '/a/2', container: 0}]
          }, {
            back: [],
            current: {url: '/b', container: 1},
            forward: []
          },
        ],
      },
      container: {index: 0}
    }).browserHistory).toEqual({
      back: [{url: '/a', container: 0}],
      current: {url: '/a/1', container: 0},
      forward: [{url: '/a/2', container: 0}]
    });

    expect(switchToContainer({
      historyState: {
        browserHistory: {
          back: [{url: '/a', container: 0}],
          current: {url: '/b', container: 1},
          forward: []
        },
        containerHistories: [
          {
            back: [],
            current: {url: '/a', container: 0},
            forward: []
          }, {
            back: [],
            current: {url: '/b', container: 1},
            forward: []
          }, {
            back: [],
            current: {url: '/c', container: 2},
            forward: []
          }
        ]
      },
      container: {index: 2}
    }).browserHistory).toEqual({
      back: [{url: '/a', container: 0}],
      current: {url: '/c', container: 2},
      forward: []
    });

    expect(switchToContainer({
      historyState: {
        browserHistory: {
          back: [{url: '/a', container: 0}, {url: '/a/1', container: 0}],
          current: {url: '/b', container: 1},
          forward: []
        },
        containerHistories: [
          {
            back: [{url: '/a', container: 0}],
            current: {url: '/a/1', container: 0},
            forward: [{url: '/a/2', container: 0}]
          }, {
            back: [],
            current: {url: '/b', container: 1},
            forward: []
          }, {
            back: [],
            current: {url: '/c', container: 2},
            forward: []
          }
        ]
      },
      container: {index: 2}
    }).browserHistory).toEqual({
      back: [{url: '/a', container: 0}, {url: '/a/1', container: 0}],
      current: {url: '/c', container: 2},
      forward: []
    });
  });
});