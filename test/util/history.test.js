import * as util from '../../src/util/history';
import { pushState, back, forward, go } from '../../src/browserFunctions';

describe('history utils', () => {

  it('diffs old state and new state for push', () => {
    const a = {url: '/a', tab: 0, id: 1};
    const b = {url: '/b', tab: 1, id: 2};
    const oldState = {browserHistory: {back: [], current: a, forward: []}};
    const newState = {browserHistory: {back: [a], current: b, forward: []}};
    const steps = util.diffState(oldState, newState);
    expect(steps).toEqual([{fn: pushState, args: [b]}]);
  });

  it('diffs old state and new state for back', () => {
    const a = {url: '/a', tab: 0, id: 1};
    const b = {url: '/b', tab: 1, id: 2};
    const oldState = {browserHistory: {back: [a], current: b, forward: []}};
    const newState = {browserHistory: {back: [], current: a, forward: [b]}};
    const steps = util.diffState(oldState, newState);
    expect(steps).toEqual([{fn: back}]);
  });

  it('diffs old state and new state forward', () => {
    const a = {url: '/a', tab: 0, id: 1};
    const b = {url: '/b', tab: 1, id: 2};
    const oldState = {browserHistory: {back: [], current: a, forward: [b]}};
    const newState = {browserHistory: {back: [a], current: b, forward: []}};
    const steps = util.diffState(oldState, newState);
    expect(steps).toEqual([{fn: forward}]);
  });

});