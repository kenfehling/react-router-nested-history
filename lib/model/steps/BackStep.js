"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser = require("../../util/browserFunctions");
var BackStep = /** @class */ (function () {
    function BackStep(n) {
        if (n === void 0) { n = 1; }
        this.needsPopListener = true;
        this.n = n;
    }
    BackStep.prototype.run = function () {
        browser.back(this.n);
    };
    return BackStep;
}());
exports.default = BackStep;
//# sourceMappingURL=BackStep.js.map