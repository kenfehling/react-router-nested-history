"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackStep_1 = require("../model/steps/BackStep");
var R = require("ramda");
var PushStep_1 = require("../model/steps/PushStep");
var ReplaceStep_1 = require("../model/steps/ReplaceStep");
var UninitializedState_1 = require("../model/UninitializedState");
var store_1 = require("../store/store");
var GoStep_1 = require("../model/steps/GoStep");
function actionSteps(_a, action) {
    var steps = _a.steps, state = _a.state;
    return {
        steps: action.addSteps(steps, state),
        state: action.reduce(state)
    };
}
function createStepsSince(actions, time) {
    var oldActions = actions.filter(function (a) { return a.time <= time; });
    var newActions = actions.filter(function (a) { return a.time > time; });
    var oldState = store_1.deriveState(oldActions, new UninitializedState_1.default());
    var initial = { steps: [], state: oldState };
    return newActions.reduce(actionSteps, initial).steps;
}
exports.createStepsSince = createStepsSince;
var DiffType;
(function (DiffType) {
    DiffType[DiffType["SAME"] = 0] = "SAME";
    DiffType[DiffType["ADDED"] = 1] = "ADDED";
    DiffType[DiffType["REMOVED"] = -1] = "REMOVED";
})(DiffType || (DiffType = {}));
var getFirstDifferenceIndex = function (ps1, ps2) {
    var n = Math.min(ps1.length, ps2.length);
    for (var i = 0; i < n; i++) {
        if (!ps1.pages[i].equals(ps2.pages[i])) {
            return i;
        }
    }
    return n;
};
var contains = function (pages, page) { return R.any(function (p) { return p.equals(page); }, pages); };
var merge = function (ps1, ps2) {
    var merged = R.union(ps1, ps2);
    return R.uniqWith(function (p1, p2) { return p1.equals(p2); }, merged);
};
var diffPages = function (ps1, ps2) {
    var same = R.intersection(ps1.pages, ps2.pages);
    var removed = R.difference(ps1.pages, ps2.pages);
    var added = R.difference(ps2.pages, ps1.pages);
    var merged = merge(ps1.pages, ps2.pages);
    var diffedPages = merged.map(function (page) {
        if (contains(same, page)) {
            return { page: page, type: DiffType.SAME };
        }
        else if (contains(removed, page)) {
            return { page: page, type: DiffType.REMOVED };
        }
        else if (contains(added, page)) {
            return { page: page, type: DiffType.ADDED };
        }
        else {
            throw new Error('Page not found in any set');
        }
    });
    return {
        same: same,
        removed: removed,
        added: added,
        diffedPages: diffedPages,
        start: getFirstDifferenceIndex(ps1, ps2)
    };
};
var pushStep = function (p) {
    return new (p.isZeroPage ? ReplaceStep_1.default : PushStep_1.default)(p.toPage());
};
var backSteps = function (amount) {
    return amount > 0 ? [new BackStep_1.default(amount)] : [];
};
/**
 * Get the difference between old pages and new pages and return a list of
 * browser steps to transform the browser history
 * @param ps1 {Pages} The original pages
 * @param ps2 {Pages} The new pages
 * @returns {Step[]} An array of steps to get from old state to new state
 */
exports.diffPagesToSteps = function (ps1, ps2) {
    var diff = diffPages(ps1, ps2);
    var simple = function () {
        if (diff.added.length > 0) {
            var pushes = diff.added.map(pushStep);
            var backs = backSteps(ps2.length - 1 - ps2.activeIndex);
            return pushes.concat(backs);
        }
        else {
            var indexDelta = ps2.activeIndex - ps1.activeIndex;
            return indexDelta !== 0 ? [new GoStep_1.default(indexDelta)] : [];
        }
    };
    var complex = function () {
        var cleanWipe = function () {
            var backs1 = backSteps(ps1.activeIndex - diff.start + 1);
            var pushes = ps2.pages.slice(diff.start).map(pushStep);
            var backs2 = backSteps(ps2.length - 1 - ps2.activeIndex);
            return backs1.concat(pushes, backs2);
        };
        var removeFwdHistory = function () {
            return backSteps(1).concat([pushStep(ps2.activePage)]);
        };
        return diff.start === ps2.length ? removeFwdHistory() : cleanWipe();
    };
    return diff.start === ps1.length ? simple() : complex();
};
//# sourceMappingURL=reconciler.js.map