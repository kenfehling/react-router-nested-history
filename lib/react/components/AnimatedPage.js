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
var react_router_transition_1 = require("react-router-transition");
var Push_1 = require("../../model/actions/Push");
var Back_1 = require("../../model/actions/Back");
var Forward_1 = require("../../model/actions/Forward");
var Top_1 = require("../../model/actions/Top");
var PopState_1 = require("../../model/actions/PopState");
var react_redux_1 = require("react-redux");
var UpdateBrowser_1 = require("../../model/actions/UpdateBrowser");
var R = require("ramda");
var immutable_1 = require("immutable");
var LifecycleStage;
(function (LifecycleStage) {
    LifecycleStage[LifecycleStage["WILL_ENTER"] = 0] = "WILL_ENTER";
    LifecycleStage[LifecycleStage["DID_ENTER"] = 1] = "DID_ENTER";
    LifecycleStage[LifecycleStage["DID_LEAVE"] = 2] = "DID_LEAVE";
    LifecycleStage[LifecycleStage["WILL_LEAVE"] = 3] = "WILL_LEAVE";
})(LifecycleStage || (LifecycleStage = {}));
var Side;
(function (Side) {
    Side[Side["LEFT"] = -100] = "LEFT";
    Side[Side["RIGHT"] = 100] = "RIGHT";
})(Side || (Side = {}));
var Transition = (function () {
    function Transition(_a) {
        var willEnter = _a.willEnter, _b = _a.didEnter, didEnter = _b === void 0 ? 0 : _b, willLeave = _a.willLeave, _c = _a.didLeave, didLeave = _c === void 0 ? willLeave : _c;
        this.willEnter = willEnter;
        this.didEnter = didEnter;
        this.willLeave = willLeave;
        this.didLeave = didLeave;
    }
    Transition.prototype.getLeft = function (stage, action) {
        switch (stage) {
            case LifecycleStage.WILL_ENTER: return this.willEnter;
            case LifecycleStage.DID_ENTER: return this.didEnter;
            case LifecycleStage.WILL_LEAVE: return this.willLeave;
            case LifecycleStage.DID_LEAVE: return this.didLeave;
            default: throw new Error('Unknown lifecycle stage: ' + stage);
        }
    };
    return Transition;
}());
var PopStateTransition = (function (_super) {
    __extends(PopStateTransition, _super);
    function PopStateTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopStateTransition.prototype.getLeft = function (stage, action) {
        var left = _super.prototype.getLeft.call(this, stage, action);
        return action.n > 0 ? 0 - left : left;
    };
    return PopStateTransition;
}(Transition));
var slideLeft = new Transition({
    willEnter: Side.RIGHT,
    willLeave: Side.LEFT
});
var slideRight = new Transition({
    willEnter: Side.LEFT,
    willLeave: Side.RIGHT
});
// Slide right by default, reverses if n > 0 (popped to a forward page)
var popstate = new PopStateTransition(__assign({}, slideRight));
var transitions = immutable_1.fromJS((_a = {},
    _a[Push_1.default.type] = slideLeft,
    _a[Forward_1.default.type] = slideLeft,
    _a[Back_1.default.type] = slideRight,
    _a[Top_1.default.type] = slideRight,
    _a[PopState_1.default.type] = popstate,
    _a));
function getLeft(stage, action) {
    var transition = transitions.get(action.type);
    if (transition) {
        return transition.getLeft(stage, action);
    }
    else {
        return 0;
    }
}
var willEnter = function (action) { return ({
    left: getLeft(LifecycleStage.WILL_ENTER, action)
}); };
var willLeave = function (action) { return ({
    left: getLeft(LifecycleStage.WILL_LEAVE, action)
}); };
var InnerAnimatedPage = (function (_super) {
    __extends(InnerAnimatedPage, _super);
    function InnerAnimatedPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerAnimatedPage.prototype.shouldComponentUpdate = function (nextProps) {
        var match = this.props.match;
        var nextMatch = nextProps.match;
        return !(!match && !nextMatch) &&
            (!match || !nextMatch || match.url !== nextMatch.url);
    };
    InnerAnimatedPage.prototype.render = function () {
        var _a = this.props, children = _a.children, lastAction = _a.lastAction;
        var _b = this.context, animate = _b.animate, pathname = _b.pathname;
        if (animate !== false) {
            return (React.createElement(react_router_transition_1.RouteTransition, { pathname: pathname, runOnMount: false, atEnter: willEnter(lastAction), atLeave: willLeave(lastAction), atActive: { left: 0 }, mapStyles: function (styles) { return ({
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: styles.left + '%'
                }); } }, children));
        }
        else {
            return React.createElement("div", null, children);
        }
    };
    return InnerAnimatedPage;
}(react_1.Component));
InnerAnimatedPage.contextTypes = {
    animate: react_1.PropTypes.bool.isRequired,
    pathname: react_1.PropTypes.string.isRequired
};
var mapStateToProps = function (state, ownProps) { return ({
    lastAction: R.last(state.actions.filter(function (a) { return !(a instanceof UpdateBrowser_1.default); }))
}); };
var ConnectedPage = react_redux_1.connect(mapStateToProps)(InnerAnimatedPage);
var AnimatedPage = (function (_super) {
    __extends(AnimatedPage, _super);
    function AnimatedPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimatedPage.prototype.render = function () {
        var rrnhStore = this.context.rrnhStore;
        return React.createElement(ConnectedPage, __assign({}, this.props, { store: rrnhStore }));
    };
    return AnimatedPage;
}(react_1.Component));
AnimatedPage.contextTypes = {
    rrnhStore: react_1.PropTypes.object.isRequired
};
exports.default = AnimatedPage;
var _a;
//# sourceMappingURL=AnimatedPage.js.map