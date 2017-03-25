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
var Draggable = require("react-draggable");
var noop = function () { };
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
var countNonNulls = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return params.reduce(function (n, param) { return param != null ? n + 1 : n; }, 0);
};
var DumbHistoryWindow = (function (_super) {
    __extends(DumbHistoryWindow, _super);
    function DumbHistoryWindow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: 0,
            height: 0
        };
        return _this;
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
    DumbHistoryWindow.prototype.componentWillMount = function () {
        var _a = this.props, top = _a.top, middle = _a.middle, bottom = _a.bottom, left = _a.left, center = _a.center, right = _a.right;
        if (countNonNulls(top, middle, bottom) > 1) {
            throw new Error('You can only pass one: top, middle, or bottom');
        }
        if (countNonNulls(left, center, right) > 1) {
            throw new Error('You can only pass one: left, center, or right');
        }
    };
    DumbHistoryWindow.prototype.componentWillReceiveProps = function (newProps) {
        var visible = newProps.visible, open = newProps.open, close = newProps.close;
        if (visible !== this.props.visible) {
            (visible ? open : close)();
        }
    };
    DumbHistoryWindow.prototype.calculateDimensions = function (element) {
        if (element && this.state.width === 0) {
            this.setState({
                width: element.offsetWidth,
                height: element.offsetHeight
            });
        }
    };
    DumbHistoryWindow.prototype.calculateX = function () {
        var _a = this.props, left = _a.left, center = _a.center, right = _a.right, windowGroupWidth = _a.windowGroupWidth, storedPosition = _a.storedPosition;
        if (storedPosition) {
            return storedPosition.x;
        }
        else {
            if (left != null) {
                return left;
            }
            else if (right != null) {
                return windowGroupWidth - right;
            }
            else if (center != null) {
                return (windowGroupWidth - this.state.width) / 2 + center;
            }
        }
        return 0;
    };
    DumbHistoryWindow.prototype.calculateY = function () {
        var _a = this.props, top = _a.top, middle = _a.middle, bottom = _a.bottom, windowGroupHeight = _a.windowGroupHeight, storedPosition = _a.storedPosition;
        if (storedPosition) {
            return storedPosition.y;
        }
        else {
            if (top != null) {
                return top;
            }
            else if (bottom != null) {
                return windowGroupHeight - bottom;
            }
            else if (middle != null) {
                return Math.round((windowGroupHeight - this.state.height) / 2) + middle;
            }
        }
        return 0;
    };
    DumbHistoryWindow.prototype.onDrag = function (event, data) {
        this.props.move({ x: data.x, y: data.y });
    };
    DumbHistoryWindow.prototype.render = function () {
        var _this = this;
        var _a = R.omit([
            'store',
            'setCurrentContainerName',
            'loadedFromRefresh',
            'isInitialized',
            'createWindow',
            'initializing',
            'topClassName',
            'visible',
            'windowGroupWidth',
            'windowGroupHeight',
            'updateDimensions',
            'top',
            'middle',
            'bottom',
            'left',
            'center',
            'right',
            'move',
            'storedPosition',
            'storeSubscription'
        ], this.props), forName = _a.forName, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, stackOrder = _a.stackOrder, storedVisible = _a.storedVisible, open = _a.open, close = _a.close, draggable = _a.draggable, _c = _a.draggableProps, draggableProps = _c === void 0 ? {} : _c, divProps = __rest(_a, ["forName", "children", "style", "stackOrder", "storedVisible", "open", "close", "draggable", "draggableProps"]);
        var zIndex = getWindowZIndex(stackOrder, forName);
        var w = (React.createElement("div", __assign({}, divProps, { ref: draggable ? function (el) { return _this.calculateDimensions(el); } : noop, className: this.getClassName(), onMouseDown: draggable ? noop : this.onMouseDown.bind(this), style: __assign({}, style, { zIndex: zIndex, position: 'absolute', display: storedVisible ? 'block' : 'none' }) }), children instanceof Function ? children({ open: open, close: close }) : children));
        if (draggable) {
            var x = this.calculateX();
            var y = this.calculateY();
            return (React.createElement(Draggable, __assign({}, draggableProps, { onStop: this.onDrag.bind(this), onMouseDown: this.onMouseDown.bind(this), position: { x: x, y: y } }), w));
        }
        else {
            return w;
        }
    };
    return DumbHistoryWindow;
}(react_1.Component));
exports.default = DumbHistoryWindow;
//# sourceMappingURL=DumbHistoryWindow.js.map