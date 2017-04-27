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
var Group_1 = require("./Group");
var PageVisit_1 = require("./PageVisit");
var immutable_1 = require("immutable");
var defaultBehavior = require("../behaviors/defaultBehavior");
var nonDefaultBehavior = require("../behaviors/nonDefaultBehavior");
var interContainerHistory = require("../behaviors/interContainerHistory");
var keepFwdTabBehavior = require("../behaviors/keepFwdTabBehavior");
var removeFwdTabBehavior = require("../behaviors/removeFwdTabBehavior");
var VisitedPage_1 = require("./VisitedPage");
var pageUtils = require("../util/pages");
var Container_1 = require("./Container");
var HistoryWindow_1 = require("./HistoryWindow");
var HistoryStack_1 = require("./HistoryStack");
var url_1 = require("../util/url");
var sorting_1 = require("../util/sorting");
var State = (function () {
    function State(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.windows, windows = _c === void 0 ? immutable_1.fromJS({}) : _c, _d = _b.containers, containers = _d === void 0 ? immutable_1.OrderedMap() : _d, _e = _b.pages, pages = _e === void 0 ? immutable_1.List() : _e, _f = _b.titles, titles = _f === void 0 ? immutable_1.List() : _f, _g = _b.isInitialized, isInitialized = _g === void 0 ? false : _g, _h = _b.zeroPageUrl, zeroPageUrl = _h === void 0 ? '/' : _h;
        this.containers = containers;
        this.windows = windows;
        this.pages = pages;
        this.titles = titles;
        this.isInitialized = isInitialized;
        this.zeroPageUrl = zeroPageUrl;
    }
    Object.defineProperty(State.prototype, "computedGroups", {
        get: function () {
            var _this = this;
            return this.groups.reduce(function (map, g) {
                return map.set(g.name, {
                    name: g.name,
                    isTopLevel: !g.group,
                    activeContainerIndex: _this.getGroupActiveContainerIndex(g.name),
                    activeContainerName: _this.getGroupActiveContainerName(g.name),
                    gotoTopOnSelectActive: g.gotoTopOnSelectActive
                });
            }, immutable_1.fromJS({}));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "computedContainers", {
        get: function () {
            var _this = this;
            var currentUrl = this.activeUrl;
            return this.containers.reduce(function (map, c) {
                return map.set(c.name, {
                    name: c.name,
                    initialUrl: _this.getInitialUrl(c),
                    resetOnLeave: c.resetOnLeave,
                    activeUrl: _this.getContainerActiveUrl(c.name),
                    backPage: _this.getContainerBackPage(c.name),
                    isActiveInGroup: c.group ?
                        _this.getGroupActiveContainerName(c.group) === c.name : false,
                    matchesCurrentUrl: currentUrl === _this.getContainerActiveUrl(c.name)
                });
            }, immutable_1.fromJS({}));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "computedWindows", {
        get: function () {
            var _this = this;
            var stackOrders = immutable_1.fromJS({});
            return this.windows.map(function (w) {
                var container = _this.getWindowContainer(w);
                var group = container.group;
                if (!stackOrders.has(group)) {
                    var stackOrder_1 = _this.getContainerStackOrderForGroup(group);
                    stackOrders = stackOrders.set(group, stackOrder_1);
                }
                var stackOrder = stackOrders.get(group);
                var index = stackOrder.findIndex(function (c) { return c.name === w.forName; });
                return __assign({}, w, { zIndex: stackOrder.size + 1 - index, isOnTop: index === 0 });
            });
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.computeState = function () {
        return {
            isInitialized: this.isInitialized,
            activeUrl: this.activeUrl,
            groups: this.computedGroups,
            containers: this.computedContainers,
            windows: this.computedWindows,
            activeTitle: this.activeTitle
        };
    };
    State.prototype.assign = function (obj) {
        return new State(__assign({}, Object(this), obj));
    };
    State.prototype.getContainerHistory = function (container) {
        return pageUtils.toHistoryStack(this.getContainerPages(container));
    };
    State.prototype.getGroupHistory = function (group, keepFwd) {
        var _this = this;
        if (keepFwd === void 0) { keepFwd = false; }
        var cs = this.getContainerStackOrder(group).filter(function (c) { return _this.wasManuallyVisited(c); });
        switch (cs.size) {
            case 0: {
                var container = this.getCurrentGroupContainerName(group);
                return this.getSingleHistory(container, keepFwd);
            }
            case 1: {
                return this.getSingleHistory(cs.first().name, keepFwd);
            }
            default: {
                var from = cs.get(1);
                var to = cs.first();
                return this.computeGroupHistory(group, from, to, keepFwd);
            }
        }
    };
    State.prototype.getIContainerHistory = function (name, keepFwd) {
        if (this.isGroup(name)) {
            return this.getGroupHistory(name, keepFwd);
        }
        else {
            return this.getContainerHistory(name);
        }
    };
    State.prototype.computeDefault = function (h, defaulT, from, to, keepFwd) {
        var fromHistory = this.getIContainerHistory(from.name, keepFwd);
        var toHistory = this.getIContainerHistory(to.name, keepFwd);
        if (defaulT) {
            if (from.isDefault) {
                return defaultBehavior.A_to_B(h, fromHistory, toHistory);
            }
            else {
                if (to.isDefault) {
                    return defaultBehavior.B_to_A(h, fromHistory, toHistory);
                }
                else {
                    var defaultHistory = this.getIContainerHistory(defaulT.name, keepFwd);
                    return defaultBehavior.B_to_C(h, defaultHistory, fromHistory, toHistory);
                }
            }
        }
        else {
            return nonDefaultBehavior.B_to_C(h, null, fromHistory, toHistory);
        }
    };
    State.prototype.computeInterContainer = function (group, from, to, keepFwd) {
        var toHistory = this.getIContainerHistory(to.name, keepFwd);
        var g = this.containers.get(group);
        if (!from.isDefault && !to.isDefault && g.allowInterContainerHistory) {
            var fromHistory = this.getIContainerHistory(from.name, keepFwd);
            var sorted = this.sortContainersByFirstVisited(immutable_1.fromJS([from, to]));
            if (sorted.first() === from) {
                return interContainerHistory.D_to_E(toHistory, fromHistory, toHistory);
            }
            else {
                return interContainerHistory.E_to_D(toHistory, fromHistory, toHistory);
            }
        }
        else {
            return toHistory;
        }
    };
    State.prototype.computeFwd = function (h, keepFwd, from, to) {
        var fromHistory = this.getIContainerHistory(from.name, keepFwd);
        var toHistory = this.getIContainerHistory(to.name, keepFwd);
        if (keepFwd && this.wasManuallyVisited(from)) {
            var sorted = this.sortContainersByFirstVisited(immutable_1.fromJS([from, to]));
            if (sorted.first() === from) {
                return keepFwdTabBehavior.D_to_E(h, fromHistory, toHistory);
            }
            else {
                return keepFwdTabBehavior.E_to_D(h, fromHistory, toHistory);
            }
        }
        else {
            return removeFwdTabBehavior.E_to_D(h, fromHistory, toHistory);
        }
    };
    State.prototype.computeGroupHistory = function (group, from, to, keepFwd) {
        var defaulT = this.getGroupDefaultContainer(group);
        var h1 = this.computeInterContainer(group, from, to, keepFwd);
        var h2 = this.computeDefault(h1, defaulT, from, to, keepFwd);
        return this.computeFwd(h2, keepFwd, from, to);
    };
    State.prototype.getSingleHistory = function (name, keepFwd) {
        return this.isGroup(name) ?
            this.getGroupHistory(name, keepFwd) : this.getContainerHistory(name);
    };
    State.prototype.getContainerStackOrder = function (group) {
        var cs = this.getGroupContainers(group);
        return this.sortContainersByLastVisited(cs);
    };
    State.prototype.getInitialUrl = function (c) {
        if (c.isGroup) {
            return this.getInitialUrl(this.getCurrentGroupContainer(c.name));
        }
        else {
            return c.initialUrl;
        }
    };
    State.prototype.switchToGroup = function (_a) {
        var name = _a.name, time = _a.time;
        var container = this.getCurrentGroupContainerName(name);
        return this.activateContainer(container, time);
    };
    State.prototype.switchToContainer = function (_a) {
        var name = _a.name, time = _a.time;
        return this.activateContainer(name, time);
    };
    State.prototype.openWindowForName = function (_a) {
        var name = _a.name, time = _a.time;
        return this.switchToContainer({ name: name, time: time })
            .setWindowVisibility({ forName: name, visible: true });
    };
    State.prototype.openWindowAtIndex = function (_a) {
        var groupName = _a.groupName, index = _a.index, time = _a.time;
        return this.openWindowForName({
            name: this.getContainerNameByIndex(groupName, index),
            time: time
        });
    };
    State.prototype.closeWindow = function (_a) {
        var forName = _a.forName, time = _a.time;
        var container = this.containers.get(forName);
        var group = container.group;
        if (!group) {
            throw new Error('Window must be inside a WindowGroup');
        }
        var state = this.setWindowVisibility({ forName: forName, visible: false });
        if (state.hasEnabledContainers(group)) {
            return state;
        }
        else {
            return state.back({ n: 1, time: time });
        }
    };
    State.prototype.getWindowContainer = function (w) {
        return this.containers.get(w.forName);
    };
    State.prototype.getGroupContainerNames = function (group) {
        var filter = function (c) { return c.group === group; };
        return this.containers.filter(filter).keySeq().toList();
    };
    State.prototype.getGroupContainers = function (group) {
        var filter = function (c) { return c.group === group; };
        return this.containers.filter(filter).toList();
    };
    State.prototype.hasEnabledContainers = function (group) {
        return this.getGroupContainerNames(group)
            .some(this.isContainerEnabled.bind(this));
    };
    State.prototype.activateContainer = function (container, time, type) {
        if (type === void 0) { type = PageVisit_1.VisitType.MANUAL; }
        if (this.isContainerActive(container)) {
            return this;
        }
        else {
            var from = this.activeContainer;
            var to = this.containers.get(container);
            var s1 = this.isContainerEnabled(container) ? this :
                this.setWindowVisibility({ forName: container, visible: true });
            var s2 = from && from.resetOnLeave && from.group === to.group ?
                s1.top({ time: time - 1, reset: true }) : s1;
            var newActivePage = this.getContainerActivePage(container);
            return s2.replacePage(newActivePage.touch({ time: time, type: type }));
        }
    };
    State.prototype.go = function (_a) {
        var _this = this;
        var n = _a.n, time = _a.time, container = _a.container;
        if (n === 0) {
            return this;
        }
        if (container) {
            return this.activateContainer(container, time).go({ n: n, time: time });
        }
        if (this.isOnZeroPage) {
            if (n > 0) {
                return this.replacePages(pageUtils.forward(this.pages, { time: time }))
                    .go({ n: n - 1, time: time });
            }
            else {
                throw new Error('Cannot go back from zero page');
            }
        }
        var activeGroup = this.activeGroupName;
        if (!activeGroup) {
            throw new Error('No active group');
        }
        var f = function (x) { return _this.goInContainer(activeGroup, { n: x, time: time }); };
        if (n < 0 && this.activeIndex === 1) {
            var backPage = pageUtils.getBackPage(this.getPages());
            if (backPage) {
                return this.replacePage(backPage.touch({ time: time, type: PageVisit_1.VisitType.MANUAL }));
            }
            else {
                throw new Error('No back page');
            }
        }
        return f(n);
    };
    State.prototype.back = function (_a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time, container = _a.container;
        return this.go({ n: 0 - n, time: time, container: container });
    };
    State.prototype.forward = function (_a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time, container = _a.container;
        return this.go({ n: n, time: time, container: container });
    };
    State.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.activeIndex >= n;
    };
    State.prototype.isContainerAtTopPage = function (container) {
        return pageUtils.getActiveIndex(this.getContainerPages(container)) === 0;
    };
    State.prototype.top = function (_a) {
        var _b = _a.container, container = _b === void 0 ? this.activeContainerName : _b, time = _a.time, _c = _a.reset, reset = _c === void 0 ? false : _c;
        if (!container) {
            throw new Error('No active container');
        }
        var ps = pageUtils.top(this.getContainerPages(container), { time: time, reset: reset });
        return this.replaceContainerPages(container, ps);
    };
    State.prototype.getShiftAmount = function (page) {
        return pageUtils.getShiftAmount(this.getPages(), page);
    };
    State.prototype.cloneWithPagesSorted = function () {
        return this.replacePages(this.sortPagesByFirstVisited(this.pages), false);
    };
    State.prototype.pushOrReplace = function (_a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b, fn = _a.fn;
        var activeContainer = this.activeContainerName;
        if (!activeContainer) {
            throw new Error('No active container');
        }
        return this.pushInContainer(activeContainer, { page: page, time: time, type: type });
    };
    State.prototype.pushOrReplaceInContainer = function (container, _a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b, fn = _a.fn;
        var containerPages = this.getContainerPages(container);
        var newPages = fn(containerPages, { page: page, time: time, type: type });
        var state = this.replaceContainerPages(container, newPages);
        return type === PageVisit_1.VisitType.MANUAL ?
            state.setParentWindowVisibility({ container: container, visible: true }) : state;
    };
    State.prototype.push = function (_a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
        return this.pushOrReplace({ page: page, time: time, type: type, fn: this.pushInContainer });
    };
    State.prototype.replace = function (_a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
        return this.pushOrReplace({ page: page, time: time, type: type, fn: this.replaceInContainer });
    };
    State.prototype.pushInContainer = function (container, _a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
        return this.pushOrReplaceInContainer(container, { page: page, time: time, type: type, fn: pageUtils.push });
    };
    State.prototype.replaceInContainer = function (container, _a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
        return this.pushOrReplaceInContainer(container, { page: page, time: time, type: type, fn: pageUtils.replace });
    };
    State.prototype.getRootGroupOfGroup = function (group) {
        var g = this.containers.get(group);
        if (g.group) {
            return this.getRootGroupOfGroup(g.group);
        }
        else {
            return g;
        }
    };
    Object.defineProperty(State.prototype, "activeGroup", {
        get: function () {
            var p = this.activePage;
            if (p.isZeroPage) {
                var fp = pageUtils.getForwardPage(this.pages);
                return fp && this.getRootGroupOfGroup(fp.group);
            }
            else {
                return this.getRootGroupOfGroup(p.group);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "activeGroupName", {
        get: function () {
            var g = this.activeGroup;
            return g && g.name;
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.getHistory = function (maintainFwd) {
        if (maintainFwd === void 0) { maintainFwd = false; }
        var activeGroup = this.activeGroupName;
        if (activeGroup && this.hasEnabledContainers(activeGroup)) {
            var groupHistory = this.getGroupHistory(activeGroup, maintainFwd);
            if (this.isOnZeroPage) {
                return new HistoryStack_1.default({
                    back: [],
                    current: this.zeroPage,
                    forward: groupHistory.flatten().toArray()
                });
            }
            else {
                return new HistoryStack_1.default(__assign({}, groupHistory, { back: [this.zeroPage].concat(groupHistory.back) }));
            }
        }
        return new HistoryStack_1.default({
            back: [],
            current: this.zeroPage,
            forward: []
        });
    };
    Object.defineProperty(State.prototype, "activeContainer", {
        get: function () {
            var group = this.activeGroupName;
            return group ? this.getGroupActiveLeafContainer(group) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "activeContainerName", {
        get: function () {
            var c = this.activeContainer;
            return c && c.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "groupStackOrder", {
        get: function () {
            var _this = this;
            return this.groups.sortBy(function (g) {
                var c = _this.getGroupActiveContainerName(g.name);
                if (!c) {
                    return 0;
                }
                var v = _this.getLastContainerVisit(c);
                return v ? 0 - v.time : 0;
            }).toList();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tries to get active, then default, then chooses the first
     */
    State.prototype.getCurrentGroupContainer = function (group) {
        return this.getGroupActiveContainer(group) ||
            this.getGroupDefaultContainer(group) ||
            this.getGroupContainers(group).first();
    };
    State.prototype.getCurrentGroupContainerName = function (group) {
        return this.getCurrentGroupContainer(group).name;
    };
    State.prototype.getGroupDefaultContainer = function (group) {
        return this.getGroupContainers(group).find(function (c) { return c.isDefault; });
    };
    State.prototype.getGroupActiveContainer = function (group) {
        return this.getContainerStackOrder(group).first(); // TODO: Optimize?
    };
    State.prototype.getGroupActiveContainerName = function (group) {
        var c = this.getGroupActiveContainer(group);
        return c && c.name;
    };
    State.prototype.getGroupActiveContainerIndex = function (group) {
        var c = this.getGroupActiveContainer(group);
        return c && this.getContainerIndex(c);
    };
    State.prototype.getGroupActiveLeafContainer = function (group) {
        var name = this.getGroupActiveLeafContainerName(group);
        return name ? this.containers.get(name) : undefined;
    };
    State.prototype.getGroupActiveLeafContainerName = function (group) {
        return this.getContainerActivePage(group).container;
    };
    State.prototype.getGroupActiveLeafContainerIndex = function (group) {
        var c = this.getGroupActiveLeafContainer(group);
        return c && this.getContainerIndex(c);
    };
    Object.defineProperty(State.prototype, "activePage", {
        get: function () {
            return pageUtils.getActivePage(this.pages) || this.zeroPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "activeIndex", {
        get: function () {
            return pageUtils.getActiveIndex(this.getPages()) || 0;
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.hasWindow = function (forName) {
        return this.windows.has(forName);
    };
    State.prototype.isWindowVisible = function (forName) {
        return this.windows.get(forName).visible;
    };
    State.prototype.isContainerEnabled = function (container) {
        return !this.hasWindow(container) || this.isWindowVisible(container);
    };
    State.prototype.isContainerActive = function (name) {
        if (this.isGroup(name)) {
            var c = this.getGroupActiveContainerName(name);
            return c ? this.isContainerActive(c) : false;
        }
        else {
            return this.activeContainerName === name;
        }
    };
    State.prototype.isContainerActiveAndEnabled = function (name) {
        return this.isContainerActive(name) && this.isContainerEnabled(name);
    };
    Object.defineProperty(State.prototype, "activeUrl", {
        get: function () {
            return this.activePage.url;
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.wasManuallyVisited = function (c) {
        return c.isDefault || this.getContainerActivePage(c.name).wasManuallyVisited;
    };
    State.prototype.getGroupPages = function (group) {
        return this.getGroupHistory(group).flatten();
    };
    State.prototype.getContainerPages = function (name) {
        if (this.isGroup(name)) {
            return this.getGroupPages(name);
        }
        else {
            return this.pages.filter(function (p) { return name === p.container; }).toList();
        }
    };
    State.prototype.getContainerActivePage = function (container) {
        return pageUtils.getActivePage(this.getContainerPages(container));
    };
    State.prototype.getContainerActiveUrl = function (container) {
        return this.getContainerActivePage(container).url;
    };
    State.prototype.isContainerInGroup = function (container, group) {
        var c = this.containers.get(container);
        if (c.group) {
            if (c.group === group) {
                return true;
            }
            else {
                return this.isContainerInGroup(c.group, group);
            }
        }
        else {
            return false;
        }
    };
    State.prototype.isGroupActive = function (group) {
        var activePage = this.activePage;
        return this.isContainerInGroup(activePage.container, group);
    };
    State.prototype.getContainerNameByIndex = function (group, index) {
        return this.getGroupContainerNames(group).get(index);
    };
    State.prototype.getContainerStackOrderForGroup = function (group) {
        var containers = this.getGroupContainers(group);
        return immutable_1.List(this.sortContainersByLastVisited(containers));
    };
    State.prototype._goInGroup = function (group, goFn, lengthFn, nextPageFn, n, time) {
        if (n === 0) {
            return this.activateContainer(group, time);
        }
        var container = this.getGroupActiveContainerName(group);
        if (!container) {
            throw new Error("Group " + group + " has no active containers");
        }
        else {
            var containerLength = lengthFn(this, container);
            var amount = Math.min(n, containerLength);
            var state = goFn(this, container, amount, time);
            var remainder = n - amount;
            if (remainder > 0) {
                if (lengthFn(state, group) >= remainder) {
                    var nextPage = nextPageFn(state, group);
                    if (!nextPage) {
                        throw new Error('Couldn\'t get next page');
                    }
                    else {
                        var nextContainer = nextPage.container;
                        var newState = this.activateContainer(nextContainer, time);
                        if (remainder > 1) {
                            return newState._goInGroup(group, goFn, lengthFn, nextPageFn, remainder - 1, time + 2);
                        }
                        else {
                            return newState;
                        }
                    }
                }
                else {
                    throw new Error('Cannot go ' + n + ' in that direction');
                }
            }
            else {
                return state;
            }
        }
    };
    State.prototype.backInGroup = function (group, _a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
        return this._goInGroup(group, function (state, name, n, t) {
            return state.backInContainer(name, { n: n, time: t });
        }, function (state, name) { return state.getContainerBackLength(name); }, function (state, name) { return state.getContainerBackPage(name); }, n, time);
    };
    State.prototype.forwardInGroup = function (group, _a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
        return this._goInGroup(group, function (state, name, n, t) {
            return state.forwardInContainer(name, { n: n, time: t });
        }, function (state, name) { return state.getContainerForwardLength(name); }, function (state, name) { return state.getContainerForwardPage(name); }, n, time);
    };
    State.prototype.goInGroup = function (group, _a) {
        var n = _a.n, time = _a.time;
        return n > 0 ? this.forwardInGroup(group, { n: n, time: time }) :
            this.backInGroup(group, { n: 0 - n, time: time });
    };
    State.prototype._goInContainer = function (nextPageFn, time) {
        var page = nextPageFn();
        if (page) {
            var visit = { time: time, type: PageVisit_1.VisitType.MANUAL };
            return this.replacePage(page.touch(visit));
        }
        else {
            return this;
        }
    };
    State.prototype.backInContainer = function (container, _a) {
        var _this = this;
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
        return this._goInContainer(function () { return _this.getContainerBackPage(container, n); }, time);
    };
    State.prototype.forwardInContainer = function (container, _a) {
        var _this = this;
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
        return this._goInContainer(function () { return _this.getContainerForwardPage(container, n); }, time);
    };
    State.prototype.goInContainer = function (container, _a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time;
        return n > 0 ? this.forwardInContainer(container, { n: n, time: time }) :
            this.backInContainer(container, { n: 0 - n, time: time });
    };
    State.prototype.getContainerIndex = function (container) {
        return this.getGroupContainerNames(container.group).indexOf(container.name);
    };
    State.prototype.getContainerBackLength = function (container) {
        return pageUtils.getBackLength(this.getContainerPages(container));
    };
    State.prototype.getContainerForwardLength = function (container) {
        return pageUtils.getForwardLength(this.getContainerPages(container));
    };
    State.prototype.getContainerBackPage = function (container, n) {
        if (n === void 0) { n = 1; }
        return pageUtils.getBackPage(this.getContainerPages(container), n);
    };
    State.prototype.getContainerForwardPage = function (container, n) {
        if (n === void 0) { n = 1; }
        return pageUtils.getForwardPage(this.getContainerPages(container), n);
    };
    Object.defineProperty(State.prototype, "groups", {
        get: function () {
            var _this = this;
            return this.containers.filter(function (c) {
                return _this.isGroup(c.name);
            }).toMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "leafContainers", {
        get: function () {
            var _this = this;
            return this.containers.filter(function (c) {
                return !_this.isGroup(c.name);
            }).toMap();
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.isGroup = function (name) {
        return this.containers.get(name).isGroup;
    };
    State.prototype.replaceContainer = function (container) {
        return this.assign({
            containers: this.containers.set(container.name, container)
        });
    };
    State.prototype.replacePage = function (page) {
        return this.assign({
            pages: this.pages.set(this.pages.indexOf(page), page)
        }).cloneWithPagesSorted();
    };
    State.prototype.replacePages = function (pages, sort) {
        if (sort === void 0) { sort = true; }
        var state = this.assign({ pages: pages });
        return sort ? state.cloneWithPagesSorted() : state;
    };
    State.prototype.replaceContainerPages = function (container, pages) {
        var isOutside = function (p) { return p.container !== container; };
        var outsidePages = this.pages.filter(isOutside).toList();
        var ps = outsidePages.concat(pages).toList();
        return this.replacePages(ps);
    };
    State.prototype.disallowDuplicateContainer = function (name) {
        if (this.containers.has(name)) {
            throw new Error("A group or container with name: '" + name + "' already exists");
        }
    };
    State.prototype.addTopLevelGroup = function (_a) {
        var name = _a.name, _b = _a.resetOnLeave, resetOnLeave = _b === void 0 ? false : _b, _c = _a.allowInterContainerHistory, allowInterContainerHistory = _c === void 0 ? false : _c, _d = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _d === void 0 ? false : _d;
        this.disallowDuplicateContainer(name);
        var group = new Group_1.default({
            name: name,
            resetOnLeave: resetOnLeave,
            gotoTopOnSelectActive: gotoTopOnSelectActive,
            allowInterContainerHistory: allowInterContainerHistory,
            parentGroup: undefined,
            isDefault: false
        });
        return this.replaceContainer(group);
    };
    State.prototype.addSubGroup = function (_a) {
        var name = _a.name, parentGroup = _a.parentGroup, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.allowInterContainerHistory, allowInterContainerHistory = _c === void 0 ? false : _c, _d = _a.resetOnLeave, resetOnLeave = _d === void 0 ? false : _d, _e = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _e === void 0 ? false : _e;
        this.disallowDuplicateContainer(name);
        var group = new Group_1.default({
            name: name,
            resetOnLeave: resetOnLeave,
            gotoTopOnSelectActive: gotoTopOnSelectActive,
            allowInterContainerHistory: allowInterContainerHistory,
            parentGroup: parentGroup,
            isDefault: isDefault
        });
        return this.replaceContainer(group);
    };
    State.prototype.addContainer = function (_a) {
        var time = _a.time, name = _a.name, group = _a.group, initialUrl = _a.initialUrl, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, patterns = _a.patterns;
        this.disallowDuplicateContainer(name);
        var container = new Container_1.default({
            initialUrl: initialUrl,
            patterns: patterns,
            resetOnLeave: resetOnLeave,
            group: group,
            name: name,
            isDefault: isDefault
        });
        var page = new VisitedPage_1.default({
            url: initialUrl,
            params: url_1.parseParamsFromPatterns(patterns, initialUrl),
            container: name,
            group: group
        });
        return this.replaceContainer(container)
            .pushInContainer(name, { page: page, time: time, type: PageVisit_1.VisitType.AUTO });
    };
    State.prototype.replaceWindow = function (w) {
        return this.assign({ windows: this.windows.set(w.forName, w) })
            .cloneWithPagesSorted();
    };
    State.prototype.setWindowVisibility = function (_a) {
        var forName = _a.forName, visible = _a.visible;
        if (this.hasWindow(forName)) {
            return this.replaceWindow(this.windows.get(forName).setVisible(visible));
        }
        else {
            return this;
        }
    };
    State.prototype.setParentWindowVisibility = function (_a) {
        var container = _a.container, visible = _a.visible;
        var state = this.hasWindow(container) ?
            this.setWindowVisibility({ forName: container, visible: visible }) : this;
        var parent = this.containers.get(container).group;
        return parent ?
            state.setParentWindowVisibility({ container: parent, visible: visible }) : state;
    };
    State.prototype.addWindow = function (_a) {
        var forName = _a.forName, _b = _a.visible, visible = _b === void 0 ? true : _b;
        var w = new HistoryWindow_1.default({ forName: forName, visible: visible });
        return this.replaceWindow(w);
    };
    Object.defineProperty(State.prototype, "history", {
        get: function () {
            return this.getHistory(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "historyWithFwdMaintained", {
        get: function () {
            return this.getHistory(true);
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.addTitle = function (_a) {
        var pathname = _a.pathname, title = _a.title;
        var existingTitle = this.getTitleForPath(pathname);
        return existingTitle ? this :
            this.assign({ titles: this.titles.push({ pathname: pathname, title: title }) });
    };
    State.prototype.getTitleForPath = function (pathname) {
        var found = this.titles.find(function (t) { return t.pathname === pathname; });
        return found && found.title;
    };
    State.prototype.hasTitleForPath = function (pathname) {
        return !!this.getTitleForPath(pathname);
    };
    Object.defineProperty(State.prototype, "activeTitle", {
        get: function () {
            return this.getTitleForPath(this.activeUrl);
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.touchPage = function (page, _a) {
        var time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
        return this.replacePage(page.touch({ time: time, type: type }));
    };
    State.prototype.load = function (_a) {
        var url = _a.url, time = _a.time;
        var state = this.setZeroPage(this.zeroPageUrl);
        return state.leafContainers.reduce(function (s, c) { return s.loadInContainer(c, { url: url, time: time }); }, state).assign({ isInitialized: true });
    };
    State.prototype.loadInContainer = function (c, _a) {
        var url = _a.url, time = _a.time;
        if (url_1.patternsMatch(c.patterns, url)) {
            var pages = this.getContainerPages(c.name);
            var activePage = pageUtils.getActivePage(pages);
            var newState = activePage && pageUtils.isAtTopPage(pages) && c.initialUrl !== url ?
                this.touchPage(activePage, { time: time - 1 }) : this;
            var page = new Page_1.default({
                url: url,
                params: url_1.parseParamsFromPatterns(c.patterns, url),
                container: c.name,
                group: c.group
            });
            return newState.pushInContainer(c.name, { page: page, time: time });
        }
        else {
            return this;
        }
    };
    State.prototype.isDefaultPage = function (page) {
        if (page.isZeroPage) {
            return false;
        }
        var c = this.leafContainers.get(page.container);
        return c.isDefault && c.initialUrl === page.url;
    };
    State.prototype.getLastContainerVisit = function (container) {
        return this.getContainerActivePage(container).lastVisit;
    };
    State.prototype.getFirstContainerVisitTime = function (c) {
        return this.getContainerPages(c.name).first().visits[0].time;
    };
    State.prototype.getFirstManualContainerVisit = function (container) {
        var ps = this.getContainerPages(container);
        var page = ps.find(function (p) { return p.wasManuallyVisited; });
        return page && page.firstManualVisit;
    };
    State.prototype.sortByLastVisit = function (cs) {
        var _this = this;
        return cs.sortBy(function (c) {
            var v = _this.getLastContainerVisit(c.name);
            return v ? 0 - v.time : 0;
        }).toList();
    };
    State.prototype.sortByFirstManualVisit = function (cs) {
        var _this = this;
        return cs.sort(function (c1, c2) {
            var v1 = _this.getFirstManualContainerVisit(c1.name);
            var v2 = _this.getFirstManualContainerVisit(c2.name);
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
        }).toList();
    };
    State.prototype._sortContainers = function (cs, fn) {
        return sorting_1.sort(cs, fn, this.wasManuallyVisited.bind(this), function (c) { return c.isDefault; });
    };
    State.prototype.sortContainers = function (cs, fn) {
        var _this = this;
        var enabled = cs.filter(function (c) {
            return _this.isContainerEnabled(c.name);
        }).toList();
        var disabled = cs.filterNot(function (c) {
            return _this.isContainerEnabled(c.name);
        }).toList();
        return this._sortContainers(enabled, fn).concat(this._sortContainers(disabled, fn)).toList();
    };
    State.prototype.sortPages = function (ps, fn) {
        var zeroPage = ps.find(function (p) { return p.isZeroPage; });
        var withoutZero = ps.filterNot(function (p) { return p.isZeroPage; }).toList();
        var fn2 = function (params) { return fn(__assign({}, params, { zeroPage: zeroPage })); };
        return sorting_1.sort(withoutZero, fn2, function (p) { return p.wasManuallyVisited; }, this.isDefaultPage.bind(this));
    };
    State.prototype.sortContainersByLastVisited = function (cs) {
        var _this = this;
        return this.sortContainers(cs, function (_a) {
            var visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
            return _this.sortByLastVisit(visited).concat(defaultUnvisited).concat(nonDefaultUnvisited).toList();
        });
    };
    State.prototype.sortContainersByFirstVisited = function (cs) {
        return cs.sortBy(this.getFirstContainerVisitTime.bind(this)).toList();
    };
    State.prototype.sortContainersByFirstManuallyVisited = function (cs) {
        var _this = this;
        return this.sortContainers(cs, function (_a) {
            var visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
            return defaultUnvisited.concat(_this.sortByFirstManualVisit(visited)).toList();
        });
    };
    State.prototype.sortPagesByFirstVisited = function (ps) {
        return this.sortPages(ps, function (_a) {
            var zeroPage = _a.zeroPage, visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
            var pages = pageUtils.sort(visited).concat(defaultUnvisited).concat(nonDefaultUnvisited).toList();
            return zeroPage ? pages.insert(0, zeroPage) : pages;
        });
    };
    State.createZeroPage = function (url) {
        return new VisitedPage_1.default({
            url: url,
            params: {},
            group: '',
            container: '',
            isZeroPage: true,
            visits: [{ time: -1, type: PageVisit_1.VisitType.AUTO }]
        });
    };
    Object.defineProperty(State.prototype, "hasZeroPage", {
        get: function () {
            return !this.pages.isEmpty() && this.pages.first().isZeroPage;
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.setZeroPage = function (url) {
        var zeroPage = State.createZeroPage(url);
        return this.assign({
            zeroPage: zeroPage,
            pages: immutable_1.List([
                zeroPage
            ].concat((this.hasZeroPage ? this.pages.slice(1) : this.pages).toArray()))
        });
    };
    Object.defineProperty(State.prototype, "zeroPage", {
        get: function () {
            return this.pages.first();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isOnZeroPage", {
        get: function () {
            return pageUtils.isOnZeroPage(this.pages);
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.getPages = function () {
        return this.isInitialized ? this.getHistory().flatten() : immutable_1.List();
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map