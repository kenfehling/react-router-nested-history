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
var SmartContainerGroup_1 = require("./SmartContainerGroup");
var CreateGroup_1 = require("../../model/actions/CreateGroup");
var selectors_1 = require("../selectors");
var reselect_1 = require("reselect");
var enhancers_1 = require("../enhancers");
var InnerContainerGroup = /** @class */ (function (_super) {
    __extends(InnerContainerGroup, _super);
    function InnerContainerGroup(props) {
        var _this = _super.call(this, props) || this;
        var loadedFromPersist = props.loadedFromPersist, isInitialized = props.isInitialized, name = props.name, createGroup = props.createGroup, resetOnLeave = props.resetOnLeave, allowInterContainerHistory = props.allowInterContainerHistory, gotoTopOnSelectActive = props.gotoTopOnSelectActive, parentGroup = props.parentGroup, isDefault = props.isDefault;
        if (!loadedFromPersist && !isInitialized) {
            createGroup(new CreateGroup_1.default({
                name: name,
                parentGroup: parentGroup,
                isDefault: isDefault,
                resetOnLeave: resetOnLeave,
                allowInterContainerHistory: allowInterContainerHistory,
                gotoTopOnSelectActive: gotoTopOnSelectActive
            }));
        }
        return _this;
    }
    InnerContainerGroup.prototype.shouldComponentUpdate = function () {
        return false;
    };
    InnerContainerGroup.prototype.render = function () {
        /* @ts-ignore */
        return React.createElement(SmartContainerGroup_1.default, __assign({}, this.props));
    };
    return InnerContainerGroup;
}(react_1.Component));
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getDispatch, function (dispatch) { return ({
    createGroup: function (action) { return dispatch(action); }
}); }); };
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    isInitialized: selectors_1.getIsInitialized,
    loadedFromPersist: selectors_1.getLoadedFromPersist
});
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ContainerGroup = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(InnerContainerGroup);
var enhance = (0, recompose_1.compose)((0, recompose_1.getContext)({
    rrnhStore: PropTypes.object.isRequired,
    groupName: PropTypes.string
}), (0, recompose_1.renameProps)({
    rrnhStore: 'store',
    groupName: 'parentGroup'
}), enhancers_1.neverUpdate);
exports.default = enhance(ContainerGroup);
//# sourceMappingURL=ContainerGroup.js.map