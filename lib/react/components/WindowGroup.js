"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var ContainerGroup_1 = require("./ContainerGroup");
var react_redux_1 = require("react-redux");
var WindowActions_1 = require("../../actions/WindowActions");
var selectors_1 = require("../selectors");
var OpenWindow_1 = require("../../model/actions/OpenWindow");
var isEqual = require("lodash/isEqual");
var defaultToFalse = function (p) { return p == null ? false : p; };
var changeDefaults = function (props) { return (__assign(__assign({}, props), { hideInactiveContainers: defaultToFalse(props.hideInactiveContainers) })); };
var InnerInnerWindowGroup = /** @class */ (function (_super) {
    __extends(InnerInnerWindowGroup, _super);
    function InnerInnerWindowGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: 0,
            height: 0
        };
        return _this;
    }
    InnerInnerWindowGroup.prototype.getChildContext = function () {
        return {
            windowGroupWidth: this.state.width,
            windowGroupHeight: this.state.height
        };
    };
    InnerInnerWindowGroup.prototype.calculateDimensions = function (element) {
        if (element) {
            var newState = {
                width: element.offsetWidth,
                height: element.offsetHeight
            };
            var _a = this.state, width = _a.width, height = _a.height;
            var oldState = { width: width, height: height };
            if (!isEqual(newState, oldState)) {
                this.setState(newState);
            }
        }
    };
    InnerInnerWindowGroup.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (element) { return _this.calculateDimensions(element); }, style: {
                width: '100%',
                height: '100%',
                position: 'relative'
            } }, this.props.children));
    };
    InnerInnerWindowGroup.childContextTypes = {
        windowGroupWidth: PropTypes.number.isRequired,
        windowGroupHeight: PropTypes.number.isRequired
    };
    return InnerInnerWindowGroup;
}(react_1.Component));
var InnerWindowGroup = function (_a) {
    var children = _a.children, openWindow = _a.openWindow, resetWindowPositions = _a.resetWindowPositions, groupName = _a.groupName, groupProps = __rest(_a, ["children", "openWindow", "resetWindowPositions", "groupName"]);
    return (React.createElement(ContainerGroup_1.default, __assign({}, changeDefaults(__assign(__assign({}, groupProps), { children: children, name: groupName }))), function (props) { return (
    // @ts-ignore
    React.createElement(InnerInnerWindowGroup, null, children instanceof Function ?
        children(__assign(__assign({}, props), { openWindow: openWindow, resetWindowPositions: resetWindowPositions })) :
        children)); }));
};
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getDispatch, selectors_1.getGroupName, function (dispatch, groupName) { return ({
    openWindow: function (params) { return dispatch(new OpenWindow_1.default(__assign(__assign({}, params), { groupName: groupName }))); },
    resetWindowPositions: function () { return dispatch((0, WindowActions_1.resetWindowPositions)()); }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedWindowGroup = (0, react_redux_1.connect)(function () { return ({}); }, makeGetActions, mergeProps)(InnerWindowGroup);
var WindowGroup = /** @class */ (function (_super) {
    __extends(WindowGroup, _super);
    function WindowGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowGroup.prototype.render = function () {
        var rrnhStore = this.context.rrnhStore;
        var _a = this.props, name = _a.name, props = __rest(_a, ["name"]);
        return (React.createElement(ConnectedWindowGroup, __assign({ store: rrnhStore, groupName: name }, props)));
    };
    WindowGroup.contextTypes = {
        rrnhStore: PropTypes.object.isRequired
    };
    return WindowGroup;
}(react_1.Component));
exports.default = WindowGroup;
//# sourceMappingURL=WindowGroup.js.map