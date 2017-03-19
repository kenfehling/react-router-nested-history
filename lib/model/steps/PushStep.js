"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser = require("../../util/browserFunctions");
var PushStep = (function () {
    function PushStep(page) {
        this.needsPopListener = false;
        this.page = page;
    }
    PushStep.prototype.run = function () {
        browser.push(this.page);
    };
    return PushStep;
}());
exports.default = PushStep;
//# sourceMappingURL=PushStep.js.map