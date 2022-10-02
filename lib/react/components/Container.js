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
var PropTypes = require("prop-types");
var react_redux_1 = require("react-redux");
var recompose_1 = require("recompose");
var CreateContainer_1 = require("../../model/actions/CreateContainer");
var SmartContainer_1 = require("./SmartContainer");
var selectors_1 = require("../selectors");
var reselect_1 = require("reselect");
var enhancers_1 = require("../enhancers");
var InnerContainer = /** @class */ (function (_super) {
    __extends(InnerContainer, _super);
    function InnerContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerContainer.prototype.shouldComponentUpdate = function () {
        return false;
    };
    InnerContainer.prototype.componentWillMount = function () {
        var _a = this.props, loadedFromPersist = _a.loadedFromPersist, isInitialized = _a.isInitialized;
        if (!loadedFromPersist && !isInitialized) {
            this.initialize();
        }
    };
    InnerContainer.prototype.initialize = function () {
        var _a = this.props, name = _a.name, patterns = _a.patterns, initialUrl = _a.initialUrl, _b = _a.resetOnLeave, resetOnLeave = _b === void 0 ? false : _b, createContainer = _a.createContainer, groupName = _a.groupName, _c = _a.isDefault, isDefault = _c === void 0 ? false : _c;
        createContainer(new CreateContainer_1.default({
            name: name,
            group: groupName,
            initialUrl: initialUrl,
            patterns: patterns,
            resetOnLeave: resetOnLeave,
            isDefault: isDefault
        }));
    };
    InnerContainer.prototype.render = function () {
        // @ts-ignore
        return React.createElement(SmartContainer_1.default, __assign({}, this.props));
    };
    return InnerContainer;
}(react_1.Component));
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getContainerName, selectors_1.getDispatch, function (containerName, dispatch) { return ({
    createContainer: function (action) { return dispatch(action); }
}); }); };
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    isInitialized: selectors_1.getIsInitialized,
    loadedFromPersist: selectors_1.getLoadedFromPersist
});
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var Container = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(InnerContainer);
var enhance = (0, recompose_1.compose)((0, recompose_1.getContext)({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string.isRequired,
    hideInactiveContainers: PropTypes.bool
}), (0, recompose_1.renameProps)({
    rrnhStore: 'store'
}), enhancers_1.neverUpdate);
exports.default = enhance(Container);
//# sourceMappingURL=Container.js.map