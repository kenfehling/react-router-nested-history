"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializables_1 = require("../serializables");
// @Serializable decorator for a class
function Serializable(target) {
    if (target.type) {
        serializables_1.default.set(target.type, target); // Use the class name as a type
    }
    else {
        throw new Error("target ".concat(target, " has no type"));
    }
}
exports.default = Serializable;
//# sourceMappingURL=Serializable.js.map