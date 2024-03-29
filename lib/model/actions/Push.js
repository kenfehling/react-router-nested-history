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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var Action_1 = require("../Action");
var Page_1 = require("../Page");
var url_1 = require("../../util/url");
var SwitchToContainer_1 = require("./SwitchToContainer");
var Serializable_1 = require("../../store/decorators/Serializable");
var Push = /** @class */ (function (_super) {
    __extends(Push, _super);
    function Push(_a) {
        var time = _a.time, origin = _a.origin, container = _a.container, url = _a.url;
        var _this = _super.call(this, { time: time, origin: origin }) || this;
        _this.type = Push_1.type;
        _this.container = container;
        _this.url = url;
        return _this;
    }
    Push_1 = Push;
    Push.prototype.fn = function (state) {
        return state.push;
    };
    Push.prototype.getContainer = function (state) {
        if (this.container) {
            return state.containers.get(this.container);
        }
        else {
            var activeContainer = state.activeContainer;
            if (activeContainer && (0, url_1.patternsMatch)(activeContainer.patterns, this.url)) {
                return activeContainer;
            }
        }
    };
    Push.prototype.createPage = function (state) {
        var c = this.getContainer(state);
        if (c) {
            var params = (0, url_1.parseParamsFromPatterns)(c.patterns, this.url);
            return new Page_1.default({
                params: params,
                url: this.url,
                container: c.name,
                group: c.group
            });
        }
        else { // zero page
            return new Page_1.default({
                params: {},
                url: this.url,
                container: '',
                group: '',
                isZeroPage: true
            });
        }
    };
    /* @ts-ignore */
    Push.prototype.reduce = function (state) {
        var page = this.createPage(state);
        return this.fn(state).bind(state)({
            page: page,
            time: this.time
        });
    };
    /* @ts-ignore */
    Push.prototype.filter = function (state) {
        if (state.activeUrl === this.url) {
            return [];
        }
        else if (this.container) {
            var data = {
                origin: new Action_1.ActionOrigin(this),
            };
            return [
                /* @ts-ignore */
                new SwitchToContainer_1.default(__assign(__assign({}, data), { time: this.time - 1, name: this.container })),
                this
            ];
        }
        else {
            return [this];
        }
    };
    var Push_1;
    Push.type = 'Push';
    Push = Push_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], Push);
    return Push;
}(Action_1.default));
exports.default = Push;
//# sourceMappingURL=Push.js.map