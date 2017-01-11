'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _main = require('../../main');

var _url = require('../../util/url');

var _location = require('../../util/location');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getKey = function getKey(groupIndex, locationIndex) {
  return groupIndex + '_' + locationIndex;
};

var Container = function (_Component) {
  _inherits(Container, _Component);

  // Stays stored even if Container is unmounted

  function Container(props, context) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props, context));

    var patterns = _this.getPatterns();
    var initialUrl = props.initialUrl,
        keepHistory = props.keepHistory;
    var groupIndex = context.groupIndex,
        _context$useDefaultCo = context.useDefaultContainer,
        useDefaultContainer = _context$useDefaultCo === undefined ? true : _context$useDefaultCo;

    var container = (0, _main.getOrCreateContainer)(groupIndex, initialUrl, patterns, useDefaultContainer, keepHistory);
    _this.containerIndex = container.index;
    return _this;
  }

  _createClass(Container, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        containerIndex: this.containerIndex,
        location: this.getFilteredLocation(),
        patterns: this.getPatterns()
      };
    }
  }, {
    key: 'getPatterns',
    value: function getPatterns() {
      var _props = this.props,
          pattern = _props.pattern,
          _props$patterns = _props.patterns,
          patterns = _props$patterns === undefined ? [] : _props$patterns;

      return [].concat(_toConsumableArray(patterns), _toConsumableArray(pattern ? [pattern] : []));
    }
  }, {
    key: 'getFilteredLocation',
    value: function getFilteredLocation() {
      var patterns = this.getPatterns();
      var initialUrl = this.props.initialUrl;
      var _context = this.context,
          location = _context.location,
          groupIndex = _context.groupIndex;

      var key = getKey(groupIndex, this.containerIndex);
      if ((0, _url.patternsMatch)(patterns, location.pathname)) {
        Container.locations[key] = location;
        return location;
      } else {
        return Container.locations[key] || (0, _location.modifyLocation)(location, initialUrl);
      }
    }
  }, {
    key: 'render',
    value: function render() {

      if (!this.context.initializing) console.log('Container', this.props.children);

      return this.context.initializing ? _react2.default.createElement('div', null) : this.props.children || _react2.default.createElement('div', null);
    }
  }]);

  return Container;
}(_react.Component);

Container.contextTypes = {
  groupIndex: _react.PropTypes.number.isRequired,
  location: _react.PropTypes.object.isRequired,
  initializing: _react.PropTypes.bool,
  useDefaultContainer: _react.PropTypes.bool
};
Container.childContextTypes = {
  containerIndex: _react.PropTypes.number.isRequired,
  location: _react.PropTypes.object.isRequired,
  patterns: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired
};
Container.propTypes = {
  children: _react.PropTypes.node.isRequired,
  initialUrl: _react.PropTypes.string.isRequired,
  pattern: _react.PropTypes.string,
  patterns: _react.PropTypes.arrayOf(_react.PropTypes.string),
  keepHistory: _react.PropTypes.bool
};
Container.locations = {};
exports.default = Container;