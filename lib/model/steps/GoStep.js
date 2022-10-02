"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser = require("../../util/browserFunctions");
var GoStep = /** @class */ (function () {
    function GoStep(n) {
        this.needsPopListener = true;
        this.n = n;
    }
    GoStep.prototype.run = function () {
        browser.go(this.n);
    };
    return GoStep;
}());
exports.default = GoStep;
//# sourceMappingURL=GoStep.js.map