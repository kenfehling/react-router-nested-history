"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var serializer_1 = require("./serializer");
var R = require("ramda");
var store = require("store");
var ClearActions_1 = require("./actions/ClearActions");
function deriveState(actions, state) {
    return actions.reduce(function (s, a) { return a.reduce(s); }, state);
}
exports.deriveState = deriveState;
function createStore(_a) {
    var _b = _a.loadFromPersist, loadFromPersist = _b === void 0 ? false : _b, initialState = _a.initialState;
    var actions = [];
    var storedRawState = initialState;
    var storedComputedState = { actions: [] };
    var timeStored = 0;
    var listeners = [];
    function loadActions() {
        if (store.enabled) {
            var objects = store.get('actions');
            if (objects) {
                actions = objects.map(function (obj) { return serializer_1.deserialize(obj); });
            }
        }
    }
    function init() {
        if (loadFromPersist) {
            loadActions();
        }
        else {
            clearActions();
        }
    }
    function _dispatch(action) {
        actions = action.store(actions);
        if (action instanceof ClearActions_1.default) {
            timeStored = 0;
            storedRawState = initialState;
        }
        else {
            recomputeState();
            if (storedRawState.isInitialized) {
                updateListeners();
            }
        }
        if (store.enabled) {
            store.set('actions', actions.map(function (a) { return serializer_1.serialize(a); }));
        }
    }
    function dispatch(action) {
        var state = getRawState();
        var as = action.filter(state);
        as.forEach(function (a) { return (a === action ? _dispatch : dispatch)(a); });
    }
    /**
     * Derives the state from the list of actions
     * Caches the last derived state for performance
     */
    function getRawState() {
        if (actions.length === 0) {
            return initialState;
        }
        else {
            var lastTime = R.last(actions).time;
            var prevTime = actions.length > 1 ?
                R.takeLast(2, actions)[0].time : lastTime;
            if (lastTime === prevTime && prevTime === timeStored) {
                storedRawState = deriveState(actions, initialState); // Just derive all
            }
            else {
                var newActions = actions.filter(function (a) { return a.time > timeStored; });
                storedRawState = deriveState(newActions, storedRawState);
                timeStored = lastTime;
            }
        }
        return storedRawState;
    }
    function recomputeState() {
        var rawState = getRawState();
        if (rawState.isInitialized) {
            storedComputedState = rawState.computeState();
        }
    }
    function getState() {
        return __assign({}, Object(storedComputedState), { isInitialized: storedRawState.isInitialized, actions: actions });
    }
    function subscribe(listener) {
        listeners.push(listener);
        var index = listeners.indexOf(listener);
        return function () {
            listeners = listeners.slice(0, index).concat(listeners.slice(index + 1));
        };
    }
    function clearActions() {
        if (store.enabled) {
            actions = [];
        }
    }
    function updateListeners() {
        listeners.forEach(function (fn) { return fn(); });
    }
    init();
    return {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        getRawState: getRawState,
        replaceReducer: function () { throw new Error('Not implemented'); }
    };
}
exports.createStore = createStore;
//# sourceMappingURL=store.js.map