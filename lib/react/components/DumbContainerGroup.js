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
var R = require("ramda");
var DumbContainerGroup = (function (_super) {
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
    DumbContainerGroup.prototype.update = function (_a) {
        var currentContainerIndex = _a.currentContainerIndex, currentContainerName = _a.currentContainerName;
        if (this.props.onContainerActivate &&
            currentContainerIndex != null && currentContainerName) {
            this.props.onContainerActivate({
                currentContainerIndex: currentContainerIndex,
                currentContainerName: currentContainerName
            });
        }
    };
    DumbContainerGroup.prototype.componentDidMount = function () {
        var _a = this.props, storedCurrentContainerIndex = _a.storedCurrentContainerIndex, storedCurrentContainerName = _a.storedCurrentContainerName;
        this.update({
            currentContainerIndex: storedCurrentContainerIndex,
            currentContainerName: storedCurrentContainerName
        });
    };
    /**
     * II = Input Index
     * SI = Stored Index
     * IN = Input Name
     * SN = Stored Name
     */
    DumbContainerGroup.prototype.componentWillReceiveProps = function (nextProps) {
        var oldII = this.props.currentContainerIndex;
        var oldSI = this.props.storedCurrentContainerIndex;
        var newII = nextProps.currentContainerIndex;
        var newSI = nextProps.storedCurrentContainerIndex;
        var oldIN = this.props.currentContainerName;
        var oldSN = this.props.storedCurrentContainerName;
        var newIN = nextProps.currentContainerName;
        var newSN = nextProps.storedCurrentContainerName;
        if (newSI !== oldSI || newSN !== oldSN) {
            this.update({
                currentContainerIndex: newSI,
                currentContainerName: newSN
            });
        }
        else if (newII != null && newII !== oldII) {
            this.props.switchToContainerIndex(newII);
        }
        else if (newIN && newIN !== oldIN) {
            this.props.switchToContainerName(newIN);
        }
    };
    DumbContainerGroup.prototype.renderDiv = function (divChildren) {
        var _a = R.omit([
            'groupName',
            'children',
            'storedCurrentContainerIndex',
            'hideInactiveContainers',
            'store',
            'isOnTop',
            'dispatch',
            'storedCurrentContainerName',
            'currentContainerIndex',
            'currentContainerName',
            'onContainerActivate',
            'gotoTopOnSelectActive',
            'createGroup',
            'switchToContainerIndex',
            'switchToContainerName',
            'isDefault',
            'parentGroupName',
            'allowInterContainerHistory',
            'loadedFromRefresh',
            'isInitialized',
            'initializing',
            'storeSubscription'
        ], this.props), _b = _a.style, style = _b === void 0 ? {} : _b, divProps = __rest(_a, ["style"]);
        var divStyle = __assign({}, style, { width: '100%', height: '100%', position: 'inherit', overflow: 'hidden' });
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
    return DumbContainerGroup;
}(react_1.Component));
DumbContainerGroup.childContextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    hideInactiveContainers: react_1.PropTypes.bool,
    initializing: react_1.PropTypes.bool
};
exports.default = DumbContainerGroup;
//# sourceMappingURL=DumbContainerGroup.js.map