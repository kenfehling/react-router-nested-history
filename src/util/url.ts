import * as pathToRegexp from 'path-to-regexp'
import matchPath from 'react-router/matchPath'
import * as _ from 'lodash'

export const patternMatches = (pattern:string, path:string):boolean => {
  const re = pathToRegexp(pattern);
  return !!re.exec(path);
};

export const patternsMatch = (patterns:string[], path:string):boolean => {
  return _.some(patterns, p => patternMatches(p, path));
};

const parseParams = (pattern:string, url:string):Object => {
  const match = matchPath(url, {path: pattern, exact: true})
  return match ? match.params || {} : {}
}

const _compareSize = (p1, p2) => _.values(p1).length - _.values(p2).length

export const parseParamsFromPatterns = (patterns:string[], url:string):Object => {
  const paramResults:Object[] = patterns.map(p => parseParams(p, url))
  return _.last(_.sortBy(paramResults, _compareSize)) || {}
}