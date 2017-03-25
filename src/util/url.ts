import * as pathToRegexp from 'path-to-regexp'
import matchPath from 'react-router/matchPath'
import * as R from 'ramda'

export const patternMatches = (pattern:string, path:string):boolean => {
  const re = pathToRegexp(pattern);
  return !!re.exec(path);
};

export const patternsMatch = (patterns:string[], path:string):boolean => {
  return R.any(p => patternMatches(p, path), patterns);
};

const parseParams = (pattern:string, url:string):Object => {
  const match = matchPath(url, {path: pattern, exact: true})
  return match ? match.params || {} : {}
}

const _compareSize = (p1, p2) => R.values(p1).length - R.values(p2).length

export const parseParamsFromPatterns = (patterns:string[], url:string):Object => {
  const paramResults:Object[] = patterns.map(p => parseParams(p, url))
  return R.last(R.sort(_compareSize, paramResults)) || {}
}