'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setZeroPage = exports.getCurrentPageInGroup = exports.forward = exports.back = exports.go = exports.push = exports.switchToContainer = exports.getGroupState = exports.addChangeListener = exports.loadFromUrl = exports.getOrCreateContainer = exports.getNextGroupIndex = exports.getZeroPage = exports.getDerivedState = exports.getActions = undefined;
exports.runSteps = runSteps;
exports.listenToStore = listenToStore;

var _HistoryActions = require('./actions/HistoryActions');

var actions = _interopRequireWildcard(_HistoryActions);

var _browserFunctions = require('./browserFunctions');

var browser = _interopRequireWildcard(_browserFunctions);

var _history = require('./util/history');

var util = _interopRequireWildcard(_history);

var _core = require('./util/core');

var core = _interopRequireWildcard(_core);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _types = require('./types');

var _history2 = require('history');

var _promiseQueue = require('promise-queue');

var _promiseQueue2 = _interopRequireDefault(_promiseQueue);

var _location = require('./util/location');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var maxConcurrent = 1;
var maxQueue = Infinity;
var queue = new _promiseQueue2.default(maxConcurrent, maxQueue);
var needsPopListener = _location.canUseWindowLocation ? [browser.back, browser.forward, browser.go] : [];
var unlisten = void 0,
    lastUpdate = new Date();

var getActions = exports.getActions = function getActions() {
  return _store2.default.getState().actions;
};
var getDerivedState = exports.getDerivedState = function getDerivedState() {
  return util.deriveState(getActions(), getZeroPage());
};
var getInitializedState = function getInitializedState() {
  return util.deriveInitializedState(getActions(), getZeroPage());
};

var getZeroPage = exports.getZeroPage = function getZeroPage() {
  var all = _store2.default.getState();
  if (all.zeroPage) {
    return all.zeroPage;
  } else {
    var state = util.deriveState(all.actions, 'whatever');
    return state.groups[0].containers[0].initialUrl;
  }
};

var startListening = function startListening() {
  unlisten = (0, _browserFunctions.listen)(function (location) {
    var state = location.state;
    if (state) {
      _store2.default.dispatch(actions.popstate(location.state.id));
    }
  });
};

var unlistenPromise = function unlistenPromise() {
  return new Promise(function (resolve) {
    unlisten();
    return resolve();
  });
};

var startListeningPromise = function startListeningPromise() {
  return new Promise(function (resolve) {
    startListening();
    return resolve();
  });
};

startListening();

var getNextGroupIndex = exports.getNextGroupIndex = function getNextGroupIndex() {
  var actions = getActions();
  if (_.isEmpty(actions)) {
    return 0;
  } else {
    var state = util.deriveState(actions, getZeroPage());
    return state.groups.length;
  }
};

var createContainer = function createContainer(groupIndex, initialUrl, patterns, useDefault) {
  _store2.default.dispatch(actions.createContainer(groupIndex, initialUrl, patterns, useDefault));
  var state = getDerivedState();
  return _.last(state.groups[groupIndex].containers);
};

var getOrCreateContainer = exports.getOrCreateContainer = function getOrCreateContainer(groupIndex, initialUrl, patterns, useDefault) {
  var create = function create() {
    return createContainer(groupIndex, initialUrl, patterns, useDefault);
  };
  var actions = getActions();
  if (_.isEmpty(actions)) {
    return create();
  }
  var state = util.deriveState(actions, getZeroPage());
  var group = state.groups[groupIndex];
  if (!group) {
    return create();
  }
  var existingContainer = _.find(group.containers, function (c) {
    return c.initialUrl === initialUrl;
  });
  return existingContainer || create();
};

var loadFromUrl = exports.loadFromUrl = function loadFromUrl(url) {
  return (0, _store.persist)(_store2.default, { whitelist: ['actions'] }, function () {
    return _store2.default.dispatch(actions.loadFromUrl(url, browser.loadedFromRefresh));
  });
};

var addChangeListener = exports.addChangeListener = function addChangeListener(fn) {
  return _store2.default.subscribe(function () {
    return fn(getDerivedState());
  });
};

var getGroupState = exports.getGroupState = function getGroupState(groupIndex) {
  return util.getGroupState(getActions(), groupIndex, getZeroPage());
};

var switchToContainer = exports.switchToContainer = function switchToContainer(groupIndex, containerIndex) {
  if (!core.isActiveContainer(getInitializedState(), groupIndex, containerIndex)) {
    _store2.default.dispatch(actions.switchToContainer(groupIndex, containerIndex));
  }
};

var push = exports.push = function push(groupIndex, containerIndex, url) {
  _store2.default.dispatch(actions.push(url, groupIndex, containerIndex));
};

var go = exports.go = function go() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return _store2.default.dispatch(actions.go(n));
};
var back = exports.back = function back() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return _store2.default.dispatch(actions.back(n));
};
var forward = exports.forward = function forward() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return _store2.default.dispatch(actions.forward(n));
};

var getCurrentPageInGroup = exports.getCurrentPageInGroup = function getCurrentPageInGroup(groupIndex) {
  return core.getCurrentPageInGroup(getDerivedState(), groupIndex);
};

function runStep(step) {
  var stepPromise = function stepPromise() {
    step.fn.apply(step, _toConsumableArray(step.args));
    return _.includes(needsPopListener, step.fn) ? (0, _browserFunctions.listenPromise)() : Promise.resolve();
  };
  var ps = function ps() {
    return [unlistenPromise, stepPromise, startListeningPromise].reduce(function (p, s) {
      return p.then(s);
    }, Promise.resolve());
  };
  return queue.add(ps);
}

function runSteps(steps) {
  return steps.reduce(function (p, step) {
    return p.then(function () {
      return runStep(step);
    });
  }, Promise.resolve());
}

function listenToStore() {
  _store2.default.subscribe(function () {
    var actions = getActions();
    var zeroPage = getZeroPage();
    var state = util.deriveState(actions, zeroPage);
    if (state instanceof _types.InitializedState) {
      var group = core.getActiveGroup(state);
      var current = group.history.current;
      var steps = util.createStepsSinceUpdate(actions, zeroPage, lastUpdate);
      lastUpdate = new Date();
      window.dispatchEvent(new CustomEvent('locationChange', {
        detail: { location: (0, _history2.createLocation)(current.url, { id: current.id }) }
      }));
      runSteps(steps);
    }
  });
}

var setZeroPage = exports.setZeroPage = function setZeroPage(zeroPage) {
  return _store2.default.dispatch(actions.setZeroPage(zeroPage));
};