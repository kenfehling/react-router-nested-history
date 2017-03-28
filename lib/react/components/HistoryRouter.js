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
var react_redux_1 = require("react-redux");
var store_1 = require("../../store/store");
var DumbHistoryRouter_1 = require("./DumbHistoryRouter");
var ExecutionEnvironment_1 = require("fbjs/lib/ExecutionEnvironment");
var browserFunctions_1 = require("../../util/browserFunctions");
var Load_1 = require("../../model/actions/Load");
var SetZeroPage_1 = require("../../model/actions/SetZeroPage");
var StepRunner_1 = require("./StepRunner");
var TitleSetter_1 = require("./TitleSetter");
var UninitializedState_1 = require("../../model/UninitializedState");
var Refresh_1 = require("../../model/actions/Refresh");
var reducers_1 = require("../../reducers");
var redux_1 = require("redux");
var redux_persist_1 = require("redux-persist");
// For IE
var Promise = require("promise-polyfill");
var selectors_1 = require("../selectors");
if (ExecutionEnvironment_1.canUseDOM && !window.Promise) {
    window.Promise = Promise;
}
var InnerHistoryRouter = (function (_super) {
    __extends(InnerHistoryRouter, _super);
    function InnerHistoryRouter(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, loadedFromRefresh = _a.loadedFromRefresh, refresh = _a.refresh;
        if (loadedFromRefresh) {
            refresh();
        }
        else {
            _this.initialize();
        }
        return _this;
    }
    InnerHistoryRouter.prototype.initialize = function () {
        var _a = this.props, zeroPage = _a.zeroPage, setZeroPage = _a.setZeroPage;
        if (zeroPage) {
            setZeroPage(zeroPage);
        }
        /*
         class R extends Component<{children: ReactNode}, undefined> {
           static childContextTypes = {
             rrnhStore: PropTypes.object.isRequired,
             initializing: PropTypes.bool,
             router: PropTypes.object,
           }
    
           getChildContext() {
             return {
               rrnhStore: store,
               initializing: true,
               router: {
               location: {pathname: '/'},
               listen: () => {},
               push: () => {},
               replace: () => {}
               }
             }
           }
    
           render() {
             return <div>{this.props.children}</div>
           }
         }
    
         // Initialize the ContainerGroups
         // (since most tab libraries lazy load tabs)
         const cs = getChildren(this, [ContainerGroup, DumbContainerGroup, WindowGroup])
         cs.forEach(c => renderToStaticMarkup(<R children={c} />))
         */
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
        if (browserFunctions_1.canUseWindowLocation) {
            return window.location.pathname;
        }
        else {
            var location_1 = this.props.location;
            if (location_1) {
                return location_1;
            }
            else {
                console.warn('You should pass location when testing');
                return '/';
            }
        }
    };
    InnerHistoryRouter.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(DumbHistoryRouter_1.default, __assign({}, this.props)),
            React.createElement(StepRunner_1.default, { store: this.props.store }),
            React.createElement(TitleSetter_1.default, { store: this.props.store })));
    };
    return InnerHistoryRouter;
}(react_1.Component));
InnerHistoryRouter.childContextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired
};
var mapStateToProps = function (state) { return ({
    isInitialized: state.isInitialized,
    loadedFromRefresh: browserFunctions_1.wasLoadedFromRefresh
}); };
var makeGetActions = function () { return selectors_1.createCachingSelector(selectors_1.getDispatch, function (dispatch) { return ({
    load: function (url) { return dispatch(new Load_1.default({ url: url })); },
    refresh: function () { return dispatch(new Refresh_1.default()); },
    setZeroPage: function (url) { return dispatch(new SetZeroPage_1.default({ url: url })); }
}); }); };
var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
var ConnectedHistoryRouter = react_redux_1.connect(mapStateToProps, makeGetActions, mergeProps)(InnerHistoryRouter);
var HistoryRouter = (function (_super) {
    __extends(HistoryRouter, _super);
    function HistoryRouter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loaded: false
        };
        _this.store = store_1.createStore({
            loadFromPersist: browserFunctions_1.wasLoadedFromRefresh,
            initialState: new UninitializedState_1.default(),
            regularReduxStore: _this.makeReduxStore()
        });
        return _this;
    }
    HistoryRouter.prototype.makeReduxStore = function () {
        var _this = this;
        var store = redux_1.createStore(reducers_1.default, reducers_1.initialState, redux_persist_1.autoRehydrate());
        redux_persist_1.persistStore(store, {}, function () { return _this.setState({ loaded: true }); });
        return store;
    };
    HistoryRouter.prototype.render = function () {
        return this.state.loaded ?
            React.createElement(ConnectedHistoryRouter, __assign({}, this.props, { store: this.store })) :
            React.createElement("div", null);
    };
    return HistoryRouter;
}(react_1.Component));
exports.default = HistoryRouter;
//# sourceMappingURL=HistoryRouter.js.map