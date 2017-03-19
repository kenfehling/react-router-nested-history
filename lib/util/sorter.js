"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var simpleSortByLastVisit = function (cs) {
    return R.sort(function (c1, c2) { return c2.lastVisit.time - c1.lastVisit.time; }, cs);
};
var simpleSortByFirstManualVisit = function (cs) {
    return R.sort(function (c1, c2) {
        var v1 = c1.firstManualVisit;
        var v2 = c2.firstManualVisit;
        if (v1) {
            if (v2) {
                return v1.time - v2.time;
            }
            else {
                return -1;
            }
        }
        else {
            if (v1) {
                return 1;
            }
            else {
                return -1; // 0
            }
        }
    }, cs);
};
var _sort = function (cs, fn) {
    var visited = cs.filter(function (c) { return c.wasManuallyVisited; });
    var unvisited = cs.filter(function (c) { return !c.wasManuallyVisited; });
    var defaultUnvisited = unvisited.filter(function (c) { return c.isDefault; });
    var nonDefaultUnvisited = unvisited.filter(function (c) { return !c.isDefault; });
    return fn({ visited: visited, defaultUnvisited: defaultUnvisited, nonDefaultUnvisited: nonDefaultUnvisited });
};
var sort = function (cs, fn) {
    var enabled = cs.filter(function (c) { return c.enabled; });
    var disabled = cs.filter(function (c) { return !c.enabled; });
    return _sort(enabled, fn).concat(_sort(disabled, fn) // followed by all disabled
    );
};
exports.sortContainersByLastVisited = function (cs) {
    return sort(cs, function (_a) {
        var visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
        return simpleSortByLastVisit(visited).concat(defaultUnvisited, nonDefaultUnvisited);
    });
};
exports.sortContainersByFirstVisited = function (cs) {
    return sort(cs, function (_a) {
        var visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
        return simpleSortByFirstManualVisit(visited).concat(defaultUnvisited);
    });
};
//# sourceMappingURL=sorter.js.map