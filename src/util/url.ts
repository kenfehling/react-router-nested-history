import * as pathToRegexp from 'path-to-regexp'
import matchPath from 'react-router/matchPath'
import some from 'lodash/some'
import last from 'lodash/last'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'

export const patternMatches = (pattern:string, path:string):boolean => {
  const re = pathToRegexp(pattern);
  return !!re.exec(path);
};

export const patternsMatch = (patterns:string[], path:string):boolean => {
  return some(patterns, p => patternMatches(p, path));
};

const parseParams = (pattern:string, url:string):Object => {
  const match = matchPath(url, {path: pattern, exact: true})
  return match ? match.params || {} : {}
}

const _compareSize = (p1, p2) => values(p1).length - values(p2).length

export const parseParamsFromPatterns = (patterns:string[], url:string):Object => {
  const paramResults:Object[] = patterns.map(p => parseParams(p, url))
  return last(sortBy(paramResults, _compareSize)) || {}
}