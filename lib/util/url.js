"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParamsFromPatterns = exports.patternsMatch = exports.patternMatches = void 0;
var pathToRegexp = require("path-to-regexp");
var matchPath_1 = require("react-router/matchPath");
var some = require("lodash/some");
var last = require("lodash/last");
var values = require("lodash/values");
var sortBy = require("lodash/sortBy");
var patternMatches = function (pattern, path) {
    var re = pathToRegexp(pattern);
    return !!re.exec(path);
};
exports.patternMatches = patternMatches;
var patternsMatch = function (patterns, path) {
    return some(patterns, function (p) { return (0, exports.patternMatches)(p, path); });
};
exports.patternsMatch = patternsMatch;
var parseParams = function (pattern, url) {
    var match = (0, matchPath_1.default)(url, { path: pattern, exact: true });
    return match ? match.params || {} : {};
};
var parseParamsFromPatterns = function (patterns, url) {
    var paramResults = patterns.map(function (p) { return parseParams(p, url); });
    return last(sortBy(paramResults, [function (p) { return values(p).length; }])) || {};
};
exports.parseParamsFromPatterns = parseParamsFromPatterns;
//# sourceMappingURL=url.js.map