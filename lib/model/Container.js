"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container = (function () {
    /**
     * Construct a new Container
     * @param name - The container's name
     * @param initialUrl - The starting URL of this container
     * @param patterns - Patterns of URLs that this container handles
     * @param isDefault - Is this the default container?
     * @param resetOnLeave - Keep container history after navigating away?
     * @param group - The name of this container's group
     */
    function Container(_a) {
        var name = _a.name, initialUrl = _a.initialUrl, patterns = _a.patterns, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, group = _a.group;
        this.name = name;
        this.initialUrl = initialUrl;
        this.patterns = patterns;
        this.isDefault = isDefault;
        this.resetOnLeave = resetOnLeave;
        this.group = group;
    }
    Object.defineProperty(Container.prototype, "isGroup", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return Container;
}());
exports.default = Container;
//# sourceMappingURL=Container.js.map