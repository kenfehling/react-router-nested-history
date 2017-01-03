import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

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

export const getParentPath = (path) => _.initial(getPathParts(path)).join('/');

export const getParentPaths = (path) =>
    _.reduce(_.initial(getPathParts(path)), (array, part) =>
        [...array, appendToPath(_.last(array), part)], []);

export const patternMatches = (pattern, path) => {
  const re = pathToRegexp(pattern);
  return !!re.exec(path);
};

export const patternsMatch = (patterns, path) => {
  return _.some(patterns, p => patternMatches(p, path));
};