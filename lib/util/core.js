'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetState = exports.doesGroupUseDefault = exports.getContainer = exports.createContainer = exports.getHistoryShiftAmountForUrl = exports.getHistoryShiftAmountForId = exports.getHistoryShiftAmount = exports.toBrowserHistory = exports.filterZero = exports.isOnZeroPage = exports.isZeroPage = exports.findGroupWithCurrentUrl = exports.getActivePage = exports.getCurrentPageInGroup = exports.getActiveContainer = exports.getActiveContainerInGroup = exports.pushUrl = exports.pushPage = exports.forward = exports.back = exports.pushToStack = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.go = go;
exports.switchToContainer = switchToContainer;
exports.getActiveGroup = getActiveGroup;
exports.assureType = assureType;
exports.hasSameActiveContainer = hasSameActiveContainer;
exports.isActiveContainer = isActiveContainer;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _types = require('../types');

var _behaviorist = require('../behaviorist');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var pushToStack = exports.pushToStack = function pushToStack(historyStack, page) {
  return {
    back: [].concat(_toConsumableArray(historyStack.back), [historyStack.current]),
    current: page,
    forward: []
  };
};

var back = exports.back = function back(historyStack) {
  return {
    back: _.initial(historyStack.back),
    current: _.last(historyStack.back),
    forward: [historyStack.current].concat(_toConsumableArray(historyStack.forward))
  };
};

var forward = exports.forward = function forward(historyStack) {
  return {
    back: [].concat(_toConsumableArray(historyStack.back), [historyStack.current]),
    current: _.head(historyStack.forward),
    forward: _.tail(historyStack.forward)
  };
};

function go(oldState, n, zeroPage) {
  if (n === 0) {
    return oldState;
  }
  var state = _.cloneDeep(oldState);
  var group = state.groups[state.activeGroupIndex];
  var container = group.containers[group.history.current.containerIndex];
  var f = n < 0 ? back : forward;
  var getStack = function getStack(h) {
    return n < 0 ? h.back : h.forward;
  };
  var nextN = n < 0 ? n + 1 : n - 1;
  if (getStack(group.history).length > 0) {
    group.history = f(group.history);
    if (getStack(container.history).length > 0) {
      container.history = f(container.history);
    }
    state.browserHistory = toBrowserHistory(group.history, zeroPage);
  }
  return go(state, nextN, zeroPage);
}

function switchToContainer(state, groupIndex, containerIndex, zeroPage) {
  var newState = isOnZeroPage(state) ? _.cloneDeep(go(state, 1, zeroPage)) : _.cloneDeep(state);
  var group = newState.groups[groupIndex];
  var oldContainerIndex = group.history.current.containerIndex;
  var from = group.containers[oldContainerIndex];
  var to = getContainer(newState, groupIndex, containerIndex);
  var defaulT = _.find(group.containers, function (c) {
    return c.isDefault;
  });
  group.history = (0, _behaviorist.switchContainer)(from, to, defaulT);
  newState.browserHistory = toBrowserHistory(group.history, zeroPage);
  newState.activeGroupIndex = group.index;
  return newState;
}

var pushPage = exports.pushPage = function pushPage(oldState, groupIndex, page) {
  var state = _.cloneDeep(oldState);
  var group = state.groups[groupIndex];
  var container = group.containers[page.containerIndex];
  container.history = pushToStack(container.history, page);
  group.history = pushToStack(group.history, page);
  state.browserHistory = pushToStack(state.browserHistory, page);
  state.lastPageId = Math.max(state.lastPageId, page.id);
  return state;
};

var pushUrl = exports.pushUrl = function pushUrl(state, url, params, groupIndex, containerIndex, zeroPage) {
  var f = function f(s) {
    return pushPage(s, groupIndex, {
      url: url,
      params: params,
      id: s.lastPageId + 1,
      containerIndex: containerIndex
    });
  };
  var active = getActiveContainer(state);
  if (groupIndex !== active.groupIndex || containerIndex !== active.index) {
    return f(switchToContainer(state, groupIndex, containerIndex, zeroPage));
  } else {
    return f(state);
  }
};

function getActiveGroup(state) {
  return state.groups[state.activeGroupIndex];
}

var getActiveContainerInGroup = exports.getActiveContainerInGroup = function getActiveContainerInGroup(state, groupIndex) {
  var group = state.groups[groupIndex];
  return group.containers[group.history.current.containerIndex];
};

var getActiveContainer = exports.getActiveContainer = function getActiveContainer(state) {
  return getActiveContainerInGroup(state, state.activeGroupIndex);
};

var getCurrentPageInGroup = exports.getCurrentPageInGroup = function getCurrentPageInGroup(state, groupIndex) {
  return state.groups[groupIndex].history.current;
};

var getActivePage = exports.getActivePage = function getActivePage(state) {
  return getCurrentPageInGroup(state, getActiveGroup(state).index);
};

var findGroupWithCurrentUrl = exports.findGroupWithCurrentUrl = function findGroupWithCurrentUrl(state, url) {
  return _.find(state.groups, function (g) {
    return g.history.current.url === url;
  });
};

var isZeroPage = exports.isZeroPage = function isZeroPage(page) {
  return page.id === 0;
};

var isOnZeroPage = exports.isOnZeroPage = function isOnZeroPage(state) {
  return isZeroPage(getActivePage(state));
};

var filterZero = exports.filterZero = function filterZero(pages) {
  return pages.filter(function (p) {
    return !!p.id;
  });
};

var toBrowserHistory = exports.toBrowserHistory = function toBrowserHistory(history, zeroPage) {
  return _extends({}, history, {
    back: [{ url: zeroPage, id: 0, containerIndex: 0 }].concat(_toConsumableArray(history.back))
  });
};

function assureType(value, Type, errorMsg) {
  if (value instanceof Type) {
    return value;
  } else {
    throw new Error(errorMsg);
  }
}

var getHistoryShiftAmount = exports.getHistoryShiftAmount = function getHistoryShiftAmount(oldState, pageEquals) {
  var group = oldState.groups[oldState.activeGroupIndex];
  var oldHistory = group.history;
  if (!_.isEmpty(oldHistory.back)) {
    var i = _.findIndex(oldHistory.back, pageEquals);
    if (i !== -1) {
      return 0 - (_.size(oldHistory.back) - i);
    }
  }
  if (!_.isEmpty(oldHistory.forward)) {
    var _i = _.findIndex(oldHistory.forward, pageEquals);
    if (_i !== -1) {
      return _i + 1;
    }
  }
  return 0;
};

var getHistoryShiftAmountForId = exports.getHistoryShiftAmountForId = function getHistoryShiftAmountForId(oldState, id) {
  return getHistoryShiftAmount(oldState, function (p) {
    return p.id === id;
  });
};

var getHistoryShiftAmountForUrl = exports.getHistoryShiftAmountForUrl = function getHistoryShiftAmountForUrl(oldState, url) {
  return getHistoryShiftAmount(oldState, function (p) {
    return p.url === url;
  });
};

var createContainer = exports.createContainer = function createContainer(state, _ref) {
  var groupIndex = _ref.groupIndex,
      initialUrl = _ref.initialUrl,
      useDefault = _ref.useDefault,
      urlPatterns = _ref.urlPatterns;

  var id = (state ? state.lastPageId : 0) + 1;
  var existingGroup = state ? state.groups[groupIndex] : null;
  var containerIndex = existingGroup ? existingGroup.containers.length : 0;

  var history = {
    back: [],
    current: { url: initialUrl, id: id, containerIndex: containerIndex },
    forward: []
  };

  var container = {
    initialUrl: initialUrl,
    urlPatterns: urlPatterns,
    history: history,
    groupIndex: groupIndex,
    index: containerIndex,
    isDefault: containerIndex === 0 && useDefault
  };

  var group = existingGroup ? _extends({}, existingGroup, {
    containers: [].concat(_toConsumableArray(existingGroup.containers), [container])
  }) : {
    index: groupIndex,
    history: history,
    containers: [container]
  };

  return new _types.UninitializedState(_extends({}, state ? state : {}, {
    groups: state ? [].concat(_toConsumableArray(state.groups.slice(0, groupIndex)), [group], _toConsumableArray(state.groups.slice(groupIndex + 1))) : [group],
    lastPageId: id
  }));
};

var getContainer = exports.getContainer = function getContainer(state, groupIndex, index) {
  return state.groups[groupIndex].containers[index];
};

function hasSameActiveContainer(oldState, newState) {
  if (!oldState || !(oldState instanceof _types.InitializedState)) return false;
  var o = getActiveContainer(oldState);
  var n = getActiveContainer(newState);
  return o.groupIndex === n.groupIndex && o.index === n.index;
}

function isActiveContainer(state, groupIndex, containerIndex) {
  var c = getActiveContainer(state);
  return c.groupIndex === groupIndex && c.index === containerIndex;
}

var doesGroupUseDefault = exports.doesGroupUseDefault = function doesGroupUseDefault(state, groupIndex) {
  return _.some(state.groups[groupIndex].containers, function (c) {
    return c.isDefault;
  });
};

var resetState = exports.resetState = function resetState(state) {
  var containers = _.flatMap(state.groups, function (g) {
    return g.containers;
  });
  return containers.reduce(function (newState, container) {
    var useDefault = doesGroupUseDefault(state, container.groupIndex);
    return createContainer(newState, _extends({}, container, { useDefault: useDefault }));
  }, null);
};