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
var SwitchToGroup_1 = require("../../model/actions/SwitchToGroup");
var Back_1 = require("../../model/actions/Back");
var R = require("ramda");
var reselect_1 = require("reselect");
var selectors_1 = require("../selectors");
var waitForInitialization_1 = require("../waitForInitialization");
var InnerBackLink = (function (_super) {
    __extends(InnerBackLink, _super);
    function InnerBackLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerBackLink.prototype.componentDidMount = function () {
        if (this.props.groupName == null) {
            throw new Error('BackLink needs to be inside a ContainerGroup');
        }
    };
    // Don't disappear when transitioning back to previous page
    InnerBackLink.prototype.shouldComponentUpdate = function (newProps) {
        return !this.props.backPage && !!newProps.backPage;
    };
    InnerBackLink.prototype.onClick = function (event) {
        var back = this.props.back;
        back();
        event.stopPropagation();
        event.preventDefault();
    };
    InnerBackLink.prototype.onMouseDown = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    InnerBackLink.prototype.render = function () {
        var _a = R.omit([
            'groupName',
            'containerName',
            'store',
            'back',
            'params',
            'storeSubscription'
        ], this.props), children = _a.children, backPage = _a.backPage, aProps = __rest(_a, ["children", "backPage"]);
        if (backPage) {
            return (React.createElement("a", __assign({ href: backPage.url, onMouseDown: this.onMouseDown.bind(this), onClick: this.onClick.bind(this) }, aProps), children ?
                (children instanceof Function ? children({ params: backPage.params })
                    : children) : 'Back'));
        }
        else {
            return React.createElement("span", null, " ");
        }
    };
    return InnerBackLink;
}(react_1.Component));
var selector = reselect_1.createSelector(selectors_1.getBackPageInGroup, function (backPage) { return ({
    backPage: backPage
}); });
var mapStateToProps = function (state, ownProps) {
    var s = selector(state, ownProps);
    return {
        backPage: s.backPage
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        back: function () {
            dispatch(new SwitchToGroup_1.default({ groupName: ownProps.groupName }));
            dispatch(new Back_1.default());
        }
    };
};
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedBackLink = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerBackLink);
var BackLink = (function (_super) {
    __extends(BackLink, _super);
    function BackLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackLink.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        return React.createElement(ConnectedBackLink, __assign({ store: rrnhStore }, context, this.props));
    };
    return BackLink;
}(react_1.Component));
BackLink.contextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired,
    groupName: react_1.PropTypes.string.isRequired
};
exports.default = waitForInitialization_1.default(BackLink);
//# sourceMappingURL=BackLink.js.map