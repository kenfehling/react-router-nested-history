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
Object.defineProperty(exports, "__esModule", { value: true });
var Serializable_1 = require("../../store/decorators/Serializable");
var Push_1 = require("./Push");
var ReplaceStep_1 = require("../steps/ReplaceStep");
var Replace = Replace_1 = (function (_super) {
    __extends(Replace, _super);
    function Replace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = Replace_1.type;
        return _this;
    }
    Replace.prototype.fn = function (state) {
        return state.replace;
    };
    Replace.prototype.addSteps = function (steps, state) {
        return steps.concat([new ReplaceStep_1.default(this.createPage(state))]);
    };
    return Replace;
}(Push_1.default));
Replace.type = 'Replace';
Replace = Replace_1 = __decorate([
    Serializable_1.default
], Replace);
exports.default = Replace;
var Replace_1;
//# sourceMappingURL=Replace.js.map