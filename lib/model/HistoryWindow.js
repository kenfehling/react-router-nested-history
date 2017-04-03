"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HistoryWindow = (function () {
    function HistoryWindow(_a) {
        var forName = _a.forName, visible = _a.visible;
        this.forName = forName;
        this.visible = visible;
    }
    HistoryWindow.prototype.setVisible = function (visible) {
        return new HistoryWindow(__assign({}, Object(this), { visible: visible }));
    };
    return HistoryWindow;
}());
exports.default = HistoryWindow;
//# sourceMappingURL=HistoryWindow.js.map