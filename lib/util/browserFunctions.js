"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    createBrowserHistory_1.default() :
    createMemoryHistory_1.default();
exports._resetHistory = function () {
    if (exenv_1.canUseDOM) {
        throw new Error('This is only for tests');
    }
    else {
        exports._history = createMemoryHistory_1.default();
    }
};
exports.push = function (page) { return exports._history.push(page.url, page.state); };
exports.replace = function (page) { return exports._history.replace(page.url, page.state); };
exports.go = function (n) { return exports._history.go(n); };
exports.back = function (n) {
    if (n === void 0) { n = 1; }
    return exports.go(0 - n);
};
exports.forward = function (n) {
    if (n === void 0) { n = 1; }
    return exports.go(n);
};
//export const setHistory = (h:History) => _history = h
exports.listen = function (fn) { return exports._history.listen(fn); };
exports.listenPromise = function () { return new Promise(function (resolve) {
    var unListen = exports._history.listen(function (location) {
        unListen();
        return resolve(location);
    });
}); };
//# sourceMappingURL=browserFunctions.js.map