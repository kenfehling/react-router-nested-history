'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listenToLocation = exports.locationChanged = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var locationChanged = exports.locationChanged = function locationChanged(location) {
  return {
    type: _ActionTypes.LOCATION_CHANGED,
    location: location
  };
};

var listenToLocation = exports.listenToLocation = function listenToLocation() {
  return function (dispatch) {
    return window.addEventListener('locationChange', function (event) {
      return dispatch(locationChanged(event.detail.location));
    });
  };
};