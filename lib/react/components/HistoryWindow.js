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
var PropTypes = require("prop-types");
var react_redux_1 = require("react-redux");
var SmartHistoryWindow_1 = require("./SmartHistoryWindow");
var CreateWindow_1 = require("../../model/actions/CreateWindow");
var selectors_1 = require("../selectors");
var reselect_1 = require("reselect");
var InnerHistoryWindow = (function (_super) {
    __extends(InnerHistoryWindow, _super);
    function InnerHistoryWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerHistoryWindow.prototype.componentWillMount = function () {
        var _a = this.props, loadedFromPersist = _a.loadedFromPersist, isInitialized = _a.isInitialized, forName = _a.forName, visible = _a.visible;
        if (!loadedFromPersist && !isInitialized) {
            this.props.createWindow(new CreateWindow_1.default({ forName: forName, visible: visible }));
        }
    };
    InnerHistoryWindow.prototype.render = function () {
        return React.createElement(SmartHistoryWindow_1.default, __assign({}, this.props));
    };
    return InnerHistoryWindow;
}(react_1.Component));
var makeGetActions = function () { return selectors_1.createCachingSelector(selectors_1.getDispatch, function (dispatch) { return ({
    createWindow: function (action) { return dispatch(action); }
}); }); };
var mapStateToProps = reselect_1.createStructuredSelector({
    isInitialized: selectors_1.getIsInitialized,
    loadedFromPersist: selectors_1.getLoadedFromPersist
});
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedHistoryWindow = react_redux_1.connect(mapStateToProps, makeGetActions, mergeProps)(InnerHistoryWindow);
var HistoryWindow = (function (_super) {
    __extends(HistoryWindow, _super);
    function HistoryWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HistoryWindow.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        return React.createElement(ConnectedHistoryWindow, __assign({ store: rrnhStore }, context, this.props));
    };
    return HistoryWindow;
}(react_1.Component));
HistoryWindow.contextTypes = {
    rrnhStore: PropTypes.object.isRequired
};
exports.default = HistoryWindow;
//# sourceMappingURL=HistoryWindow.js.map