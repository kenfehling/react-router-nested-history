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
var Top = /** @class */ (function (_super) {
    __extends(Top, _super);
    function Top(_a) {
        var time = _a.time, origin = _a.origin, container = _a.container, _b = _a.reset, reset = _b === void 0 ? false : _b;
        var _this = _super.call(this, { time: time, origin: origin }) || this;
        _this.type = Top_1.type;
        _this.container = container;
        _this.reset = reset;
        return _this;
    }
    Top_1 = Top;
    /* @ts-ignore */
    Top.prototype.reduce = function (state) {
        return state.top({
            container: this.container,
            reset: this.reset,
            time: this.time,
        });
    };
    /* @ts-ignore */
    Top.prototype.filter = function (state) {
        return state.isContainerAtTopPage(this.container) ? [] : [this];
    };
    var Top_1;
    Top.type = 'Top';
    Top = Top_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], Top);
    return Top;
}(Action_1.default));
exports.default = Top;
//# sourceMappingURL=Top.js.map