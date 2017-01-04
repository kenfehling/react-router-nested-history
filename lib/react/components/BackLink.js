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

var BackLink = function (_Component) {
  _inherits(BackLink, _Component);

  function BackLink() {
    _classCallCheck(this, BackLink);

    return _possibleConstructorReturn(this, (BackLink.__proto__ || Object.getPrototypeOf(BackLink)).apply(this, arguments));
  }

  _createClass(BackLink, [{
    key: 'onClick',
    value: function onClick(event) {
      (0, _main.back)();
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          nameFn = _props.nameFn;

      var backPage = (0, _main.getBackPage)();
      if (backPage) {
        return _react2.default.createElement(
          'a',
          { href: backPage.url, onClick: this.onClick.bind(this) },
          children || nameFn ? nameFn({ params: backPage.params }) : 'Back'
        );
      } else {
        return _react2.default.createElement(
          'span',
          null,
          ' '
        );
      }
    }
  }]);

  return BackLink;
}(_react.Component);

BackLink.propTypes = {
  children: _reactRouter.Link.propTypes.children, // TODO: Shouldn't be required
  nameFn: _react.PropTypes.func
};
exports.default = BackLink;