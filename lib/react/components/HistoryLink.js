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
var PathUtils_1 = require("history/PathUtils");
var Push_1 = require("../../model/actions/Push");
var R = require("ramda");
var selectors_1 = require("../selectors");
var InnerHistoryLink = (function (_super) {
    __extends(InnerHistoryLink, _super);
    function InnerHistoryLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerHistoryLink.prototype.componentDidMount = function () {
        if (this.props.groupName == null) {
            throw new Error('HistoryLink needs to be inside a ContainerGroup');
        }
        if (this.props.containerName == null) {
            throw new Error('HistoryLink needs to be inside a Container');
        }
    };
    InnerHistoryLink.prototype.getUrl = function () {
        var to = this.props.to;
        return typeof (to) === 'string' ? to : PathUtils_1.createPath(to);
    };
    InnerHistoryLink.prototype.onClick = function (event) {
        var push = this.props.push;
        push(this.getUrl());
        event.stopPropagation();
        event.preventDefault();
    };
    InnerHistoryLink.prototype.onMouseDown = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    InnerHistoryLink.prototype.render = function () {
        var aProps = __rest(R.omit([
            'to',
            'groupName',
            'containerName',
            'store',
            'push',
            'storeSubscription'
        ], this.props), []);
        return (React.createElement("a", __assign({ href: this.getUrl(), onMouseDown: this.onMouseDown.bind(this), onClick: this.onClick.bind(this) }, aProps), this.props.children));
    };
    return InnerHistoryLink;
}(react_1.Component));
var makeGetActions = function () { return selectors_1.createCachingSelector(selectors_1.getGroupName, selectors_1.getContainerName, selectors_1.getDispatch, function (groupName, containerName, dispatch) { return ({
    push: function (url) { return dispatch(new Push_1.default({
        url: url,
        container: containerName
    })); }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var HistoryLink = react_redux_1.connect(function () { return (selectors_1.EMPTY_OBJ); }, makeGetActions, mergeProps)(InnerHistoryLink);
var enhance = recompose_1.compose(recompose_1.getContext({
    rrnhStore: react_1.PropTypes.object.isRequired,
    groupName: react_1.PropTypes.string.isRequired,
    containerName: react_1.PropTypes.string.isRequired
}), recompose_1.renameProps({
    rrnhStore: 'store',
}));
exports.default = enhance(HistoryLink);
//# sourceMappingURL=HistoryLink.js.map