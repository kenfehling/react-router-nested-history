"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenPromise = exports.listen = exports.forward = exports.back = exports.go = exports.replace = exports.push = exports._resetHistory = exports._history = exports.wasLoadedFromRefresh = exports.needsPopstateConfirmation = void 0;
var exenv_1 = require("exenv");
var createBrowserHistory_1 = require("history/createBrowserHistory");
var createMemoryHistory_1 = require("history/createMemoryHistory");
var bowser = require("bowser");
exports.needsPopstateConfirmation = exenv_1.canUseDOM &&
    !bowser.gecko &&
    !bowser.msedge &&
    !bowser.msie;
exports.wasLoadedFromRefresh = exenv_1.canUseDOM &&
    window.performance &&
    window.performance.navigation.type === 1;
exports._history = exenv_1.canUseDOM ?
    (0, createBrowserHistory_1.default)() :
    (0, createMemoryHistory_1.default)();
var _resetHistory = function () {
    if (exenv_1.canUseDOM) {
        throw new Error('This is only for tests');
    }
    else {
        exports._history = (0, createMemoryHistory_1.default)();
    }
};
exports._resetHistory = _resetHistory;
var push = function (page) { return exports._history.push(page.url, page.state); };
exports.push = push;
var replace = function (page) { return exports._history.replace(page.url, page.state); };
exports.replace = replace;
var go = function (n) { return exports._history.go(n); };
exports.go = go;
var back = function (n) {
    if (n === void 0) { n = 1; }
    return (0, exports.go)(0 - n);
};
exports.back = back;
var forward = function (n) {
    if (n === void 0) { n = 1; }
    return (0, exports.go)(n);
};
exports.forward = forward;
//export const setHistory = (h:History) => _history = h
var listen = function (fn) { return exports._history.listen(fn); };
exports.listen = listen;
var listenPromise = function () { return new Promise(function (resolve) {
    var unListen = exports._history.listen(function (location) {
        unListen();
        return resolve(location);
    });
}); };
exports.listenPromise = listenPromise;
//# sourceMappingURL=browserFunctions.js.map