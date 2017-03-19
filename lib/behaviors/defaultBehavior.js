"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Pages_1 = require("../model/Pages");
/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 */
/**
 * Default to non-default
 */
exports.A_to_B = function (h, A, B) { return new Pages_1.HistoryStack(__assign({}, h, { back: A.back.concat([A.current], h.back) })); };
/**
 * Non-default to default
 */
exports.B_to_A = function (h, A, B) { return h; };
/**
 * Non-default to non-default
 */
exports.B_to_C = function (h, A, B, C) { return new Pages_1.HistoryStack(__assign({}, h, { back: A.back.concat([A.current], h.back) })); };
//# sourceMappingURL=defaultBehavior.js.map