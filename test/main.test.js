import { switchTab, pushPage } from '../src/main';
import { getState, setState, clearState } from '../src/historyStore';

describe('main', () => {

  afterEach(() => {
    clearState();
  });

  it('switches tab', () => {
    setState({
      browserHistory: {back: [], current: '/a', forward: []},
      currentTab: 0,
      tabHistories: [
        {back: [], current: '/a', forward: []},
        {back: [], current: '/b', forward: []}
      ]
    });
    switchTab(0, 1);
    expect(getState()).toEqual({
      browserHistory: {back: ['/a'], current: '/b', forward: []},
      currentTab: 1,
      tabHistories: [
        {back: [], current: '/a', forward: []},
        {back: [], current: '/b', forward: []}
      ]
    });
  });

  it('pushes page', () => {
    setState({
      browserHistory: {back: [], current: '/a', forward: []},
      currentTab: 0,
      tabHistories: [
        {back: [], current: '/a', forward: []},
        {back: [], current: '/b', forward: []}
      ]
    });
    pushPage('/a/1');
    expect(getState()).toEqual({
      browserHistory: {back: ['/a'], current: '/a/1', forward: []},
      currentTab: 0,
      tabHistories: [
        {back: ['/a'], current: '/a/1', forward: []},
        {back: [], current: '/b', forward: []}
      ]
    });
  });

});