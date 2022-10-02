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
var Back_1 = require("../../model/actions/Back");
var omit = require("lodash.omit");
var selectors_1 = require("../selectors");
var waitForInitialization_1 = require("../waitForInitialization");
var reselect_1 = require("reselect");
var InnerBackLink = /** @class */ (function (_super) {
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
    InnerBackLink.prototype.render = function () {
        var _a = omit(this.props, [
            'groupName',
            'containerName',
            'store',
            'params',
            'storeSubscription'
        ]), children = _a.children, backPage = _a.backPage, onClick = _a.onClick, onMouseDown = _a.onMouseDown, aProps = __rest(_a, ["children", "backPage", "onClick", "onMouseDown"]);
        if (backPage) {
            return (React.createElement("a", __assign({ href: backPage.url, onMouseDown: onMouseDown, onClick: onClick }, aProps), children ?
                (children instanceof Function ? children({ params: backPage.params })
                    : children) : 'Back'));
        }
        else {
            return null;
        }
    };
    return InnerBackLink;
}(react_1.Component));
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    backPage: selectors_1.getBackPageInGroup
});
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getGroupName, selectors_1.getDispatch, function (groupName, dispatch) { return ({
    onClick: function (event) {
        event.stopPropagation();
        event.preventDefault();
        dispatch(new Back_1.default({ n: 1, container: groupName }));
    },
    onMouseDown: function (event) {
        event.stopPropagation();
        event.preventDefault();
    }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedBackLink = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(InnerBackLink);
var BackLink = /** @class */ (function (_super) {
    __extends(BackLink, _super);
    function BackLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackLink.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        return React.createElement(ConnectedBackLink, __assign({ store: rrnhStore }, context, this.props));
    };
    BackLink.contextTypes = {
        rrnhStore: PropTypes.object.isRequired,
        groupName: PropTypes.string.isRequired
    };
    return BackLink;
}(react_1.Component));
exports.default = (0, waitForInitialization_1.default)(BackLink);
//# sourceMappingURL=BackLink.js.map