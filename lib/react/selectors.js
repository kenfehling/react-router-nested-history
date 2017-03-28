"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("../reselect");
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
exports.getIsInitializedAndLoadedFromRefresh = exports.createDeepEqualSelector(getIsInitialized, getLoadedFromRefresh, function (isInitialized, loadedFromRefresh) { return ({ isInitialized: isInitialized, loadedFromRefresh: loadedFromRefresh }); });
exports.getGroup = reselect_1.createReselector(exports.getGroupName, exports.getGroups, function (name, groups) {
    var group = groups.get(name);
    if (!group) {
        throw new Error("Group '" + name + "' not found");
    }
    else {
        return group;
    }
})(function (state, props) { return props.groupName; });
exports.getGroupOrContainerFromGroupName = reselect_1.createReselector(exports.getGroupName, exports.getGroupsAndContainers, function (name, groupsAndContainers) {
    var gc = groupsAndContainers.get(name);
    if (!gc) {
        throw new Error("Group or container '" + name + "' not found");
    }
    else {
        return gc;
    }
})(function (state, props) { return props.groupName; });
exports.getGroupOrContainerFromContainerName = reselect_1.createReselector(exports.getContainerName, exports.getGroupsAndContainers, function (name, groupsAndContainers) {
    var gc = groupsAndContainers.get(name);
    if (!gc) {
        throw new Error("Group or container '" + name + "' not found");
    }
    else {
        return gc;
    }
})(function (state, props) { return props.containerName; });
exports.getContainer = reselect_1.createReselector(exports.getContainerName, exports.getContainers, function (name, containers) {
    var container = containers.get(name);
    if (!container) {
        throw new Error("Container '" + name + "' not found");
    }
    else {
        return container;
    }
})(function (state, props) { return props.containerName; });
exports.getBackPageInGroup = reselect_1.createReselector(exports.getGroupOrContainerFromGroupName, function (group) { return group.backPage; })(function (state, props) { return props.groupName; });
exports.getIsActiveInGroup = reselect_1.createReselector(exports.getContainer, function (container) { return container.isActiveInGroup; })(function (state, props) { return props.containerName; });
exports.getMatchesCurrentUrl = reselect_1.createReselector(exports.getContainer, function (container) { return container.matchesCurrentUrl; })(function (state, props) { return props.containerName; });
exports.getContainerActiveUrl = reselect_1.createReselector(exports.getGroupOrContainerFromContainerName, function (container) {
    return container.activeUrl;
})(function (state, props) { return props.containerName; });
//# sourceMappingURL=selectors.js.map