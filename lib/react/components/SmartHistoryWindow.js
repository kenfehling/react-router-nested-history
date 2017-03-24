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
var CloseWindow_1 = require("../../model/actions/CloseWindow");
var DumbHistoryWindow_1 = require("./DumbHistoryWindow");
var WindowActions_1 = require("../../actions/WindowActions");
var mapStateToProps = function (state, ownProps) {
    var w = state.windows.get(ownProps.forName);
    return {
        storedVisible: w.visible,
        storedPosition: state.windowPositions[ownProps.forName]
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    var forName = ownProps.forName, setCurrentContainerName = ownProps.setCurrentContainerName;
    return {
        open: function () { return setCurrentContainerName(forName); },
        close: function () { return dispatch(new CloseWindow_1.default({ forName: forName })); },
        move: function (_a) {
            var x = _a.x, y = _a.y;
            return dispatch(WindowActions_1.moveWindow(forName, x, y));
        }
    };
};
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedSmartHistoryWindow = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(DumbHistoryWindow_1.default);
var SmartHistoryWindow = (function (_super) {
    __extends(SmartHistoryWindow, _super);
    function SmartHistoryWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartHistoryWindow.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        return (React.createElement(ConnectedSmartHistoryWindow, __assign({ store: rrnhStore }, context, this.props)));
    };
    return SmartHistoryWindow;
}(react_1.Component));
SmartHistoryWindow.contextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired,
    stackOrder: react_1.PropTypes.arrayOf(react_1.PropTypes.object).isRequired,
    setCurrentContainerName: react_1.PropTypes.func.isRequired,
    windowGroupWidth: react_1.PropTypes.number.isRequired,
    windowGroupHeight: react_1.PropTypes.number.isRequired
};
exports.default = SmartHistoryWindow;
//# sourceMappingURL=SmartHistoryWindow.js.map