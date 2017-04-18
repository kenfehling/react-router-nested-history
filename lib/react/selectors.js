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
var memoize = require("lodash/memoize");
var last = require("lodash/last");
var UpdateBrowser_1 = require("../model/actions/UpdateBrowser");
var AddTitle_1 = require("../model/actions/AddTitle");
/*
export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)
*/
exports.createCachingSelector = reselect_1.createSelectorCreator(memoize, function (a, b) { return a === b; });
exports.EMPTY_OBJ = {};
exports.getDispatch = function (dispatch) { return dispatch; };
exports.getGroupName = function (state, props) { return props.groupName; };
exports.getContainerName = function (state, props) { return props.containerName; };
exports.getLastAction = function (state) { return last(state.actions.filter(function (a) {
    return !(a instanceof UpdateBrowser_1.default) && !(a instanceof AddTitle_1.default);
})); };
exports.getIsInitialized = function (state) { return state.isInitialized; };
exports.getLoadedFromPersist = function (state) { return state.loadedFromPersist; };
var getContainers = function (state) { return state.containers; };
var getGroups = function (state) { return state.groups; };
var getWindows = function (state) { return state.windows; };
var getPositions = function (state) { return state.windowPositions; };
exports.getGroup = re_reselect_1.default(exports.getGroupName, getGroups, exports.getIsInitialized, function (name, groups, isInitialized) {
    if (isInitialized) {
        var group = groups.get(name);
        if (!group) {
            throw new Error("Group '" + name + "' not found");
        }
        else {
            return group;
        }
    }
    else {
        return undefined;
    }
})(function (state, props) { return props.groupName; });
exports.getContainerFromGroupName = re_reselect_1.default(exports.getGroupName, getContainers, exports.getIsInitialized, function (name, groupsAndContainers, isInitialized) {
    if (isInitialized) {
        var gc = groupsAndContainers.get(name);
        if (!gc) {
            throw new Error("Group or container '" + name + "' not found");
        }
        else {
            return gc;
        }
    }
    else {
        return undefined;
    }
})(function (state, props) { return props.groupName; });
exports.getContainer = re_reselect_1.default(exports.getContainerName, getContainers, exports.getIsInitialized, function (name, containers, isInitialized) {
    if (isInitialized) {
        var container = containers.get(name);
        if (!container) {
            throw new Error("Container '" + name + "' not found");
        }
        else {
            return container;
        }
    }
    else {
        return undefined;
    }
})(function (state, props) { return props.containerName; });
exports.getCurrentContainerIndex = re_reselect_1.default(exports.getGroup, function (group) { return group ? group.activeContainerIndex : undefined; })(function (state, props) { return props.groupName; });
exports.getCurrentContainerName = re_reselect_1.default(exports.getGroup, function (group) { return group ? group.activeContainerName : undefined; })(function (state, props) { return props.groupName; });
exports.getBackPageInGroup = re_reselect_1.default(exports.getContainerFromGroupName, function (group) { return group ? group.backPage : undefined; })(function (state, props) { return props.groupName; });
exports.getIsActiveInGroup = re_reselect_1.default(exports.getContainer, function (container) { return container ? container.isActiveInGroup : false; })(function (state, props) { return props.containerName; });
exports.getMatchesCurrentUrl = re_reselect_1.default(exports.getContainer, function (container) { return container ? container.matchesCurrentUrl : false; })(function (state, props) { return props.containerName; });
exports.getContainerActiveUrl = re_reselect_1.default(exports.getContainer, function (container) { return container ? container.activeUrl : undefined; })(function (state, props) { return props.containerName; });
exports.getShouldGoToTop = re_reselect_1.default(exports.getContainer, exports.getGroup, function (container, group) {
    return group && group.gotoTopOnSelectActive &&
        container && container.isActiveInGroup;
})(function (state, props) { return props.containerName; });
exports.getHeaderLinkUrl = re_reselect_1.default(exports.getContainer, exports.getGroup, exports.getShouldGoToTop, function (container, shouldGoToTop) {
    return container ?
        (shouldGoToTop ? container.initialUrl : container.activeUrl) :
        undefined;
})(function (state, props) { return props.containerName; });
exports.getWindow = re_reselect_1.default(exports.getContainerName, getWindows, getPositions, function (containerName, ws, ps) {
    if (ws) {
        var w = ws.get(containerName);
        if (w) {
            return __assign({}, w, { position: ps[containerName] });
        }
    }
})(function (state, props) { return props.containerName; });
exports.getHasWindow = re_reselect_1.default(exports.getWindow, function (w) { return !!w; })(function (state, props) { return props.containerName; });
exports.getWindowVisible = re_reselect_1.default(exports.getWindow, function (w) { return w ? w.visible : false; })(function (state, props) { return props.containerName; });
exports.getWindowPosition = re_reselect_1.default(exports.getWindow, function (w) { return w ? w.position : { x: 0, y: 0 }; })(function (state, props) { return props.containerName; });
exports.getWindowZIndex = re_reselect_1.default(exports.getWindow, function (w) { return w ? w.zIndex : 1; })(function (state, props) { return props.containerName; });
exports.getWindowIsOnTop = re_reselect_1.default(exports.getWindow, function (w) { return w ? w.isOnTop : false; })(function (state, props) { return props.containerName; });
//# sourceMappingURL=selectors.js.map