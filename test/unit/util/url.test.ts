declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any;
declare const afterEach:any
import * as utils from '../../../src/util/url'

describe('url utils', () => {
  it('get parent paths', () => {
    expect(utils.getParentPaths('/a/b/c')).toEqual(['/a', '/a/b'])
  })

  it('knows if paths match', () => {
    const f = utils.patternMatches
    expect(f('/a', '/b')).toBeFalsy()
    expect(f('/a/1', '/a/2')).toBeFalsy()
    expect(f('/a/:id', '/a')).toBeFalsy()
    expect(f('/a/:id', '/a/1')).toBeTruthy()
  })

  it('adds a trailing slash if needed', () => {
    const f = utils.addTrailingSlash
    expect(f('')).toBe('/')
    expect(f('/')).toBe('/')
    expect(f('a')).toBe('a/')
    expect(f('/a')).toBe('/a/')
    expect(f('/a/b')).toBe('/a/b/')
  })

  it('parses params from patterns', () => {
    const f = utils.parseParamsFromPatterns
    const patterns = ['/a', '/a/:id', '/a/:id/:name']
    expect(f(patterns, '/a/1/cat')).toEqual({id: '1', name: 'cat'})
  })

  it('parses params from patterns with regex', () => {
    const f = utils.parseParamsFromPatterns
    const patterns = ['/a', '/a/:category(cat)', '/a/:category(cat)/:tool']
    expect(f(patterns, '/a/cat')).toEqual({category: 'cat'})
  })

})