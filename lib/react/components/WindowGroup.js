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
var ContainerGroup_1 = require("./ContainerGroup");
var react_redux_1 = require("react-redux");
var WindowActions_1 = require("../../actions/WindowActions");
var selectors_1 = require("../selectors");
var OpenWindow_1 = require("../../model/actions/OpenWindow");
var defaultToFalse = function (p) { return p == null ? false : p; };
var changeDefaults = function (props) { return (__assign({}, props, { hideInactiveContainers: defaultToFalse(props.hideInactiveContainers) })); };
var InnerInnerWindowGroup = (function (_super) {
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
            var height = element.offsetWidth || window.innerWidth;
            var width = element.offsetHeight || window.innerHeight;
            if (height > this.state.height || width > this.state.width) {
                this.setState({ width: width, height: height });
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
    return InnerInnerWindowGroup;
}(react_1.Component));
InnerInnerWindowGroup.childContextTypes = {
    windowGroupWidth: react_1.PropTypes.number.isRequired,
    windowGroupHeight: react_1.PropTypes.number.isRequired
};
var InnerWindowGroup = function (_a) {
    var children = _a.children, openWindow = _a.openWindow, resetWindowPositions = _a.resetWindowPositions, groupName = _a.groupName, groupProps = __rest(_a, ["children", "openWindow", "resetWindowPositions", "groupName"]);
    return (React.createElement(ContainerGroup_1.default, __assign({}, changeDefaults(__assign({}, groupProps, { name: groupName }))), function (props) { return (React.createElement(InnerInnerWindowGroup, null, children instanceof Function ?
        children(__assign({}, props, { openWindow: openWindow, resetWindowPositions: resetWindowPositions })) :
        children)); }));
};
var makeGetActions = function () { return selectors_1.createCachingSelector(selectors_1.getDispatch, selectors_1.getGroupName, function (dispatch, groupName) { return ({
    openWindow: function (params) { return dispatch(new OpenWindow_1.default(__assign({}, params, { groupName: groupName }))); },
    resetWindowPositions: function () { return dispatch(WindowActions_1.resetWindowPositions()); }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedWindowGroup = react_redux_1.connect(function () { return ({}); }, makeGetActions, mergeProps)(InnerWindowGroup);
var WindowGroup = (function (_super) {
    __extends(WindowGroup, _super);
    function WindowGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowGroup.prototype.render = function () {
        var rrnhStore = this.context.rrnhStore;
        var _a = this.props, name = _a.name, props = __rest(_a, ["name"]);
        return (React.createElement(ConnectedWindowGroup, __assign({ store: rrnhStore, groupName: name }, props)));
    };
    return WindowGroup;
}(react_1.Component));
WindowGroup.contextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired
};
exports.default = WindowGroup;
//# sourceMappingURL=WindowGroup.js.map