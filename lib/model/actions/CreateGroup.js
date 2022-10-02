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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var NonStepAction_1 = require("./NonStepAction");
var Action_1 = require("../Action");
var Serializable_1 = require("../../store/decorators/Serializable");
var CreateGroup = /** @class */ (function (_super) {
    __extends(CreateGroup, _super);
    function CreateGroup(_a) {
        var time = _a.time, name = _a.name, _b = _a.allowInterContainerHistory, allowInterContainerHistory = _b === void 0 ? false : _b, _c = _a.parentGroup, parentGroup = _c === void 0 ? undefined : _c, _d = _a.isDefault, isDefault = _d === void 0 ? parentGroup ? false : undefined : _d, _e = _a.resetOnLeave, resetOnLeave = _e === void 0 ? false : _e, _f = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _f === void 0 ? false : _f;
        var _this = _super.call(this, { time: time, origin: Action_1.SYSTEM }) || this;
        _this.type = CreateGroup_1.type;
        _this.name = name;
        _this.parentGroup = parentGroup;
        _this.isDefault = isDefault;
        _this.allowInterContainerHistory = allowInterContainerHistory;
        _this.resetOnLeave = resetOnLeave;
        _this.gotoTopOnSelectActive = gotoTopOnSelectActive;
        return _this;
    }
    CreateGroup_1 = CreateGroup;
    /* @ts-ignore */
    CreateGroup.prototype.reduce = function (state) {
        if (this.parentGroup && this.isDefault != null) {
            return state.addSubGroup({
                name: this.name,
                parentGroup: this.parentGroup,
                isDefault: this.isDefault,
                resetOnLeave: this.resetOnLeave,
                allowInterContainerHistory: this.allowInterContainerHistory,
                gotoTopOnSelectActive: this.gotoTopOnSelectActive
            });
        }
        else {
            return state.addTopLevelGroup({
                name: this.name,
                resetOnLeave: this.resetOnLeave,
                allowInterContainerHistory: this.allowInterContainerHistory,
                gotoTopOnSelectActive: this.gotoTopOnSelectActive
            });
        }
    };
    var CreateGroup_1;
    CreateGroup.type = 'CreateGroup';
    CreateGroup = CreateGroup_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], CreateGroup);
    return CreateGroup;
}(NonStepAction_1.default));
exports.default = CreateGroup;
//# sourceMappingURL=CreateGroup.js.map