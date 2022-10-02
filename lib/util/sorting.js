"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePagesByLastVisited = exports.comparePagesByFirstVisited = exports.sort = void 0;
function sort(items, fn, wasVisitedFn, isDefaultFn) {
    var unvisited = items.filterNot(wasVisitedFn).toList();
    return fn({
        visited: items.filter(wasVisitedFn).toList(),
        defaultUnvisited: unvisited.filter(isDefaultFn).toList(),
        nonDefaultUnvisited: unvisited.filterNot(isDefaultFn).toList()
    });
}
exports.sort = sort;
function comparePagesByFirstVisited(p1, p2) {
    if (p1.isZeroPage) {
        return -1;
    }
    if (p2.isZeroPage) {
        return 1;
    }
    if (p1.wasManuallyVisited) {
        if (p2.wasManuallyVisited) {
            return p1.firstManualVisit.time - p2.firstManualVisit.time;
        }
        else {
            return -1; //1
        }
    }
    else {
        if (p2.wasManuallyVisited) {
            return 1; //-1
        }
        else {
            return 0;
        }
    }
}
exports.comparePagesByFirstVisited = comparePagesByFirstVisited;
function comparePagesByLastVisited(p1, p2) {
    if (p1.wasManuallyVisited) {
        if (p2.wasManuallyVisited) {
            return p2.lastVisit.time - p1.lastVisit.time;
        }
        else {
            return -1;
        }
    }
    else {
        if (p2.wasManuallyVisited) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
exports.comparePagesByLastVisited = comparePagesByLastVisited;
//# sourceMappingURL=sorting.js.map