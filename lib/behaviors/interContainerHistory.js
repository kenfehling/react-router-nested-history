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
 * Allow inter-container history (e.g. different full window screens)
 */
exports.D_to_E = function (h, D, E) { return new Pages_1.HistoryStack(__assign({}, h, { back: D.back.concat([D.current], h.back) })); };
exports.E_to_D = function (h, E, D) { return new Pages_1.HistoryStack(__assign({}, h, { forward: [E.current].concat(E.forward) })); };
//# sourceMappingURL=interContainerHistory.js.map