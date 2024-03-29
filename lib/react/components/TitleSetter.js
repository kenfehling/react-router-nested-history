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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var exenv_1 = require("exenv");
var InnerTitleSetter = /** @class */ (function (_super) {
    __extends(InnerTitleSetter, _super);
    function InnerTitleSetter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerTitleSetter.prototype.updateTitle = function () {
        var activeTitle = this.props.activeTitle;
        if (exenv_1.canUseDOM) {
            if (activeTitle) {
                setTimeout(function () {
                    document.title = activeTitle;
                }, 1);
            }
        }
    };
    InnerTitleSetter.prototype.componentDidMount = function () {
        this.updateTitle();
    };
    InnerTitleSetter.prototype.componentDidUpdate = function () {
        this.updateTitle();
    };
    InnerTitleSetter.prototype.render = function () {
        return null;
    };
    return InnerTitleSetter;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) { return (__assign(__assign({}, ownProps), { activeTitle: state.activeTitle })); };
var TitleSetter = (0, react_redux_1.connect)(mapStateToProps)(InnerTitleSetter);
exports.default = (function (_a) {
    var store = _a.store;
    return (React.createElement(TitleSetter, { store: store }));
});
//# sourceMappingURL=TitleSetter.js.map