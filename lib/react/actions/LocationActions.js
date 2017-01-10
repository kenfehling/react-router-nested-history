'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unlistenToLocation = exports.listenToLocation = exports.locationChanged = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var locationChanged = exports.locationChanged = function locationChanged(location) {
  return {
    type: _ActionTypes.LOCATION_CHANGED,
    location: location
  };
};

var locTrigger = function locTrigger(dispatch, e) {
  return dispatch(locationChanged(e.detail.location));
};

var listenToLocation = exports.listenToLocation = function listenToLocation() {
  return function (dispatch) {
    return window.addEventListener('locationChange', locTrigger.bind({}, dispatch));
  };
};

var unlistenToLocation = exports.unlistenToLocation = function unlistenToLocation() {
  return function (dispatch) {
    return window.removeEventListener('locationChange', locTrigger.bind({}, dispatch));
  };
};