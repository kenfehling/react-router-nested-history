"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
var ActionTypes_1 = require("../constants/ActionTypes");
exports.initialState = {
    windowPositions: {}
};
exports.default = (function (state, action) {
    var _a;
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case ActionTypes_1.MOVE_WINDOW: {
            return __assign(__assign({}, state), { windowPositions: __assign(__assign({}, state.windowPositions), (_a = {}, _a[action.forName] = { x: action.x, y: action.y }, _a)) });
        }
        case ActionTypes_1.RESET_WINDOW_POSITIONS: return exports.initialState;
        default: return state;
    }
});
//# sourceMappingURL=index.js.map