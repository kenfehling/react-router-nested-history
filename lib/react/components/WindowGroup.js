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
        var _a = this.props, stackOrder = _a.stackOrder, setCurrentContainerName = _a.setCurrentContainerName;
        return {
            stackOrder: stackOrder,
            setCurrentContainerName: setCurrentContainerName,
            windowGroupWidth: this.state.width,
            windowGroupHeight: this.state.height
        };
    };
    InnerInnerWindowGroup.prototype.calculateDimensions = function (element) {
        if (element && this.state.width === 0) {
            this.setState({
                width: element.offsetWidth || window.innerWidth,
                height: element.offsetHeight || window.innerHeight
            });
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
    stackOrder: react_1.PropTypes.arrayOf(react_1.PropTypes.object).isRequired,
    setCurrentContainerName: react_1.PropTypes.func.isRequired,
    windowGroupWidth: react_1.PropTypes.number.isRequired,
    windowGroupHeight: react_1.PropTypes.number.isRequired
};
var InnerWindowGroup = function (_a) {
    var children = _a.children, resetWindowPositions = _a.resetWindowPositions, groupProps = __rest(_a, ["children", "resetWindowPositions"]);
    return (React.createElement(ContainerGroup_1.default, __assign({}, changeDefaults(groupProps)), function (props) { return (React.createElement(InnerInnerWindowGroup, { stackOrder: props.stackOrder, setCurrentContainerName: props.setCurrentContainerName }, children instanceof Function ?
        children(__assign({}, props, { resetWindowPositions: resetWindowPositions })) :
        children)); }));
};
var mapDispatchToProps = function (dispatch, ownProps) { return ({
    resetWindowPositions: function () { return dispatch(WindowActions_1.resetWindowPositions()); }
}); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedWindowGroup = react_redux_1.connect(function () { return ({}); }, mapDispatchToProps, mergeProps)(InnerWindowGroup);
var WindowGroup = (function (_super) {
    __extends(WindowGroup, _super);
    function WindowGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowGroup.prototype.render = function () {
        var rrnhStore = this.context.rrnhStore;
        return (React.createElement(ConnectedWindowGroup, __assign({ store: rrnhStore }, this.props)));
    };
    return WindowGroup;
}(react_1.Component));
WindowGroup.contextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired
};
exports.default = WindowGroup;
//# sourceMappingURL=WindowGroup.js.map