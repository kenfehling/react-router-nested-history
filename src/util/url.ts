import * as pathToRegexp from 'path-to-regexp'
import {createLocation} from 'history/LocationUtils'
import matchPath from 'react-router/matchPath'
import * as R from 'ramda'

export const addLeadingSlash = (path) => path.replace(/\/?(\?|#|$)?/, '/$1');

export const addTrailingSlash = (path) => path.replace(/\/?(\?|#|$)/, '/$1');

export const stripLeadingSlash = (path) => path.charAt(0) === '/' ? path.substr(1) : path;

export const stripTrailingSlash = (path) =>
    path.charAt(path.length - 1) === '/' ? path.substr(0, path.length - 1) : path;

export const getPathParts = (path) => {
  const strippedPath = stripTrailingSlash(stripLeadingSlash(path));
  if (!strippedPath) {
    return [];
  }
  else {
    return strippedPath.split('/');
  }
};

export const appendToPath = (path, newPart) => (path ? addTrailingSlash(path) : '/') + newPart;

export const getParentPath = (path) => R.init(getPathParts(path)).join('/');

export const getParentPaths = (path) =>
    R.init(getPathParts(path)).reduce((array:string[], part:string) =>
        [...array, appendToPath(R.last(array), part)], []);

export const patternMatches = (pattern:string, path:string):boolean => {
  const re = pathToRegexp(pattern);
  return !!re.exec(path);
};

export const patternsMatch = (patterns:string[], path:string):boolean => {
  return R.any(p => patternMatches(p, path), patterns);
};

const parseParams = (pattern:string, url:string):Object => {
  const match = matchPath(pattern, createLocation(url), {exact: true})
  return match ? match.params || {} : {}
}

const _compareSize = (p1, p2) => R.values(p1).length - R.values(p2).length

export const parseParamsFromPatterns = (patterns:string[], url:string):Object => {
  const paramResults:Object[] = patterns.map(p => parseParams(p, url))
  return R.last(R.sort(_compareSize, paramResults))
}