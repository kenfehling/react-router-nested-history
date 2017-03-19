"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser = require("../../util/browserFunctions");
var ReplaceStep = (function () {
    function ReplaceStep(page) {
        this.needsPopListener = false;
        this.page = page;
    }
    ReplaceStep.prototype.run = function () {
        browser.replace(this.page);
    };
    return ReplaceStep;
}());
exports.default = ReplaceStep;
//# sourceMappingURL=ReplaceStep.js.map