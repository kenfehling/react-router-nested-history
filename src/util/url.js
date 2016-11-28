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

export const doPathPartsMatch = (p1, p2, wildcards=['*']) => {
  return !p1 || !p2 || p1 === p2 ||
  _.some(wildcards, w => p1.includes(w))
  || _.some(wildcards, w => p2.includes(w));
};

export const pathsMatch = (path1, path2, wildcards=['*']) => {
  const parts1 = getPathParts(path1);
  const parts2 = getPathParts(path2);
  if (parts1.length !== parts2.length) {
    return false;
  }
  for (let i = 0; i < parts1.length; i++) {
    if (!doPathPartsMatch(parts1[i], parts2[i], wildcards)) {
      return false;
    }
  }
  return true;
};

export const isParentPath = (parentPath, childPath) => {
  const parentPathParts = getPathParts(parentPath);
  const childPathParts = getPathParts(childPath);
  if (parentPathParts.length >= childPathParts.length) {
    return false;
  }
  for (let i = 0; i < childPathParts.length; i++) {
    if (!doPathPartsMatch(childPathParts[i], parentPathParts[i])) {
      return false;
    }
  }
  return true;
};

export const isParentOrEqualPath = (parentPath, childPath) => {
  return pathsMatch(parentPath, childPath) || isParentPath(parentPath, childPath);
};