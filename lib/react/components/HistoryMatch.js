'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var reactRouter = _interopRequireWildcard(_reactRouter);

var _MatchProvider = require('react-router/MatchProvider');

var _MatchProvider2 = _interopRequireDefault(_MatchProvider);

var _matchPattern = require('react-router/matchPattern');

var _matchPattern2 = _interopRequireDefault(_matchPattern);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterMatch = function (_React$Component) {
  _inherits(RegisterMatch, _React$Component);

  function RegisterMatch() {
    _classCallCheck(this, RegisterMatch);

    return _possibleConstructorReturn(this, (RegisterMatch.__proto__ || Object.getPrototypeOf(RegisterMatch)).apply(this, arguments));
  }

  _createClass(RegisterMatch, [{
    key: 'registerMatch',
    value: function registerMatch() {
      var matchContext = this.context.match;
      var match = this.props.match;


      if (match && matchContext) {
        matchContext.addMatch(match);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.context.serverRouter) {
        this.registerMatch();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.context.serverRouter) {
        this.registerMatch();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var match = this.context.match;


      if (match) {
        if (prevProps.match && !this.props.match) {
          match.removeMatch(prevProps.match);
        } else if (!prevProps.match && this.props.match) {
          match.addMatch(this.props.match);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.match && this.context.match) {
        this.context.match.removeMatch(this.props.match);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return RegisterMatch;
}(_react2.default.Component);

RegisterMatch.contextTypes = {
  match: _react.PropTypes.object,
  serverRouter: _react.PropTypes.object
};

var _class = function (_reactRouter$Match) {
  _inherits(_class, _reactRouter$Match);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          render = _props.render,
          Component = _props.component,
          pattern = _props.pattern,
          exactly = _props.exactly;
      var _context = this.context,
          matchContext = _context.match,
          location = _context.location;

      var parent = matchContext && matchContext.parent;
      var match = (0, _matchPattern2.default)(pattern, location, exactly, parent);
      var props = _extends({}, match, { location: location, pattern: pattern });
      return _react2.default.createElement(
        RegisterMatch,
        { match: match },
        _react2.default.createElement(
          _MatchProvider2.default,
          { match: match },
          children ? children(_extends({ matched: !!match }, props)) : match ? render ? render(props) : _react2.default.createElement(Component, props) : null
        )
      );
    }
  }]);

  return _class;
}(reactRouter.Match);

_class.contextTypes = _extends({}, reactRouter.Match.contextTypes ? reactRouter.Match.contextTypes : [], {
  groupIndex: _react.PropTypes.number.isRequired,
  location: _react.PropTypes.object.isRequired
});
exports.default = _class;