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
var CloseWindow_1 = require("../../model/actions/CloseWindow");
var DumbHistoryWindow_1 = require("./DumbHistoryWindow");
var WindowActions_1 = require("../../actions/WindowActions");
var selectors_1 = require("../selectors");
var SwitchToContainer_1 = require("../../model/actions/SwitchToContainer");
var reselect_1 = require("reselect");
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getContainerName, selectors_1.getDispatch, function (name, dispatch) { return ({
    switchTo: function () { return dispatch(new SwitchToContainer_1.default({ name: name })); },
    open: function () { return dispatch(new SwitchToContainer_1.default({ name: name })); },
    close: function () { return dispatch(new CloseWindow_1.default({ forName: name })); },
    move: function (_a) {
        var x = _a.x, y = _a.y;
        return dispatch((0, WindowActions_1.moveWindow)(name, x, y));
    }
}); }); };
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    storedVisible: selectors_1.getWindowVisible,
    storedPosition: selectors_1.getWindowPosition,
    zIndex: selectors_1.getWindowZIndex,
    isOnTop: selectors_1.getWindowIsOnTop,
    isInitialized: selectors_1.getIsInitialized
});
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedSmartHistoryWindow = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(DumbHistoryWindow_1.default);
var SmartHistoryWindow = /** @class */ (function (_super) {
    __extends(SmartHistoryWindow, _super);
    function SmartHistoryWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartHistoryWindow.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        var _b = this.props, forName = _b.forName, props = __rest(_b, ["forName"]);
        return (React.createElement(ConnectedSmartHistoryWindow, __assign({ store: rrnhStore, containerName: forName }, context, props)));
    };
    SmartHistoryWindow.contextTypes = {
        rrnhStore: PropTypes.object.isRequired,
        windowGroupWidth: PropTypes.number.isRequired,
        windowGroupHeight: PropTypes.number.isRequired
    };
    return SmartHistoryWindow;
}(react_1.Component));
exports.default = SmartHistoryWindow;
//# sourceMappingURL=SmartHistoryWindow.js.map