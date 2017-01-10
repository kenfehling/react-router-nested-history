'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persist = undefined;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPersist = require('redux-persist');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _location = require('./util/location');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _location.canUseWindowLocation ? (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), (0, _reduxPersist.autoRehydrate)())(_redux.createStore)(_reducers2.default) : (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));
var persist = exports.persist = function persist(store, persistorConfig, onComplete) {
  if (_location.canUseWindowLocation) {
    (0, _reduxPersist.persistStore)(store, persistorConfig, onComplete);
  } else {
    setTimeout(onComplete, 1000); // for testing
  }
};