"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      data = action.data;

  if (type === _ActionTypes.SET_ZERO_PAGE) {
    return _extends({}, state, { zeroPage: data.zeroPage });
  } else if (_.includes(_.values(types), type)) {
    return addAction(state, action);
  }
  return state;
};

var _ActionTypes = require("../constants/ActionTypes");

var types = _interopRequireWildcard(_ActionTypes);

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = exports.initialState = {
  actions: [],
  zeroPage: null
};

var setActions = function setActions(state, actions) {
  return _extends({}, state, { actions: actions });
};
var addAction = function addAction(state, action) {
  return setActions(state, [].concat(_toConsumableArray(state.actions), [action]));
};