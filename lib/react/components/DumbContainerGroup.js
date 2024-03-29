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
var omit = require("lodash.omit");
var DumbContainerGroup = /** @class */ (function (_super) {
    __extends(DumbContainerGroup, _super);
    function DumbContainerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DumbContainerGroup.prototype.getChildContext = function () {
        var _a = this.props, groupName = _a.groupName, _b = _a.hideInactiveContainers, hideInactiveContainers = _b === void 0 ? true : _b;
        return {
            groupName: groupName,
            hideInactiveContainers: hideInactiveContainers,
        };
    };
    DumbContainerGroup.prototype.renderDiv = function (divChildren) {
        var _a = omit(__assign({}, this.props), [
            'groupName',
            'children',
            'storedCurrentContainerIndex',
            'hideInactiveContainers',
            'store',
            'isOnTop',
            'dispatch',
            'storedCurrentContainerName',
            'gotoTopOnSelectActive',
            'createGroup',
            'switchToContainerIndex',
            'switchToContainerName',
            'isDefault',
            'parentGroup',
            'allowInterContainerHistory',
            'loadedFromPersist',
            'isInitialized',
            'storeSubscription'
        ]), _b = _a.style, style = _b === void 0 ? {} : _b, divProps = __rest(_a, ["style"]);
        var divStyle = __assign(__assign({}, style), { width: '100%', height: '100%', position: 'inherit', overflow: 'hidden' });
        return React.createElement("div", __assign({ style: divStyle }, divProps), divChildren);
    };
    DumbContainerGroup.prototype.render = function () {
        var _a = this.props, children = _a.children, storedCurrentContainerIndex = _a.storedCurrentContainerIndex, storedCurrentContainerName = _a.storedCurrentContainerName, switchToContainerName = _a.switchToContainerName, switchToContainerIndex = _a.switchToContainerIndex;
        if (children instanceof Function) {
            var args = {
                currentContainerIndex: storedCurrentContainerIndex,
                currentContainerName: storedCurrentContainerName,
                setCurrentContainerIndex: switchToContainerIndex,
                setCurrentContainerName: switchToContainerName,
            };
            return this.renderDiv(children(args));
        }
        else {
            return this.renderDiv(children);
        }
    };
    DumbContainerGroup.childContextTypes = {
        groupName: PropTypes.string.isRequired,
        hideInactiveContainers: PropTypes.bool
    };
    return DumbContainerGroup;
}(react_1.Component));
exports.default = DumbContainerGroup;
//# sourceMappingURL=DumbContainerGroup.js.map