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
var Page_1 = require("../../model/Page");
var PopState_1 = require("../../model/actions/PopState");
var browser = require("../../util/browserFunctions");
var reconciler_1 = require("../../util/reconciler");
var UpdateBrowser_1 = require("../../model/actions/UpdateBrowser");
var stepRunner_1 = require("../../util/stepRunner");
var waitForInitialization_1 = require("../waitForInitialization");
var selectors_1 = require("../selectors");
var InnerStepRunner = (function (_super) {
    __extends(InnerStepRunner, _super);
    function InnerStepRunner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isListening = true;
        return _this;
    }
    InnerStepRunner.prototype.update = function (props) {
        var _this = this;
        var actions = props.actions, lastUpdate = props.lastUpdate, recordBrowserUpdate = props.recordBrowserUpdate;
        var steps = reconciler_1.createStepsSince(actions, lastUpdate);
        if (steps.length > 0) {
            recordBrowserUpdate();
            var before = function () { return _this.isListening = false; };
            var after = function () { return _this.isListening = true; };
            stepRunner_1.runSteps(steps, before, after);
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
    actions: state.actions,
    lastUpdate: state.lastUpdate,
    pages: state.pages
}); };
var makeGetActions = function () { return selectors_1.createCachingSelector(selectors_1.getDispatch, function (dispatch) { return ({
    recordBrowserUpdate: function () { return dispatch(new UpdateBrowser_1.default()); },
    dispatch: dispatch
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) {
    var popstate = function (page) {
        dispatchProps.dispatch(new PopState_1.default({
            n: stateProps.pages.getShiftAmount(page)
        }));
    };
    return __assign({}, stateProps, dispatchProps, ownProps, { popstate: popstate });
};
var ConnectedStepRunner = react_redux_1.connect(mapStateToProps, makeGetActions, mergeProps)(InnerStepRunner);
var StepRunner = function (_a) {
    var store = _a.store;
    return (React.createElement(ConnectedStepRunner, { store: store }));
};
exports.default = waitForInitialization_1.default(StepRunner);
//# sourceMappingURL=StepRunner.js.map