"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathToRegexp = require("path-to-regexp");
var matchPath_1 = require("react-router/matchPath");
var some_1 = require("lodash/some");
var last_1 = require("lodash/last");
var values_1 = require("lodash/values");
var sortBy_1 = require("lodash/sortBy");
exports.patternMatches = function (pattern, path) {
    var re = pathToRegexp(pattern);
    return !!re.exec(path);
};
exports.patternsMatch = function (patterns, path) {
    return some_1.default(patterns, function (p) { return exports.patternMatches(p, path); });
};
var parseParams = function (pattern, url) {
    var match = matchPath_1.default(url, { path: pattern, exact: true });
    return match ? match.params || {} : {};
};
var _compareSize = function (p1, p2) { return values_1.default(p1).length - values_1.default(p2).length; };
exports.parseParamsFromPatterns = function (patterns, url) {
    var paramResults = patterns.map(function (p) { return parseParams(p, url); });
    return last_1.default(sortBy_1.default(paramResults, _compareSize)) || {};
};
//# sourceMappingURL=url.js.map