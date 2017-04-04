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
var VistedPage_1 = require("../model/VistedPage");
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
exports.getActivePage = function (pages) {
    if (pages.isEmpty()) {
        throw new Error('pages is empty');
    }
    else {
        return pages.min(sorting_1.comparePagesByLastVisited);
    }
};
var indexOfPage = function (pages, page) {
    var index = pages.indexOf(page);
    if (index < 0) {
        throw new Error('Page not found in group');
    }
    else {
        return index;
    }
};
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
exports.getBackPages = function (pages) {
    return pages.slice(0, exports.getActiveIndex(pages)).toList();
};
exports.getForwardPages = function (pages) {
    return pages.slice(exports.getActiveIndex(pages) + 1).toList();
};
exports.canGoBack = function (pages, n) {
    if (n === void 0) { n = 1; }
    return exports.getActiveIndex(pages) >= n;
};
exports.canGoForward = function (pages, n) {
    if (n === void 0) { n = 1; }
    return pages.size - exports.getActiveIndex(pages) > n;
};
exports.isAtTopPage = function (pages) { return !exports.canGoBack(pages); };
var touch = function (pages, pageVisit) {
    return touchPageAtIndex(pages, exports.getActiveIndex(pages), pageVisit);
};
exports.push = function (pages, _a) {
    var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
    if (!pages.isEmpty() && exports.getActivePage(pages).url === page.url) {
        return touch(pages, { time: time, type: type });
    }
    else {
        var index = exports.getActiveIndex(pages) + 1;
        var newPage = new VistedPage_1.default(__assign({}, Object(page), { visits: [{ time: time, type: type }] }));
        return pages.slice(0, index).toList().push(newPage);
    }
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
exports.forward = exports.go;
exports.shiftTo = function (pages, _a) {
    var page = _a.page, time = _a.time;
    return exports.go(pages, { n: exports.getShiftAmount(pages, page), time: time });
};
/*
 get firstManualVisit():PageVisit|undefined {
   const page:VisitedPage = this.pages.filter(p => p.wasManuallyVisited)[0]
   return page ? page.firstManualVisit : undefined
 }

 get lastVisit():PageVisit {
  return this.activePage.lastVisit
 }

 containsPage(page:Page):boolean {
  return R.findIndex((p:Page) => p.equals(page), this.pages) !== -1
 }
 */ 
//# sourceMappingURL=pages.js.map