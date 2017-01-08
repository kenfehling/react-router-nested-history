'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _main = require('../../main');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Recursively gets the children of a component for simlated rendering
 * so that the containers are initialized even if they're hidden inside tabs
 */
function getChildren(component) {
  if (!(component instanceof _react.Component) && !component.type) {
    return [];
  }
  if (component instanceof _Container2.default || component.type === _Container2.default) {
    return [component]; // Stop if you find a Container
  } else if (component.props && component.props.children) {
    var children = _react.Children.map(component.props.children, function (c) {
      return c;
    });
    return _.flatten(children.map(getChildren)); // grandchildren
  } else {
    // no children
    return [component];
  }
}

var ContainerGroup = function (_Component) {
  _inherits(ContainerGroup, _Component);

  function ContainerGroup() {
    _classCallCheck(this, ContainerGroup);

    return _possibleConstructorReturn(this, (ContainerGroup.__proto__ || Object.getPrototypeOf(ContainerGroup)).apply(this, arguments));
  }

  _createClass(ContainerGroup, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        groupIndex: this.groupIndex,
        location: this.props.location,
        useDefaultContainer: this.props.useDefaultContainer,
        activePage: (0, _main.getActivePageInGroup)(this.groupIndex),
        lastAction: (0, _main.getLastAction)().type
      };
    }
  }, {
    key: 'update',
    value: function update() {
      var onContainerSwitch = this.props.onContainerSwitch;

      var groupState = (0, _main.getGroupState)(this.groupIndex);
      if (!_.isEqual(this.indexedStackOrder, groupState.indexedStackOrder)) {
        if (onContainerSwitch) {
          onContainerSwitch(groupState);
        }
        this.indexedStackOrder = groupState.indexedStackOrder;
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var groupIndex = (0, _main.getNextGroupIndex)();
      this.groupIndex = groupIndex;
      var _props = this.props,
          location = _props.location,
          useDefaultContainer = _props.useDefaultContainer;

      var G = function (_Component2) {
        _inherits(G, _Component2);

        function G() {
          _classCallCheck(this, G);

          return _possibleConstructorReturn(this, (G.__proto__ || Object.getPrototypeOf(G)).apply(this, arguments));
        }

        _createClass(G, [{
          key: 'getChildContext',
          value: function getChildContext() {
            return {
              groupIndex: groupIndex,
              location: location,
              useDefaultContainer: useDefaultContainer,
              initializing: true
            };
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2.default.createElement(
              'div',
              null,
              this.props.children
            );
          }
        }]);

        return G;
      }(_react.Component);

      G.childContextTypes = {
        groupIndex: _react.PropTypes.number.isRequired,
        location: _react.PropTypes.object.isRequired,
        useDefaultContainer: _react.PropTypes.bool,
        initializing: _react.PropTypes.bool
      };


      var children = getChildren(this);
      children.forEach(function (c) {
        if (c instanceof Object) {
          var div = document.createElement('div');
          (0, _reactDom.render)(_react2.default.createElement(
            G,
            null,
            c
          ), div); // Initialize the Containers in this group
        } // (since most tab libraries lazy load tabs)
      });
    }
  }, {
    key: 'setCurrentContainer',
    value: function setCurrentContainer(index) {
      if (index != null && index !== this.props.currentContainerIndex) {
        (0, _main.switchToContainer)(this.groupIndex, index);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setCurrentContainer(this.props.currentContainerIndex);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setCurrentContainer(newProps.currentContainerIndex);
      this.update();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return ContainerGroup;
}(_react.Component);

ContainerGroup.childContextTypes = {
  groupIndex: _react.PropTypes.number.isRequired,
  location: _react.PropTypes.object.isRequired,
  useDefaultContainer: _react.PropTypes.bool,
  activePage: _react.PropTypes.object.isRequired,
  lastAction: _react.PropTypes.string.isRequired
};
ContainerGroup.propTypes = {
  currentContainerIndex: _react.PropTypes.number,
  onContainerSwitch: _react.PropTypes.func,
  useDefaultContainer: _react.PropTypes.bool
};


var ConnectedContainerGroup = (0, _reactRedux.connect)(function (state) {
  return {
    location: state.location
  };
}, {})(ContainerGroup);

exports.default = function (props) {
  return _react2.default.createElement(ConnectedContainerGroup, _extends({ store: _store2.default }, props));
};