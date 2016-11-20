import { switchTab } from '../../src/behaviors/defaultTabBehavior';

describe('default tab behavior', () => {
  it('behaves like it should', () => {
    expect(switchTab({
      browserHistory: { back: [], current: '/a', forward: [] },
      tabHistories: [
        { back: [], current: '/a', forward: [] },
        { back: [], current: '/b', forward: [] }
      ],
      fromIndex: 0,
      toIndex: 1
    })).toEqual({ back: ['/a'], current: '/b', forward: [] });

    expect(switchTab({
      browserHistory: { back: ['/a'], current: '/a/1', forward: ['/a/2'] },
      tabHistories: [
        { back: ['/a'], current: '/a/1', forward: ['/a/2'] },
        { back: [], current: '/b', forward: ['/b/1'] },
      ],
      fromIndex: 0,
      toIndex: 1
    })).toEqual({ back: ['/a', '/a/1'], current: '/b', forward: ['/b/1'] });

    expect(switchTab({
      browserHistory: { back: ['/a'], current: '/b', forward: [] },
      tabHistories: [
        { back: [], current: '/a', forward: [] },
        { back: [], current: '/b', forward: [] }
      ],
      fromIndex: 1,
      toIndex: 0
    })).toEqual({ back: [], current: '/a', forward: [] });

    expect(switchTab({
      browserHistory: { back: [], current: '/b', forward: [] },
      tabHistories: [
        { back: ['/a'], current: '/a/1', forward: ['/a/2'] },
        { back: [], current: '/b', forward: [] },
      ],
      fromIndex: 1,
      toIndex: 0
    })).toEqual({ back: ['/a'], current: '/a/1', forward: ['/a/2'] });

    expect(switchTab({
      browserHistory: { back: ['/a'], current: '/b', forward: [] },
      tabHistories: [
        { back: [], current: '/a', forward: [] },
        { back: [], current: '/b', forward: [] },
        { back: [], current: '/c', forward: [] }
      ],
      fromIndex: 1,
      toIndex: 2
    })).toEqual({ back: ['/a'], current: '/c', forward: [] });

    expect(switchTab({
      browserHistory: { back: ['/a', '/a/1'], current: '/b', forward: [] },
      tabHistories: [
        { back: ['/a'], current: '/a/1', forward: ['/a/2'] },
        { back: [], current: '/b', forward: [] },
        { back: [], current: '/c', forward: [] }
      ],
      fromIndex: 1,
      toIndex: 2
    })).toEqual({ back: ['/a', '/a/1'], current: '/c', forward: [] });
  });
});