'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseParamsFromPatterns = exports.patternsMatch = exports.patternMatches = exports.getParentPaths = exports.getParentPath = exports.appendToPath = exports.getPathParts = exports.stripTrailingSlash = exports.stripLeadingSlash = exports.addTrailingSlash = exports.addLeadingSlash = undefined;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _LocationUtils = require('history/LocationUtils');

var _matchPattern = require('react-router/matchPattern');

var _matchPattern2 = _interopRequireDefault(_matchPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.replace(/\/?(\?|#|$)?/, '/$1');
};

var addTrailingSlash = exports.addTrailingSlash = function addTrailingSlash(path) {
  return path.replace(/\/?(\?|#|$)/, '/$1');
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.substr(0, path.length - 1) : path;
};

var getPathParts = exports.getPathParts = function getPathParts(path) {
  var strippedPath = stripTrailingSlash(stripLeadingSlash(path));
  if (!strippedPath) {
    return [];
  } else {
    return strippedPath.split('/');
  }
};

var appendToPath = exports.appendToPath = function appendToPath(path, newPart) {
  return (path ? addTrailingSlash(path) : '/') + newPart;
};

var getParentPath = exports.getParentPath = function getParentPath(path) {
  return _lodash2.default.initial(getPathParts(path)).join('/');
};

var getParentPaths = exports.getParentPaths = function getParentPaths(path) {
  return _lodash2.default.reduce(_lodash2.default.initial(getPathParts(path)), function (array, part) {
    return [].concat(_toConsumableArray(array), [appendToPath(_lodash2.default.last(array), part)]);
  }, []);
};

var patternMatches = exports.patternMatches = function patternMatches(pattern, path) {
  var re = (0, _pathToRegexp2.default)(pattern);
  return !!re.exec(path);
};

var patternsMatch = exports.patternsMatch = function patternsMatch(patterns, path) {
  return _lodash2.default.some(patterns, function (p) {
    return patternMatches(p, path);
  });
};

var parseParams = function parseParams(pattern, url) {
  var match = (0, _matchPattern2.default)(pattern, (0, _LocationUtils.createLocation)(url), false);
  return match ? match.params || {} : {};
};

var parseParamsFromPatterns = exports.parseParamsFromPatterns = function parseParamsFromPatterns(patterns, url) {
  var paramResults = patterns.map(function (p) {
    return parseParams(p, url);
  });
  return _lodash2.default.last(_lodash2.default.sortBy(paramResults, function (p) {
    return _lodash2.default.size(p);
  }));
};