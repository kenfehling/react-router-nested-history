"use strict";
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
var immutable_1 = require("immutable");
/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
var HistoryStack = /** @class */ (function () {
    function HistoryStack(_a) {
        var back = _a.back, current = _a.current, forward = _a.forward;
        this.back = back;
        this.current = current;
        this.forward = forward;
    }
    Object.defineProperty(HistoryStack.prototype, "lastVisit", {
        get: function () {
            return this.current.lastVisit;
        },
        enumerable: false,
        configurable: true
    });
    HistoryStack.prototype.flatten = function () {
        return (0, immutable_1.List)(__spreadArray(__spreadArray(__spreadArray([], this.back, true), [this.current], false), this.forward, true));
    };
    return HistoryStack;
}());
exports.default = HistoryStack;
//# sourceMappingURL=HistoryStack.js.map