'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _StaticRouter = require('react-router/StaticRouter');

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

var _History = require('react-router/History');

var _History2 = _interopRequireDefault(_History);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _LocationActions = require('../actions/LocationActions');

var _location = require('../../util/location');

var _main = require('../../main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HistoryRouter = function (_Component) {
  _inherits(HistoryRouter, _Component);

  function HistoryRouter(props) {
    _classCallCheck(this, HistoryRouter);

    var _this = _possibleConstructorReturn(this, (HistoryRouter.__proto__ || Object.getPrototypeOf(HistoryRouter)).call(this, props));

    var listenToLocation = props.listenToLocation,
        locationChanged = props.locationChanged,
        zeroPage = props.zeroPage;

    if (zeroPage) {
      (0, _main.setZeroPage)(zeroPage);
    }
    (0, _main.listenToStore)();
    if (_location.canUseWindowLocation) {
      locationChanged(window.location);
    } else {
      locationChanged({ pathname: _this.props.location });
    }
    listenToLocation();
    return _this;
  }

  _createClass(HistoryRouter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_location.canUseWindowLocation) {
        (0, _main.loadFromUrl)(window.location.pathname);
      } else {
        (0, _main.loadFromUrl)(this.props.location);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          basename = _props.basename,
          forceRefresh = _props.forceRefresh,
          getUserConfirmation = _props.getUserConfirmation,
          keyLength = _props.keyLength,
          routerProps = _objectWithoutProperties(_props, ['basename', 'forceRefresh', 'getUserConfirmation', 'keyLength']);

      return _react2.default.createElement(
        _History2.default,
        {
          createHistory: _location.canUseWindowLocation ? _createBrowserHistory2.default : _createMemoryHistory2.default,
          historyOptions: {
            basename: basename,
            forceRefresh: forceRefresh,
            getUserConfirmation: getUserConfirmation,
            keyLength: keyLength
          } },
        function (_ref) {
          var history = _ref.history,
              action = _ref.action,
              location = _ref.location;
          return _react2.default.createElement(_StaticRouter2.default, _extends({
            action: action,
            location: location,
            basename: basename,
            onPush: history.push,
            onReplace: history.replace,
            blockTransitions: history.block
          }, routerProps));
        }
      );
    }
  }]);

  return HistoryRouter;
}(_react.Component);

HistoryRouter.propTypes = {
  basename: _react.PropTypes.string,
  forceRefresh: _react.PropTypes.bool,
  getUserConfirmation: _react.PropTypes.func,
  keyLength: _react.PropTypes.number,
  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]),
  zeroPage: _react.PropTypes.string
};

if (!_location.canUseWindowLocation) {
  // allow passing location in non-browser enviroment
  HistoryRouter.propTypes.location = _react.PropTypes.string;
}

var ConnectedHistoryRouter = (0, _reactRedux.connect)(function (state) {
  return {};
}, { listenToLocation: _LocationActions.listenToLocation, locationChanged: _LocationActions.locationChanged })(HistoryRouter);

exports.default = function (props) {
  return _react2.default.createElement(ConnectedHistoryRouter, _extends({ store: _store2.default }, props));
};