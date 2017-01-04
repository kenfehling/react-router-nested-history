'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupState = exports.deriveUninitializedState = exports.deriveInitializedState = exports.deriveState = exports.reduceAll = exports.diffStateToSteps = exports.getHistoryReplacementSteps = exports.onpop = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.reducer = reducer;
exports.createStepsSinceUpdate = createStepsSinceUpdate;
exports.getContainerStackOrder = getContainerStackOrder;
exports.getIndexedContainerStackOrder = getIndexedContainerStackOrder;

var _ActionTypes = require('../constants/ActionTypes');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _fp = require('lodash/fp');

var _fp2 = _interopRequireDefault(_fp);

var _core = require('./core');

var _browserFunctions = require('../browserFunctions');

var browser = _interopRequireWildcard(_browserFunctions);

var _behaviorist = require('../behaviorist');

var _types = require('../types');

var _compare_asc = require('date-fns/compare_asc');

var _compare_asc2 = _interopRequireDefault(_compare_asc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var onpop = exports.onpop = function onpop(state, id, zeroPage) {
  var shiftAmount = (0, _core.getHistoryShiftAmountForId)(state, id);
  if (shiftAmount === 0) {
    return state;
  } else {
    return (0, _core.go)(state, shiftAmount, zeroPage);
  }
};

function _loadReducer(state, action, zeroPage) {
  var _action$data = action.data,
      url = _action$data.url,
      fromRefresh = _action$data.fromRefresh;

  if (state instanceof _types.UninitializedState) {
    return (0, _behaviorist.loadFromUrl)(state, url, zeroPage);
  } else if (state instanceof _types.InitializedState) {
    return fromRefresh ? state : (0, _behaviorist.reloadFromUrl)(state, url, zeroPage);
  } else {
    throw new Error('state is unknown type');
  }
}

function _reducer(state, action, zeroPage) {
  switch (action.type) {
    case _ActionTypes.SWITCH_TO_CONTAINER:
      {
        var _action$data2 = action.data,
            groupIndex = _action$data2.groupIndex,
            containerIndex = _action$data2.containerIndex;

        return (0, _core.switchToContainer)(state, groupIndex, containerIndex, zeroPage);
      }
    case _ActionTypes.PUSH:
      {
        var _ret = function () {
          var _action$data3 = action.data,
              url = _action$data3.url,
              params = _action$data3.params,
              groupIndex = _action$data3.groupIndex,
              containerIndex = _action$data3.containerIndex;

          var f = function f(s) {
            return (0, _core.pushUrl)(s, url, params, groupIndex, containerIndex, zeroPage);
          };
          return {
            v: (0, _core.isOnZeroPage)(state) ? f((0, _core.go)(state, 1, zeroPage)) : f(state)
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    case _ActionTypes.BACK:
      return (0, _core.go)(state, 0 - action.data.n || -1, zeroPage);
    case _ActionTypes.FORWARD:
    case _ActionTypes.GO:
      return (0, _core.go)(state, action.data.n || 1, zeroPage);
    case _ActionTypes.POPSTATE:
      return onpop(state, action.data.id, zeroPage);
  }
  return state;
}

function reducer(state, action, zeroPage) {
  if (!state) {
    if (action.type === _ActionTypes.CREATE_CONTAINER) {
      return (0, _core.createContainer)(state, action.data);
    } else {
      throw new Error("State not yet initialized");
    }
  } else {
    switch (action.type) {
      case _ActionTypes.CREATE_CONTAINER:
        {
          if (state instanceof _types.UninitializedState) {
            return (0, _core.createContainer)(state, action.data);
          } else {
            throw new Error("State already initialized");
          }
        }
      case _ActionTypes.LOAD_FROM_URL:
        return _loadReducer(state, action, zeroPage);
      default:
        {
          if (state instanceof _types.InitializedState) {
            return _reducer(state, action, zeroPage);
          } else {
            throw new Error("State not yet initialized");
          }
        }
    }
  }
}

var pushStep = function pushStep(page) {
  return { fn: browser.push, args: [page] };
};
var replaceStep = function replaceStep(page) {
  return { fn: browser.replace, args: [page] };
};
var backStep = function backStep(n) {
  return { fn: browser.back, args: [n] };
};

var getHistoryReplacementSteps = exports.getHistoryReplacementSteps = function getHistoryReplacementSteps(h1, h2) {
  return _.flatten([h1 && !(0, _core.isZeroPage)(h1.current) ? backStep((0, _core.filterZero)(h1.back).length + 1) : [], _.isEmpty(h2.back) ? [] : _.map((0, _core.filterZero)(h2.back), pushStep), { fn: browser.push, args: [h2.current] }, _.isEmpty(h2.forward) ? [] : _.map(h2.forward, pushStep), _.isEmpty(h2.forward) ? [] : { fn: browser.back, args: [h2.forward.length] }]);
};

/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {?State} The original historyStore state
 * @param newState {InitializedState} The new historyStore state
 * @returns {Step[]} An array of steps to get from old state to new state
 */
var diffStateToSteps = exports.diffStateToSteps = function diffStateToSteps(oldState, newState) {
  var h1 = oldState.browserHistory;
  var h2 = newState.browserHistory;
  if (_.isEqual(h1, h2)) {
    return [];
  }
  var shiftAmount = (0, _core.getHistoryShiftAmount)(oldState, function (p) {
    return p.id === h2.current.id;
  });
  if (shiftAmount !== 0) {
    return [{ fn: browser.go, args: [shiftAmount] }];
  } else if ((0, _core.hasSameActiveContainer)(oldState, newState)) {
    return [{ fn: browser.push, args: [h2.current] }];
  } else {
    return getHistoryReplacementSteps(h1, h2);
  }
};

function createStepsSinceUpdate(actions, zeroPage, lastUpdate) {
  var newState = deriveInitializedState(actions, zeroPage);
  var newActions = _.filter(actions, function (a) {
    return (0, _compare_asc2.default)(a.time, lastUpdate) === 1;
  });
  var oldActions = _.filter(actions, function (a) {
    return (0, _compare_asc2.default)(a.time, lastUpdate) === -1 || a.type === _ActionTypes.POPSTATE;
  });
  var shouldReset = _.some(newActions, function (a) {
    return a.type === _ActionTypes.LOAD_FROM_URL && !a.data.fromRefresh;
  });
  if (shouldReset || _.isEmpty(oldActions)) {
    return [replaceStep({ url: zeroPage, id: 0, containerIndex: 0 })].concat(_toConsumableArray(getHistoryReplacementSteps(null, newState.browserHistory)));
  } else {
    var oldState = deriveInitializedState(oldActions, zeroPage);
    return diffStateToSteps(oldState, newState);
  }
}

var reduceAll = exports.reduceAll = function reduceAll(state, actions, zeroPage) {
  if (actions.length === 0) {
    throw new Error('No action history');
  } else {
    return actions.reduce(function (nextState, action) {
      return reducer(nextState, action, zeroPage);
    }, state);
  }
};

var deriveState = exports.deriveState = function deriveState(actions, zeroPage) {
  return reduceAll(null, actions, zeroPage);
};

var deriveInitializedState = exports.deriveInitializedState = function deriveInitializedState(actions, zeroPage) {
  return (0, _core.assureType)(deriveState(actions, zeroPage), _types.InitializedState, 'State is not initialized');
};

var deriveUninitializedState = exports.deriveUninitializedState = function deriveUninitializedState(actions, zeroPage) {
  return (0, _core.assureType)(deriveState(actions, zeroPage), _types.UninitializedState, 'State is already initialized');
};

function getContainerStackOrder(actions, groupIndex, zeroPage) {
  if (actions.length === 0) {
    throw new Error("No actions in history");
  }
  var containerSwitches = [];
  actions.reduce(function (oldState, action) {
    var newState = reducer(oldState, action, zeroPage);
    if (action.type === _ActionTypes.CREATE_CONTAINER && action.data.groupIndex === groupIndex) {
      var group = _.last(newState.groups);
      _fp2.default.reverse(group.containers).forEach(function (c) {
        return containerSwitches.push(c);
      });
    }
    if (newState instanceof _types.InitializedState && newState.activeGroupIndex === groupIndex) {
      if (!(0, _core.hasSameActiveContainer)(oldState, newState)) {
        containerSwitches.push((0, _core.getActiveContainer)(newState));
      }
    }
    return newState;
  }, null);
  return _.uniqBy(_fp2.default.reverse(containerSwitches), function (c) {
    return c.index;
  });
}

/**
 * Gets the stack order values as numbers, in container order instead of stack order
 */
function getIndexedContainerStackOrder(actions, groupIndex, zeroPage) {
  var stackOrder = getContainerStackOrder(actions, groupIndex, zeroPage);
  var values = _.map(stackOrder, function (s, i) {
    return { index: s.index, i: i };
  });
  return _.map(_.sortBy(values, function (s) {
    return s.index;
  }), function (s) {
    return s.i;
  });
}

var getGroupState = exports.getGroupState = function getGroupState(actions, groupIndex, zeroPage) {
  var state = deriveState(actions, zeroPage);
  var currentUrl = (0, _core.getCurrentPageInGroup)(state, groupIndex).url;
  var activeContainer = (0, _core.getActiveContainerInGroup)(state, groupIndex);
  var stackOrder = getContainerStackOrder(actions, groupIndex, zeroPage);
  var indexedStackOrder = getIndexedContainerStackOrder(actions, groupIndex, zeroPage);
  return { activeContainer: activeContainer, currentUrl: currentUrl, stackOrder: stackOrder, indexedStackOrder: indexedStackOrder };
};