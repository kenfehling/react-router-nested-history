"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var R = require("ramda");
exports.createDeepEqualSelector = reselect_1.createSelectorCreator(reselect_1.defaultMemoize, R.equals);
exports.createCachingSelector = reselect_1.createSelectorCreator(R.memoize, R.equals);
exports.EMPTY_OBJ = {};
exports.getGroupName = function (_, ownProps) { return ownProps.groupName; };
exports.getGroup = function (state, ownProps) {
    return state.groups.get(ownProps.groupName);
};
exports.getContainer = function (state, ownProps) {
    return exports.getGroup(state, ownProps).containers.get(ownProps.containerName);
};
exports.getActiveGroupContainerName = function (state, ownProps) {
    return exports.getGroup(state, ownProps).activeContainerName;
};
exports.getBackPageInGroup = function (state, ownProps) {
    return exports.getGroup(state, ownProps).backPage;
};
exports.getIsGroupActive = function (state, ownProps) {
    return exports.getGroup(state, ownProps).name === state.activeGroupName;
};
exports.getIsInitialized = function (state) {
    return state.isInitialized;
};
exports.getLoadedFromRefresh = function (state) {
    return state.loadedFromRefresh;
};
exports.getPathname = function (state) {
    return state.activeUrl;
};
//# sourceMappingURL=selectors.js.map