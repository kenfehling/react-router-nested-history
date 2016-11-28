import * as utils from '../../src/util/url';

describe('url utils', () => {
  it('get parent paths', () => {
    expect(utils.getParentPaths('/a/b/c')).toEqual(['/a', '/a/b']);
  });

  it('knows if paths match', () => {
    const f = utils.pathsMatch;
    expect(f('/a', '/b')).toBeFalsy();
    expect(f('/a/1', '/a/2')).toBeFalsy();
    expect(f('/a/:id', '/a', ['*', ':'])).toBeFalsy();
    expect(f('/a/:id', '/a/1', ['*', ':'])).toBeTruthy();
  });

  it('knows if parent path', () => {
    const f = utils.isParentPath;
    expect(f('/', '/a')).toBeTruthy();
    expect(f('/', '/a/b')).toBeTruthy();
    expect(f('/a', '/a/b')).toBeTruthy();
    expect(f('/a', '/a')).toBeFalsy();
    expect(f('/a/b', '/a')).toBeFalsy();
    expect(f('/', '/')).toBeFalsy();
    expect(f('/a', '/')).toBeFalsy();
    expect(f('/a', '/b')).toBeFalsy();
    expect(f('/a/1', '/a/2')).toBeFalsy();
  });

  it('knows if is parent or equal path', () => {
    const f = utils.isParentOrEqualPath;
    expect(f('/a', '/b')).toBeFalsy();
    expect(f('/a/1', '/a/2')).toBeFalsy();
  });

  it('adds a trailing slash if needed', () => {
    const f = utils.addTrailingSlash;
    expect(f('')).toBe('/');
    expect(f('/')).toBe('/');
    expect(f('a')).toBe('a/');
    expect(f('/a')).toBe('/a/');
    expect(f('/a/b')).toBe('/a/b/');
  });
});