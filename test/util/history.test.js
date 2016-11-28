import * as util from '../../src/util/history';
import { push, back, forward, go } from '../../src/browserFunctions';

describe('history utils', () => {
  const a = {url: '/a', tab: 0, id: 1};
  const b = {url: '/b', tab: 1, id: 2};
  const a1 = {url: '/a/1', tab: 0, id: 3};

  it('diffs old state and new state for push', () => {
    const oldState = {browserHistory: {back: [], current: a, forward: []}};
    const newState = {browserHistory: {back: [a], current: b, forward: []}};
    const steps = util.diffStateToSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: push, args: [a]},
      {fn: push, args: [b]}
    ]);
  });

  it('diffs old state and new state for back', () => {
    const oldState = {browserHistory: {back: [a], current: b, forward: []}};
    const newState = {browserHistory: {back: [], current: a, forward: [b]}};
    const steps = util.diffStateToSteps(oldState, newState);
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
    const steps = util.diffStateToSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: push, args: [a]},
      {fn: push, args: [b]}
    ]);
  });

  it('diffs old state and new state for back(n)', () => {
    const oldState = {browserHistory: {back: [a, a1], current: b, forward: []}};
    const newState = {browserHistory: {back: [], current: a, forward: [a1, b]}};
    const steps = util.diffStateToSteps(oldState, newState);
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
    const steps = util.diffStateToSteps(oldState, newState);
    expect(steps).toEqual([
      {fn: push, args: [a]},
      {fn: push, args: [a1]},
      {fn: push, args: [b]}
    ]);
  });

  it('gets history shift amount', () => {
    const oldState = {browserHistory: {back: [a, a1], current: b, forward: []}};
    expect(util.getHistoryShiftAmount(oldState, 3)).toEqual(-1);
    expect(util.getHistoryShiftAmount(oldState, 1)).toEqual(-2);
  });

});