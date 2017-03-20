"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./Container");
var R = require("ramda");
var Group_1 = require("./Group");
var VistedPage_1 = require("./VistedPage");
var PageVisit_1 = require("./PageVisit");
var immutable_1 = require("immutable");
var HistoryWindow_1 = require("./HistoryWindow");
var State = (function () {
    function State(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.groups, groups = _c === void 0 ? immutable_1.fromJS({}) : _c, zeroPage = _b.zeroPage, _d = _b.lastUpdate, lastUpdate = _d === void 0 ? 0 : _d, _e = _b.loadedFromRefresh, loadedFromRefresh = _e === void 0 ? false : _e, _f = _b.isOnZeroPage, isOnZeroPage = _f === void 0 ? false : _f, _g = _b.titles, titles = _g === void 0 ? [] : _g;
        this.groups = groups;
        this.zeroPage = zeroPage;
        this.lastUpdate = lastUpdate;
        this.loadedFromRefresh = loadedFromRefresh;
        this.isOnZeroPage = isOnZeroPage;
        this.titles = titles;
    }
    Object.defineProperty(State.prototype, "allComputedGroups", {
        get: function () {
            return (_a = immutable_1.fromJS({})).merge.apply(_a, [this.groups.map(function (g) { return g.computeState(); })].concat(this.groups.toArray().map(function (g) { return g.computeSubGroups(); })));
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "computedWindows", {
        get: function () {
            return this.groups.reduce(function (map, g) {
                return immutable_1.fromJS({}).merge(map, g.computeWindows());
            }, immutable_1.fromJS({}));
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.computeState = function () {
        return {
            isInitialized: this.isInitialized,
            loadedFromRefresh: this.loadedFromRefresh,
            activeUrl: this.activeUrl,
            groups: this.allComputedGroups,
            windows: this.computedWindows,
            activeGroupName: this.activeGroupName,
            lastUpdate: this.lastUpdate,
            pages: this.pages,
            activeTitle: this.activeTitle
        };
    };
    State.prototype.replaceGroup = function (group) {
        if (group.parentGroupName) {
            var parentGroup = this.getGroupByName(group.parentGroupName);
            return this.replaceGroup(parentGroup.replaceContainer(group));
        }
        else {
            return this.assign({
                groups: this.groups.set(group.name, group)
            });
        }
    };
    State.prototype.disallowDuplicateContainerOrGroup = function (name) {
        if (this.hasGroupOrContainerWithName(name)) {
            throw new Error("A group or container with name: '" + name + "' already exists");
        }
    };
    State.prototype.addTopLevelGroup = function (_a) {
        var name = _a.name, _b = _a.resetOnLeave, resetOnLeave = _b === void 0 ? false : _b, _c = _a.allowInterContainerHistory, allowInterContainerHistory = _c === void 0 ? false : _c, _d = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _d === void 0 ? false : _d;
        this.disallowDuplicateContainerOrGroup(name);
        var group = new Group_1.default({
            name: name,
            resetOnLeave: resetOnLeave,
            gotoTopOnSelectActive: gotoTopOnSelectActive,
            allowInterContainerHistory: allowInterContainerHistory,
            parentGroupName: '',
            isDefault: false
        });
        return this.replaceGroup(group);
    };
    State.prototype.addSubGroup = function (_a) {
        var name = _a.name, parentGroupName = _a.parentGroupName, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.allowInterContainerHistory, allowInterContainerHistory = _c === void 0 ? false : _c, _d = _a.resetOnLeave, resetOnLeave = _d === void 0 ? false : _d, _e = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _e === void 0 ? false : _e;
        this.disallowDuplicateContainerOrGroup(name);
        var group = new Group_1.default({
            name: name,
            resetOnLeave: resetOnLeave,
            gotoTopOnSelectActive: gotoTopOnSelectActive,
            allowInterContainerHistory: allowInterContainerHistory,
            parentGroupName: parentGroupName,
            isDefault: isDefault
        });
        return this.replaceGroup(group);
    };
    State.prototype.addContainer = function (_a) {
        var time = _a.time, name = _a.name, groupName = _a.groupName, initialUrl = _a.initialUrl, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, patterns = _a.patterns;
        this.disallowDuplicateContainerOrGroup(name);
        var group = this.getGroupByName(groupName);
        var container = new Container_1.default({
            time: time,
            initialUrl: initialUrl,
            patterns: patterns,
            resetOnLeave: resetOnLeave,
            groupName: groupName,
            name: name,
            isDefault: isDefault
        });
        return this.replaceGroup(group.replaceContainer(container));
    };
    State.prototype.setWindowVisibility = function (_a) {
        var forName = _a.forName, visible = _a.visible;
        var c = this.getContainerByName(forName);
        var group = this.getGroupByName(c.groupName);
        return this.replaceGroup(group.replaceContainer(c.setEnabled(visible)));
    };
    State.prototype.addWindow = function (_a) {
        var forName = _a.forName, _b = _a.visible, visible = _b === void 0 ? true : _b;
        var w = new HistoryWindow_1.default({ forName: forName });
        var c = this.getContainerByName(forName);
        var newContainer = c.replaceWindow(w).setEnabled(visible);
        var group = this.getGroupByName(c.groupName);
        return this.replaceGroup(group.replaceContainer(newContainer));
    };
    /**
     * Finds a group (top-level or subgroup) by its name
     */
    State.prototype.getGroupByName = function (name) {
        var g = this.groups.get(name);
        if (g) {
            return g;
        }
        else {
            var foundGroup_1 = null;
            this.groups.forEach(function (group) {
                var g = group.getNestedGroupByName(name);
                if (g) {
                    foundGroup_1 = g;
                    return;
                }
            });
            if (foundGroup_1) {
                return foundGroup_1;
            }
            else {
                throw new Error('Group \'' + name + '\' not found');
            }
        }
    };
    State.prototype.getContainerByName = function (name) {
        var foundContainer = null;
        this.groups.forEach(function (group) {
            var c = group.getNestedContainerByName(name);
            if (c) {
                foundContainer = c;
                return;
            }
        });
        if (foundContainer) {
            return foundContainer;
        }
        else {
            throw new Error('Container \'' + name + '\' not found');
        }
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
    State.prototype.hasGroupWithName = function (name) {
        try {
            this.getGroupByName(name);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    State.prototype.hasContainerWithName = function (name) {
        try {
            this.getContainerByName(name);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    State.prototype.hasGroupOrContainerWithName = function (name) {
        return this.hasGroupWithName(name) || this.hasContainerWithName(name);
    };
    State.prototype.addTitle = function (_a) {
        var pathname = _a.pathname, title = _a.title;
        var existingTitle = this.getTitleForPath(pathname);
        return existingTitle ? this :
            this.assign({ titles: this.titles.concat([{ pathname: pathname, title: title }]) });
    };
    State.prototype.getTitleForPath = function (pathname) {
        var found = R.find(function (t) { return t.pathname === pathname; }, this.titles);
        return found ? found.title : null;
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
    State.createZeroPage = function (url) {
        return new VistedPage_1.default({
            url: url,
            params: {},
            groupName: '',
            containerName: '',
            isZeroPage: true,
            visits: [{ time: -1, type: PageVisit_1.VisitType.AUTO }]
        });
    };
    /**
     * Gets the zero page, or if it's not set defaults to using
     * the initialUrl of the first container in the first group
     */
    State.prototype.getZeroPage = function () {
        return State.createZeroPage(this.zeroPage || this.groups.first().containers.first().initialUrl);
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map