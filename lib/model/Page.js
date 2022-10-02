"use strict";
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
var isEqual = require("lodash/isEqual");
var Serializable_1 = require("../store/decorators/Serializable");
var Page = /** @class */ (function () {
    function Page(_a) {
        var url = _a.url, params = _a.params, container = _a.container, group = _a.group, _b = _a.isZeroPage, isZeroPage = _b === void 0 ? false : _b;
        this.type = Page_1.type;
        this.url = url;
        this.params = params;
        this.container = container;
        this.group = group;
        this.isZeroPage = isZeroPage;
    }
    Page_1 = Page;
    Object.defineProperty(Page.prototype, "state", {
        get: function () {
            return this.isZeroPage ? {
                isZeroPage: this.isZeroPage
            } : {
                url: this.url,
                container: this.container,
                group: this.group,
                isZeroPage: this.isZeroPage
            };
        },
        enumerable: false,
        configurable: true
    });
    Page.prototype.equals = function (other) {
        return isEqual(this.state, other.state);
    };
    var Page_1;
    Page.type = 'Page';
    Page = Page_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], Page);
    return Page;
}());
exports.default = Page;
//# sourceMappingURL=Page.js.map