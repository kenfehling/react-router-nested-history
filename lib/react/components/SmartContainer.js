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
var reselect_1 = require("reselect");
var react_redux_1 = require("react-redux");
var DumbContainer_1 = require("./DumbContainer");
var exenv_1 = require("exenv");
var AddTitle_1 = require("../../model/actions/AddTitle");
var SwitchToContainer_1 = require("../../model/actions/SwitchToContainer");
var selectors_1 = require("../selectors");
var InnerSmartContainer = /** @class */ (function (_super) {
    __extends(InnerSmartContainer, _super);
    function InnerSmartContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerSmartContainer.prototype.addTitleForPath = function (pathname) {
        var addTitle = this.props.addTitle;
        if (exenv_1.canUseDOM) {
            addTitle({
                pathname: pathname,
                title: document.title
            });
        }
    };
    InnerSmartContainer.prototype.componentDidUpdate = function () {
        var _a = this.props, activeUrl = _a.activeUrl, matchesCurrentUrl = _a.matchesCurrentUrl;
        if (matchesCurrentUrl) {
            this.addTitleForPath(activeUrl);
        }
    };
    InnerSmartContainer.prototype.render = function () {
        var _a = this.props.animate, animate = _a === void 0 ? true : _a;
        var props = __assign(__assign({}, this.props), { animate: animate });
        // @ts-ignore
        return React.createElement(DumbContainer_1.default, __assign({}, props));
    };
    return InnerSmartContainer;
}(react_1.Component));
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getContainerName, selectors_1.getDispatch, function (containerName, dispatch) { return ({
    createContainer: function (action) { return dispatch(action); },
    addTitle: function (title) { return dispatch(new AddTitle_1.default(title)); },
    switchToContainer: function () { return dispatch(new SwitchToContainer_1.default({ name: containerName })); }
}); }); };
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    activeUrl: selectors_1.getContainerActiveUrl,
    isActiveInGroup: selectors_1.getIsActiveInGroup,
    matchesCurrentUrl: selectors_1.getMatchesCurrentUrl
});
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedSmartContainer = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(InnerSmartContainer);
var SmartContainer = /** @class */ (function (_super) {
    __extends(SmartContainer, _super);
    function SmartContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartContainer.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        var _b = this.props, name = _b.name, props = __rest(_b, ["name"]);
        return React.createElement(ConnectedSmartContainer, __assign({ containerName: name }, context, props, { store: rrnhStore }));
    };
    SmartContainer.contextTypes = {
        rrnhStore: PropTypes.object.isRequired,
        groupName: PropTypes.string.isRequired,
        hideInactiveContainers: PropTypes.bool
    };
    return SmartContainer;
}(react_1.Component));
exports.default = SmartContainer;
//# sourceMappingURL=SmartContainer.js.map