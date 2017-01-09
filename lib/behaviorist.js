'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reloadFromUrl = exports.loadFromUrl = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// TODO: Pass this in dynamically


exports.switchContainer = switchContainer;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _url = require('./util/url');

var _core = require('./util/core');

var _history = require('./util/history');

var historyUtil = _interopRequireWildcard(_history);

var _types = require('./types');

var _defaultBehavior = require('./behaviors/defaultBehavior');

var defaultBehavior = _interopRequireWildcard(_defaultBehavior);

var _nonDefaultBehavior = require('./behaviors/nonDefaultBehavior');

var nonDefaultBehavior = _interopRequireWildcard(_nonDefaultBehavior);

var _Settings = require('./constants/Settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var toArray = function toArray(h) {
  return [h.back, h.current, h.forward];
};
var fromArray = function fromArray(_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      back = _ref2[0],
      current = _ref2[1],
      forward = _ref2[2];

  return { back: back, current: current, forward: forward };
};

function switchContainer(from, to, defaulT) {
  var fromHistory = toArray(from.history);
  var toHistory = toArray(to.history);
  if (defaulT) {
    var defaultHistory = toArray(defaulT.history);
    if (from.isDefault) {
      return fromArray(defaultBehavior.A_to_B(fromHistory, toHistory, []));
    } else {
      if (to.isDefault) {
        return fromArray(defaultBehavior.B_to_A(toHistory, fromHistory, []));
      } else {
        return fromArray(defaultBehavior.B_to_C(defaultHistory, fromHistory, toHistory));
      }
    }
  } else {
    return fromArray(nonDefaultBehavior.B_to_C([], fromHistory, toHistory));
  }
}

function push(state, container, url) {
  var id = state.lastPageId + 1;
  var params = (0, _url.parseParamsFromPatterns)(container.urlPatterns, url);
  var page = { url: url, params: params, id: id, containerIndex: container.index };
  container.history = historyUtil.push(container.history, page);
  state.lastPageId = id;
  return page;
}

function loadGroupFromUrl(oldState, url, groupIndex) {
  var state = _.cloneDeep(oldState);
  var group = state.groups[groupIndex];
  var containers = group.containers;
  var useDefault = _.some(containers, function (c) {
    return c.isDefault;
  });
  var defaultContainer = useDefault ? _.find(containers, function (c) {
    return c.isDefault;
  }) : null;
  var A = defaultContainer ? defaultContainer.history.current : null;
  var containerWithInitial = _.find(containers, function (c) {
    return (0, _url.patternMatches)(c.initialUrl, url);
  });
  var containerWithMatch = _.find(containers, function (c) {
    return (0, _url.patternsMatch)(c.urlPatterns, url);
  });

  if (containerWithInitial) {
    if (useDefault) {
      if (containerWithInitial.isDefault) {
        group.history = fromArray(defaultBehavior.load_A([A], []));
      } else {
        var B = containerWithInitial.history.current;
        group.history = fromArray(defaultBehavior.load_B([A], [B]));
      }
    } else {
      var _B = containerWithInitial.history.current;
      group.history = fromArray(nonDefaultBehavior.load_B([A], [_B]));
    }
  } else if (containerWithMatch) {
    var P = push(state, containerWithMatch, url);
    if (useDefault) {
      if (containerWithMatch.isDefault) {
        group.history = fromArray(defaultBehavior.load_A1([A, P], []));
      } else {
        var _B2 = containerWithMatch.history.back[0];
        group.history = fromArray(defaultBehavior.load_B1([A], [_B2, P]));
      }
    } else {
      var _B3 = containerWithMatch.history.back[0];
      group.history = fromArray(nonDefaultBehavior.load_B1([A], [_B3, P]));
    }
  }
  return state;
}

var loadFromUrl = exports.loadFromUrl = function loadFromUrl(oldState, url, zeroPage) {
  var newState = oldState.groups.reduce(function (state, group) {
    return loadGroupFromUrl(state, url, group.index);
  }, oldState);
  var activeGroup = (0, _core.findGroupWithCurrentUrl)(newState, url);
  var browserHistory = (0, _core.toBrowserHistory)(activeGroup.history, zeroPage);
  return new _types.InitializedState({
    groups: newState.groups,
    lastPageId: newState.lastPageId,
    browserHistory: browserHistory,
    activeGroupIndex: activeGroup.index,
    lastUpdate: new Date(0)
  });
  // TODO: Remove lastUpdate field and make a new more specific State type?
};

var reloadFromUrl = exports.reloadFromUrl = function reloadFromUrl(oldState, url, zeroPage) {
  if (_Settings.KEEP_HISTORY_ON_FUTURE_VISIT) {
    return loadFromUrl((0, _core.resetState)(oldState), url, zeroPage);
  } else {
    return loadFromUrl(oldState, url, zeroPage);
  }
};