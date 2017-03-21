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
var Top_1 = require("./Top");
var Serializable_1 = require("../../store/decorators/Serializable");
var SwitchToContainer = SwitchToContainer_1 = (function (_super) {
    __extends(SwitchToContainer, _super);
    function SwitchToContainer(_a) {
        var time = _a.time, origin = _a.origin, groupName = _a.groupName, _b = _a.name, name = _b === void 0 ? null : _b, _c = _a.index, index = _c === void 0 ? null : _c;
        var _this = _super.call(this, { time: time, origin: origin }) || this;
        _this.type = SwitchToContainer_1.type;
        _this.groupName = groupName;
        _this.name = name;
        _this.index = index;
        return _this;
    }
    SwitchToContainer.prototype.getContainerName = function (state) {
        if (this.name) {
            return this.name;
        }
        else if (this.index != null) {
            return state.getContainerNameByIndex(this.groupName, this.index);
        }
        else {
            throw new Error('Need to pass name or index to SwitchToContainer');
        }
    };
    SwitchToContainer.prototype.reduce = function (state) {
        return state.switchToContainer({
            groupName: this.groupName,
            name: this.getContainerName(state),
            time: this.time
        });
    };
    SwitchToContainer.prototype.filter = function (state) {
        var containerName = this.getContainerName(state);
        if (state.isContainerActiveAndEnabled(this.groupName, containerName)) {
            if (this.origin === BaseAction_1.USER) {
                var group = state.getGroupByName(this.groupName);
                if (group.gotoTopOnSelectActive) {
                    return [new Top_1.default({
                            groupName: this.groupName,
                            containerName: containerName,
                            origin: new BaseAction_1.ActionOrigin(this)
                        })];
                }
            }
            return [];
        }
        else {
            return [this];
        }
    };
    return SwitchToContainer;
}(BaseAction_1.default));
SwitchToContainer.type = 'SwitchToContainer';
SwitchToContainer = SwitchToContainer_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], SwitchToContainer);
exports.default = SwitchToContainer;
var SwitchToContainer_1;
//# sourceMappingURL=SwitchToContainer.js.map