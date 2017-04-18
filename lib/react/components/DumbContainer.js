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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var omit = require("lodash/omit");
var DumbContainer = (function (_super) {
    __extends(DumbContainer, _super);
    function DumbContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DumbContainer.prototype.getChildContext = function () {
        var _a = this.props, containerName = _a.containerName, groupName = _a.groupName, patterns = _a.patterns, animate = _a.animate, activeUrl = _a.activeUrl;
        return {
            pathname: activeUrl,
            containerName: containerName,
            groupName: groupName,
            patterns: patterns,
            animate: animate
        };
    };
    DumbContainer.prototype.render = function () {
        var _a = omit(this.props, [
            'animate',
            'resetOnLeave',
            'initialUrl',
            'patterns',
            'pathname',
            'addTitle',
            'groupName',
            'containerName',
            'isOnTop',
            'store',
            'isDefault',
            'isInitialized',
            'createContainer',
            'loadedFromPersist',
            'activeUrl',
            'matchesCurrentUrl',
            'storeSubscription'
        ]), hideInactiveContainers = _a.hideInactiveContainers, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, switchToContainer = _a.switchToContainer, isActiveInGroup = _a.isActiveInGroup, divProps = __rest(_a, ["hideInactiveContainers", "children", "style", "switchToContainer", "isActiveInGroup"]);
        if (!hideInactiveContainers || isActiveInGroup) {
            return (React.createElement("div", __assign({}, divProps, { onMouseDown: switchToContainer, style: __assign({}, style, { width: '100%', height: '100%', position: 'relative' }) }), children));
        }
        else {
            return React.createElement("div", null);
        }
    };
    return DumbContainer;
}(react_1.Component));
DumbContainer.childContextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    containerName: react_1.PropTypes.string.isRequired,
    pathname: react_1.PropTypes.string,
    patterns: react_1.PropTypes.arrayOf(react_1.PropTypes.string).isRequired,
    animate: react_1.PropTypes.bool.isRequired
};
exports.default = DumbContainer;
//# sourceMappingURL=DumbContainer.js.map