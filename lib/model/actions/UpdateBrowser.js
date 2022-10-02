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
var NonStepAction_1 = require("./NonStepAction");
var Action_1 = require("../Action");
var Serializable_1 = require("../../store/decorators/Serializable");
var UpdateBrowser = /** @class */ (function (_super) {
    __extends(UpdateBrowser, _super);
    function UpdateBrowser(_a) {
        var _b = _a === void 0 ? {} : _a, time = _b.time;
        var _this = _super.call(this, { time: time, origin: Action_1.SYSTEM }) || this;
        _this.type = UpdateBrowser_1.type;
        return _this;
    }
    UpdateBrowser_1 = UpdateBrowser;
    var UpdateBrowser_1;
    UpdateBrowser.type = 'UpdateBrowser';
    UpdateBrowser = UpdateBrowser_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], UpdateBrowser);
    return UpdateBrowser;
}(NonStepAction_1.default));
exports.default = UpdateBrowser;
//# sourceMappingURL=UpdateBrowser.js.map