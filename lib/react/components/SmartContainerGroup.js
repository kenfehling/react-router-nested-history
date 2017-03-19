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
var DumbContainerGroup_1 = require("./DumbContainerGroup");
var SwitchToContainer_1 = require("../../model/actions/SwitchToContainer");
exports.getGroup = function (state, ownProps) {
    return state.groups.get(ownProps.name);
};
var mapStateToProps = function (state, ownProps) {
    var group = exports.getGroup(state, ownProps);
    return {
        storedStackOrder: group.stackOrder,
        storedCurrentContainerIndex: group.activeContainerIndex,
        storedCurrentContainerName: group.activeContainerName
    };
};
var mapDispatchToProps = function (dispatch, ownProps) { return ({
    createGroup: function (action) { return dispatch(action); },
    switchToContainerIndex: function (index) { return dispatch(new SwitchToContainer_1.default({
        groupName: ownProps.name,
        index: index
    })); },
    switchToContainerName: function (name) { return dispatch(new SwitchToContainer_1.default({
        groupName: ownProps.name,
        name: name
    })); }
}); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedContainerGroup = react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps)(DumbContainerGroup_1.default);
var SmartContainerGroup = (function (_super) {
    __extends(SmartContainerGroup, _super);
    function SmartContainerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartContainerGroup.prototype.render = function () {
        var _a = this.context, groupName = _a.groupName, rrnhStore = _a.rrnhStore;
        return (React.createElement(ConnectedContainerGroup, __assign({ parentGroupName: groupName, store: rrnhStore }, this.props)));
    };
    return SmartContainerGroup;
}(react_1.Component));
SmartContainerGroup.contextTypes = {
    groupName: react_1.PropTypes.string,
    rrnhStore: react_1.PropTypes.object.isRequired
};
exports.default = SmartContainerGroup;
//# sourceMappingURL=SmartContainerGroup.js.map