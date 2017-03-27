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
var react_redux_1 = require("react-redux");
var browserFunctions_1 = require("../../util/browserFunctions");
var waitForInitialization_1 = require("../waitForInitialization");
var InnerTitleSetter = (function (_super) {
    __extends(InnerTitleSetter, _super);
    function InnerTitleSetter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerTitleSetter.prototype.componentWillReceiveProps = function (newProps) {
        var activeTitle = newProps.activeTitle;
        if (browserFunctions_1.canUseWindowLocation) {
            if (activeTitle) {
                document.title = activeTitle;
            }
        }
    };
    InnerTitleSetter.prototype.render = function () {
        return null;
    };
    return InnerTitleSetter;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) { return (__assign({}, ownProps, { activeTitle: state.activeTitle })); };
var ConnectedTitleSetter = react_redux_1.connect(mapStateToProps)(InnerTitleSetter);
var TitleSetter = function (_a) {
    var store = _a.store;
    return (React.createElement(ConnectedTitleSetter, { store: store }));
};
exports.default = waitForInitialization_1.default(TitleSetter);
//# sourceMappingURL=TitleSetter.js.map