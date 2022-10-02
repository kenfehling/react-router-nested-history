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
var Serializable_1 = require("../../store/decorators/Serializable");
var Push_1 = require("./Push");
var ReplaceStep_1 = require("../steps/ReplaceStep");
var Replace = /** @class */ (function (_super) {
    __extends(Replace, _super);
    function Replace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = Replace_1.type;
        return _this;
    }
    Replace_1 = Replace;
    Replace.prototype.fn = function (state) {
        return state.replace;
    };
    Replace.prototype.addSteps = function (steps, state) {
        return __spreadArray(__spreadArray([], steps, true), [new ReplaceStep_1.default(this.createPage(state))], false);
    };
    var Replace_1;
    Replace.type = 'Replace';
    Replace = Replace_1 = __decorate([
        Serializable_1.default
    ], Replace);
    return Replace;
}(Push_1.default));
exports.default = Replace;
//# sourceMappingURL=Replace.js.map