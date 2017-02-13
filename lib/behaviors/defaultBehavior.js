"use strict";

var types_1 = require("../types");
/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 */
exports.A_to_B = function (A, B, C) {
    return new types_1.History({
        back: A.back.concat([A.current], B.back),
        current: B.current,
        forward: B.forward
    });
};
exports.B_to_C = function (A, B, C) {
    return new types_1.History({
        back: A.back.concat([A.current], C.back),
        current: C.current,
        forward: C.forward
    });
};
exports.B_to_A = function (A, B, C) {
    return A;
};