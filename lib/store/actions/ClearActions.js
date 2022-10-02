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
/**
 * Only for testing purposes
 */
var ClearActions = /** @class */ (function (_super) {
    __extends(ClearActions, _super);
    function ClearActions(_a) {
        var _b = _a === void 0 ? {} : _a, time = _b.time;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = ClearActions.type;
        return _this;
    }
    // @ts-ignore
    ClearActions.prototype.store = function (actions) {
        return [];
    };
    ClearActions.type = 'ClearActions';
    return ClearActions;
}(Action_1.default));
exports.default = ClearActions;
//# sourceMappingURL=ClearActions.js.map