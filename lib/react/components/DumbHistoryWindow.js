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
        if (element) {
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            console.log("inside", width, height);
            if (width > this.state.width || height > this.state.height) {
                this.setState({ width: width, height: height });
            }
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
                return windowGroupWidth - right - this.state.width;
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
                return windowGroupHeight - bottom - this.state.height;
            }
            else if (middle != null) {
                return Math.round((windowGroupHeight - this.state.height) / 2) + middle;
            }
        }
        return 0;
    };
    DumbHistoryWindow.prototype.getClassName = function () {
        var _a = this.props, className = _a.className, topClassName = _a.topClassName, isOnTop = _a.isOnTop;
        return isOnTop && topClassName ? topClassName : className || '';
    };
    DumbHistoryWindow.prototype.onMouseDown = function (event) {
        var switchTo = this.props.switchTo;
        switchTo();
        //event.stopPropagation()
    };
    DumbHistoryWindow.prototype.onDrag = function (event, data) {
        var _a = this.props, draggable = _a.draggable, _b = _a.rememberPosition, rememberPosition = _b === void 0 ? draggable : _b;
        if (rememberPosition) {
            this.props.move({ x: data.x, y: data.y });
        }
    };
    DumbHistoryWindow.prototype.render = function () {
        var _this = this;
        var _a = R.omit([
            'store',
            'setCurrentContainerName',
            'loadedFromPersist',
            'isInitialized',
            'createWindow',
            'topClassName',
            'containerName',
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
            'isOnTop',
            'storedPosition',
            'storeSubscription'
        ], this.props), children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, zIndex = _a.zIndex, storedVisible = _a.storedVisible, switchTo = _a.switchTo, open = _a.open, close = _a.close, draggable = _a.draggable, _c = _a.draggableProps, draggableProps = _c === void 0 ? {} : _c, _d = _a.rememberPosition, rememberPosition = _d === void 0 ? draggable : _d, divProps = __rest(_a, ["children", "style", "zIndex", "storedVisible", "switchTo", "open", "close", "draggable", "draggableProps", "rememberPosition"]);
        var drag = !!draggable && !!storedVisible;
        var x = this.calculateX();
        var y = this.calculateY();
        var w = (React.createElement("div", __assign({}, divProps, { ref: function (el) { return _this.calculateDimensions(el); }, className: this.getClassName(), onMouseDown: drag ? noop : this.onMouseDown.bind(this), style: __assign({}, style, { zIndex: zIndex, position: 'absolute', display: storedVisible ? 'block' : 'none', x: !drag ? x : undefined, y: !drag ? y : undefined }) }), children instanceof Function ? children({ switchTo: switchTo, open: open, close: close }) : children));
        var hasDefaultPosition = rememberPosition || this.state.width !== 0;
        if (drag && hasDefaultPosition) {
            return (React.createElement(Draggable, __assign({}, draggableProps, { onStop: this.onDrag.bind(this), onMouseDown: this.onMouseDown.bind(this), position: rememberPosition ? { x: x, y: y } : undefined, defaultPosition: hasDefaultPosition ? { x: x, y: y } : undefined }), w));
        }
        else {
            return w;
        }
    };
    return DumbHistoryWindow;
}(react_1.Component));
exports.default = DumbHistoryWindow;
//# sourceMappingURL=DumbHistoryWindow.js.map