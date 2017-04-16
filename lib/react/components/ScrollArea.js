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
var ScrollArea = (function (_super) {
    __extends(ScrollArea, _super);
    function ScrollArea(props) {
        return _super.call(this, props) || this;
    }
    ScrollArea.prototype.checkProps = function () {
        if (this.context.groupName == null) {
            throw new Error('ScrollArea needs to be inside a ContainerGroup');
        }
        if (this.context.containerName == null) {
            throw new Error('ScrollArea needs to be inside a Container');
        }
    };
    ScrollArea.prototype.getKey = function () {
        var _a = this.context, groupName = _a.groupName, containerName = _a.containerName;
        return groupName + '_' + containerName;
    };
    ScrollArea.prototype.saveScrolls = function (_a) {
        var _b = _a.left, left = _b === void 0 ? 0 : _b, _c = _a.top, top = _c === void 0 ? 0 : _c;
        var key = this.getKey();
        ScrollArea.scrollLefts[key] = left;
        ScrollArea.scrollTops[key] = top;
    };
    ScrollArea.prototype.onScroll = function (event) {
        this.saveScrolls({
            left: event.target.scrollLeft,
            top: event.target.scrollTop
        });
    };
    ScrollArea.prototype.loadScrolls = function () {
        var key = this.getKey();
        if (this.scrollArea) {
            this.scrollArea.scrollLeft = ScrollArea.scrollLefts[key] || 0;
            this.scrollArea.scrollTop = ScrollArea.scrollTops[key] || 0;
        }
    };
    ScrollArea.prototype.clearScrolls = function () {
        this.saveScrolls({});
    };
    ScrollArea.prototype.componentDidMount = function () {
        this.checkProps();
        this.loadScrolls();
    };
    ScrollArea.prototype.componentWillUnmount = function () {
        if (this.props.resetOnLeave) {
            this.clearScrolls();
        }
    };
    ScrollArea.prototype.render = function () {
        var _this = this;
        var _a = R.omit(['resetOnLeave'], this.props), children = _a.children, _b = _a.horizontal, horizontal = _b === void 0 ? false : _b, _c = _a.vertical, vertical = _c === void 0 ? false : _c, _d = _a.style, style = _d === void 0 ? {} : _d, divProps = __rest(_a, ["children", "horizontal", "vertical", "style"]);
        return (React.createElement("div", __assign({ ref: function (ref) { return _this.scrollArea = ref; }, onScroll: this.onScroll.bind(this) }, divProps, { style: __assign({}, style, { overflowX: horizontal ? 'scroll' : 'hidden', overflowY: vertical ? 'scroll' : 'hidden', WebkitOverflowScrolling: 'touch' }) }), children));
    };
    return ScrollArea;
}(react_1.Component));
ScrollArea.scrollLefts = {};
ScrollArea.scrollTops = {};
ScrollArea.contextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    containerName: react_1.PropTypes.string.isRequired
};
exports.default = ScrollArea;
//# sourceMappingURL=ScrollArea.js.map