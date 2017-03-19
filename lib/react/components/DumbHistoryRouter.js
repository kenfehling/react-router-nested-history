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
var React = require("react");
var react_1 = require("react");
var react_router_1 = require("react-router");
var createBrowserHistory_1 = require("history/createBrowserHistory");
var browserFunctions_1 = require("../../util/browserFunctions");
var DumbHistoryRouter = (function (_super) {
    __extends(DumbHistoryRouter, _super);
    function DumbHistoryRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DumbHistoryRouter.prototype.render = function () {
        var children = this.props.children;
        if (browserFunctions_1.canUseWindowLocation) {
            return React.createElement(react_router_1.Router, { history: createBrowserHistory_1.default(this.props), children: children });
        }
        else {
            return React.createElement(react_router_1.StaticRouter, __assign({}, this.props, { context: {} }));
        }
    };
    return DumbHistoryRouter;
}(react_1.Component));
exports.default = DumbHistoryRouter;
//# sourceMappingURL=DumbHistoryRouter.js.map