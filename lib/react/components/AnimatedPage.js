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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var recompose_1 = require("recompose");
var react_router_transition_1 = require("react-router-transition");
var react_motion_1 = require("react-motion");
var Push_1 = require("../../model/actions/Push");
var Back_1 = require("../../model/actions/Back");
var Forward_1 = require("../../model/actions/Forward");
var Top_1 = require("../../model/actions/Top");
var PopState_1 = require("../../model/actions/PopState");
var react_redux_1 = require("react-redux");
var immutable_1 = require("immutable");
var reselect_1 = require("reselect");
var selectors_1 = require("../selectors");
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
var config = { stiffness: 250, damping: 40, precision: 1 };
var Transition = /** @class */ (function () {
    function Transition(_a) {
        var willEnter = _a.willEnter, _b = _a.didEnter, didEnter = _b === void 0 ? 0 : _b, willLeave = _a.willLeave, _c = _a.didLeave, didLeave = _c === void 0 ? willLeave : _c;
        this.willEnter = willEnter;
        this.didEnter = didEnter;
        this.willLeave = willLeave;
        this.didLeave = didLeave;
    }
    Transition.prototype.getOffset = function (stage, action) {
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
var PopStateTransition = /** @class */ (function (_super) {
    __extends(PopStateTransition, _super);
    function PopStateTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ts-ignore */
    PopStateTransition.prototype.getOffset = function (stage, action) {
        var offset = _super.prototype.getOffset.call(this, stage, action);
        return action.n > 0 ? 0 - offset : offset;
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
var transitions = (0, immutable_1.fromJS)((_a = {},
    _a[Push_1.default.type] = slideLeft,
    _a[Forward_1.default.type] = slideLeft,
    _a[Back_1.default.type] = slideRight,
    _a[Top_1.default.type] = slideRight,
    _a[PopState_1.default.type] = popstate,
    _a));
function getOffset(stage, action) {
    var transition = transitions.get(action.type);
    if (transition) {
        return transition.getOffset(stage, action);
    }
    else {
        return 0;
    }
}
var willEnter = function (action) { return ({
    offset: getOffset(LifecycleStage.WILL_ENTER, action)
}); };
var willLeave = function (action) { return ({
    offset: (0, react_motion_1.spring)(getOffset(LifecycleStage.WILL_LEAVE, action), config)
}); };
var InnerAnimatedPage = /** @class */ (function (_super) {
    __extends(InnerAnimatedPage, _super);
    function InnerAnimatedPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerAnimatedPage.prototype.shouldComponentUpdate = function (nextProps) {
        return this.props.pathname !== nextProps.pathname;
    };
    InnerAnimatedPage.prototype.render = function () {
        var _a = this.props, children = _a.children, lastAction = _a.lastAction, animate = _a.animate, pathname = _a.pathname;
        if (pathname && animate !== false) {
            return (React.createElement(react_router_transition_1.RouteTransition, { pathname: pathname, runOnMount: false, atEnter: willEnter(lastAction), atLeave: willLeave(lastAction), atActive: { offset: (0, react_motion_1.spring)(0, config) }, mapStyles: function (styles) { return ({
                    //willChange: 'transform',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    transform: 'translateX(' + styles.offset + '%)'
                }); } }, children));
        }
        else {
            return React.createElement("div", null, children);
        }
    };
    return InnerAnimatedPage;
}(react_1.Component));
var mapStateToProps = (0, reselect_1.createStructuredSelector)({
    lastAction: selectors_1.getLastAction
});
var AnimatedPage = (0, react_redux_1.connect)(mapStateToProps)(InnerAnimatedPage);
var enhance = (0, recompose_1.compose)((0, recompose_1.getContext)({
    rrnhStore: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    pathname: PropTypes.string
}), (0, recompose_1.renameProps)({
    rrnhStore: 'store'
}), (0, recompose_1.shouldUpdate)(function (props, nextProps) { return props.pathname !== nextProps.pathname; }));
exports.default = enhance(AnimatedPage);
//# sourceMappingURL=AnimatedPage.js.map