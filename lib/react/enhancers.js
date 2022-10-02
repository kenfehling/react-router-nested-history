"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.neverUpdate = void 0;
var recompose_1 = require("recompose");
exports.neverUpdate = (0, recompose_1.shouldUpdate)(function (props, nextProps) { return false; });
//# sourceMappingURL=enhancers.js.map