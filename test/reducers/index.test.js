import reducer from '../../src/reducers/index';
import { SWITCH_TO_TAB, PUSH, BACK, FORWARD, GO } from "../../src/constants/ActionTypes";

describe('main', () => {
  const state = {
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
  };

  it('switches tab', () => {
    expect(reducer(state, {type: SWITCH_TO_TAB, tab: 2})).toEqual({
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
    expect(reducer(state, {type: PUSH, url: '/b/2'})).toEqual({
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
    expect(reducer(state, {type: BACK})).toEqual({
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
    expect(reducer(state, {type: FORWARD})).toEqual({
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