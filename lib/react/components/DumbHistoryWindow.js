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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var R = require("ramda");
var getWindowZIndex = function (stackOrder, name) {
    if (stackOrder && !R.isEmpty(stackOrder)) {
        var index = R.findIndex(function (c) { return c.name === name; }, stackOrder);
        if (index !== -1) {
            return stackOrder.length - index + 1;
        }
    }
    return 1;
};
var isWindowOnTop = function (stackOrder, name) {
    if (stackOrder && !R.isEmpty(stackOrder)) {
        var index = R.findIndex(function (c) { return c.name === name; }, stackOrder);
        return index === 0;
    }
    return false;
};
var DumbHistoryWindow = (function (_super) {
    __extends(DumbHistoryWindow, _super);
    function DumbHistoryWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DumbHistoryWindow.prototype.onMouseDown = function (event) {
        var open = this.props.open;
        open();
        //event.stopPropagation()
    };
    DumbHistoryWindow.prototype.getClassName = function () {
        var _a = this.props, className = _a.className, topClassName = _a.topClassName, forName = _a.forName, stackOrder = _a.stackOrder;
        var isOnTop = isWindowOnTop(stackOrder, forName);
        return isOnTop && topClassName ? topClassName : className || '';
    };
    DumbHistoryWindow.prototype.componentWillReceiveProps = function (newProps) {
        var visible = newProps.visible, open = newProps.open, close = newProps.close;
        if (visible !== this.props.visible) {
            (visible ? open : close)();
        }
    };
    DumbHistoryWindow.prototype.render = function () {
        var _a = this.props, forName = _a.forName, top = _a.top, left = _a.left, children = _a.children, stackOrder = _a.stackOrder, storedVisible = _a.storedVisible, open = _a.open, close = _a.close;
        var zIndex = getWindowZIndex(stackOrder, forName);
        return (React.createElement("div", { className: this.getClassName(), onMouseDown: this.onMouseDown.bind(this), style: {
                zIndex: zIndex,
                position: 'absolute',
                top: top ? top + 'px' : '',
                left: left ? left + 'px' : '',
                visibility: storedVisible ? 'visible' : 'hidden'
            } }, children instanceof Function ? children({ open: open, close: close }) : children));
    };
    return DumbHistoryWindow;
}(react_1.Component));
exports.default = DumbHistoryWindow;
//# sourceMappingURL=DumbHistoryWindow.js.map