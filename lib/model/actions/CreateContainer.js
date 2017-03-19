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
var CreateContainer = CreateContainer_1 = (function (_super) {
    __extends(CreateContainer, _super);
    function CreateContainer(_a) {
        var time = _a.time, name = _a.name, groupName = _a.groupName, initialUrl = _a.initialUrl, patterns = _a.patterns, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c;
        var _this = _super.call(this, { time: time, origin: BaseAction_1.SYSTEM }) || this;
        _this.type = CreateContainer_1.type;
        _this.name = name;
        _this.groupName = groupName;
        _this.initialUrl = initialUrl;
        _this.patterns = patterns;
        _this.isDefault = isDefault;
        _this.resetOnLeave = resetOnLeave;
        return _this;
    }
    CreateContainer.prototype.reduce = function (state) {
        return state.addContainer({
            time: this.time,
            name: this.name,
            groupName: this.groupName,
            initialUrl: this.initialUrl,
            isDefault: this.isDefault,
            resetOnLeave: this.resetOnLeave,
            patterns: this.patterns
        });
    };
    CreateContainer.prototype.filter = function (state) {
        return state.loadedFromRefresh ? [] : [this];
    };
    return CreateContainer;
}(BaseAction_1.default));
CreateContainer.type = 'CreateContainer';
CreateContainer = CreateContainer_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], CreateContainer);
exports.default = CreateContainer;
var CreateContainer_1;
//# sourceMappingURL=CreateContainer.js.map