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
exports.E_to_D = exports.D_to_E = void 0;
var HistoryStack_1 = require("../model/HistoryStack");
/**
 * Allow inter-container history (e.g. different full window screens)
 */
var D_to_E = function (h, D, E) { return new HistoryStack_1.default(__assign(__assign({}, h), { back: __spreadArray(__spreadArray(__spreadArray([], D.back, true), [D.current], false), h.back, true) })); };
exports.D_to_E = D_to_E;
var E_to_D = function (h, E, D) { return new HistoryStack_1.default(__assign(__assign({}, h), { forward: __spreadArray([E.current], E.forward, true) })); };
exports.E_to_D = E_to_D;
//# sourceMappingURL=interContainerHistory.js.map