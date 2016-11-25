import * as util from '../../src/util/history';
import { push, back, forward, go } from '../../src/browserFunctions';

describe('history utils', () => {
  const a = {url: '/a', tab: 0, id: 1};
  const b = {url: '/b', tab: 1, id: 2};
  const a1 = {url: '/a/1', tab: 0, id: 3};

  it('diffs old state and new state for push', () => {
    const oldState = {browserHistory: {back: [], current: a, forward: []}};
    const newState = {browserHistory: {back: [a], current: b, forward: []}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: push, args: [a]},
      {fn: push, args: [b]}
    ]);
  });

  it('diffs old state and new state for back', () => {
    const oldState = {browserHistory: {back: [a], current: b, forward: []}};
    const newState = {browserHistory: {back: [], current: a, forward: [b]}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: back, args: [1]},
      {fn: push, args: [a]},
      {fn: push, args: [b]},
      {fn: back, args: [1]}
    ]);
  });

  it('diffs old state and new state for forward', () => {
    const oldState = {browserHistory: {back: [], current: a, forward: [b]}};
    const newState = {browserHistory: {back: [a], current: b, forward: []}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: push, args: [a]},
      {fn: push, args: [b]}
    ]);
  });

  it('diffs old state and new state for back(n)', () => {
    const oldState = {browserHistory: {back: [a, a1], current: b, forward: []}};
    const newState = {browserHistory: {back: [], current: a, forward: [a1, b]}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: back, args: [2]},
      {fn: push, args: [a]},
      {fn: push, args: [a1]},
      {fn: push, args: [b]},
      {fn: back, args: [2]}
    ]);
  });

  it('diffs old state and new state for forward(n)', () => {
    const oldState = {browserHistory: {back: [], current: a, forward: [a1, b]}};
    const newState = {browserHistory: {back: [a, a1], current: b, forward: []}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: push, args: [a]},
      {fn: push, args: [a1]},
      {fn: push, args: [b]}
    ]);
  });

  it('constructs new browser history for back(n)', () => {
    const oldHistory = {back: [a, a1], current: b, forward: []};
    const newHistory = {back: [], current: a, forward: [a1, b]};
    expect(util.constructNewBrowserHistory(oldHistory, a)).toEqual(newHistory);
  });

  it('constructs new browser history for forward(n)', () => {
    const oldHistory = {back: [], current: a, forward: [a1, b]};
    const newHistory = {back: [a, a1], current: b, forward: []};
    expect(util.constructNewBrowserHistory(oldHistory, b)).toEqual(newHistory);
  });

  it('constructs new browser history for switchToTab(0)', () => {
    const oldHistory = {back: [a], current: b, forward: []};
    const newHistory = {back: [], current: a, forward: [a1]};
    expect(util.constructNewBrowserHistory(oldHistory, a)).toEqual(newHistory);
  });

  it('constructs new browser history for switchToTab(1)', () => {
    const oldHistory = {back: [], current: a, forward: [a1]};
    const newHistory = {back: [a], current: b, forward: []};
    expect(util.constructNewBrowserHistory(oldHistory, b)).toEqual(newHistory);
  });

});