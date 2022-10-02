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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var react_redux_1 = require("react-redux");
var store_1 = require("../../store");
var DumbHistoryRouter_1 = require("./DumbHistoryRouter");
var exenv_1 = require("exenv");
var browserFunctions_1 = require("../../util/browserFunctions");
var Load_1 = require("../../model/actions/Load");
var SetZeroPage_1 = require("../../model/actions/SetZeroPage");
var StepRunner_1 = require("./StepRunner");
var TitleSetter_1 = require("./TitleSetter");
var reducers_1 = require("../../reducers");
var redux_1 = require("redux");
var redux_persist_1 = require("redux-persist");
var selectors_1 = require("../selectors");
var reselect_1 = require("reselect");
var InnerHistoryRouter = /** @class */ (function (_super) {
    __extends(InnerHistoryRouter, _super);
    function InnerHistoryRouter(props) {
        var _this = _super.call(this, props) || this;
        var loadedFromRefresh = _this.props.loadedFromRefresh;
        if (!loadedFromRefresh) {
            _this.initialize();
        }
        return _this;
    }
    InnerHistoryRouter.prototype.shouldComponentUpdate = function () {
        return false;
    };
    InnerHistoryRouter.prototype.initialize = function () {
        var _a = this.props, zeroPage = _a.zeroPage, setZeroPage = _a.setZeroPage;
        if (zeroPage) {
            setZeroPage(zeroPage);
        }
    };
    InnerHistoryRouter.prototype.componentDidMount = function () {
        var _a = this.props, load = _a.load, isInitialized = _a.isInitialized;
        if (!isInitialized) {
            load(this.getLocation());
        }
    };
    InnerHistoryRouter.prototype.getChildContext = function () {
        return {
            rrnhStore: this.props.store
        };
    };
    InnerHistoryRouter.prototype.getLocation = function () {
        if (exenv_1.canUseDOM) {
            return window.location.pathname;
        }
        else {
            var location_1 = this.props.location;
            if (location_1) {
                return location_1;
            }
            else {
                console.warn('You should pass location on the server or when testing');
                return '/';
            }
        }
    };
    InnerHistoryRouter.prototype.render = function () {
        return (React.createElement("div", { style: {
                width: '100%',
                height: '100%'
            } },
            React.createElement(DumbHistoryRouter_1.default, __assign({}, this.props)),
            React.createElement(StepRunner_1.default, { store: this.props.store }),
            React.createElement(TitleSetter_1.default, { store: this.props.store })));
    };
    InnerHistoryRouter.childContextTypes = {
        rrnhStore: PropTypes.object.isRequired
    };
    return InnerHistoryRouter;
}(react_1.Component));
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    isInitialized: selectors_1.getIsInitialized
});
var makeGetActions = function () { return (0, selectors_1.createCachingSelector)(selectors_1.getDispatch, function (dispatch) { return ({
    load: function (url) { return dispatch(new Load_1.default({ url: url })); },
    setZeroPage: function (url) { return dispatch(new SetZeroPage_1.default({ url: url })); }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign(__assign(__assign({}, stateProps), dispatchProps), ownProps)); };
var ConnectedHistoryRouter = (0, react_redux_1.connect)(mapStateToProps, makeGetActions, mergeProps)(InnerHistoryRouter);
var HistoryRouter = /** @class */ (function (_super) {
    __extends(HistoryRouter, _super);
    function HistoryRouter(props) {
        var _this = _super.call(this, props) || this;
        _this.store = (0, store_1.createStore)({
            loadFromPersist: browserFunctions_1.wasLoadedFromRefresh,
            regularReduxStore: _this.makeReduxStore()
        });
        return _this;
    }
    HistoryRouter.prototype.makeReduxStore = function () {
        var regularReduxStore = (0, redux_1.createStore)(reducers_1.default, reducers_1.initialState, (0, redux_persist_1.autoRehydrate)());
        // Wait for persistStore to finish before rendering
        // Removing this messes up SSR
        (0, redux_persist_1.persistStore)(regularReduxStore);
        return regularReduxStore;
    };
    HistoryRouter.prototype.render = function () {
        return React.createElement(ConnectedHistoryRouter, __assign({}, this.props, { store: this.store }));
    };
    return HistoryRouter;
}(react_1.Component));
exports.default = HistoryRouter;
//# sourceMappingURL=HistoryRouter.js.map