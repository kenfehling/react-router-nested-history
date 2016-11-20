import { switchTab, push, pop } from '../src/main';
import { getState, setState, clearState } from '../src/historyStore';

describe('main', () => {

  beforeEach(() => {
    setState({
      browserHistory: {back: ['/a'], current: '/a/1', forward: []},
      currentTab: 0,
      tabHistories: [
        {back: ['/a'], current: '/a/1', forward: []},
        {back: [], current: '/b', forward: []}
      ]
    });
  });

  afterEach(() => {
    clearState();
  });

  it('switches tab', () => {
    switchTab(0, 1);
    expect(getState()).toEqual({
      browserHistory: {back: ['/a', '/a/1'], current: '/b', forward: []},
      currentTab: 1,
      tabHistories: [
        {back: ['/a'], current: '/a/1', forward: []},
        {back: [], current: '/b', forward: []}
      ]
    });
  });

  it('pushes page', () => {
    push('/a/2');
    expect(getState()).toEqual({
      browserHistory: {back: ['/a', '/a/1'], current: '/a/2', forward: []},
      currentTab: 0,
      tabHistories: [
        {back: ['/a', '/a/1'], current: '/a/2', forward: []},
        {back: [], current: '/b', forward: []}
      ]
    });
  });

  it('pops page', () => {
    pop();
    expect(getState()).toEqual({
      browserHistory: {back: [], current: '/a', forward: ['/a/1']},
      currentTab: 0,
      tabHistories: [
        {back: [], current: '/a', forward: ['/a/1']},
        {back: [], current: '/b', forward: []}
      ]
    });
  });
});