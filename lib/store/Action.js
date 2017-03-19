"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action = (function () {
    function Action(_a) {
        var _b = (_a === void 0 ? {} : _a).time, time = _b === void 0 ? new Date().getTime() : _b;
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
        return actions.concat([Object(this)]);
    };
    return Action;
}());
exports.default = Action;
//# sourceMappingURL=Action.js.map