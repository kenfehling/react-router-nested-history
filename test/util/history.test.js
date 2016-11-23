import * as util from '../../src/util/history';
import { pushState } from '../../src/browserFunctions';

describe('history utils', () => {

  it('diffs old state and new state', () => {
    const oldState = {
      browserHistory: {
        back: [],
        current: {url: '/a', tab: 0},
        forward: []
      }
    };
    const newState = {
      browserHistory: {
        back: [{url: '/a', tab: 0}],
        current: {url: '/b', tab: 1},
        forward: []
      }
    };
    const steps = util.diffState(oldState, newState);
    expect(steps).toEqual([{fn: pushState, args: ['/b']}]);
  });

});