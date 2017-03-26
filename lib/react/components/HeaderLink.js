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
var SwitchToContainer_1 = require("../../model/actions/SwitchToContainer");
var R = require("ramda");
var selectors_1 = require("../selectors");
var waitForInitialization_1 = require("../waitForInitialization");
var InnerHeaderLink = (function (_super) {
    __extends(InnerHeaderLink, _super);
    function InnerHeaderLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerHeaderLink.prototype.componentDidMount = function () {
        if (this.props.groupName == null) {
            throw new Error('HeaderLink needs to be inside a ContainerGroup');
        }
    };
    InnerHeaderLink.prototype.onClick = function (event) {
        var onClick = this.props.onClick;
        onClick();
        event.stopPropagation();
        event.preventDefault();
    };
    InnerHeaderLink.prototype.onMouseDown = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    InnerHeaderLink.prototype.getClassName = function () {
        var _a = this.props, className = _a.className, activeClassName = _a.activeClassName, isActive = _a.isActive;
        return isActive && activeClassName ? activeClassName : className || '';
    };
    InnerHeaderLink.prototype.render = function () {
        var _a = R.omit([
            'toContainer',
            'groupName',
            'containerName',
            'activeClassName',
            'className',
            'store',
            'onClick',
            'isActive',
            'storeSubscription'
        ], this.props), children = _a.children, url = _a.url, aProps = __rest(_a, ["children", "url"]);
        return (React.createElement("a", __assign({ href: url, className: this.getClassName(), onMouseDown: this.onMouseDown.bind(this), onClick: this.onClick.bind(this) }, aProps), children));
    };
    return InnerHeaderLink;
}(react_1.Component));
exports.getContainer = function (state, ownProps) {
    return selectors_1.getGroup(state, ownProps).containers.get(ownProps.toContainer);
};
var mapStateToProps = function (state, ownProps) {
    var container = exports.getContainer(state, ownProps);
    var activeGroupContainerName = selectors_1.getActiveGroupContainerName(state, ownProps);
    return {
        url: container.activeUrl,
        isActive: activeGroupContainerName === container.name
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    var toContainer = ownProps.toContainer;
    return {
        onClick: function () { return dispatch(new SwitchToContainer_1.default({ name: toContainer })); }
    };
};
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedHeaderLink = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerHeaderLink);
var HeaderLink = (function (_super) {
    __extends(HeaderLink, _super);
    function HeaderLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderLink.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        return React.createElement(ConnectedHeaderLink, __assign({ store: rrnhStore }, context, this.props));
    };
    return HeaderLink;
}(react_1.Component));
HeaderLink.contextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired,
    groupName: react_1.PropTypes.string.isRequired
};
exports.default = waitForInitialization_1.default(HeaderLink);
//# sourceMappingURL=HeaderLink.js.map