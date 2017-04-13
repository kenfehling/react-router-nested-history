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
var Action_1 = require("../Action");
var ShiftAction = (function (_super) {
    __extends(ShiftAction, _super);
    function ShiftAction(_a) {
        var time = _a.time, container = _a.container, _b = _a.n, n = _b === void 0 ? 1 : _b;
        var _this = _super.call(this, { time: time }) || this;
        _this.container = container;
        _this.n = n;
        return _this;
    }
    ShiftAction.prototype.reduce = function (state) {
        var fn = this.fn(state).bind(state);
        return fn({
            n: this.n,
            time: this.time,
            container: this.container
        });
    };
    return ShiftAction;
}(Action_1.default));
exports.default = ShiftAction;
//# sourceMappingURL=ShiftAction.js.map