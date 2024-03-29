"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PropTypes = require("prop-types");
var react_redux_1 = require("react-redux");
var selectors_1 = require("../selectors");
var Push_1 = require("../../model/actions/Push");
var Replace_1 = require("../../model/actions/Replace");
var recompose_1 = require("recompose");
var waitForInitialization_1 = require("../waitForInitialization");
/**
 * The public API for updating the location programatically
 * with a component.
 */
var InnerHistoryRedirect = /** @class */ (function (_super) {
    __extends(InnerHistoryRedirect, _super);
    function InnerHistoryRedirect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerHistoryRedirect.prototype.isStatic = function () {
        return this.context.router && this.context.router.staticContext;
    };
    InnerHistoryRedirect.prototype.componentWillMount = function () {
        if (this.isStatic())
            this.perform();
    };
    InnerHistoryRedirect.prototype.componentDidMount = function () {
        if (!this.isStatic())
            this.perform();
    };
    InnerHistoryRedirect.prototype.perform = function () {
        var _a = this.props, push = _a.push, to = _a.to, pushFn = _a.pushFn, replaceFn = _a.replaceFn;
        if (push) {
            pushFn(to);
        }
        else {
            replaceFn(to);
        }
    };
    InnerHistoryRedirect.prototype.render = function () {
        return null;
    };
    InnerHistoryRedirect.propTypes = {
        to: PropTypes.oneOfType([
            PropTypes.string,
            //PropTypes.object
        ])
    };
    InnerHistoryRedirect.defaultProps = {
        push: false
    };
    return InnerHistoryRedirect;
}(react_1.Component));
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getDispatch, function (dispatch) { return ({
    pushFn: function (url) { return dispatch(new Push_1.default({ url: url })); },
    replaceFn: function (url) { return dispatch(new Replace_1.default({ url: url })); },
}); }); };
var HistoryRedirect = (0, react_redux_1.connect)(function () { return ({}); }, makeGetActions)(InnerHistoryRedirect);
var enhance = (0, recompose_1.compose)((0, recompose_1.getContext)({
    rrnhStore: PropTypes.object.isRequired
}), (0, recompose_1.renameProps)({
    rrnhStore: 'store'
}), waitForInitialization_1.default);
exports.default = enhance(HistoryRedirect);
//# sourceMappingURL=HistoryRedirect.js.map