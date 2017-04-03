"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackStep_1 = require("../model/steps/BackStep");
var PushStep_1 = require("../model/steps/PushStep");
var ReplaceStep_1 = require("../model/steps/ReplaceStep");
var GoStep_1 = require("../model/steps/GoStep");
var pageUtils = require("./pages");
function actionSteps(_a, action) {
    var steps = _a.steps, state = _a.state;
    return {
        steps: action.addSteps(steps, state),
        state: action.reduce(state)
    };
}
function createSteps(oldState, newActions) {
    var initial = { steps: [], state: oldState };
    return newActions.reduce(actionSteps, initial).steps;
}
exports.createSteps = createSteps;
var DiffType;
(function (DiffType) {
    DiffType[DiffType["SAME"] = 0] = "SAME";
    DiffType[DiffType["ADDED"] = 1] = "ADDED";
    DiffType[DiffType["REMOVED"] = -1] = "REMOVED";
})(DiffType || (DiffType = {}));
var getFirstDifferenceIndex = function (ps1, ps2) {
    var n = Math.min(ps1.size, ps2.size);
    for (var i = 0; i < n; i++) {
        if (!ps1.get(i).equals(ps2.get(i))) {
            return i;
        }
    }
    return n;
};
var diffPages = function (p1, p2) {
    var ps1 = p1.toOrderedSet();
    var ps2 = p2.toOrderedSet();
    var same = ps1.intersect(ps2);
    var removed = ps1.subtract(ps2);
    var added = ps2.subtract(ps1);
    var merged = ps1.concat(ps2);
    var diffedPages = merged.map(function (page) {
        if (same.contains(page)) {
            return { page: page, type: DiffType.SAME };
        }
        else if (removed.contains(page)) {
            return { page: page, type: DiffType.REMOVED };
        }
        else if (added.contains(page)) {
            return { page: page, type: DiffType.ADDED };
        }
        else {
            throw new Error('Page not found in any set');
        }
    });
    return {
        same: same.toArray(),
        removed: removed.toArray(),
        added: added.toArray(),
        diffedPages: diffedPages.toArray(),
        start: getFirstDifferenceIndex(p1, p2)
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
 * @param ps1 {List<VisitedPage>} The original pages
 * @param ps2 {List<VisitedPage>} The new pages
 * @returns {Step[]} An array of steps to get from old state to new state
 */
exports.diffPagesToSteps = function (ps1, ps2) {
    if (ps1.size === 0 && ps2.size === 0) {
        return [];
    }
    var diff = diffPages(ps1, ps2);
    var oldActiveIndex = pageUtils.getActiveIndex(ps1);
    var newActiveIndex = pageUtils.getActiveIndex(ps2);
    var simple = function () {
        if (diff.added.length > 0) {
            var pushes = diff.added.map(pushStep);
            var backs = backSteps(ps2.size - 1 - newActiveIndex);
            return pushes.concat(backs);
        }
        else {
            var indexDelta = newActiveIndex - oldActiveIndex;
            return indexDelta !== 0 ? [new GoStep_1.default(indexDelta)] : [];
        }
    };
    var complex = function () {
        var cleanWipe = function () {
            var backs1 = backSteps(oldActiveIndex - diff.start + 1);
            var pushes = ps2.toArray().slice(diff.start).map(pushStep);
            var backs2 = backSteps(ps2.size - 1 - newActiveIndex);
            return backs1.concat(pushes, backs2);
        };
        var removeFwdHistory = function () {
            return backSteps(1).concat([pushStep(pageUtils.getActivePage(ps2))]);
            /*
            const backs1:Step[] = backSteps(ps1.size - 1 - diff.start)
            const push:Step = pushStep(pageUtils.getActivePage(ps2))
            const backs2:Step[] = backSteps(ps2.size - 1 - newActiveIndex)
            return [...backs1, push, ...backs2]
            */
        };
        return diff.start === ps2.size ? removeFwdHistory() : cleanWipe();
    };
    return diff.start === ps1.size ? simple() : complex();
};
//# sourceMappingURL=reconciler.js.map