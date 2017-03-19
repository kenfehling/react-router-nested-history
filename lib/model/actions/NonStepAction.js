"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAction_1 = require("../BaseAction");
var NonStepAction = (function (_super) {
    __extends(NonStepAction, _super);
    function NonStepAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NonStepAction.prototype.addSteps = function (steps, state) {
        return steps; // just return original steps
    };
    return NonStepAction;
}(BaseAction_1.default));
exports.default = NonStepAction;
//# sourceMappingURL=NonStepAction.js.map