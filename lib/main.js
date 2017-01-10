'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setZeroPage = exports.listenToStore = exports.getActivePageInContainer = exports.getActivePageInGroup = exports.getBackPage = exports.forward = exports.back = exports.go = exports.top = exports.push = exports.switchToContainer = exports.getGroupState = exports.getLastAction = exports.addChangeListener = exports.loadFromUrl = exports.getOrCreateContainer = exports.getNextGroupIndex = exports.getZeroPage = exports.getInitializedState = exports.getDerivedState = exports.getActions = undefined;
exports.runSteps = runSteps;

var _HistoryActions = require('./actions/HistoryActions');

var actions = _interopRequireWildcard(_HistoryActions);

var _browserFunctions = require('./browserFunctions');

var browser = _interopRequireWildcard(_browserFunctions);

var _actions = require('./util/actions');

var actionsUtil = _interopRequireWildcard(_actions);

var _core = require('./util/core');

var core = _interopRequireWildcard(_core);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _types = require('./types');

var _history = require('history');

var _promiseQueue = require('promise-queue');

var _promiseQueue2 = _interopRequireDefault(_promiseQueue);

var _location = require('./util/location');

var _url = require('./util/url');

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
  return actionsUtil.deriveState(getActions(), getZeroPage());
};
var getInitializedState = exports.getInitializedState = function getInitializedState() {
  return actionsUtil.deriveInitializedState(getActions(), getZeroPage());
};

var getZeroPage = exports.getZeroPage = function getZeroPage() {
  var all = _store2.default.getState();
  if (all.zeroPage) {
    return all.zeroPage;
  } else {
    var state = actionsUtil.deriveState(all.actions, 'whatever');
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
    var state = actionsUtil.deriveState(actions, getZeroPage());
    return state.groups.length;
  }
};

var createContainer = function createContainer(groupIndex, initialUrl, patterns, useDefault, keepHistory) {
  _store2.default.dispatch(actions.createContainer(groupIndex, initialUrl, patterns, useDefault, keepHistory));
  var state = getDerivedState();
  return _.last(state.groups[groupIndex].containers);
};

var getOrCreateContainer = exports.getOrCreateContainer = function getOrCreateContainer(groupIndex, initialUrl, patterns, useDefault, keepHistory) {
  var create = function create() {
    return createContainer(groupIndex, initialUrl, patterns, useDefault, keepHistory);
  };
  var actions = getActions();
  if (_.isEmpty(actions)) {
    return create();
  }
  var state = actionsUtil.deriveState(actions, getZeroPage());
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
    var state = getDerivedState();
    if (state instanceof _types.InitializedState) {
      fn(state);
    }
  });
};

var getLastAction = exports.getLastAction = function getLastAction() {
  return _.last(getActions());
};

var getGroupState = exports.getGroupState = function getGroupState(groupIndex) {
  return actionsUtil.getGroupState(getActions(), groupIndex, getZeroPage());
};

var switchToContainer = exports.switchToContainer = function switchToContainer(groupIndex, containerIndex) {
  var state = getInitializedState();
  var from = core.getActiveContainerInGroup(state, groupIndex);
  if (!from.keepHistory) {
    _store2.default.dispatch(actions.top(groupIndex, from.index));
  }
  if (!core.isActiveContainer(state, groupIndex, containerIndex)) {
    _store2.default.dispatch(actions.switchToContainer(groupIndex, containerIndex));
  }
};

var push = exports.push = function push(groupIndex, containerIndex, url, patterns) {
  var params = (0, _url.parseParamsFromPatterns)(patterns, url);
  _store2.default.dispatch(actions.push(url, params, groupIndex, containerIndex));
};

var top = exports.top = function top(groupIndex, containerIndex) {
  return _store2.default.dispatch(actions.top(groupIndex, containerIndex));
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

var getBackPage = exports.getBackPage = function getBackPage() {
  var state = getDerivedState();
  if (state instanceof _types.InitializedState) {
    return core.getBackPage(state);
  } else {
    return null;
  }
};

var getActivePageInGroup = exports.getActivePageInGroup = function getActivePageInGroup(groupIndex) {
  return core.getActivePageInGroup(getDerivedState(), groupIndex);
};

var getActivePageInContainer = exports.getActivePageInContainer = function getActivePageInContainer(groupIndex, containerIndex) {
  return core.getActivePageInContainer(getDerivedState(), groupIndex, containerIndex);
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

var listenToStore = exports.listenToStore = function listenToStore() {
  return _store2.default.subscribe(function () {
    var actions = getActions();
    var zeroPage = getZeroPage();
    var state = actionsUtil.deriveState(actions, zeroPage);
    if (state instanceof _types.InitializedState) {
      var group = core.getActiveGroup(state);
      var current = group.history.current;
      var steps = actionsUtil.createStepsSinceUpdate(actions, zeroPage, lastUpdate);
      lastUpdate = new Date();
      window.dispatchEvent(new CustomEvent('locationChange', {
        detail: { location: (0, _history.createLocation)(current.url, { id: current.id }) }
      }));
      runSteps(steps);
    }
  });
};

var setZeroPage = exports.setZeroPage = function setZeroPage(zeroPage) {
  return _store2.default.dispatch(actions.setZeroPage(zeroPage));
};