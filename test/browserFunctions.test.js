// @flow
/* globals describe, it, expect */
declare var describe:any
declare var it:any
declare var expect:any
import { push, back, forward, go, _history } from '../src/browserFunctions'

describe('browserFunctions', () => {
  it('uses memoryHistory for tests', () => {
    push({url: '/a', id: 1})
    push({url: '/b', id: 2})
    expect(_history.index).toBe(2)
    expect(_history.entries.length).toBe(3)
    back()
    expect(_history.index).toBe(1)
    expect(_history.entries.length).toBe(3)
  })
});