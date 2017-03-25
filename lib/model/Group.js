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
var defaultBehavior = require("../behaviors/defaultBehavior");
var nonDefaultBehavior = require("../behaviors/nonDefaultBehavior");
var interContainerHistory = require("../behaviors/interContainerHistory");
var keepFwdTabBehavior = require("../behaviors/keepFwdTabBehavior");
var removeFwdTabBehavior = require("../behaviors/removeFwdTabBehavior");
var Container_1 = require("./Container");
var Pages_1 = require("./Pages");
var PageVisit_1 = require("./PageVisit");
var sorter_1 = require("../util/sorter");
var immutable_1 = require("immutable");
var Group = (function () {
    function Group(_a) {
        var name = _a.name, _b = _a.enabled, enabled = _b === void 0 ? true : _b, associatedWindow = _a.associatedWindow, _c = _a.containers, containers = _c === void 0 ? immutable_1.fromJS({}) : _c, _d = _a.allowInterContainerHistory, allowInterContainerHistory = _d === void 0 ? false : _d, _e = _a.resetOnLeave, resetOnLeave = _e === void 0 ? false : _e, _f = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _f === void 0 ? false : _f, _g = _a.parentGroupName, parentGroupName = _g === void 0 ? '' : _g, _h = _a.isDefault, isDefault = _h === void 0 ? false : _h;
        this.name = name;
        this.enabled = enabled;
        this.associatedWindow = associatedWindow;
        this.containers = containers;
        this.allowInterContainerHistory = allowInterContainerHistory;
        this.resetOnLeave = resetOnLeave;
        this.gotoTopOnSelectActive = gotoTopOnSelectActive;
        this.parentGroupName = parentGroupName;
        this.isDefault = isDefault;
    }
    Group.prototype.replaceContainer = function (container) {
        var groupName = container.groupName;
        if (groupName === this.name) {
            return new Group(__assign({}, Object(this), { containers: this.containers.set(container.name, container) }));
        }
        else {
            var group = this.getNestedGroupByName(groupName);
            if (!group) {
                throw new Error('Group \'' + groupName + '\' not found in ' + this.name);
            }
            var newGroup = group.replaceContainer(container);
            return this.replaceContainer(newGroup);
        }
    };
    Group.prototype.updatePages = function (pages) {
        return new Group(__assign({}, Object(this), { containers: this.containers.map(function (c) { return c.updatePages(pages); }) }));
    };
    Group.prototype.replaceWindow = function (w) {
        return new Group(__assign({}, Object(this), { associatedWindow: w }));
    };
    Group.getContainerHistory = function (c, keepFwd) {
        return c instanceof Group ? c.getHistory(keepFwd) : c.history;
    };
    Group.computeDefault = function (h, defaulT, from, to, keepFwd) {
        var fromHistory = Group.getContainerHistory(from, keepFwd);
        var toHistory = Group.getContainerHistory(to, keepFwd);
        if (defaulT) {
            if (from.isDefault) {
                return defaultBehavior.A_to_B(h, fromHistory, toHistory);
            }
            else {
                if (to.isDefault) {
                    return defaultBehavior.B_to_A(h, fromHistory, toHistory);
                }
                else {
                    var defaultHistory = Group.getContainerHistory(defaulT, keepFwd);
                    return defaultBehavior.B_to_C(h, defaultHistory, fromHistory, toHistory);
                }
            }
        }
        else {
            return nonDefaultBehavior.B_to_C(h, null, fromHistory, toHistory);
        }
    };
    Group.prototype.computeInterContainer = function (from, to, keepFwd) {
        var toHistory = Group.getContainerHistory(to, keepFwd);
        if (!from.isDefault && !to.isDefault && this.allowInterContainerHistory) {
            var fromHistory = Group.getContainerHistory(from, keepFwd);
            var sorted = sorter_1.sortContainersByFirstVisited([from, to]);
            if (sorted[0] === from) {
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
    Group.computeFwd = function (h, keepFwd, from, to) {
        var fromHistory = Group.getContainerHistory(from, keepFwd);
        var toHistory = Group.getContainerHistory(to, keepFwd);
        if (keepFwd && from.wasManuallyVisited) {
            var sorted = sorter_1.sortContainersByFirstVisited([from, to]);
            if (sorted[0] === from) {
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
    Group.prototype.computeHistory = function (from, to, keepFwd) {
        var defaulT = this.defaultContainer;
        var h1 = this.computeInterContainer(from, to, keepFwd);
        var h2 = Group.computeDefault(h1, defaulT, from, to, keepFwd);
        return Group.computeFwd(h2, keepFwd, from, to);
    };
    Group.getSingleHistory = function (container, keepFwd) {
        if (container instanceof Group) {
            return container.getHistory(keepFwd);
        }
        else {
            return container.history;
        }
    };
    Group.prototype.getHistory = function (keepFwd) {
        if (keepFwd === void 0) { keepFwd = false; }
        var containers = this.containerStackOrder.filter(function (c) { return c.wasManuallyVisited; });
        switch (containers.length) {
            case 0: return Group.getSingleHistory(this.activeContainer, keepFwd);
            case 1: return Group.getSingleHistory(containers[0], keepFwd);
            default: {
                var from = containers[1];
                var to = containers[0];
                return this.computeHistory(from, to, keepFwd);
            }
        }
    };
    Group.prototype.activateContainer = function (containerName, time) {
        var visit = { time: time, type: PageVisit_1.VisitType.MANUAL };
        var from = this.activeContainer;
        var to = this.getContainerByName(containerName);
        if (from === to) {
            return this.replaceContainer(to.activate(visit));
        }
        else {
            var group = from.resetOnLeave && from.name !== to.name ?
                this.replaceContainer(from.top(time, true)) : this;
            return group.replaceContainer(to.activate(__assign({}, visit, { time: visit.time + 1 })));
        }
    };
    Object.defineProperty(Group.prototype, "containerStackOrder", {
        get: function () {
            return sorter_1.sortContainersByLastVisited(this.containers.toArray());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "history", {
        get: function () {
            return this.getHistory();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "historyWithFwdMaintained", {
        get: function () {
            return this.getHistory(true);
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.loadFromUrl = function (url, time) {
        return new Group(__assign({}, Object(this), { containers: this.containers.map(function (c) { return c.loadFromUrl(url, time); }) }));
    };
    Group.prototype.patternsMatch = function (url) {
        return R.any(function (c) { return c.patternsMatch(url); }, this.containers.toArray());
    };
    Group.prototype.activate = function (visit) {
        var container = this.activeContainer.activate(visit);
        return this.setEnabled(true).replaceContainer(container);
    };
    Group.prototype.getContainerIndex = function (container) {
        return R.findIndex(function (c) { return c === container; }, this.containers.toArray());
    };
    Object.defineProperty(Group.prototype, "activeContainer", {
        get: function () {
            return this.containerStackOrder[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "activeContainerIndex", {
        get: function () {
            if (this.containers.size === 0) {
                return 0;
            }
            else {
                return this.getContainerIndex(this.containerStackOrder[0]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.isContainerActiveAndEnabled = function (containerName) {
        if (this.containers.size === 0) {
            return false;
        }
        else {
            var c = this.activeContainer;
            return c.name === containerName && c.enabled;
        }
    };
    Group.prototype.isNestedGroupActive = function (groupName) {
        var activeContainer = this.activeContainer;
        if (activeContainer instanceof Group) {
            if (activeContainer.name === groupName) {
                return true;
            }
            else if (activeContainer.hasNestedGroupWithName(groupName)) {
                return activeContainer.isNestedGroupActive(groupName);
            }
        }
        return false;
    };
    Object.defineProperty(Group.prototype, "activeNestedContainer", {
        get: function () {
            var activeContainer = this.activeContainer;
            if (activeContainer instanceof Container_1.default) {
                return activeContainer;
            }
            else if (activeContainer instanceof Group) {
                return activeContainer.activeNestedContainer;
            }
            else {
                throw new Error('activeContainer should be a Container or Group');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "defaultContainer", {
        get: function () {
            return R.find(function (c) { return c.isDefault; }, this.containers.toArray());
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.getActivePageInContainer = function (containerName) {
        return this.getContainerByName(containerName).activePage;
    };
    Object.defineProperty(Group.prototype, "activePage", {
        get: function () {
            return this.activeContainer.activePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "activeUrl", {
        get: function () {
            return this.activeContainer.activeUrl;
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.getActiveUrlInContainer = function (containerName) {
        return this.getActivePageInContainer(containerName).url;
    };
    Group.prototype.top = function (time, reset) {
        if (reset === void 0) { reset = false; }
        var container = this.activeContainer.top(time, reset);
        return this.replaceContainer(container);
    };
    Group.prototype.push = function (page, time, type) {
        if (type === void 0) { type = PageVisit_1.VisitType.MANUAL; }
        var groupName = page.groupName, containerName = page.containerName;
        if (groupName === this.name) {
            var container = this.getContainerByName(containerName);
            var newContainer = container.push(page, time, type);
            return this.replaceContainer(newContainer);
        }
        else {
            var group = this.getNestedGroupByName(groupName);
            if (!group) {
                throw new Error('Group \'' + groupName + '\' not found in ' + this.name);
            }
            var container = group.push(page, time, type);
            return this.setEnabled(true).replaceContainer(container);
        }
    };
    Object.defineProperty(Group.prototype, "activeContainerName", {
        get: function () {
            return this.activeContainer.name;
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.getShiftAmount = function (page) {
        return this.activeContainer.getShiftAmount(page);
    };
    Group.prototype.containsPage = function (page) {
        return this.activeContainer.containsPage(page);
    };
    /*
    private _go(goFn:GoFn, canGoFn:CanGoFn, n:number, time:number):Group {
      if (n === 0) {
        return this.activate(time)
      }
      const next = (g:Group):Group => g._go(goFn, canGoFn, n - 1, time)
      const container:IContainer = this.activeContainer
      if (canGoFn(container)) {
        return next(this.replaceContainer(goFn(container).activate(time)))
      }
      else {
        if (canGoFn(this)) {
          return this.replacePages(goFn(this.pages))
        }
        else {
          throw new Error('Cannot go ' + n + ' in that direction')
        }
      }
    }
    */
    Group.prototype._go = function (goFn, lengthFn, nextPageFn, n, time) {
        if (n === 0) {
            return this.activate({ time: time, type: PageVisit_1.VisitType.MANUAL });
        }
        var container = this.activeContainer;
        var containerLength = lengthFn(container);
        var amount = Math.min(n, containerLength);
        var group = this.replaceContainer(goFn(container, amount, time));
        var remainder = n - amount;
        if (remainder > 0) {
            if (lengthFn(group) >= remainder) {
                var nextContainer = nextPageFn(group).containerName;
                var newGroup = group.activateContainer(nextContainer, time + 1);
                if (remainder > 1) {
                    return this._go(goFn, lengthFn, nextPageFn, remainder - 1, time + 2);
                }
                else {
                    return newGroup;
                }
            }
            else {
                throw new Error('Cannot go ' + n + ' in that direction');
            }
        }
        else {
            return group;
        }
    };
    Group.prototype.forward = function (n, time) {
        if (n === void 0) { n = 1; }
        return this._go(function (c, n, t) { return c.forward(n, t); }, function (c) { return c.forwardLength; }, function (c) { return c.forwardPage; }, n, time);
    };
    Group.prototype.back = function (n, time) {
        if (n === void 0) { n = 1; }
        return this._go(function (c, n, t) { return c.back(n, t); }, function (c) { return c.backLength; }, function (c) { return c.backPage; }, n, time);
    };
    Group.prototype.go = function (n, time) {
        return n > 0 ? this.forward(n, time) : this.back(0 - n, time);
    };
    Object.defineProperty(Group.prototype, "backPage", {
        get: function () {
            return R.last(this.backPages);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "forwardPage", {
        get: function () {
            return this.forwardPages[0];
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.pages.canGoBack(n);
    };
    Group.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.pages.canGoForward(n);
    };
    Group.prototype.shiftTo = function (page, time) {
        return this.go(this.getShiftAmount(page), time);
    };
    Object.defineProperty(Group.prototype, "subGroups", {
        get: function () {
            return this.containers.filter(function (c) { return c instanceof Group; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "wasManuallyVisited", {
        get: function () {
            var c = this.activeContainer;
            return c ? c.wasManuallyVisited : false;
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.getNestedContainerByName = function (name) {
        var foundContainer = null;
        this.containers.forEach(function (container) {
            if (container.name === name) {
                foundContainer = container;
                return;
            }
            else if (container instanceof Group) {
                var c = container.getNestedContainerByName(name);
                if (c) {
                    foundContainer = c;
                    return;
                }
            }
        });
        return foundContainer;
    };
    Group.prototype.getNestedGroupByName = function (name) {
        var container = this.getNestedContainerByName(name);
        if (container && !(container instanceof Group)) {
            throw new Error("Found " + name + " but it's not a Group");
        }
        return container;
    };
    Group.prototype.hasNestedGroupWithName = function (name) {
        return !!this.getNestedGroupByName(name);
    };
    Group.prototype.hasNestedGroup = function (group) {
        return this.hasNestedGroupWithName(group.name);
    };
    Group.prototype.getContainerByName = function (name) {
        var c = this.containers.get(name);
        if (!c) {
            throw new Error("Container '" + name + "' not found in '" + this.name + "'");
        }
        else {
            return c;
        }
    };
    Group.prototype.hasContainerWithName = function (name) {
        return this.containers.has(name);
    };
    Group.prototype.hasNestedContainerWithName = function (name) {
        return !!this.getNestedContainerByName(name);
    };
    Group.prototype.hasNestedContainer = function (container) {
        return this.hasNestedContainerWithName(container.name);
    };
    Group.prototype.hasContainer = function (container) {
        return this.hasContainerWithName(container.name);
    };
    Object.defineProperty(Group.prototype, "hasEnabledContainers", {
        get: function () {
            return this.containers.some(function (c) { return c.enabled; });
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.getSubGroupHavingContainer = function (container) {
        return R.find(function (g) { return g.hasNestedContainer(container); }, this.subGroups.toArray());
    };
    Group.prototype.getSubGroupHavingContainerWithName = function (name) {
        return R.find(function (g) { return g.hasNestedContainerWithName(name); }, this.subGroups.toArray());
    };
    Object.defineProperty(Group.prototype, "isInitialized", {
        get: function () {
            return this.containers.size > 0 &&
                R.all(function (g) { return g.isInitialized; }, this.subGroups.toArray());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "initialUrl", {
        get: function () {
            var defaultContainer = this.defaultContainer;
            if (defaultContainer) {
                return defaultContainer.initialUrl;
            }
            else {
                return this.containers.first().initialUrl;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "groupName", {
        get: function () {
            return this.parentGroupName;
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.getContainerLinkUrl = function (containerName) {
        var activeContainer = this.activeContainer;
        var isActive = activeContainer && activeContainer.name === containerName;
        if (isActive && this.gotoTopOnSelectActive) {
            return activeContainer.initialUrl;
        }
        else {
            return this.getActiveUrlInContainer(containerName);
        }
    };
    Object.defineProperty(Group.prototype, "isAtTopPage", {
        get: function () {
            return this.activeContainer.isAtTopPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "patterns", {
        get: function () {
            return R.flatten(this.containers.toArray().map(function (c) { return c.patterns; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "pages", {
        get: function () {
            return new Pages_1.default(this.history.flatten(), false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "firstManualVisit", {
        get: function () {
            return this.pages.firstManualVisit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "lastVisit", {
        get: function () {
            return this.pages.lastVisit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "backPages", {
        get: function () {
            return this.containers.isEmpty() ? [] : this.history.back;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "forwardPages", {
        get: function () {
            return this.containers.isEmpty() ? [] : this.history.forward;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "backLength", {
        get: function () {
            return this.containers.isEmpty() ? 0 : this.history.back.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "forwardLength", {
        get: function () {
            return this.containers.isEmpty() ? 0 : this.history.forward.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "isGroup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.setEnabled = function (enabled) {
        return new Group(__assign({}, Object(this), { enabled: enabled }));
    };
    Group.prototype.computeState = function () {
        if (this.containers.isEmpty()) {
            throw new Error("Group '" + this.name + "' has no containers");
        }
        return {
            name: this.name,
            enabled: this.enabled,
            isTopLevel: !this.parentGroupName,
            containers: immutable_1.fromJS(this.containers.map(function (c) { return c.computeState(); })),
            stackOrder: this.containerStackOrder.map(function (c) { return c.computeState(); }),
            activeContainerIndex: this.activeContainerIndex,
            activeContainerName: this.activeContainerName,
            activeUrl: this.activeUrl,
            backPage: this.backPage,
            history: this.history
        };
    };
    Group.prototype.computeSubGroups = function () {
        return immutable_1.fromJS(this.subGroups.map(function (g) { return g.computeState(); }));
    };
    Group.prototype.computeWindow = function (parentVisible) {
        return {
            forName: this.name,
            visible: parentVisible && this.enabled
        };
    };
    Group.prototype._computeWindows = function (parentVisible) {
        if (this.associatedWindow) {
            return immutable_1.fromJS({}).set(this.name, this.computeWindow(parentVisible));
        }
        else {
            return immutable_1.fromJS({});
        }
    };
    Group.prototype.computeWindows = function (parentVisible) {
        var _this = this;
        if (parentVisible === void 0) { parentVisible = true; }
        return immutable_1.fromJS({}).merge(this._computeWindows(parentVisible), this.containers.reduce(function (map, c) {
            return immutable_1.fromJS({}).merge(map, c.computeWindows(parentVisible && _this.enabled));
        }, immutable_1.fromJS({})));
    };
    return Group;
}());
exports.default = Group;
//# sourceMappingURL=Group.js.map