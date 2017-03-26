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
var UNINITIALIZED_MESSAGE = 'State is uninitialized';
var UninitializedState = (function (_super) {
    __extends(UninitializedState, _super);
    function UninitializedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UninitializedState.prototype, "pages", {
        get: function () {
            return new Pages_1.default();
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.assign = function (obj) {
        return new UninitializedState(__assign({}, Object(this), obj));
    };
    Object.defineProperty(UninitializedState.prototype, "isInitialized", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.switchToGroup = function (_a) {
        var groupName = _a.groupName, time = _a.time;
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.switchToContainer = function (_a) {
        var name = _a.name, time = _a.time;
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.openWindow = function (forName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.closeWindow = function (forName, time) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.go = function (_a) {
        var n = _a.n, time = _a.time, container = _a.container;
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.back = function (_a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time, container = _a.container;
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.forward = function (_a) {
        var _b = _a.n, n = _b === void 0 ? 1 : _b, time = _a.time, container = _a.container;
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.isContainerAtTopPage = function (containerName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.top = function (_a) {
        var time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getShiftAmount = function (page) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.containsPage = function (page) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getRootGroupOfGroupByName = function (name) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getRootGroupOfGroup = function (group) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.push = function (page, time) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getHistory = function (maintainFwd) {
        if (maintainFwd === void 0) { maintainFwd = false; }
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    Object.defineProperty(UninitializedState.prototype, "groupStackOrder", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.getBackPageInGroup = function (groupName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getActiveContainerNameInGroup = function (groupName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getActiveContainerIndexInGroup = function (groupName) {
        return 0;
    };
    UninitializedState.prototype.getActivePageInGroup = function (groupName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getActiveUrlInGroup = function (groupName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.urlMatchesGroup = function (url, groupName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.isGroupActive = function (groupName) {
        return false;
    };
    Object.defineProperty(UninitializedState.prototype, "activePage", {
        get: function () {
            throw new Error(UNINITIALIZED_MESSAGE);
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.isContainerActiveAndEnabled = function (containerName) {
        return false;
    };
    Object.defineProperty(UninitializedState.prototype, "activeUrl", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.getActivePageInContainer = function (groupName, containerName) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.getActiveUrlInContainer = function (groupName, containerName) {
        return '';
    };
    Object.defineProperty(UninitializedState.prototype, "activeGroup", {
        get: function () {
            throw new Error(UNINITIALIZED_MESSAGE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UninitializedState.prototype, "activeGroupName", {
        get: function () {
            throw new Error(UNINITIALIZED_MESSAGE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UninitializedState.prototype, "activeContainer", {
        get: function () {
            throw new Error(UNINITIALIZED_MESSAGE);
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.getContainerNameByIndex = function (groupName, index) {
        throw new Error(UNINITIALIZED_MESSAGE);
    };
    UninitializedState.prototype.isActiveContainer = function (groupName, containerName) {
        return false;
    };
    UninitializedState.prototype.getContainerStackOrderForGroup = function (groupName) {
        return [];
    };
    return UninitializedState;
}(State_1.default));
exports.default = UninitializedState;
//# sourceMappingURL=UninitializedState.js.map