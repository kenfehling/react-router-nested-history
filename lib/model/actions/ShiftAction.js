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
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("../Action");
var ShiftAction = /** @class */ (function (_super) {
    __extends(ShiftAction, _super);
    function ShiftAction(_a) {
        var time = _a.time, container = _a.container, _b = _a.n, n = _b === void 0 ? 1 : _b;
        var _this = _super.call(this, { time: time }) || this;
        _this.container = container;
        _this.n = n;
        return _this;
    }
    /* @ts-ignore */
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