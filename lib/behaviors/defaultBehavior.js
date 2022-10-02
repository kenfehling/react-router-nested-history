"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.B_to_C = exports.B_to_A = exports.A_to_B = void 0;
var HistoryStack_1 = require("../model/HistoryStack");
/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 */
/**
 * Default to non-default
 */
var A_to_B = function (h, A, B) { return new HistoryStack_1.default(__assign(__assign({}, h), { back: __spreadArray(__spreadArray(__spreadArray([], A.back, true), [A.current], false), h.back, true) })); };
exports.A_to_B = A_to_B;
/**
 * Non-default to default
 */
var B_to_A = function (h, A, B) { return h; };
exports.B_to_A = B_to_A;
/**
 * Non-default to non-default
 */
var B_to_C = function (h, A, B, C) { return new HistoryStack_1.default(__assign(__assign({}, h), { back: __spreadArray(__spreadArray(__spreadArray([], A.back, true), [A.current], false), h.back, true) })); };
exports.B_to_C = B_to_C;
//# sourceMappingURL=defaultBehavior.js.map