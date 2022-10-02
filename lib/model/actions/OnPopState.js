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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("../Action");
var Serializable_1 = require("../../store/decorators/Serializable");
var PopState_1 = require("./PopState");
/**
 * This never gets stored in the actions list,
 * it's just used to calculate the shift amount
 * and trigger an actual PopState action
 */
var OnPopState = /** @class */ (function (_super) {
    __extends(OnPopState, _super);
    function OnPopState(_a) {
        var time = _a.time, page = _a.page;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = OnPopState_1.type;
        _this.page = page;
        return _this;
    }
    OnPopState_1 = OnPopState;
    /* @ts-ignore */
    OnPopState.prototype.filter = function (state) {
        return [
            new PopState_1.default({
                time: this.time,
                n: state.getShiftAmount(this.page)
            })
        ];
    };
    var OnPopState_1;
    OnPopState.type = 'OnPopState';
    OnPopState = OnPopState_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], OnPopState);
    return OnPopState;
}(Action_1.default));
exports.default = OnPopState;
//# sourceMappingURL=OnPopState.js.map