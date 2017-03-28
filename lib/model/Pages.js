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
var R = require("ramda");
var VistedPage_1 = require("./VistedPage");
var PageVisit_1 = require("./PageVisit");
/**
 * A list of VisitedPage objects that's always sorted by first manually visited
 */
var Pages = (function () {
    function Pages(pages, sort) {
        if (pages === void 0) { pages = []; }
        if (sort === void 0) { sort = true; }
        this.pages = sort ? R.sort(Pages.compareByFirstVisited, pages) : pages;
    }
    Pages.prototype.toHistoryStack = function () {
        var currentIndex = this.activeIndex;
        return new HistoryStack({
            back: this.slice(0, currentIndex).pages,
            current: this.activePage,
            forward: this
                .slice(currentIndex + 1)
                .filter(function (p) { return p.wasManuallyVisited; }).pages
        });
    };
    /**
     * Updates the times of pages stored in this object
     * Ignores pages that don't intersect
     */
    Pages.prototype.update = function (pages) {
        return new Pages(this.pages.map(function (page) {
            return R.find(function (p) { return p.equals(page); }, pages.pages) || page;
        }));
    };
    Pages.prototype.replacePageAtIndex = function (page, index) {
        var pages = this.pages;
        return new Pages(pages.slice(0, index).concat([
            page
        ], pages.slice(index + 1)));
    };
    Pages.prototype.touchPageAtIndex = function (index, pageVisit) {
        var page = this.pages[index];
        return this.replacePageAtIndex(page.touch(pageVisit), index);
    };
    Pages.prototype.activate = function (pageVisit) {
        return this.touchPageAtIndex(this.activeIndex, pageVisit);
    };
    Pages.prototype.push = function (_a) {
        var page = _a.page, time = _a.time, type = _a.type;
        var index = this.activeIndex + 1;
        var newPage = new VistedPage_1.default(__assign({}, Object(page), { visits: [{ time: time, type: type }] }));
        return new Pages(this.pages.slice(0, index).concat([newPage]));
    };
    /**
     * Go back to the first page
     * @param time - The time this action was originally run
     * @param reset - Should it remove the forward pages from history?
     */
    Pages.prototype.top = function (_a) {
        var time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
        var visit = { time: time, type: PageVisit_1.VisitType.MANUAL };
        var page = this.pages[0].touch(visit);
        return new Pages(reset ? [page] : [page].concat(this.slice(1).pages));
    };
    /**
     * Gets the distance and direction of a page on the stack
     * @param page - The page to look for
     * @returns {number} - The amount (-2 = 2 steps back)
     * @throws Error if page not found
     */
    Pages.prototype.getShiftAmount = function (page) {
        var index = this.findIndex(function (p) { return p.equals(page); });
        if (index === -1) {
            throw new Error('Page not found');
        }
        else {
            return index - this.activeIndex;
        }
    };
    Pages.prototype.go = function (_a) {
        var n = _a.n, time = _a.time;
        var oldIndex = this.activeIndex;
        var newIndex = oldIndex + n;
        if (newIndex < 0 || newIndex >= this.pages.length) {
            throw new Error("Can't go " + n + ", size = " + this.pages.length + ", index = " + oldIndex);
        }
        else {
            return this.touchPageAtIndex(newIndex, { time: time, type: PageVisit_1.VisitType.MANUAL });
        }
    };
    Pages.prototype.back = function (_a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
        return this.go({ n: 0 - n, time: time });
    };
    Pages.prototype.forward = function (_a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
        return this.go({ n: n, time: time });
    };
    Pages.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.activeIndex >= n;
    };
    Pages.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.pages.length - this.activeIndex > n;
    };
    Object.defineProperty(Pages.prototype, "backPages", {
        get: function () {
            return this.pages.slice(0, this.activeIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "forwardPages", {
        get: function () {
            return this.pages.slice(this.activeIndex + 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "backLength", {
        get: function () {
            return this.activeIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "forwardLength", {
        get: function () {
            return this.length - this.activeIndex - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "backPage", {
        get: function () {
            return this.pages[this.activeIndex - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "forwardPage", {
        get: function () {
            return this.pages[this.activeIndex + 1];
        },
        enumerable: true,
        configurable: true
    });
    Pages.prototype.shiftTo = function (_a) {
        var page = _a.page, time = _a.time;
        return this.go({ n: this.getShiftAmount(page), time: time });
    };
    Object.defineProperty(Pages.prototype, "activePage", {
        get: function () {
            return R.sort(Pages.compareByLastVisited, this.pages)[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "activeUrl", {
        get: function () {
            return this.activePage.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "activeIndex", {
        get: function () {
            var current = this.activePage;
            return this.findIndex(function (p) { return p === current; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "firstManualVisit", {
        get: function () {
            var page = this.pages.filter(function (p) { return p.wasManuallyVisited; })[0];
            return page ? page.firstManualVisit : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "lastVisit", {
        get: function () {
            return this.activePage.lastVisit;
        },
        enumerable: true,
        configurable: true
    });
    Pages.prototype.containsPage = function (page) {
        return R.findIndex(function (p) { return p.equals(page); }, this.pages) !== -1;
    };
    Object.defineProperty(Pages.prototype, "length", {
        get: function () {
            return this.pages.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "isEmpty", {
        get: function () {
            return this.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Pages.prototype.add = function (page) {
        return new Pages(this.pages.concat([page]));
    };
    Pages.prototype.sort = function (fn) {
        return new Pages(R.sort(fn, this.pages), false);
    };
    Pages.prototype.slice = function (start, end) {
        return new Pages(this.pages.slice(start, end), false);
    };
    Pages.prototype.filter = function (fn) {
        return new Pages(this.pages.filter(fn), false);
    };
    Pages.prototype.map = function (fn) {
        return new Pages(this.pages.map(fn), false);
    };
    Pages.prototype.findIndex = function (fn) {
        return R.findIndex(fn, this.pages);
    };
    Pages.compareByFirstVisited = function (p1, p2) {
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
    };
    Pages.compareByLastVisited = function (p1, p2) {
        return p2.lastVisit.time - p1.lastVisit.time;
    };
    Object.defineProperty(Pages.prototype, "byLastVisited", {
        get: function () {
            return this.sort(Pages.compareByLastVisited);
        },
        enumerable: true,
        configurable: true
    });
    return Pages;
}());
exports.default = Pages;
/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
var HistoryStack = (function () {
    function HistoryStack(_a) {
        var back = _a.back, current = _a.current, forward = _a.forward;
        this.back = back;
        this.current = current;
        this.forward = forward;
    }
    Object.defineProperty(HistoryStack.prototype, "lastVisit", {
        get: function () {
            return this.current.lastVisit;
        },
        enumerable: true,
        configurable: true
    });
    HistoryStack.prototype.flatten = function () {
        return this.back.concat([this.current], this.forward);
    };
    HistoryStack.prototype.toPages = function () {
        return new Pages(this.flatten(), false);
    };
    return HistoryStack;
}());
exports.HistoryStack = HistoryStack;
//# sourceMappingURL=Pages.js.map