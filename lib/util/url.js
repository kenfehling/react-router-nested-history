"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathToRegexp = require("path-to-regexp");
var matchPath_1 = require("react-router/matchPath");
var R = require("ramda");
exports.addLeadingSlash = function (path) { return path.replace(/\/?(\?|#|$)?/, '/$1'); };
exports.addTrailingSlash = function (path) { return path.replace(/\/?(\?|#|$)/, '/$1'); };
exports.stripLeadingSlash = function (path) { return path.charAt(0) === '/' ? path.substr(1) : path; };
exports.stripTrailingSlash = function (path) {
    return path.charAt(path.length - 1) === '/' ? path.substr(0, path.length - 1) : path;
};
exports.getPathParts = function (path) {
    var strippedPath = exports.stripTrailingSlash(exports.stripLeadingSlash(path));
    if (!strippedPath) {
        return [];
    }
    else {
        return strippedPath.split('/');
    }
};
exports.appendToPath = function (path, newPart) { return (path ? exports.addTrailingSlash(path) : '/') + newPart; };
exports.getParentPath = function (path) { return R.init(exports.getPathParts(path)).join('/'); };
exports.getParentPaths = function (path) {
    return R.init(exports.getPathParts(path)).reduce(function (array, part) {
        return array.concat([exports.appendToPath(R.last(array), part)]);
    }, []);
};
exports.patternMatches = function (pattern, path) {
    var re = pathToRegexp(pattern);
    return !!re.exec(path);
};
exports.patternsMatch = function (patterns, path) {
    return R.any(function (p) { return exports.patternMatches(p, path); }, patterns);
};
var parseParams = function (pattern, url) {
    var match = matchPath_1.default(url, { path: pattern, exact: true });
    return match ? match.params || {} : {};
};
var _compareSize = function (p1, p2) { return R.values(p1).length - R.values(p2).length; };
exports.parseParamsFromPatterns = function (patterns, url) {
    var paramResults = patterns.map(function (p) { return parseParams(p, url); });
    return R.last(R.sort(_compareSize, paramResults)) || {};
};
//# sourceMappingURL=url.js.map