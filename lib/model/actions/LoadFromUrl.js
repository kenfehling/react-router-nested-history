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
var InitializedState_1 = require("../InitializedState");
var Serializable_1 = require("../../store/decorators/Serializable");
var load = function (state, url, time) {
    return new InitializedState_1.default(state.groups.reduce(function (s, group) {
        return s.replaceGroup(group.loadFromUrl(url, time));
    }, state));
};
var LoadFromUrl = LoadFromUrl_1 = (function (_super) {
    __extends(LoadFromUrl, _super);
    function LoadFromUrl(_a) {
        var time = _a.time, url = _a.url, _b = _a.fromRefresh, fromRefresh = _b === void 0 ? false : _b;
        var _this = _super.call(this, { time: time, origin: BaseAction_1.USER }) || this;
        _this.type = LoadFromUrl_1.type;
        _this.url = url;
        _this.fromRefresh = fromRefresh;
        return _this;
    }
    LoadFromUrl.prototype.reduce = function (state) {
        return this.fromRefresh ? new InitializedState_1.default(state) :
            load(state, this.url, this.time);
    };
    LoadFromUrl.prototype.addSteps = function (steps, state) {
        return this.fromRefresh ? [] : _super.prototype.addSteps.call(this, steps, state);
    };
    return LoadFromUrl;
}(BaseAction_1.default));
LoadFromUrl.type = 'LoadFromUrl';
LoadFromUrl = LoadFromUrl_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], LoadFromUrl);
exports.default = LoadFromUrl;
var LoadFromUrl_1;
//# sourceMappingURL=LoadFromUrl.js.map