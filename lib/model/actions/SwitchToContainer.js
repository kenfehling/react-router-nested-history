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
/**
 * Accepts either a container name or a group + a container index
 */
var SwitchToContainer = /** @class */ (function (_super) {
    __extends(SwitchToContainer, _super);
    function SwitchToContainer(_a) {
        var time = _a.time, origin = _a.origin, _b = _a.name, name = _b === void 0 ? undefined : _b, _c = _a.group, group = _c === void 0 ? undefined : _c, _d = _a.index, index = _d === void 0 ? undefined : _d;
        var _this = _super.call(this, { time: time, origin: origin }) || this;
        _this.type = SwitchToContainer_1.type;
        _this.name = name;
        _this.group = group;
        _this.index = index;
        return _this;
    }
    SwitchToContainer_1 = SwitchToContainer;
    SwitchToContainer.prototype.getContainer = function (state) {
        if (this.name) {
            return this.name;
        }
        else if (this.group != null && this.index != null) {
            return state.getContainerNameByIndex(this.group, this.index);
        }
        else {
            throw new Error('Need to pass name or group & index to SwitchToContainer');
        }
    };
    /* @ts-ignore */
    SwitchToContainer.prototype.reduce = function (state) {
        return state.switchToContainer({
            name: this.getContainer(state),
            time: this.time,
        });
    };
    /* @ts-ignore */
    SwitchToContainer.prototype.filter = function (state) {
        var container = this.getContainer(state);
        return state.isContainerActiveAndEnabled(container) ? [] : [this];
    };
    var SwitchToContainer_1;
    SwitchToContainer.type = 'SwitchToContainer';
    SwitchToContainer = SwitchToContainer_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], SwitchToContainer);
    return SwitchToContainer;
}(Action_1.default));
exports.default = SwitchToContainer;
//# sourceMappingURL=SwitchToContainer.js.map