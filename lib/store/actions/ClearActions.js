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
/**
 * Only for testing purposes
 */
var ClearActions = (function (_super) {
    __extends(ClearActions, _super);
    function ClearActions(_a) {
        var time = (_a === void 0 ? {} : _a).time;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = ClearActions.type;
        return _this;
    }
    ClearActions.prototype.store = function (actions) {
        return [];
    };
    return ClearActions;
}(Action_1.default));
ClearActions.type = 'ClearActions';
exports.default = ClearActions;
//# sourceMappingURL=ClearActions.js.map