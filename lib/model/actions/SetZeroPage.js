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
var NonStepAction_1 = require("./NonStepAction");
var Action_1 = require("../Action");
var Serializable_1 = require("../../store/decorators/Serializable");
var SetZeroPage = SetZeroPage_1 = (function (_super) {
    __extends(SetZeroPage, _super);
    function SetZeroPage(_a) {
        var time = _a.time, url = _a.url;
        var _this = _super.call(this, { time: time, origin: Action_1.SYSTEM }) || this;
        _this.type = SetZeroPage_1.type;
        _this.url = url;
        return _this;
    }
    SetZeroPage.prototype.reduce = function (state) {
        return state.assign({
            zeroPageUrl: this.url
        });
    };
    return SetZeroPage;
}(NonStepAction_1.default));
SetZeroPage.type = 'SetZeroPage';
SetZeroPage = SetZeroPage_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], SetZeroPage);
exports.default = SetZeroPage;
var SetZeroPage_1;
//# sourceMappingURL=SetZeroPage.js.map