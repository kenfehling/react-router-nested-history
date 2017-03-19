"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
// Stores all classes with @Serializable decorator
var Serializables = (function () {
    function Serializables() {
        this.serializables = immutable_1.fromJS({});
    }
    Serializables.prototype.set = function (key, value) {
        this.serializables = this.serializables.set(key, value);
    };
    Serializables.prototype.get = function (key) {
        return this.serializables.get(key);
    };
    Serializables.prototype.has = function (key) {
        return this.serializables.has(key);
    };
    return Serializables;
}());
exports.default = new Serializables();
//# sourceMappingURL=serializables.js.map