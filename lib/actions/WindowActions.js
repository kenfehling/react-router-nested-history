"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetWindowPositions = exports.moveWindow = void 0;
var ActionTypes_1 = require("../constants/ActionTypes");
var moveWindow = function (forName, x, y) { return ({
    type: ActionTypes_1.MOVE_WINDOW,
    forName: forName,
    x: x,
    y: y
}); };
exports.moveWindow = moveWindow;
var resetWindowPositions = function () { return ({
    type: ActionTypes_1.RESET_WINDOW_POSITIONS
}); };
exports.resetWindowPositions = resetWindowPositions;
//# sourceMappingURL=WindowActions.js.map