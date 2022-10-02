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
var DumbContainerGroup_1 = require("./DumbContainerGroup");
var SwitchToContainer_1 = require("../../model/actions/SwitchToContainer");
var selectors_1 = require("../selectors");
var reselect_1 = require("reselect");
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getGroupName, selectors_1.getDispatch, function (groupName, dispatch) { return ({
    createGroup: function (action) { return dispatch(action); },
    switchToContainerIndex: function (index) { return dispatch(new SwitchToContainer_1.default({
        group: groupName,
        index: index
    })); },
    switchToContainerName: function (name) { return dispatch(new SwitchToContainer_1.default({
        name: name
    })); }
}); }); };
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    storedCurrentContainerIndex: selectors_1.getCurrentContainerIndex,
    storedCurrentContainerName: selectors_1.getCurrentContainerName
});
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedContainerGroup = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(DumbContainerGroup_1.default);
var SmartContainerGroup = /** @class */ (function (_super) {
    __extends(SmartContainerGroup, _super);
    function SmartContainerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartContainerGroup.prototype.render = function () {
        var _a = this.context, groupName = _a.groupName, rrnhStore = _a.rrnhStore;
        var _b = this.props, name = _b.name, props = __rest(_b, ["name"]);
        return (React.createElement(ConnectedContainerGroup, __assign({ parentGroup: groupName, groupName: name, store: rrnhStore }, props)));
    };
    SmartContainerGroup.contextTypes = {
        groupName: PropTypes.string,
        rrnhStore: PropTypes.object.isRequired
    };
    return SmartContainerGroup;
}(react_1.Component));
exports.default = SmartContainerGroup;
//# sourceMappingURL=SmartContainerGroup.js.map