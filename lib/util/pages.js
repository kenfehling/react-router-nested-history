"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var VisitedPage_1 = require("../model/VisitedPage");
var immutable_1 = require("immutable");
var sorting_1 = require("./sorting");
var PageVisit_1 = require("../model/PageVisit");
var HistoryStack_1 = require("../model/HistoryStack");
exports.toHistoryStack = function (pages) {
    var currentIndex = exports.getActiveIndex(pages);
    var ps = pages.toArray();
    return new HistoryStack_1.default({
        back: ps.slice(0, currentIndex),
        current: ps[currentIndex],
        forward: ps
            .slice(currentIndex + 1)
            .filter(function (p) { return p.wasManuallyVisited; })
    });
};
exports.sort = function (pages) {
    return pages.sort(sorting_1.comparePagesByFirstVisited).toList();
};
exports.isOnZeroPage = function (pages) {
    return exports.getActiveIndex(pages) === 0;
};
exports.getActivePage = function (pages) {
    if (pages.isEmpty()) {
        throw new Error('pages is empty');
    }
    else {
        return pages.min(sorting_1.comparePagesByLastVisited);
    }
};
/*
const indexOfPage = (pages:List<VisitedPage>, page:VisitedPage):number => {
  const index:number = pages.indexOf(page)
  if (index < 0) {
    throw new Error('Page not found in group')
  }
  else {
    return index
  }
}
*/
exports.getActiveIndex = function (pages) {
    return pages.isEmpty() ? 0 : pages.indexOf(exports.getActivePage(pages));
};
exports.getBackLength = function (pages) {
    return exports.getActiveIndex(pages);
};
exports.getForwardLength = function (pages) {
    return pages.size - 1 - exports.getActiveIndex(pages);
};
exports.getBackPage = function (pages, n) {
    if (n === void 0) { n = 1; }
    var index = exports.getActiveIndex(pages);
    return index < n ? undefined : pages.get(index - n);
};
exports.getForwardPage = function (pages, n) {
    if (n === void 0) { n = 1; }
    return pages.get(exports.getActiveIndex(pages) + n);
};
/*
export const getBackPages = (pages:List<VisitedPage>):List<VisitedPage> =>
    pages.slice(0, getActiveIndex(pages)).toList()

export const getForwardPages = (pages:List<VisitedPage>):List<VisitedPage> =>
    pages.slice(getActiveIndex(pages) + 1).toList()

export const canGoForward = (pages:List<VisitedPage>, n:number=1):boolean =>
    pages.size - getActiveIndex(pages) > n
*/
exports.canGoBack = function (pages, n) {
    if (n === void 0) { n = 1; }
    return exports.getActiveIndex(pages) >= n;
};
exports.isAtTopPage = function (pages) { return !exports.canGoBack(pages); };
var touch = function (pages, pageVisit) {
    return touchPageAtIndex(pages, exports.getActiveIndex(pages), pageVisit);
};
var pushOrReplace = function (pages, _a) {
    var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b, sliceFn = _a.sliceFn;
    if (!pages.isEmpty() && exports.getActivePage(pages).url === page.url) {
        return touch(pages, { time: time, type: type });
    }
    else {
        var index = exports.getActiveIndex(pages) + 1;
        var newPage = new VisitedPage_1.default(__assign({}, Object(page), { visits: [{ time: time, type: type }] }));
        return sliceFn(pages, index, newPage);
    }
};
exports.push = function (pages, _a) {
    var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
    var fn = function (ps, i, newPage) { return pages.slice(0, i).toList().push(newPage); };
    return pushOrReplace(pages, { page: page, time: time, type: type, sliceFn: fn });
};
exports.replace = function (pages, _a) {
    var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
    var fn = function (ps, i, newPage) { return pages.slice(0, i - 1).toList().push(newPage); };
    return pushOrReplace(pages, { page: page, time: time, type: type, sliceFn: fn });
};
var touchPageAtIndex = function (pages, index, _a) {
    var time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
    return pages.set(index, pages.get(index).touch({ time: time, type: type }));
};
/**
 * Go back to the first page
 * @param time - The time this action was originally run
 * @param reset - Should it remove the forward pages from history?
 */
exports.top = function (pages, _a) {
    var time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
    var visit = { time: time, type: PageVisit_1.VisitType.MANUAL };
    var page = pages.get(0).touch(visit);
    return reset ? immutable_1.List([page]) : pages.toList().set(0, page);
};
/**
 * Gets the distance and direction of a page on the stack
 * @param page - The page to look for
 * @returns {number} - The amount (-2 = 2 steps back)
 * @throws Error if page not found
 */
exports.getShiftAmount = function (pages, page) {
    var index = pages.findIndex(function (p) { return p.equals(page); });
    if (index === -1) {
        throw new Error('Page not found');
    }
    else {
        return index - exports.getActiveIndex(pages);
    }
};
exports.go = function (pages, _a) {
    var n = _a.n, time = _a.time;
    var oldIndex = exports.getActiveIndex(pages);
    var newIndex = oldIndex + n;
    if (newIndex < 0 || newIndex >= pages.size) {
        throw new Error("Can't go " + n + ", size = " + pages.size + ", index = " + oldIndex);
    }
    else {
        return touchPageAtIndex(pages, newIndex, { time: time });
    }
};
exports.back = function (pages, _a) {
    var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
    return exports.go(pages, { n: 0 - n, time: time });
};
exports.forward = function (pages, _a) {
    var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
    return exports.go(pages, { n: n, time: time });
};
/*
export const shiftTo = (pages:List<VisitedPage>, {page, time}:
                          {page:Page, time:number}):List<VisitedPage> =>
    go(pages, {n: getShiftAmount(pages, page), time})
*/ 
//# sourceMappingURL=pages.js.map