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
var SmartContainerGroup_1 = require("./SmartContainerGroup");
var CreateGroup_1 = require("../../model/actions/CreateGroup");
var server_1 = require("react-dom/server");
var WindowGroup_1 = require("./WindowGroup");
var DumbContainerGroup_1 = require("./DumbContainerGroup");
var DumbContainer_1 = require("./DumbContainer");
var Container_1 = require("./Container");
var children_1 = require("../../util/children");
var SmartContainer_1 = require("./SmartContainer");
var selectors_1 = require("../selectors");
var InnerContainerGroup = (function (_super) {
    __extends(InnerContainerGroup, _super);
    function InnerContainerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerContainerGroup.prototype.componentWillMount = function () {
        var _a = this.props, parentGroupName = _a.parentGroupName, initializing = _a.initializing, loadedFromRefresh = _a.loadedFromRefresh;
        if ((!parentGroupName || initializing) && !loadedFromRefresh) {
            this.initialize();
        }
    };
    InnerContainerGroup.prototype.initialize = function () {
        var _a = this.props, store = _a.store, name = _a.name, createGroup = _a.createGroup, resetOnLeave = _a.resetOnLeave, allowInterContainerHistory = _a.allowInterContainerHistory, gotoTopOnSelectActive = _a.gotoTopOnSelectActive, parentGroupName = _a.parentGroupName, isDefault = _a.isDefault;
        createGroup(new CreateGroup_1.default({
            name: name,
            parentGroupName: parentGroupName,
            isDefault: isDefault,
            resetOnLeave: resetOnLeave,
            allowInterContainerHistory: allowInterContainerHistory,
            gotoTopOnSelectActive: gotoTopOnSelectActive
        }));
        var G = (function (_super) {
            __extends(G, _super);
            function G() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            G.prototype.getChildContext = function () {
                return {
                    rrnhStore: store,
                    groupName: name,
                    initializing: true
                };
            };
            G.prototype.render = function () {
                var children = this.props.children;
                return React.createElement("div", null, children);
            };
            return G;
        }(react_1.Component));
        G.childContextTypes = {
            rrnhStore: react_1.PropTypes.object.isRequired,
            groupName: react_1.PropTypes.string.isRequired,
            initializing: react_1.PropTypes.bool
        };
        // Initialize the Containers in this group
        // (since most tab libraries lazy load tabs)
        var cs = children_1.getChildren(this, [Container_1.default, SmartContainer_1.default, DumbContainer_1.default], [ContainerGroup, SmartContainerGroup_1.default, DumbContainerGroup_1.default, WindowGroup_1.default]).slice();
        console.log(cs);
        cs.forEach(function (c) { return server_1.renderToStaticMarkup(React.createElement(G, { children: c })); });
    };
    InnerContainerGroup.prototype.render = function () {
        return this.props.isInitialized ?
            React.createElement(SmartContainerGroup_1.default, __assign({}, this.props)) : React.createElement("div", null);
    };
    return InnerContainerGroup;
}(react_1.Component));
var makeGetActions = function () { return selectors_1.createCachingSelector(selectors_1.getDispatch, function (dispatch) { return ({
    createGroup: function (action) { return dispatch(action); }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedContainerGroup = react_redux_1.connect(selectors_1.getIsInitializedAndLoadedFromRefresh, makeGetActions, mergeProps)(InnerContainerGroup);
var ContainerGroup = (function (_super) {
    __extends(ContainerGroup, _super);
    function ContainerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerGroup.prototype.render = function () {
        var _a = this.context, groupName = _a.groupName, rrnhStore = _a.rrnhStore, initializing = _a.initializing;
        return (React.createElement(ConnectedContainerGroup, __assign({ parentGroupName: groupName, store: rrnhStore, initializing: initializing }, this.props)));
    };
    return ContainerGroup;
}(react_1.Component));
ContainerGroup.contextTypes = {
    groupName: react_1.PropTypes.string,
    initializing: react_1.PropTypes.bool,
    rrnhStore: react_1.PropTypes.object.isRequired
};
exports.default = ContainerGroup;
//# sourceMappingURL=ContainerGroup.js.map