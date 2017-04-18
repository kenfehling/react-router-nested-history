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
Object.defineProperty(exports, "__esModule", { value: true });
var PageVisit_1 = require("./PageVisit");
var Page_1 = require("./Page");
var some_1 = require("lodash/some");
var last_1 = require("lodash/last");
var VisitedPage = (function (_super) {
    __extends(VisitedPage, _super);
    function VisitedPage(_a) {
        var url = _a.url, params = _a.params, container = _a.container, group = _a.group, _b = _a.isZeroPage, isZeroPage = _b === void 0 ? false : _b, _c = _a.visits, visits = _c === void 0 ? [] : _c;
        var _this = _super.call(this, { url: url, params: params, container: container, group: group, isZeroPage: isZeroPage }) || this;
        _this.visits = visits;
        return _this;
    }
    VisitedPage.prototype.touch = function (visit) {
        return new VisitedPage(__assign({}, Object(this), { visits: this.visits.concat([visit]) }));
    };
    Object.defineProperty(VisitedPage.prototype, "wasManuallyVisited", {
        get: function () {
            return some_1.default(this.visits, function (v) { return v.type === PageVisit_1.VisitType.MANUAL; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VisitedPage.prototype, "firstManualVisit", {
        get: function () {
            return this.visits.filter(function (p) { return p.type === PageVisit_1.VisitType.MANUAL; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VisitedPage.prototype, "lastVisit", {
        get: function () {
            return last_1.default(this.visits);
        },
        enumerable: true,
        configurable: true
    });
    VisitedPage.prototype.toPage = function () {
        return new Page_1.default(this);
    };
    return VisitedPage;
}(Page_1.default));
exports.default = VisitedPage;
//# sourceMappingURL=VisitedPage.js.map