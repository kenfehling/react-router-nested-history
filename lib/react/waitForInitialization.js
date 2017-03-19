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
var react_redux_1 = require("react-redux");
function waitForInitialization(component) {
    var mapStateToProps = function (state) {
        return {
            isInitialized: state.isInitialized
        };
    };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var WrappedComponent = function (_a) {
        var isInitialized = _a.isInitialized, props = __rest(_a, ["isInitialized"]);
        return isInitialized ? react_1.createElement(component, props) : null;
    };
    var ConnectedComponent = react_redux_1.connect(mapStateToProps, {}, mergeProps)(WrappedComponent);
    return _a = (function (_super) {
            __extends(WaitForInitialization, _super);
            function WaitForInitialization() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WaitForInitialization.prototype.render = function () {
                var rrnhStore = this.context.rrnhStore;
                return React.createElement(ConnectedComponent, __assign({ store: rrnhStore }, this.props));
            };
            return WaitForInitialization;
        }(react_1.Component)),
        _a.contextTypes = {
            rrnhStore: react_1.PropTypes.object.isRequired
        },
        _a;
    var _a;
}
exports.default = waitForInitialization;
//# sourceMappingURL=waitForInitialization.js.map