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
var reselect_1 = require("reselect");
var re_reselect_1 = require("re-reselect");
var R = require("ramda");
exports.createDeepEqualSelector = reselect_1.createSelectorCreator(reselect_1.defaultMemoize, R.equals);
exports.createCachingSelector = reselect_1.createSelectorCreator(R.memoize, R.identical);
exports.EMPTY_OBJ = {};
//export const getState = (state) => state
exports.getDispatch = function (dispatch) { return dispatch; };
exports.getGroupName = function (state, props) { return props.groupName; };
exports.getContainerName = function (state, props) { return props.containerName; };
exports.getGroups = function (state) { return state.groups; };
exports.getContainers = function (state) { return state.containers; };
exports.getGroupsAndContainers = function (state) {
    return state.groupsAndContainers;
};
var getIsInitialized = function (state) { return state.isInitialized; };
var getLoadedFromRefresh = function (state) { return state.loadedFromRefresh; };
exports.getIsInitializedAndLoadedFromRefresh = reselect_1.createSelector(getIsInitialized, getLoadedFromRefresh, function (isInitialized, loadedFromRefresh) { return ({ isInitialized: isInitialized, loadedFromRefresh: loadedFromRefresh }); });
exports.getGroup = re_reselect_1.default(exports.getGroupName, exports.getGroups, function (name, groups) {
    var group = groups.get(name);
    if (!group) {
        throw new Error("Group '" + name + "' not found");
    }
    else {
        return group;
    }
})(function (state, props) { return props.groupName; });
exports.getGroupOrContainerFromGroupName = re_reselect_1.default(exports.getGroupName, exports.getGroupsAndContainers, function (name, groupsAndContainers) {
    var gc = groupsAndContainers.get(name);
    if (!gc) {
        throw new Error("Group or container '" + name + "' not found");
    }
    else {
        return gc;
    }
})(function (state, props) { return props.groupName; });
exports.getGroupOrContainerFromContainerName = re_reselect_1.default(exports.getContainerName, exports.getGroupsAndContainers, function (name, groupsAndContainers) {
    var gc = groupsAndContainers.get(name);
    if (!gc) {
        throw new Error("Group or container '" + name + "' not found");
    }
    else {
        return gc;
    }
})(function (state, props) { return props.containerName; });
exports.getContainer = re_reselect_1.default(exports.getContainerName, exports.getContainers, function (name, containers) {
    var container = containers.get(name);
    if (!container) {
        throw new Error("Container '" + name + "' not found");
    }
    else {
        return container;
    }
})(function (state, props) { return props.containerName; });
exports.getBackPageInGroup = re_reselect_1.default(exports.getGroupOrContainerFromGroupName, function (group) { return group.backPage; })(function (state, props) { return props.groupName; });
exports.getIsActiveInGroup = re_reselect_1.default(exports.getContainer, function (container) { return container.isActiveInGroup; })(function (state, props) { return props.containerName; });
exports.getMatchesCurrentUrl = re_reselect_1.default(exports.getContainer, function (container) { return container.matchesCurrentUrl; })(function (state, props) { return props.containerName; });
exports.getContainerActiveUrl = re_reselect_1.default(exports.getGroupOrContainerFromContainerName, function (container) { return container.activeUrl; })(function (state, props) { return props.containerName; });
exports.getForName = function (state, props) { return props.forName; };
var getWindows = function (state) { return state.windows; };
var getPositions = function (state) { return state.windowPositions; };
exports.getWindow = re_reselect_1.default(exports.getForName, getWindows, getPositions, function (forName, ws, ps) { return (__assign({}, ws.get(forName), { position: ps[forName] })); })(function (state, props) { return props.forName; });
exports.hasAssociatedWindow = re_reselect_1.default(exports.getForName, getWindows, function (forName, ws) { return ws.has(forName); });
//# sourceMappingURL=selectors.js.map