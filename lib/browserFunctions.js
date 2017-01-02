'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadedFromRefresh = exports.listenPromise = exports.listenBefore = exports.listen = exports.setHistory = exports.forward = exports.back = exports.go = exports.replace = exports.push = exports._resetHistory = exports._history = undefined;

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _location = require('./util/location');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _history = exports._history = _location.canUseWindowLocation ? (0, _createBrowserHistory2.default)() : (0, _createMemoryHistory2.default)();
/* globals performance */
var _resetHistory = exports._resetHistory = function _resetHistory() {
  if (_location.canUseWindowLocation) {
    throw new Error("This is only for tests");
  } else {
    exports._history = _history = (0, _createMemoryHistory2.default)();
  }
};

var push = exports.push = function push(page) {
  var state = { id: page.id };
  _history.push(page.url, state);
};

var replace = exports.replace = function replace(page) {
  var state = { id: page.id };
  _history.replace(page.url, state);
};

var go = exports.go = function go(n) {
  return _history.go(n);
};
var back = exports.back = function back() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return go(0 - n);
};
var forward = exports.forward = function forward() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return go(n);
};

var setHistory = exports.setHistory = function setHistory(h) {
  return exports._history = _history = h;
};
var listen = exports.listen = function listen(fn) {
  return _history.listen(fn);
};
var listenBefore = exports.listenBefore = function listenBefore(fn) {
  return _history.listenBefore(fn);
};

var listenPromise = exports.listenPromise = function listenPromise() {
  return new Promise(function (resolve) {
    var unListen = _history.listen(function (location) {
      unListen();
      resolve(location);
    });
  });
};

var loadedFromRefresh = exports.loadedFromRefresh = !!window.performance && performance.navigation.type == 1;