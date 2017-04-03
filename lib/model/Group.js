"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Group = (function () {
    function Group(_a) {
        var name = _a.name, _b = _a.allowInterContainerHistory, allowInterContainerHistory = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, _d = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _d === void 0 ? false : _d, parentGroup = _a.parentGroup, _e = _a.isDefault, isDefault = _e === void 0 ? false : _e;
        this.name = name;
        this.allowInterContainerHistory = allowInterContainerHistory;
        this.resetOnLeave = resetOnLeave;
        this.gotoTopOnSelectActive = gotoTopOnSelectActive;
        this.group = parentGroup;
        this.isDefault = isDefault;
    }
    Object.defineProperty(Group.prototype, "isGroup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return Group;
}());
exports.default = Group;
//# sourceMappingURL=Group.js.map