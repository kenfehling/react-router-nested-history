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
var VistedPage_1 = require("./VistedPage");
var pageUtils = require("../util/pages");
var Container_1 = require("./Container");
var HistoryWindow_1 = require("./HistoryWindow");
var HistoryStack_1 = require("./HistoryStack");
var url_1 = require("../util/url");
var State = (function () {
    function State(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.windows, windows = _c === void 0 ? immutable_1.fromJS({}) : _c, _d = _b.containers, containers = _d === void 0 ? immutable_1.OrderedMap() : _d, _e = _b.pages, pages = _e === void 0 ? immutable_1.fromJS({}) : _e, zeroPage = _b.zeroPage, _f = _b.isOnZeroPage, isOnZeroPage = _f === void 0 ? false : _f, _g = _b.titles, titles = _g === void 0 ? immutable_1.fromJS([]) : _g, _h = _b.isInitialized, isInitialized = _h === void 0 ? false : _h;
        this.containers = containers;
        this.windows = windows;
        this.pages = pages;
        this.zeroPage = zeroPage;
        this.isOnZeroPage = isOnZeroPage;
        this.titles = titles;
        this.isInitialized = isInitialized;
    }
    Object.defineProperty(State.prototype, "computedGroupsAndContainers", {
        get: function () {
            var _this = this;
            return this.containers.reduce(function (map, c) {
                return map.set(c.name, {
                    name: c.name,
                    activeUrl: _this.getContainerActiveUrl(c.name),
                    backPage: _this.getContainerBackPage(c.name),
                    history: _this.getContainerHistory(c.name)
                });
            }, immutable_1.fromJS({}));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "computedGroups", {
        get: function () {
            var _this = this;
            return this.groups.reduce(function (map, g) {
                return map.set(g.name, {
                    name: g.name,
                    isTopLevel: !g.group,
                    activeContainerIndex: _this.getGroupActiveContainerIndex(g.name),
                    activeContainerName: _this.getGroupActiveContainerName(g.name)
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
            return this.leafContainers.reduce(function (map, c) {
                return map.set(c.name, {
                    name: c.name,
                    isActiveInGroup: _this.getGroupActiveContainerName(c.group) === c.name,
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
            groupsAndContainers: this.computedGroupsAndContainers,
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
                var activeContainer = this.getGroupActiveContainerName(group);
                return this.getSingleHistory(activeContainer, keepFwd);
            }
            case 1: {
                return this.getSingleHistory(cs.get(0).name, keepFwd);
            }
            default: {
                var from = cs.get(1);
                var to = cs.get(0);
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
    State.prototype.switchToGroup = function (_a) {
        var name = _a.name, time = _a.time;
        var c = this.getGroupActiveContainer(name);
        return this.activateContainer(c.name, time);
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
        var groupName = container.group;
        if (!groupName) {
            throw new Error('Window must be inside a WindowGroup');
        }
        var state = this.setWindowVisibility({ forName: forName, visible: false });
        var group = this.groups.get(groupName);
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
        return this.getGroupContainerNames(group.name)
            .some(this.isContainerEnabled.bind(this));
    };
    State.prototype.activateContainer = function (container, time, type) {
        if (type === void 0) { type = PageVisit_1.VisitType.MANUAL; }
        if (this.isContainerActive(container)) {
            return this;
        }
        else {
            var from = this.activeContainer;
            var state = from.resetOnLeave ?
                this.top({ time: time - 1, reset: true }) : this;
            var newActivePage = this.getContainerActivePage(container);
            return state.replacePage(newActivePage.touch({ time: time, type: type }));
        }
    };
    State.prototype.go = function (_a) {
        var _this = this;
        var n = _a.n, time = _a.time, container = _a.container;
        if (container) {
            return this.activateContainer(container, time).go({ n: n, time: time });
        }
        if (this.isOnZeroPage && n > 0) {
            var state = this.assign({ isOnZeroPage: false });
            return state.go({ n: n - 1, time: time });
        }
        var f = function (x) { return _this.goInContainer(_this.activeGroupName, { n: x, time: time }); };
        if (n < 0 && this.activeIndex === 1) {
            return this.assign({ isOnZeroPage: true });
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
        var ps = pageUtils.top(this.getContainerPages(container), { time: time, reset: reset });
        return this.replaceContainerPages(container, ps);
    };
    State.prototype.getShiftAmount = function (page) {
        return pageUtils.getShiftAmount(this.getPages(), page);
    };
    State.prototype.cloneWithPagesSorted = function () {
        return this.replacePages(this.sortPagesByFirstVisited(this.pages));
    };
    State.prototype.push = function (_a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
        return this.pushInContainer(this.activeContainerName, { page: page, time: time, type: type });
    };
    State.prototype.pushInContainer = function (container, _a) {
        var page = _a.page, time = _a.time, _b = _a.type, type = _b === void 0 ? PageVisit_1.VisitType.MANUAL : _b;
        var containerPages = this.getContainerPages(container);
        var newPages = pageUtils.push(containerPages, { page: page, time: time, type: type });
        return this.replaceContainerPages(container, newPages);
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
            return this.getRootGroupOfGroup(this.activePage.group);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "activeGroupName", {
        get: function () {
            return this.activeGroup.name;
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.getHistory = function (maintainFwd) {
        if (maintainFwd === void 0) { maintainFwd = false; }
        var groupHistory = this.getGroupHistory(this.activeGroupName, maintainFwd);
        if (this.isOnZeroPage) {
            return new HistoryStack_1.default({
                back: [],
                current: this.getZeroPage(),
                forward: groupHistory.flatten().toArray()
            });
        }
        else {
            return new HistoryStack_1.default(__assign({}, groupHistory, { back: [this.getZeroPage()].concat(groupHistory.back) }));
        }
    };
    Object.defineProperty(State.prototype, "activeContainer", {
        get: function () {
            return this.getGroupActiveLeafContainer(this.activeGroupName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "activeContainerName", {
        get: function () {
            return this.activeContainer.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "groupStackOrder", {
        get: function () {
            var _this = this;
            return this.groups.sortBy(function (g) {
                var activeContainer = _this.getGroupActiveContainerName(g.name);
                return 0 - _this.getLastContainerVisit(activeContainer).time;
            }).toList();
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.getGroupActiveContainer = function (group) {
        return this.getContainerStackOrder(group).first(); // TODO: Optimize?
    };
    State.prototype.getGroupActiveContainerName = function (group) {
        return this.getGroupActiveContainer(group).name;
    };
    State.prototype.getGroupActiveContainerIndex = function (group) {
        return this.getContainerIndex(this.getGroupActiveContainer(group));
    };
    State.prototype.getGroupActiveLeafContainer = function (group) {
        var name = this.getGroupActiveLeafContainerName(group);
        return this.containers.get(name);
    };
    State.prototype.getGroupActiveLeafContainerName = function (group) {
        return this.getContainerActivePage(group).container;
    };
    State.prototype.getGroupActiveLeafContainerIndex = function (group) {
        return this.getContainerIndex(this.getGroupActiveLeafContainer(group));
    };
    Object.defineProperty(State.prototype, "activePage", {
        get: function () {
            return pageUtils.getActivePage(this.pages);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "activeIndex", {
        get: function () {
            return pageUtils.getActiveIndex(this.getPages());
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
            return this.isContainerActive(this.getGroupActiveContainerName(name));
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
    State.prototype.getGroupDefaultContainer = function (group) {
        return this.getGroupContainers(group).find(function (c) { return c.isDefault; });
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
        });
    };
    State.prototype.replacePages = function (pages) {
        return this.assign({ pages: pages });
    };
    State.prototype.replaceContainerPages = function (container, pages) {
        var isOutside = function (p) { return p.container !== container; };
        var outsidePages = this.pages.filter(isOutside).toList();
        var ps = outsidePages.concat(pages).toList();
        return this.replacePages(ps).cloneWithPagesSorted();
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
        var page = new VistedPage_1.default({
            url: initialUrl,
            params: url_1.parseParamsFromPatterns(patterns, initialUrl),
            container: name,
            group: group
        });
        return this.replaceContainer(container)
            .pushInContainer(name, { page: page, time: time, type: PageVisit_1.VisitType.AUTO });
    };
    State.prototype.replaceWindow = function (w) {
        return this.assign({ windows: this.windows.set(w.forName, w) });
    };
    State.prototype.setWindowVisibility = function (_a) {
        var forName = _a.forName, visible = _a.visible;
        return this.replaceWindow(this.windows.get(forName).setVisible(visible))
            .cloneWithPagesSorted();
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
        return found ? found.title : undefined;
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
        return this.leafContainers.reduce(function (s, c) { return s.loadInContainer(c, { url: url, time: time }); }, this).assign({ isInitialized: true });
    };
    State.prototype.loadInContainer = function (c, _a) {
        var url = _a.url, time = _a.time;
        if (url_1.patternsMatch(c.patterns, url)) {
            var pages = this.getContainerPages(c.name);
            var activePage = pageUtils.getActivePage(pages);
            var newState = pageUtils.isAtTopPage(pages) && c.initialUrl !== url ?
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
        return page ? page.firstManualVisit : undefined;
    };
    State.prototype.sortByLastVisit = function (cs) {
        var _this = this;
        return cs.sortBy(function (c) {
            return 0 - _this.getLastContainerVisit(c.name).time;
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
    State.prototype._sort = function (items, fn, wasVisitedFn, isDefaultFn) {
        var unvisited = items.filterNot(wasVisitedFn).toList();
        return fn({
            visited: items.filter(wasVisitedFn).toList(),
            defaultUnvisited: unvisited.filter(isDefaultFn).toList(),
            nonDefaultUnvisited: unvisited.filterNot(isDefaultFn).toList()
        });
    };
    State.prototype._sortContainers = function (cs, fn) {
        return this._sort(cs, fn, this.wasManuallyVisited.bind(this), function (c) { return c.isDefault; });
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
        return this._sort(ps, fn, function (p) { return p.wasManuallyVisited; }, this.isDefaultPage.bind(this));
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
            var visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
            return pageUtils.sort(visited).concat(defaultUnvisited).concat(nonDefaultUnvisited).toList();
        });
    };
    State.createZeroPage = function (url) {
        return new VistedPage_1.default({
            url: url,
            params: {},
            group: '',
            container: '',
            isZeroPage: true,
            visits: [{ time: -1, type: PageVisit_1.VisitType.AUTO }]
        });
    };
    /**
     * Gets the zero page, or if it's not set
     * it defaults to using the initialUrl of the first container
     */
    State.prototype.getZeroPage = function () {
        return State.createZeroPage(this.zeroPage || this.leafContainers.first().initialUrl);
    };
    State.prototype.getPages = function () {
        return this.isInitialized ? this.getHistory().flatten() : immutable_1.List();
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map