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
var recompose_1 = require("recompose");
var SmartContainerGroup_1 = require("./SmartContainerGroup");
var CreateGroup_1 = require("../../model/actions/CreateGroup");
var selectors_1 = require("../selectors");
var reselect_1 = require("reselect");
var InnerContainerGroup = (function (_super) {
    __extends(InnerContainerGroup, _super);
    function InnerContainerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerContainerGroup.prototype.shouldComponentUpdate = function () {
        return false;
    };
    InnerContainerGroup.prototype.componentWillMount = function () {
        var _a = this.props, loadedFromPersist = _a.loadedFromPersist, isInitialized = _a.isInitialized;
        if (!loadedFromPersist && !isInitialized) {
            this.initialize();
        }
    };
    InnerContainerGroup.prototype.initialize = function () {
        var _a = this.props, name = _a.name, createGroup = _a.createGroup, resetOnLeave = _a.resetOnLeave, allowInterContainerHistory = _a.allowInterContainerHistory, gotoTopOnSelectActive = _a.gotoTopOnSelectActive, parentGroup = _a.parentGroup, isDefault = _a.isDefault;
        createGroup(new CreateGroup_1.default({
            name: name,
            parentGroup: parentGroup,
            isDefault: isDefault,
            resetOnLeave: resetOnLeave,
            allowInterContainerHistory: allowInterContainerHistory,
            gotoTopOnSelectActive: gotoTopOnSelectActive
        }));
    };
    InnerContainerGroup.prototype.render = function () {
        return React.createElement(SmartContainerGroup_1.default, __assign({}, this.props));
    };
    return InnerContainerGroup;
}(react_1.Component));
var makeGetActions = function () { return selectors_1.createCachingSelector(selectors_1.getDispatch, function (dispatch) { return ({
    createGroup: function (action) { return dispatch(action); }
}); }); };
var mapStateToProps = reselect_1.createStructuredSelector({
    isInitialized: selectors_1.getIsInitialized,
    loadedFromPersist: selectors_1.getLoadedFromPersist
});
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ContainerGroup = react_redux_1.connect(mapStateToProps, makeGetActions, mergeProps)(InnerContainerGroup);
var enhance = recompose_1.compose(recompose_1.getContext({
    rrnhStore: react_1.PropTypes.object.isRequired,
    groupName: react_1.PropTypes.string
}), recompose_1.renameProps({
    rrnhStore: 'store',
    groupName: 'parentGroup'
}), recompose_1.shouldUpdate(function (props, nextProps) { return false; }));
exports.default = enhance(ContainerGroup);
//# sourceMappingURL=ContainerGroup.js.map