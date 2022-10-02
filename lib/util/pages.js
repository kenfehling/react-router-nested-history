"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forward = exports.back = exports.go = exports.getShiftAmount = exports.top = exports.replace = exports.push = exports.isAtTopPage = exports.canGoBack = exports.getForwardPage = exports.getBackPage = exports.getForwardLength = exports.getBackLength = exports.getActiveIndex = exports.getActivePage = exports.isOnZeroPage = exports.sort = exports.toHistoryStack = void 0;
var VisitedPage_1 = require("../model/VisitedPage");
var immutable_1 = require("immutable");
var sorting_1 = require("./sorting");
var PageVisit_1 = require("../model/PageVisit");
var HistoryStack_1 = require("../model/HistoryStack");
var toHistoryStack = function (pages) {
    var currentIndex = (0, exports.getActiveIndex)(pages);
    var ps = pages.toArray();
    return new HistoryStack_1.default({
        back: ps.slice(0, currentIndex),
        current: ps[currentIndex],
        forward: ps
            .slice(currentIndex + 1)
            .filter(function (p) { return p.wasManuallyVisited; })
    });
};
exports.toHistoryStack = toHistoryStack;
var sort = function (pages) {
    return pages.sort(sorting_1.comparePagesByFirstVisited).toList();
};
exports.sort = sort;
var isOnZeroPage = function (pages) {
    return (0, exports.getActiveIndex)(pages) === 0;
};
exports.isOnZeroPage = isOnZeroPage;
var getActivePage = function (pages) {
    if (pages.isEmpty()) {
        throw new Error('pages is empty');
    }
    else {
        return pages.min(sorting_1.comparePagesByLastVisited);
    }
};
exports.getActivePage = getActivePage;
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
var getActiveIndex = function (pages) {
    return pages.isEmpty() ? 0 : pages.indexOf((0, exports.getActivePage)(pages));
};
exports.getActiveIndex = getActiveIndex;
var getBackLength = function (pages) {
    return (0, exports.getActiveIndex)(pages);
};
exports.getBackLength = getBackLength;
var getForwardLength = function (pages) {
    return pages.size - 1 - (0, exports.getActiveIndex)(pages);
};
exports.getForwardLength = getForwardLength;
var getBackPage = function (pages, n) {
    if (n === void 0) { n = 1; }
    var index = (0, exports.getActiveIndex)(pages);
    return index < n ? undefined : pages.get(index - n);
};
exports.getBackPage = getBackPage;
var getForwardPage = function (pages, n) {
    if (n === void 0) { n = 1; }
    return pages.get((0, exports.getActiveIndex)(pages) + n);
};
exports.getForwardPage = getForwardPage;
/*
export const getBackPages = (pages:List<VisitedPage>):List<VisitedPage> =>
    pages.slice(0, getActiveIndex(pages)).toList()

export const getForwardPages = (pages:List<VisitedPage>):List<VisitedPage> =>
    pages.slice(getActiveIndex(pages) + 1).toList()

export const canGoForward = (pages:List<VisitedPage>, n:number=1):boolean =>
    pages.size - getActiveIndex(pages) > n
*/
var canGoBack = function (pages, n) {
    if (n === void 0) { n = 1; }
    return (0, exports.getActiveIndex)(pages) >= n;
};
exports.canGoBack = canGoBack;
var isAtTopPage = function (pages) { return !(0, exports.canGoBack)(pages); };
exports.isAtTopPage = isAtTopPage;
var touch = function (pages, pageVisit) {
    return touchPageAtIndex(pages, (0, exports.getActiveIndex)(pages), pageVisit);
};
var pushOrReplace = function (pages, _a) {
    var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b, sliceFn = _a.sliceFn;
    if (!pages.isEmpty() && (0, exports.getActivePage)(pages).url === page.url) {
        return touch(pages, { time: time, type: type });
    }
    else {
        var index = (0, exports.getActiveIndex)(pages) + 1;
        var newPage = new VisitedPage_1.default(__assign(__assign({}, Object(page)), { visits: [{ time: time, type: type }] }));
        return sliceFn(pages, index, newPage);
    }
};
var push = function (pages, _a) {
    var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
    var fn = function (ps, i, newPage) { return pages.slice(0, i).toList().push(newPage); };
    return pushOrReplace(pages, { page: page, time: time, type: type, sliceFn: fn });
};
exports.push = push;
var replace = function (pages, _a) {
    var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
    var fn = function (ps, i, newPage) { return pages.slice(0, i - 1).toList().push(newPage); };
    return pushOrReplace(pages, { page: page, time: time, type: type, sliceFn: fn });
};
exports.replace = replace;
var touchPageAtIndex = function (pages, index, _a) {
    var time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
    return pages.set(index, pages.get(index).touch({ time: time, type: type }));
};
/**
 * Go back to the first page
 * @param time - The time this action was originally run
 * @param reset - Should it remove the forward pages from history?
 */
var top = function (pages, _a) {
    var time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
    var visit = { time: time, type: PageVisit_1.VisitType.MANUAL };
    var page = pages.get(0).touch(visit);
    return reset ? (0, immutable_1.List)([page]) : pages.toList().set(0, page);
};
exports.top = top;
/**
 * Gets the distance and direction of a page on the stack
 * @param page - The page to look for
 * @returns {number} - The amount (-2 = 2 steps back)
 * @throws Error if page not found
 */
var getShiftAmount = function (pages, page) {
    var index = pages.findIndex(function (p) { return p.equals(page); });
    if (index === -1) {
        throw new Error('Page not found');
    }
    else {
        return index - (0, exports.getActiveIndex)(pages);
    }
};
exports.getShiftAmount = getShiftAmount;
var go = function (pages, _a) {
    var n = _a.n, time = _a.time;
    var oldIndex = (0, exports.getActiveIndex)(pages);
    var newIndex = oldIndex + n;
    if (newIndex < 0 || newIndex >= pages.size) {
        throw new Error("Can't go ".concat(n, ", size = ").concat(pages.size, ", index = ").concat(oldIndex));
    }
    else {
        return touchPageAtIndex(pages, newIndex, { time: time });
    }
};
exports.go = go;
var back = function (pages, _a) {
    var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
    return (0, exports.go)(pages, { n: 0 - n, time: time });
};
exports.back = back;
var forward = function (pages, _a) {
    var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
    return (0, exports.go)(pages, { n: n, time: time });
};
exports.forward = forward;
/*
export const shiftTo = (pages:List<VisitedPage>, {page, time}:
                          {page:Page, time:number}):List<VisitedPage> =>
    go(pages, {n: getShiftAmount(pages, page), time})
*/ 
//# sourceMappingURL=pages.js.map