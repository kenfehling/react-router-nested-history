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
var matchPath_1 = require("react-router/matchPath");
var AnimatedPage_1 = require("./AnimatedPage");
var computeMatch = function (pathname, _a) {
    var computedMatch = _a.computedMatch, path = _a.path, exact = _a.exact, strict = _a.strict;
    return computedMatch || matchPath_1.default(pathname, { path: path, exact: exact, strict: strict });
};
var r = function (_a) {
    var component = _a.component, children = _a.children, render = _a.render, match = _a.match, props = _a.props;
    return (component ? (match ? React.createElement(component, props) : null) : render ? (match ? render(props) : null) : children ? (typeof children === 'function' ? (children(props)) : !Array.isArray(children) || children.length ? (React.Children.only(children)) : (null)) : (null));
};
var InnerHistoryRoute = (function (_super) {
    __extends(InnerHistoryRoute, _super);
    function InnerHistoryRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerHistoryRoute.prototype.shouldComponentUpdate = function (nextProps) {
        return this.props.pathname !== nextProps.pathname;
    };
    InnerHistoryRoute.prototype.render = function () {
        var _a = this.props, pathname = _a.pathname, children = _a.children, component = _a.component, render = _a.render;
        var match = computeMatch(pathname, this.props);
        var props = { match: match, location: { pathname: pathname } };
        return r({ component: component, children: children, render: render, match: match, props: props });
    };
    return InnerHistoryRoute;
}(react_1.Component));
var HistoryRoute = function (_a, _b) {
    var component = _a.component, children = _a.children, render = _a.render, props = __rest(_a, ["component", "children", "render"]);
    var pathname = _b.pathname;
    return (React.createElement(InnerHistoryRoute, __assign({}, props, { pathname: pathname, children: function (p) { return (React.createElement(AnimatedPage_1.default, __assign({}, p), p.match && r({ component: component, children: children, render: render, match: p.match, props: p }))); } })));
};
HistoryRoute.contextTypes = {
    pathname: react_1.PropTypes.string.isRequired
};
HistoryRoute.propTypes = {
    computedMatch: react_1.PropTypes.object,
    path: react_1.PropTypes.string,
    exact: react_1.PropTypes.bool,
    strict: react_1.PropTypes.bool,
    component: react_1.PropTypes.func,
    render: react_1.PropTypes.func,
    children: react_1.PropTypes.oneOfType([
        react_1.PropTypes.func,
        react_1.PropTypes.node
    ])
};
exports.default = HistoryRoute;
//# sourceMappingURL=HistoryRoute.js.map