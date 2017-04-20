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
var recompose_1 = require("recompose");
var SwitchToContainer_1 = require("../../model/actions/SwitchToContainer");
var omit = require("lodash/omit");
var selectors_1 = require("../selectors");
var waitForInitialization_1 = require("../waitForInitialization");
var OpenWindow_1 = require("../../model/actions/OpenWindow");
var reselect_1 = require("reselect");
var Top_1 = require("../../model/actions/Top");
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
    InnerHeaderLink.prototype.getClassName = function () {
        var _a = this.props, className = _a.className, activeClassName = _a.activeClassName, isActive = _a.isActive;
        return isActive ? [activeClassName, className].join(' ') : className || '';
    };
    InnerHeaderLink.prototype.render = function () {
        var _a = omit(this.props, [
            'groupName',
            'containerName',
            'activeClassName',
            'className',
            'store',
            'hasWindow',
            'shouldGoToTop',
            'dispatch',
            'storeSubscription'
        ]), children = _a.children, url = _a.url, isActive = _a.isActive, onClick = _a.onClick, onMouseDown = _a.onMouseDown, aProps = __rest(_a, ["children", "url", "isActive", "onClick", "onMouseDown"]);
        return (React.createElement("a", __assign({ href: url, className: this.getClassName(), onMouseDown: onMouseDown, onClick: onClick }, aProps), children instanceof Function ? children({ isActive: isActive }) : children));
    };
    return InnerHeaderLink;
}(react_1.Component));
var mapStateToProps = reselect_1.createStructuredSelector({
    url: selectors_1.getHeaderLinkUrl,
    isActive: selectors_1.getIsActiveInGroup,
    hasWindow: selectors_1.getHasWindow,
    shouldGoToTop: selectors_1.getShouldGoToTop,
});
var mapDispatchToProps = function (dispatch) { return ({ dispatch: dispatch }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps, { onClick: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var hasWindow = stateProps.hasWindow, shouldGoToTop = stateProps.shouldGoToTop;
        var containerName = ownProps.containerName;
        var action = hasWindow ?
            new OpenWindow_1.default({ name: containerName }) :
            (shouldGoToTop ?
                new Top_1.default({ container: containerName }) :
                new SwitchToContainer_1.default({ name: containerName }));
        return dispatchProps.dispatch(action);
    }, onMouseDown: function (event) {
        event.stopPropagation();
        event.preventDefault();
    } })); };
var HeaderLink = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerHeaderLink);
var enhance = recompose_1.compose(recompose_1.getContext({
    rrnhStore: react_1.PropTypes.object.isRequired,
    groupName: react_1.PropTypes.string.isRequired
}), recompose_1.renameProps({
    rrnhStore: 'store',
    toContainer: 'containerName'
}), waitForInitialization_1.default);
exports.default = enhance(HeaderLink);
//# sourceMappingURL=HeaderLink.js.map