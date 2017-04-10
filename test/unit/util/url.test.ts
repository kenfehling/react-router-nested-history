import * as utils from '../../../src/util/url'
import {expect} from 'chai'
declare const describe:any
declare const it:any

describe('url utils', () => {
  it('knows if paths match', () => {
    const f = utils.patternMatches
    expect(f('/a', '/b')).to.equal(false)
    expect(f('/a/1', '/a/2')).to.equal(false)
    expect(f('/a/:id', '/a')).to.equal(false)
    expect(f('/a/:id', '/a/1')).to.equal(true)
  })

  describe('patternsMatch', () => {
    const patterns = ['/a', '/a/:id']
    const f = url => utils.patternsMatch(patterns, url)
    it('returns true if one of the patterns match', () => {
      expect(f('/a')).to.equal(true)
      expect(f('/a/1')).to.equal(true)
    })

    it('returns false if none of the patterns match', () => {
      expect(f('/a/1/1')).to.equal(false)
      expect(f('/c')).to.equal(false)
    })
  })

  it('parses params from patterns', () => {
    const f = utils.parseParamsFromPatterns
    const patterns = ['/a', '/a/:id', '/a/:id/:name']
    expect(f(patterns, '/a/1/cat')).to.deep.equal({id: '1', name: 'cat'})
  })

  it('parses params from patterns with regex', () => {
    const f = utils.parseParamsFromPatterns
    const patterns = ['/a', '/a/:category(cat)', '/a/:category(cat)/:tool']
    expect(f(patterns, '/a/cat')).to.deep.equal({category: 'cat'})
  })

})