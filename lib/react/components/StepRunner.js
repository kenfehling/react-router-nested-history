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
var Page_1 = require("../../model/Page");
var OnPopState_1 = require("../../model/actions/OnPopState");
var browser = require("../../util/browserFunctions");
var reconciler_1 = require("../../util/reconciler");
var UpdateBrowser_1 = require("../../model/actions/UpdateBrowser");
var stepRunner_1 = require("../../util/stepRunner");
var waitForInitialization_1 = require("../waitForInitialization");
var selectors_1 = require("../selectors");
var InnerStepRunner = /** @class */ (function (_super) {
    __extends(InnerStepRunner, _super);
    function InnerStepRunner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isListening = true;
        return _this;
    }
    InnerStepRunner.prototype.update = function (props) {
        var _this = this;
        var oldState = props.oldState, newActions = props.newActions, recordBrowserUpdate = props.recordBrowserUpdate;
        var steps = (0, reconciler_1.createSteps)(oldState, newActions);
        if (newActions.length > 0) {
            if (steps.length > 0) {
                var before = function () { return _this.isListening = false; };
                var after = function () { return _this.isListening = true; };
                (0, stepRunner_1.runSteps)(steps, before, after);
            }
            recordBrowserUpdate();
        }
    };
    InnerStepRunner.prototype.componentWillReceiveProps = function (newProps) {
        this.update(newProps);
    };
    InnerStepRunner.prototype.componentWillMount = function () {
        var _this = this;
        this.unlistenForPopState = browser.listen(function (location) {
            if (_this.isListening && location.state) {
                var popstate = _this.props.popstate;
                var page = new Page_1.default(location.state);
                popstate(page);
            }
        });
    };
    InnerStepRunner.prototype.componentWillUnmount = function () {
        this.unlistenForPopState();
    };
    InnerStepRunner.prototype.componentDidMount = function () {
        this.update(this.props);
    };
    InnerStepRunner.prototype.render = function () {
        return React.createElement("div", null);
    };
    return InnerStepRunner;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    oldState: state.oldState,
    newActions: state.newActions
}); };
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getDispatch, function (dispatch) { return ({
    recordBrowserUpdate: function () { return dispatch(new UpdateBrowser_1.default()); },
    popstate: function (page) { return dispatch(new OnPopState_1.default({ page: page })); }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedStepRunner = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(InnerStepRunner);
var StepRunner = function (_a) {
    var store = _a.store;
    return (React.createElement(ConnectedStepRunner, { store: store }));
};
exports.default = (0, waitForInitialization_1.default)(StepRunner);
//# sourceMappingURL=StepRunner.js.map