"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var createBrowserHistory_1 = require("history/createBrowserHistory");
var exenv_1 = require("exenv");
var DumbHistoryRouter = function (_a) {
    var children = _a.children, context = _a.context;
    return (exenv_1.canUseDOM ?
        // @ts-ignore
        React.createElement(react_router_1.Router, { history: (0, createBrowserHistory_1.default)(_this.props), children: children }) :
        // @ts-ignore
        React.createElement(react_router_1.StaticRouter, __assign({}, _this.props, { children: children, context: context })));
};
exports.default = DumbHistoryRouter;
//# sourceMappingURL=DumbHistoryRouter.js.map