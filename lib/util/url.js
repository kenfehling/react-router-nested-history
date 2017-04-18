"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathToRegexp = require("path-to-regexp");
var matchPath_1 = require("react-router/matchPath");
var some = require("lodash/some");
var last = require("lodash/last");
var values = require("lodash/values");
var sortBy = require("lodash/sortBy");
exports.patternMatches = function (pattern, path) {
    var re = pathToRegexp(pattern);
    return !!re.exec(path);
};
exports.patternsMatch = function (patterns, path) {
    return some(patterns, function (p) { return exports.patternMatches(p, path); });
};
var parseParams = function (pattern, url) {
    var match = matchPath_1.default(url, { path: pattern, exact: true });
    return match ? match.params || {} : {};
};
var _compareSize = function (p1, p2) { return values(p1).length - values(p2).length; };
exports.parseParamsFromPatterns = function (patterns, url) {
    var paramResults = patterns.map(function (p) { return parseParams(p, url); });
    return last(sortBy(paramResults, _compareSize)) || {};
};
//# sourceMappingURL=url.js.map