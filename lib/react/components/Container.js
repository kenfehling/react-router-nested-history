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
var DumbContainer_1 = require("./DumbContainer");
var server_1 = require("react-dom/server");
var CreateContainer_1 = require("../../model/actions/CreateContainer");
var ExecutionEnvironment_1 = require("history/ExecutionEnvironment");
var AddTitle_1 = require("../../model/actions/AddTitle");
var SmartContainer_1 = require("./SmartContainer");
var InnerContainer = (function (_super) {
    __extends(InnerContainer, _super);
    function InnerContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerContainer.prototype.componentWillMount = function () {
        var _a = this.props, initializing = _a.initializing, loadedFromRefresh = _a.loadedFromRefresh;
        if (initializing && !loadedFromRefresh) {
            this.initialize();
        }
    };
    InnerContainer.prototype.initialize = function () {
        var _a = this.props, store = _a.store, children = _a.children, name = _a.name, patterns = _a.patterns, initialUrl = _a.initialUrl, _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, createContainer = _a.createContainer, groupName = _a.groupName, _d = _a.initializing, initializing = _d === void 0 ? false : _d, _e = _a.isDefault, isDefault = _e === void 0 ? false : _e;
        createContainer(new CreateContainer_1.default({
            name: name,
            groupName: groupName,
            initialUrl: initialUrl,
            patterns: patterns,
            resetOnLeave: resetOnLeave,
            isDefault: isDefault
        }));
        if (initializing) {
            var T = (function (_super) {
                __extends(T, _super);
                function T() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                T.prototype.getChildContext = function () {
                    return {
                        rrnhStore: store,
                        groupName: groupName,
                        animate: animate,
                        containerName: name,
                        pathname: initialUrl,
                        patterns: patterns
                    };
                };
                T.prototype.render = function () {
                    return React.createElement("div", null, children);
                };
                return T;
            }(react_1.Component));
            T.childContextTypes = __assign({}, DumbContainer_1.default.childContextTypes, { rrnhStore: react_1.PropTypes.object.isRequired });
            server_1.renderToStaticMarkup(React.createElement(T, null));
            this.addTitleForPath(initialUrl);
        }
    };
    InnerContainer.prototype.addTitleForPath = function (pathname) {
        var addTitle = this.props.addTitle;
        if (ExecutionEnvironment_1.canUseDOM) {
            addTitle({
                pathname: pathname,
                title: document.title
            });
        }
    };
    InnerContainer.prototype.render = function () {
        return this.props.isInitialized ?
            React.createElement(SmartContainer_1.default, __assign({}, this.props)) : React.createElement("div", null);
    };
    return InnerContainer;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    loadedFromRefresh: state.loadedFromRefresh,
    isInitialized: state.isInitialized
}); };
var mapDispatchToProps = function (dispatch, ownProps) { return ({
    createContainer: function (action) { return dispatch(action); },
    addTitle: function (title) { return dispatch(new AddTitle_1.default(title)); }
}); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerContainer);
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Container.prototype.render = function () {
        var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
        return React.createElement(ConnectedContainer, __assign({ store: rrnhStore }, context, this.props));
    };
    return Container;
}(react_1.Component));
Container.contextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired,
    groupName: react_1.PropTypes.string.isRequired,
    initializing: react_1.PropTypes.bool,
    hideInactiveContainers: react_1.PropTypes.bool
};
exports.default = Container;
//# sourceMappingURL=Container.js.map