"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var createBrowserHistory_1 = require("history/createBrowserHistory");
var browserFunctions_1 = require("../../util/browserFunctions");
var DumbHistoryRouter = function (_a) {
    var children = _a.children;
    return (browserFunctions_1.canUseWindowLocation ?
        React.createElement(react_router_1.Router, { history: createBrowserHistory_1.default(_this.props), children: children }) :
        React.createElement(react_router_1.StaticRouter, __assign({}, _this.props, { context: {} })));
};
exports.default = DumbHistoryRouter;
//# sourceMappingURL=DumbHistoryRouter.js.map