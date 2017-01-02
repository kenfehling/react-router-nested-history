"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = exports.State = function State(_ref) {
  var groups = _ref.groups,
      lastPageId = _ref.lastPageId;

  _classCallCheck(this, State);

  this.groups = groups;
  this.lastPageId = lastPageId;
};

var UninitializedState = exports.UninitializedState = function (_State) {
  _inherits(UninitializedState, _State);

  function UninitializedState() {
    _classCallCheck(this, UninitializedState);

    return _possibleConstructorReturn(this, (UninitializedState.__proto__ || Object.getPrototypeOf(UninitializedState)).apply(this, arguments));
  }

  return UninitializedState;
}(State);

var InitializedState = exports.InitializedState = function (_State2) {
  _inherits(InitializedState, _State2);

  function InitializedState(_ref2) {
    var groups = _ref2.groups,
        lastPageId = _ref2.lastPageId,
        browserHistory = _ref2.browserHistory,
        lastUpdate = _ref2.lastUpdate,
        activeGroupIndex = _ref2.activeGroupIndex;

    _classCallCheck(this, InitializedState);

    var _this2 = _possibleConstructorReturn(this, (InitializedState.__proto__ || Object.getPrototypeOf(InitializedState)).call(this, { groups: groups, lastPageId: lastPageId }));

    _this2.browserHistory = browserHistory;
    _this2.lastUpdate = lastUpdate;
    _this2.activeGroupIndex = activeGroupIndex;
    return _this2;
  }

  return InitializedState;
}(State);