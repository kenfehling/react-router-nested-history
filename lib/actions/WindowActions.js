"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes_1 = require("../constants/ActionTypes");
exports.moveWindow = function (forName, x, y) { return ({
    type: ActionTypes_1.MOVE_WINDOW,
    forName: forName,
    x: x,
    y: y
}); };
exports.resetWindowPositions = function () { return ({
    type: ActionTypes_1.RESET_WINDOW_POSITIONS
}); };
//# sourceMappingURL=WindowActions.js.map