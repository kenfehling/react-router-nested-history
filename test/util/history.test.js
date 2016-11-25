import * as util from '../../src/util/history';
import { push, go } from '../../src/browserFunctions';

describe('history utils', () => {
  const a = {url: '/a', tab: 0, id: 1};
  const b = {url: '/b', tab: 1, id: 2};
  const a1 = {url: '/a/1', tab: 0, id: 3};

  it('diffs old state and new state for push', () => {
    const oldState = {browserHistory: {back: [], current: a, forward: []}};
    const newState = {browserHistory: {back: [a], current: b, forward: []}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([{fn: push, args: [b]}]);
  });

  it('diffs old state and new state for back', () => {
    const oldState = {browserHistory: {back: [a], current: b, forward: []}};
    const newState = {browserHistory: {back: [], current: a, forward: [b]}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([{fn: go, args: [-1]}]);
  });

  it('diffs old state and new state for forward', () => {
    const oldState = {browserHistory: {back: [], current: a, forward: [b]}};
    const newState = {browserHistory: {back: [a], current: b, forward: []}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([{fn: go, args: [1]}]);
  });

  it('diffs old state and new state for back(n)', () => {
    const oldState = {browserHistory: {back: [a, a1], current: b, forward: []}};
    const newState = {browserHistory: {back: [], current: a, forward: [a1, b]}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([{fn: go, args: [-2]}]);
  });

  it('diffs old state and new state for forward(n)', () => {
    const oldState = {browserHistory: {back: [], current: a, forward: [a1, b]}};
    const newState = {browserHistory: {back: [a, a1], current: b, forward: []}};
    const steps = util.diffStateForSteps(oldState, newState);
    expect(steps).toEqual([{fn: go, args: [2]}]);
  });

});