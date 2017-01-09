'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagesBefore = exports.shiftToId = exports.getShiftAmountForUrl = exports.getShiftAmountForId = exports.getShiftAmount = exports.top = exports.go = exports.forward = exports.back = exports.push = undefined;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var push = exports.push = function push(h, page) {
  return {
    back: [].concat(_toConsumableArray(h.back), [h.current]),
    current: page,
    forward: []
  };
};

var back = exports.back = function back(h) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return n === 0 ? h : back({
    back: _.initial(h.back),
    current: _.last(h.back),
    forward: [h.current].concat(_toConsumableArray(h.forward))
  }, n - 1);
};

var forward = exports.forward = function forward(h) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return n === 0 ? h : forward({
    back: [].concat(_toConsumableArray(h.back), [h.current]),
    current: _.head(h.forward),
    forward: _.tail(h.forward)
  }, n - 1);
};

var go = exports.go = function go(h, n) {
  return n === 0 ? h : n < 0 ? back(h, 0 - n) : forward(h, n);
};

var top = exports.top = function top(h) {
  return {
    back: [],
    current: h.back[0] || h.current,
    forward: []
  };
};

var getShiftAmount = exports.getShiftAmount = function getShiftAmount(h, pageEq) {
  if (!_.isEmpty(h.back)) {
    var i = _.findIndex(h.back, pageEq);
    if (i !== -1) {
      return 0 - (_.size(h.back) - i);
    }
  }
  if (!_.isEmpty(h.forward)) {
    var _i = _.findIndex(h.forward, pageEq);
    if (_i !== -1) {
      return _i + 1;
    }
  }
  return 0;
};

var getShiftAmountForId = exports.getShiftAmountForId = function getShiftAmountForId(h, id) {
  return getShiftAmount(h, function (p) {
    return p.id === id;
  });
};

var getShiftAmountForUrl = exports.getShiftAmountForUrl = function getShiftAmountForUrl(h, url) {
  return getShiftAmount(h, function (p) {
    return p.url === url;
  });
};

var shiftToId = exports.shiftToId = function shiftToId(h, id) {
  var shiftAmount = getShiftAmountForId(h, id);
  return shiftAmount === 0 ? h : go(h, shiftAmount);
};

var getPagesBefore = exports.getPagesBefore = function getPagesBefore(h, page) {
  return shiftToId(h, page.id).back;
};