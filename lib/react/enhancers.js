"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recompose_1 = require("recompose");
exports.neverUpdate = recompose_1.shouldUpdate(function (props, nextProps) { return false; });
//# sourceMappingURL=enhancers.js.map