"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var react_redux_1 = require("react-redux");
function connectToStore(component) {
    var mapStateToProps = function (state, ownProps) { return (__assign({}, Object(ownProps), state)); };
    var WrappedComponent = function (props) { return react_1.createElement(component, props); };
    var ConnectedComponent = react_redux_1.connect(mapStateToProps)(WrappedComponent);
    return _a = (function (_super) {
            __extends(ConnectToStore, _super);
            function ConnectToStore() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ConnectToStore.prototype.render = function () {
                var rrnhStore = this.context.rrnhStore;
                return React.createElement(ConnectedComponent, __assign({ store: rrnhStore }, this.props));
            };
            return ConnectToStore;
        }(react_1.Component)),
        _a.contextTypes = {
            rrnhStore: PropTypes.object.isRequired
        },
        _a;
    var _a;
}
exports.default = connectToStore;
//# sourceMappingURL=connectToStore.js.map