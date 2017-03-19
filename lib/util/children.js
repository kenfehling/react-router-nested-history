"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var R = require("ramda");
var match = function (comp, C) { return comp instanceof C || comp.type === C; };
function _processChildren(component, next) {
    var children = component.props.children;
    if (children instanceof Function) {
        return next(react_1.createElement(children));
    }
    else {
        var cs = Array.isArray(children) ?
            R.flatten(children) : react_1.Children.toArray(children);
        return R.flatten(cs.map(function (c) { return next(c); }));
    }
}
function _getChildren(component, stopAt, stopAtNested, depth) {
    if (stopAtNested === void 0) { stopAtNested = []; }
    var matchAny = function (cs) { return R.any(function (c) { return match(component, c); }, cs); };
    var next = function (c) { return _getChildren(c, stopAt, stopAtNested, depth + 1); };
    if (!(component instanceof react_1.Component) && !component.type) {
        return [];
    }
    else if (matchAny(stopAt) || (depth > 0 && matchAny(stopAtNested))) {
        return [component]; // Stop if you find one of the stop classes
    }
    else if (component.type instanceof Function) {
        try {
            return next(component.type(component.props));
        }
        catch (e) {
            try {
                return next(new component.type(component.props).render());
            }
            catch (e) { }
        }
    }
    if (component.props && component.props.children) {
        return _processChildren(component, next);
    }
    //else if (component.type.children) {
    //  return _processChildren(component.type, next)
    //}
    return [component];
}
/**
 * Recursively gets the children of a component for simlated rendering
 * so that the containers are initialized even if they're hidden inside tabs
 */
function getChildren(component, stopAt, stopAtNested) {
    if (stopAtNested === void 0) { stopAtNested = []; }
    return _getChildren(component, stopAt, stopAtNested, 0);
}
exports.getChildren = getChildren;
//# sourceMappingURL=children.js.map