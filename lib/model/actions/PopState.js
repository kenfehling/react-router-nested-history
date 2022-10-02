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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var reconciler_1 = require("../../util/reconciler");
var Action_1 = require("../Action");
var Serializable_1 = require("../../store/decorators/Serializable");
var immutable_1 = require("immutable");
/**
 * The user used the browser's back or forward button to pop to another page
 * This action can be examined later to determine slide animation direction
 * (n < 0 = left, n > 0 = right)
 */
var PopState = /** @class */ (function (_super) {
    __extends(PopState, _super);
    function PopState(_a) {
        var time = _a.time, n = _a.n;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = PopState_1.type;
        _this.n = n;
        return _this;
    }
    PopState_1 = PopState;
    /* @ts-ignore */
    PopState.prototype.reduce = function (state) {
        return state.go({ n: this.n, time: this.time });
    };
    PopState.prototype.addSteps = function (steps, state) {
        var newState = this.reduce(state);
        var h1 = newState.historyWithFwdMaintained;
        if (h1.current.isZeroPage) {
            return steps;
        }
        else {
            var h2 = newState.history;
            var ps1 = (0, immutable_1.List)(h1.flatten());
            var ps2 = (0, immutable_1.List)(h2.flatten());
            return __spreadArray(__spreadArray([], steps, true), (0, reconciler_1.diffPagesToSteps)(ps1, ps2), true);
        }
    };
    var PopState_1;
    PopState.type = 'PopState';
    PopState = PopState_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], PopState);
    return PopState;
}(Action_1.default));
exports.default = PopState;
//# sourceMappingURL=PopState.js.map