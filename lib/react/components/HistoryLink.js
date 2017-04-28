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
var recompose_1 = require("recompose");
var PathUtils_1 = require("history/PathUtils");
var Push_1 = require("../../model/actions/Push");
var omit = require("lodash.omit");
var enhancers_1 = require("../enhancers");
var getUrl = function (to) { return typeof (to) === 'string' ? to : PathUtils_1.createPath(to); };
var InnerHistoryLink = (function (_super) {
    __extends(InnerHistoryLink, _super);
    function InnerHistoryLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerHistoryLink.prototype.shouldComponentUpdate = function () {
        return false;
    };
    InnerHistoryLink.prototype.componentDidMount = function () {
        if (this.props.groupName == null) {
            throw new Error('HistoryLink needs to be inside a ContainerGroup');
        }
        if (this.props.containerName == null) {
            throw new Error('HistoryLink needs to be inside a Container');
        }
    };
    InnerHistoryLink.prototype.render = function () {
        var _a = omit(this.props, [
            'to',
            'groupName',
            'containerName',
            'store',
            'push',
            'storeSubscription',
            'dispatch'
        ]), url = _a.url, onClick = _a.onClick, onMouseDown = _a.onMouseDown, aProps = __rest(_a, ["url", "onClick", "onMouseDown"]);
        return (React.createElement("a", __assign({ href: url, onMouseDown: onMouseDown, onClick: onClick }, aProps), this.props.children));
    };
    return InnerHistoryLink;
}(react_1.Component));
var mapStateToProps = function (state, _a) {
    var to = _a.to;
    return ({ url: getUrl(to) });
};
var mapDispatchToProps = function (dispatch) { return ({ dispatch: dispatch }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps, { onClick: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var to = ownProps.to;
        var url = typeof (to) === 'string' ? to : PathUtils_1.createPath(to);
        dispatchProps.dispatch(new Push_1.default({
            url: url,
            container: ownProps.containerName
        }));
    }, onMouseDown: function (event) {
        event.stopPropagation();
        event.preventDefault();
    } })); };
var HistoryLink = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerHistoryLink);
var enhance = recompose_1.compose(recompose_1.getContext({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired
}), recompose_1.renameProps({
    rrnhStore: 'store',
}), enhancers_1.neverUpdate);
exports.default = enhance(HistoryLink);
//# sourceMappingURL=HistoryLink.js.map