'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryMatch = exports.HistoryRouter = exports.Container = exports.ContainerGroup = exports.BackLink = exports.HistoryLink = exports.getActivePageInGroup = exports.getActivePageInContainer = exports.addChangeListener = exports.push = exports.switchToContainer = exports.getNextGroupIndex = exports.getOrCreateContainer = undefined;

var _main = require('./main');

Object.defineProperty(exports, 'getOrCreateContainer', {
  enumerable: true,
  get: function get() {
    return _main.getOrCreateContainer;
  }
});
Object.defineProperty(exports, 'getNextGroupIndex', {
  enumerable: true,
  get: function get() {
    return _main.getNextGroupIndex;
  }
});
Object.defineProperty(exports, 'switchToContainer', {
  enumerable: true,
  get: function get() {
    return _main.switchToContainer;
  }
});
Object.defineProperty(exports, 'push', {
  enumerable: true,
  get: function get() {
    return _main.push;
  }
});
Object.defineProperty(exports, 'addChangeListener', {
  enumerable: true,
  get: function get() {
    return _main.addChangeListener;
  }
});
Object.defineProperty(exports, 'getActivePageInContainer', {
  enumerable: true,
  get: function get() {
    return _main.getActivePageInContainer;
  }
});
Object.defineProperty(exports, 'getActivePageInGroup', {
  enumerable: true,
  get: function get() {
    return _main.getActivePageInGroup;
  }
});

var _HistoryLink2 = require('./react/components/HistoryLink');

var _HistoryLink3 = _interopRequireDefault(_HistoryLink2);

var _BackLink2 = require('./react/components/BackLink');

var _BackLink3 = _interopRequireDefault(_BackLink2);

var _ContainerGroup2 = require('./react/components/ContainerGroup');

var _ContainerGroup3 = _interopRequireDefault(_ContainerGroup2);

var _Container2 = require('./react/components/Container');

var _Container3 = _interopRequireDefault(_Container2);

var _HistoryRouter2 = require('./react/components/HistoryRouter');

var _HistoryRouter3 = _interopRequireDefault(_HistoryRouter2);

var _HistoryMatch2 = require('./react/components/HistoryMatch');

var _HistoryMatch3 = _interopRequireDefault(_HistoryMatch2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HistoryLink = _HistoryLink3.default;
exports.BackLink = _BackLink3.default;
exports.ContainerGroup = _ContainerGroup3.default;
exports.Container = _Container3.default;
exports.HistoryRouter = _HistoryRouter3.default;
exports.HistoryMatch = _HistoryMatch3.default;