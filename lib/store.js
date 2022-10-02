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
exports.createStore = void 0;
var store_1 = require("./store/store");
var State_1 = require("./model/State");
var UpdateBrowser_1 = require("./model/actions/UpdateBrowser");
function createStore(_a) {
    var _b = _a.loadFromPersist, loadFromPersist = _b === void 0 ? false : _b, regularReduxStore = _a.regularReduxStore;
    var oldState = new State_1.default();
    var lastUpdate = 0;
    var store = (0, store_1.createStore)({
        loadFromPersist: loadFromPersist,
        initialState: new State_1.default(),
        regularReduxStore: regularReduxStore
    });
    function dispatch(action) {
        if (action instanceof UpdateBrowser_1.default) {
            oldState = store.getRawState();
            lastUpdate = action.time;
        }
        store.dispatch(action);
    }
    function getState() {
        return __assign(__assign({}, store.getState()), { oldState: oldState, newActions: store.getState().actions.filter(function (a) { return a.time > lastUpdate; }) });
    }
    return __assign(__assign({}, store), { dispatch: dispatch, getState: getState });
}
exports.createStore = createStore;
//# sourceMappingURL=store.js.map