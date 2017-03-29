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
var OpenWindow = OpenWindow_1 = (function (_super) {
    __extends(OpenWindow, _super);
    function OpenWindow(_a) {
        var time = _a.time, groupName = _a.groupName, index = _a.index, name = _a.name;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = OpenWindow_1.type;
        _this.groupName = groupName;
        _this.index = index;
        _this.name = name;
        return _this;
    }
    OpenWindow.prototype.reduce = function (state) {
        if (this.groupName && this.index) {
            return state.openWindowAtIndex({
                groupName: this.groupName,
                index: this.index,
                time: this.time
            });
        }
        else if (this.name) {
            return state.openWindowForName({
                name: this.name,
                time: this.time
            });
        }
        else {
            throw new Error('You must pass either groupName+index or name to OpenWindow');
        }
    };
    return OpenWindow;
}(BaseAction_1.default));
OpenWindow.type = 'OpenWindow';
OpenWindow = OpenWindow_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], OpenWindow);
exports.default = OpenWindow;
var OpenWindow_1;
//# sourceMappingURL=OpenWindow.js.map