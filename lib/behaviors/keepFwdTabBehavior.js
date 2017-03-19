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
 * In this world, forward history is kept even if it's a different tab
 */
exports.E_to_D = function (h, E, D) { return new Pages_1.HistoryStack(__assign({}, h, { forward: [E.current].concat(E.forward) })); };
exports.D_to_E = function (h, D, E) { return h; };
//# sourceMappingURL=keepFwdTabBehavior.js.map