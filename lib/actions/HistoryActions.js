"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._clearActions = exports._clearZeroPage = exports.setZeroPage = exports.popstate = exports.go = exports.forward = exports.back = exports.top = exports.push = exports.switchToContainer = exports.loadFromUrl = exports.createContainer = undefined;

var _ActionTypes = require("../constants/ActionTypes");

var createContainer = exports.createContainer = function createContainer(groupIndex, initialUrl, urlPatterns, useDefault) {
  var keepHistory = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  return {
    type: _ActionTypes.CREATE_CONTAINER,
    time: new Date(),
    data: {
      groupIndex: groupIndex,
      initialUrl: initialUrl,
      urlPatterns: urlPatterns,
      useDefault: useDefault,
      keepHistory: keepHistory
    }
  };
};
var loadFromUrl = exports.loadFromUrl = function loadFromUrl(url) {
  var fromRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    type: _ActionTypes.LOAD_FROM_URL,
    time: new Date(),
    data: {
      url: url,
      fromRefresh: fromRefresh
    }
  };
};

var switchToContainer = exports.switchToContainer = function switchToContainer(groupIndex, containerIndex) {
  return {
    type: _ActionTypes.SWITCH_TO_CONTAINER,
    time: new Date(),
    data: {
      groupIndex: groupIndex,
      containerIndex: containerIndex
    }
  };
};

var push = exports.push = function push(url, params, groupIndex, containerIndex) {
  return {
    type: _ActionTypes.PUSH,
    time: new Date(),
    data: {
      url: url,
      params: params,
      groupIndex: groupIndex,
      containerIndex: containerIndex
    }
  };
};

var top = exports.top = function top(groupIndex, containerIndex) {
  return {
    type: _ActionTypes.TOP,
    time: new Date(),
    data: {
      groupIndex: groupIndex,
      containerIndex: containerIndex
    }
  };
};

var back = exports.back = function back(n) {
  return {
    type: _ActionTypes.BACK,
    time: new Date(),
    data: {
      n: n
    }
  };
};

var forward = exports.forward = function forward(n) {
  return {
    type: _ActionTypes.FORWARD,
    time: new Date(),
    data: {
      n: n
    }
  };
};

var go = exports.go = function go(n) {
  return {
    type: _ActionTypes.GO,
    time: new Date(),
    data: {
      n: n
    }
  };
};

var popstate = exports.popstate = function popstate(id) {
  return {
    type: _ActionTypes.POPSTATE,
    time: new Date(),
    data: {
      id: id
    }
  };
};

var setZeroPage = exports.setZeroPage = function setZeroPage(zeroPage) {
  return {
    type: _ActionTypes.SET_ZERO_PAGE,
    time: new Date(),
    data: {
      zeroPage: zeroPage
    }
  };
};

/** For testing **/
var _clearZeroPage = exports._clearZeroPage = function _clearZeroPage() {
  return {
    type: _ActionTypes.SET_ZERO_PAGE,
    time: new Date(),
    data: {
      zeroPage: null
    }
  };
};

/** For testing **/
var _clearActions = exports._clearActions = function _clearActions() {
  return {
    type: _ActionTypes.CLEAR_ACTIONS,
    time: new Date(),
    data: {}
  };
};