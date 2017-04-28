"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PropTypes = require("prop-types");
var react_redux_1 = require("react-redux");
var recompose_1 = require("recompose");
var reselect_1 = require("reselect");
var selectors_1 = require("./selectors");
function waitForInitialization(component) {
    var mapStateToProps = reselect_1.createStructuredSelector({
        isInitialized: selectors_1.getIsInitialized
    });
    var WrappedComponent = recompose_1.shouldUpdate(function (props, nextProps) { return !props.isInitialized && nextProps.isInitialized; })(function (_a) {
        var isInitialized = _a.isInitialized, props = __rest(_a, ["isInitialized"]);
        return isInitialized ? react_1.createElement(component, props) : null;
    });
    var WaitForInitialization = react_redux_1.connect(mapStateToProps, {})(WrappedComponent);
    var enhance = recompose_1.compose(recompose_1.getContext({
        rrnhStore: PropTypes.object.isRequired
    }), recompose_1.renameProps({
        rrnhStore: 'store'
    }));
    return enhance(WaitForInitialization);
}
exports.default = waitForInitialization;
//# sourceMappingURL=waitForInitialization.js.map