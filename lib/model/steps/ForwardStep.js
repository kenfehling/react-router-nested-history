"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser = require("../../util/browserFunctions");
var ForwardStep = (function () {
    function ForwardStep(n) {
        if (n === void 0) { n = 1; }
        this.needsPopListener = true;
        this.n = n;
    }
    ForwardStep.prototype.run = function () {
        browser.forward(this.n);
    };
    return ForwardStep;
}());
exports.default = ForwardStep;
//# sourceMappingURL=ForwardStep.js.map