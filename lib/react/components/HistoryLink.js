'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _main = require('../../main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HistoryLink = function (_Component) {
  _inherits(HistoryLink, _Component);

  function HistoryLink() {
    _classCallCheck(this, HistoryLink);

    return _possibleConstructorReturn(this, (HistoryLink.__proto__ || Object.getPrototypeOf(HistoryLink)).apply(this, arguments));
  }

  _createClass(HistoryLink, [{
    key: 'onClick',
    value: function onClick(event) {
      var to = this.props.to;
      var _context = this.context,
          containerIndex = _context.containerIndex,
          groupIndex = _context.groupIndex;

      (0, _main.push)(groupIndex, containerIndex, to);
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          to = _props.to,
          children = _props.children;

      return _react2.default.createElement(
        _reactRouter.Link,
        { to: to, onClick: this.onClick.bind(this) },
        children
      );
    }
  }]);

  return HistoryLink;
}(_react.Component);

HistoryLink.propTypes = _reactRouter.Link.propTypes;
HistoryLink.contextTypes = {
  groupIndex: _react.PropTypes.number.isRequired,
  containerIndex: _react.PropTypes.number.isRequired
};
exports.default = HistoryLink;