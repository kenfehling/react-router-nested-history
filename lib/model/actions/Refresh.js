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
var NonStepAction_1 = require("./NonStepAction");
var Serializable_1 = require("../../store/decorators/Serializable");
var Load_1 = require("./Load");
var Refresh = Refresh_1 = (function (_super) {
    __extends(Refresh, _super);
    function Refresh(_a) {
        var time = (_a === void 0 ? {} : _a).time;
        var _this = _super.call(this, { time: time, origin: BaseAction_1.USER }) || this;
        _this.type = Refresh_1.type;
        return _this;
    }
    Refresh.prototype.reduce = function (state) {
        return state.assign({
            loadedFromRefresh: true,
            lastUpdate: this.time
        });
    };
    Refresh.prototype.store = function (actions) {
        var updatedActions = actions.map(function (action) {
            if (action instanceof Load_1.default) {
                return new Load_1.default(__assign({}, action, { fromRefresh: true }));
            }
            else {
                return action;
            }
        });
        return _super.prototype.store.call(this, updatedActions);
    };
    return Refresh;
}(NonStepAction_1.default));
Refresh.type = 'Refresh';
Refresh = Refresh_1 = __decorate([
    Serializable_1.default,
    __metadata("design:paramtypes", [Object])
], Refresh);
exports.default = Refresh;
var Refresh_1;
//# sourceMappingURL=Refresh.js.map