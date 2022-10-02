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
var SwitchToGroup = /** @class */ (function (_super) {
    __extends(SwitchToGroup, _super);
    function SwitchToGroup(_a) {
        var time = _a.time, origin = _a.origin, name = _a.name;
        var _this = _super.call(this, { time: time, origin: origin }) || this;
        _this.type = SwitchToGroup_1.type;
        _this.name = name;
        return _this;
    }
    SwitchToGroup_1 = SwitchToGroup;
    /* @ts-ignore */
    SwitchToGroup.prototype.reduce = function (state) {
        return state.switchToGroup({
            name: this.name,
            time: this.time
        });
    };
    /* @ts-ignore */
    SwitchToGroup.prototype.filter = function (state) {
        return state.isGroupActive(this.name) ? [] : [this];
    };
    var SwitchToGroup_1;
    SwitchToGroup.type = 'SwitchToGroup';
    SwitchToGroup = SwitchToGroup_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], SwitchToGroup);
    return SwitchToGroup;
}(Action_1.default));
exports.default = SwitchToGroup;
//# sourceMappingURL=SwitchToGroup.js.map