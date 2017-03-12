import * as utils from '../../../src/util/url'
import {expect} from 'chai'
declare const describe:any
declare const it:any

describe('url utils', () => {
  it('get parent paths', () => {
    expect(utils.getParentPaths('/a/b/c')).to.deep.equal(['/a', '/a/b'])
  })

  it('knows if paths match', () => {
    const f = utils.patternMatches
    expect(f('/a', '/b')).to.be.false
    expect(f('/a/1', '/a/2')).to.be.false
    expect(f('/a/:id', '/a')).to.be.false
    expect(f('/a/:id', '/a/1')).to.be.true
  })

  it('adds a trailing slash if needed', () => {
    const f = utils.addTrailingSlash
    expect(f('')).to.equal('/')
    expect(f('/')).to.equal('/')
    expect(f('a')).to.equal('a/')
    expect(f('/a')).to.equal('/a/')
    expect(f('/a/b')).to.equal('/a/b/')
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