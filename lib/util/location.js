"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.modifyLocation = modifyLocation;
function modifyLocation(location, pathname) {
  if (location.href && location.origin) {
    return _extends({}, location, { pathname: pathname, href: location.origin + pathname });
  } else {
    return _extends({}, location, { pathname: pathname });
  }
}

var canUseWindowLocation = exports.canUseWindowLocation = window.location instanceof Object;