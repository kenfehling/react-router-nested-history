import * as pathToRegexp from 'path-to-regexp'
import matchPath from 'react-router/matchPath'
import * as some from 'lodash/some'
import * as last from 'lodash/last'
import * as values from 'lodash/values'
import * as sortBy from 'lodash/sortBy'

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

export const parseParamsFromPatterns = (patterns:string[], url:string):Object => {
  const paramResults:Object[] = patterns.map(p => parseParams(p, url))
  return last(sortBy(paramResults, [(p) => values(p).length])) || {}
}