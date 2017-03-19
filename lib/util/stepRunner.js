"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = require("promise-queue");
var browser = require("./browserFunctions");
var queue = new Queue(1, Infinity); // maxConcurrent = 1, maxQueue = Infinity
var noop = function () { };
function runStep(step, before, after) {
    if (before === void 0) { before = noop; }
    if (after === void 0) { after = noop; }
    before();
    step.run();
    return step.needsPopListener ?
        browser.listenPromise().then(after) : Promise.resolve().then(after);
}
function runSteps(steps, before, after) {
    if (before === void 0) { before = noop; }
    if (after === void 0) { after = noop; }
    if (browser.needsPopstateConfirmation) {
        var ps = function () {
            return steps.reduce(function (prev, step) { return prev.then(function () { return runStep(step, before, after); }); }, Promise.resolve());
        };
        return queue.add(ps);
    }
    else {
        steps.forEach(function (s) {
            before();
            s.run();
            after();
        });
        return Promise.resolve();
    }
}
exports.runSteps = runSteps;
//# sourceMappingURL=stepRunner.js.map