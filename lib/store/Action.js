"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Action = /** @class */ (function () {
    function Action(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.time, time = _c === void 0 ? new Date().getTime() : _c;
        this.time = time;
    }
    /**
     * Reducer for this action
     * @param state - The original state
     * @returns {IState} - The new state
     */
    Action.prototype.reduce = function (state) {
        return state;
    };
    /**
     * Runs before store()
     * Can reject or bring in other actions
     * @param state The current state
     * @returns {[Action]} - [this], replacement/additional actions to run, or []
     */
    Action.prototype.filter = function (state) {
        return [Object(this)];
    };
    /**
     * Reducer for the store, typically used for just storing this action
     * but can be overridden to do things like clear some or all of the actions
     */
    Action.prototype.store = function (actions) {
        return __spreadArray(__spreadArray([], actions, true), [Object(this)], false);
    };
    return Action;
}());
exports.default = Action;
//# sourceMappingURL=Action.js.map