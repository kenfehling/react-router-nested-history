"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("./State");
var Pages_1 = require("./Pages");
var PageVisit_1 = require("./PageVisit");
var sorter_1 = require("../util/sorter");
var InitializedState = (function (_super) {
    __extends(InitializedState, _super);
    function InitializedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InitializedState.prototype, "pages", {
        get: function () {
            return this.history.toPages();
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.assign = function (obj) {
        return new InitializedState(__assign({}, Object(this), obj));
    };
    Object.defineProperty(InitializedState.prototype, "isInitialized", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.switchToGroup = function (_a) {
        var groupName = _a.groupName, time = _a.time;
        var group = this.getGroupByName(groupName);
        return this
            .replaceGroup(group.activate({ time: time, type: PageVisit_1.VisitType.MANUAL }));
    };
    InitializedState.prototype.switchToContainer = function (_a) {
        var groupName = _a.groupName, name = _a.name, time = _a.time;
        var group = this.getGroupByName(groupName);
        var c = group.activateContainer(name, time);
        return this
            .replaceGroup(c)
            .openWindow(name);
    };
    InitializedState.prototype.openWindow = function (forName) {
        return this.setWindowVisibility({ forName: forName, visible: true });
    };
    InitializedState.prototype.closeWindow = function (forName, time) {
        var container = this.getContainerByName(forName);
        var groupName = container.groupName;
        var state = this.setWindowVisibility({ forName: forName, visible: false });
        var group = state.getGroupByName(groupName);
        if (group.hasEnabledContainers) {
            return state.switchToGroup({ groupName: groupName, time: time });
        }
        else {
            return state.back(1, time);
        }
    };
    InitializedState.prototype.go = function (n, time) {
        var _this = this;
        if (this.isOnZeroPage && n > 0) {
            var state = this.assign({ isOnZeroPage: false });
            return state.go(n - 1, time);
        }
        var f = function (x) { return _this.replaceGroup(_this.activeGroup.go(x, time)); };
        if (n < 0 && !this.canGoBack(0 - n)) {
            return (n < -1 ? f(n + 1) : this).assign({ isOnZeroPage: true });
        }
        else {
            return f(n);
        }
    };
    InitializedState.prototype.back = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.go(0 - n, time);
    };
    InitializedState.prototype.forward = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.go(n, time);
    };
    InitializedState.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.activeGroup.canGoBack(n);
    };
    InitializedState.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.activeGroup.canGoForward(n);
    };
    InitializedState.prototype.isContainerAtTopPage = function (groupName, containerName) {
        var container = this.getContainer(groupName, containerName);
        return container.isAtTopPage;
    };
    InitializedState.prototype.top = function (_a) {
        var groupName = _a.groupName, containerName = _a.containerName, time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
        var group = this.getGroupByName(groupName);
        var container = group.getContainerByName(containerName);
        return this.replaceGroup(group.replaceContainer(container.top(time, reset)));
    };
    InitializedState.prototype.getShiftAmount = function (page) {
        return this.pages.getShiftAmount(page);
    };
    InitializedState.prototype.containsPage = function (page) {
        return this.pages.containsPage(page);
    };
    InitializedState.prototype.getRootGroupOfGroupByName = function (name) {
        var group = this.getGroupByName(name);
        if (group.parentGroupName) {
            return this.getRootGroupOfGroupByName(group.parentGroupName);
        }
        else {
            return group;
        }
    };
    InitializedState.prototype.getRootGroupOfGroup = function (group) {
        return this.getRootGroupOfGroupByName(group.name);
    };
    InitializedState.prototype.push = function (page, time) {
        var group = this.getRootGroupOfGroupByName(page.groupName);
        return this.replaceGroup(group.push(page, time, PageVisit_1.VisitType.MANUAL));
    };
    InitializedState.prototype.getHistory = function (maintainFwd) {
        if (maintainFwd === void 0) { maintainFwd = false; }
        var g = this.activeGroup;
        var groupHistory = maintainFwd ? g.historyWithFwdMaintained : g.history;
        if (this.isOnZeroPage) {
            return new Pages_1.HistoryStack({
                back: [],
                current: this.getZeroPage(),
                forward: groupHistory.flatten()
            });
        }
        else {
            return new Pages_1.HistoryStack(__assign({}, groupHistory, { back: [this.getZeroPage()].concat(groupHistory.back) }));
        }
    };
    Object.defineProperty(InitializedState.prototype, "groupStackOrder", {
        get: function () {
            return sorter_1.sortContainersByLastVisited(this.groups.toArray());
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.getBackPageInGroup = function (groupName) {
        return this.getGroupByName(groupName).backPage;
    };
    InitializedState.prototype.getActiveContainerNameInGroup = function (groupName) {
        return this.getGroupByName(groupName).activeContainerName;
    };
    InitializedState.prototype.getActiveContainerIndexInGroup = function (groupName) {
        return this.getGroupByName(groupName).activeContainerIndex;
    };
    InitializedState.prototype.getActivePageInGroup = function (groupName) {
        return this.getGroupByName(groupName).activePage;
    };
    InitializedState.prototype.getActiveUrlInGroup = function (groupName) {
        return this.getActivePageInGroup(groupName).url;
    };
    InitializedState.prototype.urlMatchesGroup = function (url, groupName) {
        return this.getGroupByName(groupName).patternsMatch(url);
    };
    Object.defineProperty(InitializedState.prototype, "activePage", {
        get: function () {
            return this.activeGroup.activePage;
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.isContainerActiveAndEnabled = function (groupName, containerName) {
        return this.getGroupByName(groupName).isContainerActiveAndEnabled(containerName);
    };
    Object.defineProperty(InitializedState.prototype, "activeUrl", {
        get: function () {
            return this.activePage.url;
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.getActivePageInContainer = function (groupName, containerName) {
        return this.getGroupByName(groupName).getActivePageInContainer(containerName);
    };
    InitializedState.prototype.getActiveUrlInContainer = function (groupName, containerName) {
        return this.getActivePageInContainer(groupName, containerName).url;
    };
    InitializedState.prototype.isGroupActive = function (groupName) {
        var activeGroup = this.activeGroup;
        if (activeGroup.name === groupName) {
            return true;
        }
        else {
            if (this.activeGroup.hasNestedGroupWithName(groupName)) {
                return this.activeGroup.isNestedGroupActive(groupName);
            }
        }
        return false;
    };
    Object.defineProperty(InitializedState.prototype, "activeGroup", {
        get: function () {
            return this.groupStackOrder[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitializedState.prototype, "activeContainer", {
        get: function () {
            return this.activeGroup.activeContainer;
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.getContainer = function (groupName, containerName) {
        return this.getGroupByName(groupName).getContainerByName(containerName);
    };
    InitializedState.prototype.getContainerNameByIndex = function (groupName, index) {
        var group = this.getGroupByName(groupName);
        var container = group.containers.toArray()[index];
        if (container) {
            return container.name;
        }
        else {
            throw new Error("No container found at index " + index + " in '" + groupName + "' " +
                ("(size: " + group.containers.size + ")"));
        }
    };
    InitializedState.prototype.isActiveContainer = function (groupName, containerName) {
        var c = this.activeContainer;
        return c.groupName === groupName && c.name === containerName;
    };
    InitializedState.prototype.getContainerStackOrderForGroup = function (groupName) {
        return this.getGroupByName(groupName).containerStackOrder;
    };
    Object.defineProperty(InitializedState.prototype, "activeGroupName", {
        get: function () {
            return this.activeGroup.name;
        },
        enumerable: true,
        configurable: true
    });
    return InitializedState;
}(State_1.default));
exports.default = InitializedState;
//# sourceMappingURL=InitializedState.js.map