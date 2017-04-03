"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
/**
 * Not really a stack in the strictest definition, rather two arrays and a value,
 * but the name History is already built-in type in TypeScript
 */
var HistoryStack = (function () {
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
        enumerable: true,
        configurable: true
    });
    HistoryStack.prototype.flatten = function () {
        return immutable_1.List(this.back.concat([this.current], this.forward));
    };
    return HistoryStack;
}());
exports.default = HistoryStack;
//# sourceMappingURL=HistoryStack.js.map