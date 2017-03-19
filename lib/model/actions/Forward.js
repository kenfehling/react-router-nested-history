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
var BaseAction_1 = require("../BaseAction");
var Serializable_1 = require("../../store/decorators/Serializable");
var Forward = Forward_1 = (function (_super) {
    __extends(Forward, _super);
    function Forward(_a) {
        var _b = _a === void 0 ? {} : _a, time = _b.time, _c = _b.n, n = _c === void 0 ? 1 : _c;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = Forward_1.type;
        _this.n = n;
        return _this;
    }
    Forward.prototype.reduce = function (state) {
        return state.forward(this.n, this.time);
    };
    return Forward;
}(BaseAction_1.default));
Forward.type = 'Forward';
Forward = Forward_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], Forward);
exports.default = Forward;
var Forward_1;
//# sourceMappingURL=Forward.js.map