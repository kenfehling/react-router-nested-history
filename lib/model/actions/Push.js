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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var Page_1 = require("../Page");
var url_1 = require("../../util/url");
var SwitchToGroup_1 = require("./SwitchToGroup");
var SwitchToContainer_1 = require("./SwitchToContainer");
var Serializable_1 = require("../../store/decorators/Serializable");
var Push = Push_1 = (function (_super) {
    __extends(Push, _super);
    function Push(_a) {
        var time = _a.time, origin = _a.origin, groupName = _a.groupName, containerName = _a.containerName, url = _a.url;
        var _this = _super.call(this, { time: time, origin: origin }) || this;
        _this.type = Push_1.type;
        _this.groupName = groupName;
        _this.containerName = containerName;
        _this.url = url;
        return _this;
    }
    Push.prototype.reduce = function (state) {
        var container = state.getContainer(this.groupName, this.containerName);
        var params = url_1.parseParamsFromPatterns(container.patterns, this.url);
        var page = new Page_1.default({
            params: params,
            url: this.url,
            groupName: this.groupName,
            containerName: this.containerName
        });
        return state.push(page, this.time);
    };
    Push.prototype.filter = function (state) {
        if (state.activeUrl === this.url) {
            return [];
        }
        else {
            var data = {
                groupName: this.groupName,
                origin: new BaseAction_1.ActionOrigin(this)
            };
            return [
                new SwitchToGroup_1.default(__assign({}, data, { time: this.time - 2 })),
                new SwitchToContainer_1.default(__assign({}, data, { time: this.time - 1, name: this.containerName })),
                this
            ];
        }
    };
    return Push;
}(BaseAction_1.default));
Push.type = 'Push';
Push = Push_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], Push);
exports.default = Push;
var Push_1;
//# sourceMappingURL=Push.js.map