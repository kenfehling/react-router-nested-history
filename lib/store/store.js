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
var Action_1 = require("./Action");
var _ = require("lodash");
var store = require("store");
var ClearActions_1 = require("./actions/ClearActions");
function deriveState(actions, state) {
    return actions.reduce(function (s, a) { return a.reduce(s); }, state);
}
exports.deriveState = deriveState;
function createStore(_a) {
    var _b = _a.loadFromPersist, loadFromPersist = _b === void 0 ? false : _b, initialState = _a.initialState, regularReduxStore = _a.regularReduxStore;
    var actions = [];
    var storedRawState = initialState;
    var storedComputedState = { actions: [] };
    var timeStored = 0;
    var currentListeners = [];
    var nextListeners = currentListeners;
    if (regularReduxStore) {
        regularReduxStore.subscribe(updateListeners);
    }
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
            updateListeners();
        }
        if (store.enabled) {
            store.set('actions', actions.map(function (a) { return serializer_1.serialize(a); }));
        }
    }
    function dispatch(action) {
        if (action instanceof Action_1.default) {
            var state = getRawState();
            var as = action.filter(state);
            as.forEach(function (a) { return (a === action ? _dispatch : dispatch)(a); });
        }
        else {
            if (regularReduxStore) {
                regularReduxStore.dispatch(action);
            }
            else {
                throw new Error('No regular Redux store was created for plain JS object actions');
            }
        }
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
            var lastTime = _.last(actions).time;
            var prevTime = actions.length > 1 ?
                _.takeRight(actions, 2)[0].time : lastTime;
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
        return __assign({}, Object(storedComputedState), { isInitialized: storedRawState.isInitialized, loadedFromPersist: loadFromPersist, actions: actions }, (regularReduxStore ? regularReduxStore.getState() : {}));
    }
    function subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.');
        }
        var isSubscribed = true;
        ensureCanMutateNextListeners();
        nextListeners.push(listener);
        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }
            isSubscribed = false;
            ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
        };
    }
    function clearActions() {
        if (store.enabled) {
            actions = [];
        }
    }
    function updateListeners() {
        var listeners = currentListeners = nextListeners;
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            listener();
        }
    }
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
        }
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