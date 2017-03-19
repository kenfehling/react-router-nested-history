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
var defaultToFalse = function (p) { return p == null ? false : p; };
var changeDefaults = function (props) { return (__assign({}, props, { hideInactiveContainers: defaultToFalse(props.hideInactiveContainers) })); };
var InnerWindowGroup = (function (_super) {
    __extends(InnerWindowGroup, _super);
    function InnerWindowGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerWindowGroup.prototype.getChildContext = function () {
        var _a = this.props, stackOrder = _a.stackOrder, setCurrentContainerName = _a.setCurrentContainerName;
        return {
            stackOrder: stackOrder,
            setCurrentContainerName: setCurrentContainerName
        };
    };
    InnerWindowGroup.prototype.render = function () {
        return (React.createElement("div", { style: {
                width: '100%',
                height: '100%',
                position: 'relative'
            } }, this.props.children));
    };
    return InnerWindowGroup;
}(react_1.Component));
InnerWindowGroup.childContextTypes = {
    stackOrder: react_1.PropTypes.arrayOf(react_1.PropTypes.object).isRequired,
    setCurrentContainerName: react_1.PropTypes.func.isRequired
};
var WindowGroup = function (_a) {
    var children = _a.children, groupProps = __rest(_a, ["children"]);
    return (React.createElement(ContainerGroup_1.default, __assign({}, changeDefaults(groupProps)), function (props) { return (React.createElement(InnerWindowGroup, { stackOrder: props.stackOrder, setCurrentContainerName: props.setCurrentContainerName }, children instanceof Function ? children(props) : children)); }));
};
exports.default = WindowGroup;
//# sourceMappingURL=WindowGroup.js.map