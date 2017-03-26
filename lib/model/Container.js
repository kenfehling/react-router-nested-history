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
var Page_1 = require("./Page");
var url_1 = require("../util/url");
var Pages_1 = require("./Pages");
var PageVisit_1 = require("./PageVisit");
var VistedPage_1 = require("./VistedPage");
var immutable_1 = require("immutable");
var Container = (function () {
    /**
     * Construct a new Container
     * @param time - The time this container was created
     * @param name - The container's name
     * @param enabled - Is this container enabled/visible?
     * @param initialUrl - The starting URL of this container
     * @param patterns - Patterns of URLs that this container handles
     * @param isDefault - Is this the default container?
     * @param resetOnLeave - Keep container history after navigating away?
     * @param groupName - The name of this container's group
     * @param pages - The pages visited in this container
     */
    function Container(_a) {
        var time = _a.time, name = _a.name, _b = _a.enabled, enabled = _b === void 0 ? true : _b, associatedWindow = _a.associatedWindow, initialUrl = _a.initialUrl, patterns = _a.patterns, _c = _a.isDefault, isDefault = _c === void 0 ? false : _c, _d = _a.resetOnLeave, resetOnLeave = _d === void 0 ? false : _d, groupName = _a.groupName, pages = _a.pages;
        this.name = name;
        this.enabled = enabled;
        this.associatedWindow = associatedWindow;
        this.initialUrl = initialUrl;
        this.patterns = patterns;
        this.isDefault = isDefault;
        this.resetOnLeave = resetOnLeave;
        this.groupName = groupName;
        this.pages = pages || new Pages_1.default([
            new VistedPage_1.default({
                url: initialUrl,
                params: url_1.parseParamsFromPatterns(patterns, initialUrl),
                containerName: name,
                groupName: groupName,
                visits: [{ time: time, type: isDefault ? PageVisit_1.VisitType.MANUAL : PageVisit_1.VisitType.AUTO }]
            })
        ]);
    }
    Container.prototype.replacePages = function (pages) {
        return new Container(__assign({}, Object(this), { pages: pages }));
    };
    Container.prototype.updatePages = function (pages) {
        return new Container(__assign({}, Object(this), { pages: this.pages.update(pages) }));
    };
    Container.prototype.replaceWindow = function (w) {
        return new Container(__assign({}, Object(this), { associatedWindow: w }));
    };
    Object.defineProperty(Container.prototype, "wasManuallyVisited", {
        get: function () {
            return this.isDefault || this.activePage.wasManuallyVisited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "isAtTopPage", {
        get: function () {
            return !this.canGoBack();
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.patternsMatch = function (url) {
        return url_1.patternsMatch(this.patterns, url);
    };
    Object.defineProperty(Container.prototype, "history", {
        get: function () {
            return this.pages.toHistoryStack();
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.push = function (page, time, type) {
        if (type === void 0) { type = PageVisit_1.VisitType.MANUAL; }
        return this.setEnabled(true).replacePages(this.pages.push(page, time, type));
    };
    Container.prototype.pushUrl = function (url, time, type) {
        if (type === void 0) { type = PageVisit_1.VisitType.MANUAL; }
        if (this.activePage.url === url) {
            return this.activate({ time: time, type: type });
        }
        else {
            var page = new Page_1.default({
                url: url,
                params: url_1.parseParamsFromPatterns(this.patterns, url),
                containerName: this.name,
            });
            return this.push(page, time, type);
        }
    };
    Container.prototype.loadFromUrl = function (url, time) {
        if (this.patternsMatch(url)) {
            var container = this.isAtTopPage ?
                this.activate({ time: time - 1, type: PageVisit_1.VisitType.MANUAL }) : this;
            return container.pushUrl(url, time, PageVisit_1.VisitType.MANUAL);
        }
        else {
            return this;
        }
    };
    Container.prototype.activate = function (visit) {
        return this.setEnabled(true).replacePages(this.pages.activate(visit));
    };
    Container.prototype.top = function (time, reset) {
        if (reset === void 0) { reset = false; }
        return this.replacePages(this.pages.top(time, reset));
    };
    Container.prototype.go = function (n, time) {
        return this.replacePages(this.pages.go(n, time));
    };
    Container.prototype.forward = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.replacePages(this.pages.forward(n, time));
    };
    Container.prototype.back = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.replacePages(this.pages.back(n, time));
    };
    Container.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.pages.canGoForward(n);
    };
    Container.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.pages.canGoBack(n);
    };
    Container.prototype.getShiftAmount = function (page) {
        return this.pages.getShiftAmount(page);
    };
    Container.prototype.shiftTo = function (page, time) {
        return this.replacePages(this.pages.shiftTo(page, time));
    };
    Container.prototype.containsPage = function (page) {
        return this.pages.containsPage(page);
    };
    Object.defineProperty(Container.prototype, "activePage", {
        get: function () {
            return this.pages.activePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "activeUrl", {
        get: function () {
            return this.activePage.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "backPage", {
        get: function () {
            return this.pages.backPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "forwardPage", {
        get: function () {
            return this.pages.forwardPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "backPages", {
        get: function () {
            return this.pages.backPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "forwardPages", {
        get: function () {
            return this.pages.forwardPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "backLength", {
        get: function () {
            return this.pages.backLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "forwardLength", {
        get: function () {
            return this.pages.forwardLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "firstManualVisit", {
        get: function () {
            return this.pages.firstManualVisit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "lastVisit", {
        get: function () {
            return this.pages.lastVisit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "isGroup", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.setEnabled = function (enabled) {
        return new Container(__assign({}, Object(this), { enabled: enabled }));
    };
    Container.prototype.computeState = function () {
        return {
            name: this.name,
            enabled: this.enabled,
            activeUrl: this.activeUrl,
            history: this.history
        };
    };
    Container.prototype.computeWindow = function (parentVisible) {
        if (this.associatedWindow) {
            return {
                forName: this.name,
                visible: parentVisible && this.enabled,
                groupName: this.groupName
            };
        }
        else {
            throw new Error('No associated window');
        }
    };
    /**
     * Returns a map with 0 or 1 items
     */
    Container.prototype.computeWindows = function (parentVisible) {
        var map = immutable_1.OrderedMap();
        if (this.associatedWindow) {
            return map.set(this.name, this.computeWindow(parentVisible));
        }
        else {
            return map;
        }
    };
    return Container;
}());
exports.default = Container;
//# sourceMappingURL=Container.js.map