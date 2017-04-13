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
var reconciler_1 = require("../../util/reconciler");
var Action_1 = require("../Action");
var Serializable_1 = require("../../store/decorators/Serializable");
var immutable_1 = require("immutable");
/**
 * The user used the browser's back or forward button to pop to another page
 * This action can be examined later to determine slide animation direction
 * (n < 0 = left, n > 0 = right)
 */
var PopState = PopState_1 = (function (_super) {
    __extends(PopState, _super);
    function PopState(_a) {
        var time = _a.time, n = _a.n;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = PopState_1.type;
        _this.n = n;
        return _this;
    }
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
            var ps1 = immutable_1.List(h1.flatten());
            var ps2 = immutable_1.List(h2.flatten());
            return steps.concat(reconciler_1.diffPagesToSteps(ps1, ps2));
        }
    };
    return PopState;
}(Action_1.default));
PopState.type = 'PopState';
PopState = PopState_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], PopState);
exports.default = PopState;
var PopState_1;
//# sourceMappingURL=PopState.js.map