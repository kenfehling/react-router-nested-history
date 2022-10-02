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
var react_redux_1 = require("react-redux");
var selectors_1 = require("../selectors");
var InnerWhenActive = function (_a) {
    var matchesCurrentUrl = _a.matchesCurrentUrl, children = _a.children;
    return (matchesCurrentUrl ? children : React.createElement("div", null));
};
var mapStateToProps = function (state, ownProps) { return ({
    matchesCurrentUrl: ownProps.containerName ?
        (0, selectors_1.getMatchesCurrentUrl)(state, ownProps) :
        true // if not in a container, it always matches
}); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedWhenActive = (0, react_redux_1.connect)(mapStateToProps, {}, mergeProps)(InnerWhenActive);
var WhenActive = /** @class */ (function (_super) {
    __extends(WhenActive, _super);
    function WhenActive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhenActive.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        return React.createElement(ConnectedWhenActive, __assign({}, context, this.props, { store: rrnhStore }));
    };
    WhenActive.contextTypes = {
        rrnhStore: PropTypes.object.isRequired,
        containerName: PropTypes.string
    };
    return WhenActive;
}(react_1.Component));
exports.default = WhenActive;
//# sourceMappingURL=WhenActive.js.map