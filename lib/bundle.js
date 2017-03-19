var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
define("store/ISerializable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("store/ISerializableClass", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("store/serializables", ["require", "exports", "immutable"], function (require, exports, immutable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Stores all classes with @Serializable decorator
    var Serializables = (function () {
        function Serializables() {
            this.serializables = immutable_1.fromJS({});
        }
        Serializables.prototype.set = function (key, value) {
            this.serializables = this.serializables.set(key, value);
        };
        Serializables.prototype.get = function (key) {
            return this.serializables.get(key);
        };
        Serializables.prototype.has = function (key) {
            return this.serializables.has(key);
        };
        return Serializables;
    }());
    exports.default = new Serializables();
});
define("store/decorators/Serializable", ["require", "exports", "store/serializables"], function (require, exports, serializables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @Serializable decorator for a class
    function Serializable(target) {
        if (target.type) {
            serializables_1.default.set(target.type, target); // Use the class name as a type
        }
        else {
            throw new Error("target " + target + " has no type");
        }
    }
    exports.default = Serializable;
});
define("model/Page", ["require", "exports", "ramda", "store/decorators/Serializable"], function (require, exports, R, Serializable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Page = Page_1 = (function () {
        function Page(_a) {
            var url = _a.url, params = _a.params, groupName = _a.groupName, containerName = _a.containerName, _b = _a.isZeroPage, isZeroPage = _b === void 0 ? false : _b;
            this.type = Page_1.type;
            this.url = url;
            this.params = params;
            this.containerName = containerName;
            this.groupName = groupName;
            this.isZeroPage = isZeroPage;
        }
        Object.defineProperty(Page.prototype, "state", {
            get: function () {
                return {
                    url: this.url,
                    groupName: this.groupName,
                    containerName: this.containerName,
                    isZeroPage: this.isZeroPage
                };
            },
            enumerable: true,
            configurable: true
        });
        Page.prototype.equals = function (other) {
            return R.equals(this.state, other.state);
        };
        return Page;
    }());
    Page.type = 'Page';
    Page = Page_1 = __decorate([
        Serializable_1.default,
        __metadata("design:paramtypes", [Object])
    ], Page);
    exports.default = Page;
    var Page_1;
});
define("util/url", ["require", "exports", "path-to-regexp", "react-router/matchPath", "ramda"], function (require, exports, pathToRegexp, matchPath_1, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addLeadingSlash = function (path) { return path.replace(/\/?(\?|#|$)?/, '/$1'); };
    exports.addTrailingSlash = function (path) { return path.replace(/\/?(\?|#|$)/, '/$1'); };
    exports.stripLeadingSlash = function (path) { return path.charAt(0) === '/' ? path.substr(1) : path; };
    exports.stripTrailingSlash = function (path) {
        return path.charAt(path.length - 1) === '/' ? path.substr(0, path.length - 1) : path;
    };
    exports.getPathParts = function (path) {
        var strippedPath = exports.stripTrailingSlash(exports.stripLeadingSlash(path));
        if (!strippedPath) {
            return [];
        }
        else {
            return strippedPath.split('/');
        }
    };
    exports.appendToPath = function (path, newPart) { return (path ? exports.addTrailingSlash(path) : '/') + newPart; };
    exports.getParentPath = function (path) { return R.init(exports.getPathParts(path)).join('/'); };
    exports.getParentPaths = function (path) {
        return R.init(exports.getPathParts(path)).reduce(function (array, part) {
            return array.concat([exports.appendToPath(R.last(array), part)]);
        }, []);
    };
    exports.patternMatches = function (pattern, path) {
        var re = pathToRegexp(pattern);
        return !!re.exec(path);
    };
    exports.patternsMatch = function (patterns, path) {
        return R.any(function (p) { return exports.patternMatches(p, path); }, patterns);
    };
    var parseParams = function (pattern, url) {
        var match = matchPath_1.default(url, pattern, { exact: true });
        return match ? match.params || {} : {};
    };
    var _compareSize = function (p1, p2) { return R.values(p1).length - R.values(p2).length; };
    exports.parseParamsFromPatterns = function (patterns, url) {
        var paramResults = patterns.map(function (p) { return parseParams(p, url); });
        return R.last(R.sort(_compareSize, paramResults)) || {};
    };
});
define("model/PageVisit", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VisitType;
    (function (VisitType) {
        VisitType[VisitType["AUTO"] = 0] = "AUTO";
        VisitType[VisitType["MANUAL"] = 1] = "MANUAL";
    })(VisitType = exports.VisitType || (exports.VisitType = {}));
});
define("model/VistedPage", ["require", "exports", "model/PageVisit", "model/Page", "ramda"], function (require, exports, PageVisit_1, Page_2, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VisitedPage = (function (_super) {
        __extends(VisitedPage, _super);
        function VisitedPage(_a) {
            var url = _a.url, params = _a.params, groupName = _a.groupName, containerName = _a.containerName, _b = _a.isZeroPage, isZeroPage = _b === void 0 ? false : _b, _c = _a.visits, visits = _c === void 0 ? [] : _c;
            var _this = _super.call(this, { url: url, params: params, groupName: groupName, containerName: containerName, isZeroPage: isZeroPage }) || this;
            _this.visits = visits;
            return _this;
        }
        VisitedPage.prototype.touch = function (visit) {
            return new VisitedPage(__assign({}, Object(this), { visits: this.visits.concat([visit]) }));
        };
        Object.defineProperty(VisitedPage.prototype, "wasManuallyVisited", {
            get: function () {
                return R.any(function (v) { return v.type === PageVisit_1.VisitType.MANUAL; }, this.visits);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisitedPage.prototype, "firstManualVisit", {
            get: function () {
                return this.visits.filter(function (p) { return p.type === PageVisit_1.VisitType.MANUAL; })[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisitedPage.prototype, "lastVisit", {
            get: function () {
                return R.last(this.visits);
            },
            enumerable: true,
            configurable: true
        });
        VisitedPage.prototype.toPage = function () {
            return new Page_2.default(this);
        };
        return VisitedPage;
    }(Page_2.default));
    exports.default = VisitedPage;
});
define("model/IHistory", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IHistory = (function () {
        function IHistory() {
        }
        return IHistory;
    }());
    exports.default = IHistory;
});
define("model/Pages", ["require", "exports", "ramda", "model/VistedPage", "model/PageVisit"], function (require, exports, R, VistedPage_1, PageVisit_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A list of VisitedPage objects that's always sorted by first manually visited
     */
    var Pages = (function () {
        function Pages(pages, sort) {
            if (pages === void 0) { pages = []; }
            if (sort === void 0) { sort = true; }
            this.pages = sort ? R.sort(Pages.compareByFirstVisited, pages) : pages;
        }
        Pages.prototype.toHistoryStack = function () {
            var currentIndex = this.activeIndex;
            return new HistoryStack({
                back: this.slice(0, currentIndex).pages,
                current: this.activePage,
                forward: this
                    .slice(currentIndex + 1)
                    .filter(function (p) { return p.wasManuallyVisited; }).pages
            });
        };
        /**
         * Updates the times of pages stored in this object
         * Ignores pages that don't intersect
         */
        Pages.prototype.update = function (pages) {
            return new Pages(this.pages.map(function (page) {
                return R.find(function (p) { return p.equals(page); }, pages.pages) || page;
            }));
        };
        Pages.prototype.replacePageAtIndex = function (page, index) {
            var pages = this.pages;
            return new Pages(pages.slice(0, index).concat([
                page
            ], pages.slice(index + 1)));
        };
        Pages.prototype.touchPageAtIndex = function (index, pageVisit) {
            var page = this.pages[index];
            return this.replacePageAtIndex(page.touch(pageVisit), index);
        };
        Pages.prototype.activate = function (pageVisit) {
            return this.touchPageAtIndex(this.activeIndex, pageVisit);
        };
        Pages.prototype.push = function (page, time, type) {
            if (type === void 0) { type = PageVisit_2.VisitType.MANUAL; }
            var index = this.activeIndex + 1;
            var newPage = new VistedPage_1.default(__assign({}, Object(page), { visits: [{ time: time, type: type }] }));
            return new Pages(this.pages.slice(0, index).concat([newPage]));
        };
        /**
         * Go back to the first page
         * @param time - The time this action was originally run
         * @param reset - Should it remove the forward pages from history?
         */
        Pages.prototype.top = function (time, reset) {
            if (reset === void 0) { reset = false; }
            var visit = { time: time, type: PageVisit_2.VisitType.MANUAL };
            var page = this.pages[0].touch(visit);
            return new Pages(reset ? [page] : [page].concat(this.slice(1).pages));
        };
        /**
         * Gets the distance and direction of a page on the stack
         * @param page - The page to look for
         * @returns {number} - The amount (-2 = 2 steps back)
         * @throws Error if page not found
         */
        Pages.prototype.getShiftAmount = function (page) {
            var index = this.findIndex(function (p) { return p.equals(page); });
            if (index === -1) {
                throw new Error('Page not found');
            }
            else {
                return index - this.activeIndex;
            }
        };
        Pages.prototype.go = function (n, time) {
            var oldIndex = this.activeIndex;
            var newIndex = oldIndex + n;
            if (newIndex < 0 || newIndex >= this.pages.length) {
                throw new Error("Can't go " + n + ", size = " + this.pages.length + ", index = " + oldIndex);
            }
            else {
                return this.touchPageAtIndex(newIndex, { time: time, type: PageVisit_2.VisitType.MANUAL });
            }
        };
        Pages.prototype.back = function (n, time) {
            if (n === void 0) { n = 1; }
            return this.go(0 - n, time);
        };
        Pages.prototype.forward = function (n, time) {
            if (n === void 0) { n = 1; }
            return this.go(n, time);
        };
        Pages.prototype.canGoBack = function (n) {
            if (n === void 0) { n = 1; }
            return this.activeIndex >= n;
        };
        Pages.prototype.canGoForward = function (n) {
            if (n === void 0) { n = 1; }
            return this.pages.length - this.activeIndex > n;
        };
        Object.defineProperty(Pages.prototype, "backPages", {
            get: function () {
                return this.pages.slice(0, this.activeIndex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "forwardPages", {
            get: function () {
                return this.pages.slice(this.activeIndex + 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "backLength", {
            get: function () {
                return this.activeIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "forwardLength", {
            get: function () {
                return this.length - this.activeIndex - 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "backPage", {
            get: function () {
                return this.pages[this.activeIndex - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "forwardPage", {
            get: function () {
                return this.pages[this.activeIndex + 1];
            },
            enumerable: true,
            configurable: true
        });
        Pages.prototype.shiftTo = function (page, time) {
            return this.go(this.getShiftAmount(page), time);
        };
        Object.defineProperty(Pages.prototype, "activePage", {
            get: function () {
                return R.sort(Pages.compareByLastVisited, this.pages)[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "activeUrl", {
            get: function () {
                return this.activePage.url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "activeIndex", {
            get: function () {
                var current = this.activePage;
                return this.findIndex(function (p) { return p === current; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "firstManualVisit", {
            get: function () {
                var page = this.pages.filter(function (p) { return p.wasManuallyVisited; })[0];
                return page ? page.firstManualVisit : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "lastVisit", {
            get: function () {
                return this.activePage.lastVisit;
            },
            enumerable: true,
            configurable: true
        });
        Pages.prototype.containsPage = function (page) {
            return R.findIndex(function (p) { return p.equals(page); }, this.pages) !== -1;
        };
        Object.defineProperty(Pages.prototype, "length", {
            get: function () {
                return this.pages.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "isEmpty", {
            get: function () {
                return this.length === 0;
            },
            enumerable: true,
            configurable: true
        });
        Pages.prototype.add = function (page) {
            return new Pages(this.pages.concat([page]));
        };
        Pages.prototype.sort = function (fn) {
            return new Pages(R.sort(fn, this.pages), false);
        };
        Pages.prototype.slice = function (start, end) {
            return new Pages(this.pages.slice(start, end), false);
        };
        Pages.prototype.filter = function (fn) {
            return new Pages(this.pages.filter(fn), false);
        };
        Pages.prototype.map = function (fn) {
            return new Pages(this.pages.map(fn), false);
        };
        Pages.prototype.findIndex = function (fn) {
            return R.findIndex(fn, this.pages);
        };
        Pages.compareByFirstVisited = function (p1, p2) {
            if (p1.isZeroPage) {
                return -1;
            }
            if (p2.isZeroPage) {
                return 1;
            }
            if (p1.wasManuallyVisited) {
                if (p2.wasManuallyVisited) {
                    return p1.firstManualVisit.time - p2.firstManualVisit.time;
                }
                else {
                    return -1; //1
                }
            }
            else {
                if (p2.wasManuallyVisited) {
                    return 1; //-1
                }
                else {
                    return 0;
                }
            }
        };
        Pages.compareByLastVisited = function (p1, p2) {
            return p2.lastVisit.time - p1.lastVisit.time;
        };
        Object.defineProperty(Pages.prototype, "byLastVisited", {
            get: function () {
                return this.sort(Pages.compareByLastVisited);
            },
            enumerable: true,
            configurable: true
        });
        return Pages;
    }());
    exports.default = Pages;
    /**
     * Not really a stack in the strictest definition, rather two arrays and a value,
     * but the name History is already built-in type in TypeScript
     */
    var HistoryStack = (function () {
        function HistoryStack(_a) {
            var back = _a.back, current = _a.current, forward = _a.forward;
            this.back = back;
            this.current = current;
            this.forward = forward;
        }
        Object.defineProperty(HistoryStack.prototype, "lastVisit", {
            get: function () {
                return this.current.lastVisit;
            },
            enumerable: true,
            configurable: true
        });
        HistoryStack.prototype.flatten = function () {
            return this.back.concat([this.current], this.forward);
        };
        HistoryStack.prototype.toPages = function () {
            return new Pages(this.flatten(), false);
        };
        return HistoryStack;
    }());
    exports.HistoryStack = HistoryStack;
});
define("store/IState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IState = (function () {
        function IState() {
        }
        return IState;
    }());
    exports.default = IState;
});
define("store/Action", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Action = (function () {
        function Action(_a) {
            var _b = (_a === void 0 ? {} : _a).time, time = _b === void 0 ? new Date().getTime() : _b;
            this.time = time;
        }
        /**
         * Reducer for this action
         * @param state - The original state
         * @returns {IState} - The new state
         */
        Action.prototype.reduce = function (state) {
            return state;
        };
        /**
         * Runs before store()
         * Can reject or bring in other actions
         * @param state The current state
         * @returns {[Action]} - [this], replacement/additional actions to run, or []
         */
        Action.prototype.filter = function (state) {
            return [Object(this)];
        };
        /**
         * Reducer for the store, typically used for just storing this action
         * but can be overridden to do things like clear some or all of the actions
         */
        Action.prototype.store = function (actions) {
            return actions.concat([Object(this)]);
        };
        return Action;
    }());
    exports.default = Action;
});
define("store/IComputedState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("model/ComputedState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("model/IContainer", ["require", "exports", "model/IHistory"], function (require, exports, IHistory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IContainer = (function (_super) {
        __extends(IContainer, _super);
        function IContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IContainer;
    }(IHistory_1.default));
    exports.default = IContainer;
});
define("model/Container", ["require", "exports", "model/Page", "util/url", "model/Pages", "model/PageVisit", "model/VistedPage"], function (require, exports, Page_3, url_1, Pages_1, PageVisit_3, VistedPage_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = (function () {
        /**
         * Construct a new Container
         * @param time - The time this container was created
         * @param name - The container's name
         * @param enabled - Is this container enabled/visible?
         * @param initialUrl - The starting URL of this container
         * @param patterns - Patterns of URLs that this container handles
         * @param isDefault - Is this the default container?
         * @param resetOnLeave - Keep container history after navigating away?
         * @param groupName - The name of this container's group
         * @param pages - The pages visited in this container
         */
        function Container(_a) {
            var time = _a.time, name = _a.name, _b = _a.enabled, enabled = _b === void 0 ? true : _b, initialUrl = _a.initialUrl, patterns = _a.patterns, _c = _a.isDefault, isDefault = _c === void 0 ? false : _c, _d = _a.resetOnLeave, resetOnLeave = _d === void 0 ? false : _d, groupName = _a.groupName, pages = _a.pages;
            this.name = name;
            this.enabled = enabled;
            this.initialUrl = initialUrl;
            this.patterns = patterns;
            this.isDefault = isDefault;
            this.resetOnLeave = resetOnLeave;
            this.groupName = groupName;
            this.pages = pages || new Pages_1.default([
                new VistedPage_2.default({
                    url: initialUrl,
                    params: url_1.parseParamsFromPatterns(patterns, initialUrl),
                    containerName: name,
                    groupName: groupName,
                    visits: [{ time: time, type: isDefault ? PageVisit_3.VisitType.MANUAL : PageVisit_3.VisitType.AUTO }]
                })
            ]);
        }
        Container.prototype.replacePages = function (pages) {
            return new Container(__assign({}, Object(this), { pages: pages }));
        };
        Container.prototype.updatePages = function (pages) {
            return new Container(__assign({}, Object(this), { pages: this.pages.update(pages) }));
        };
        Object.defineProperty(Container.prototype, "wasManuallyVisited", {
            get: function () {
                return this.isDefault || this.activePage.wasManuallyVisited;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "isAtTopPage", {
            get: function () {
                return !this.canGoBack();
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.patternsMatch = function (url) {
            return url_1.patternsMatch(this.patterns, url);
        };
        Object.defineProperty(Container.prototype, "history", {
            get: function () {
                return this.pages.toHistoryStack();
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.push = function (page, time, type) {
            if (type === void 0) { type = PageVisit_3.VisitType.MANUAL; }
            return this.replacePages(this.pages.push(page, time, type));
        };
        Container.prototype.pushUrl = function (url, time, type) {
            if (type === void 0) { type = PageVisit_3.VisitType.MANUAL; }
            if (this.activePage.url === url) {
                return this.activate({ time: time, type: type });
            }
            else {
                var page = new Page_3.default({
                    url: url,
                    params: url_1.parseParamsFromPatterns(this.patterns, url),
                    containerName: this.name,
                    groupName: this.groupName
                });
                return this.push(page, time, type);
            }
        };
        Container.prototype.loadFromUrl = function (url, time) {
            if (this.patternsMatch(url)) {
                var container = this.isAtTopPage ?
                    this.activate({ time: time - 1, type: PageVisit_3.VisitType.MANUAL }) : this;
                return container.pushUrl(url, time, PageVisit_3.VisitType.MANUAL);
            }
            else {
                return this;
            }
        };
        Container.prototype.activate = function (visit) {
            return this.replacePages(this.pages.activate(visit));
        };
        Container.prototype.top = function (time, reset) {
            if (reset === void 0) { reset = false; }
            return this.replacePages(this.pages.top(time, reset));
        };
        Container.prototype.go = function (n, time) {
            return this.replacePages(this.pages.go(n, time));
        };
        Container.prototype.forward = function (n, time) {
            if (n === void 0) { n = 1; }
            return this.replacePages(this.pages.forward(n, time));
        };
        Container.prototype.back = function (n, time) {
            if (n === void 0) { n = 1; }
            return this.replacePages(this.pages.back(n, time));
        };
        Container.prototype.canGoForward = function (n) {
            if (n === void 0) { n = 1; }
            return this.pages.canGoForward(n);
        };
        Container.prototype.canGoBack = function (n) {
            if (n === void 0) { n = 1; }
            return this.pages.canGoBack(n);
        };
        Container.prototype.getShiftAmount = function (page) {
            return this.pages.getShiftAmount(page);
        };
        Container.prototype.shiftTo = function (page, time) {
            return this.replacePages(this.pages.shiftTo(page, time));
        };
        Container.prototype.containsPage = function (page) {
            return this.pages.containsPage(page);
        };
        Object.defineProperty(Container.prototype, "activePage", {
            get: function () {
                return this.pages.activePage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "activeUrl", {
            get: function () {
                return this.activePage.url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "backPage", {
            get: function () {
                return this.pages.backPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "forwardPage", {
            get: function () {
                return this.pages.forwardPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "backPages", {
            get: function () {
                return this.pages.backPages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "forwardPages", {
            get: function () {
                return this.pages.forwardPages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "backLength", {
            get: function () {
                return this.pages.backLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "forwardLength", {
            get: function () {
                return this.pages.forwardLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "firstManualVisit", {
            get: function () {
                return this.pages.firstManualVisit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "lastVisit", {
            get: function () {
                return this.pages.lastVisit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "isGroup", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.setEnabled = function (enabled) {
            return new Container(__assign({}, Object(this), { enabled: enabled }));
        };
        Container.prototype.computeState = function () {
            return {
                name: this.name,
                enabled: this.enabled,
                activeUrl: this.activeUrl,
                history: this.history
            };
        };
        return Container;
    }());
    exports.default = Container;
});
define("behaviors/defaultBehavior", ["require", "exports", "model/Pages"], function (require, exports, Pages_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Switch tab using mobile-app like behavior (with a default tab: A)
     */
    /**
     * Default to non-default
     */
    exports.A_to_B = function (h, A, B) { return new Pages_2.HistoryStack(__assign({}, h, { back: A.back.concat([A.current], h.back) })); };
    /**
     * Non-default to default
     */
    exports.B_to_A = function (h, A, B) { return h; };
    /**
     * Non-default to non-default
     */
    exports.B_to_C = function (h, A, B, C) { return new Pages_2.HistoryStack(__assign({}, h, { back: A.back.concat([A.current], h.back) })); };
});
define("behaviors/nonDefaultBehavior", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Switch tab with no default (all tabs are equal)
     */
    /**
     * Non-default to non-default
     */
    exports.B_to_C = function (h, A, B, C) { return h; };
});
define("behaviors/interContainerHistory", ["require", "exports", "model/Pages"], function (require, exports, Pages_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Allow inter-container history (e.g. different full window screens)
     */
    exports.D_to_E = function (h, D, E) { return new Pages_3.HistoryStack(__assign({}, h, { back: D.back.concat([D.current], h.back) })); };
    exports.E_to_D = function (h, E, D) { return new Pages_3.HistoryStack(__assign({}, h, { forward: [E.current].concat(E.forward) })); };
});
define("behaviors/keepFwdTabBehavior", ["require", "exports", "model/Pages"], function (require, exports, Pages_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * In this world, forward history is kept even if it's a different tab
     */
    exports.E_to_D = function (h, E, D) { return new Pages_4.HistoryStack(__assign({}, h, { forward: [E.current].concat(E.forward) })); };
    exports.D_to_E = function (h, D, E) { return h; };
});
define("behaviors/removeFwdTabBehavior", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Forward history is removed when switching containers
     */
    exports.E_to_D = function (h, E, D) { return h; };
});
define("util/sorter", ["require", "exports", "ramda"], function (require, exports, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var simpleSortByLastVisit = function (cs) {
        return R.sort(function (c1, c2) { return c2.lastVisit.time - c1.lastVisit.time; }, cs);
    };
    var simpleSortByFirstManualVisit = function (cs) {
        return R.sort(function (c1, c2) {
            var v1 = c1.firstManualVisit;
            var v2 = c2.firstManualVisit;
            if (v1) {
                if (v2) {
                    return v1.time - v2.time;
                }
                else {
                    return -1;
                }
            }
            else {
                if (v1) {
                    return 1;
                }
                else {
                    return -1; // 0
                }
            }
        }, cs);
    };
    var _sort = function (cs, fn) {
        var visited = cs.filter(function (c) { return c.wasManuallyVisited; });
        var unvisited = cs.filter(function (c) { return !c.wasManuallyVisited; });
        var defaultUnvisited = unvisited.filter(function (c) { return c.isDefault; });
        var nonDefaultUnvisited = unvisited.filter(function (c) { return !c.isDefault; });
        return fn({ visited: visited, defaultUnvisited: defaultUnvisited, nonDefaultUnvisited: nonDefaultUnvisited });
    };
    var sort = function (cs, fn) {
        var enabled = cs.filter(function (c) { return c.enabled; });
        var disabled = cs.filter(function (c) { return !c.enabled; });
        return _sort(enabled, fn).concat(_sort(disabled, fn) // followed by all disabled
        );
    };
    exports.sortContainersByLastVisited = function (cs) {
        return sort(cs, function (_a) {
            var visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
            return simpleSortByLastVisit(visited).concat(defaultUnvisited, nonDefaultUnvisited);
        });
    };
    exports.sortContainersByFirstVisited = function (cs) {
        return sort(cs, function (_a) {
            var visited = _a.visited, defaultUnvisited = _a.defaultUnvisited, nonDefaultUnvisited = _a.nonDefaultUnvisited;
            return simpleSortByFirstManualVisit(visited).concat(defaultUnvisited);
        });
    };
});
define("model/Group", ["require", "exports", "ramda", "behaviors/defaultBehavior", "behaviors/nonDefaultBehavior", "behaviors/interContainerHistory", "behaviors/keepFwdTabBehavior", "behaviors/removeFwdTabBehavior", "model/Container", "model/Pages", "model/PageVisit", "util/sorter", "immutable"], function (require, exports, R, defaultBehavior, nonDefaultBehavior, interContainerHistory, keepFwdTabBehavior, removeFwdTabBehavior, Container_1, Pages_5, PageVisit_4, sorter_1, immutable_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Group = (function () {
        function Group(_a) {
            var name = _a.name, _b = _a.enabled, enabled = _b === void 0 ? true : _b, _c = _a.containers, containers = _c === void 0 ? immutable_2.fromJS({}) : _c, _d = _a.allowInterContainerHistory, allowInterContainerHistory = _d === void 0 ? false : _d, _e = _a.resetOnLeave, resetOnLeave = _e === void 0 ? false : _e, _f = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _f === void 0 ? false : _f, _g = _a.parentGroupName, parentGroupName = _g === void 0 ? '' : _g, _h = _a.isDefault, isDefault = _h === void 0 ? false : _h;
            this.name = name;
            this.enabled = enabled;
            this.containers = containers;
            this.allowInterContainerHistory = allowInterContainerHistory;
            this.resetOnLeave = resetOnLeave;
            this.gotoTopOnSelectActive = gotoTopOnSelectActive;
            this.parentGroupName = parentGroupName;
            this.isDefault = isDefault;
        }
        Group.prototype.replaceContainer = function (container) {
            var groupName = container.groupName;
            if (groupName === this.name) {
                return new Group(__assign({}, Object(this), { containers: this.containers.set(container.name, container) }));
            }
            else {
                var group = this.getNestedGroupByName(groupName);
                if (!group) {
                    throw new Error('Group \'' + groupName + '\' not found in ' + this.name);
                }
                var newGroup = group.replaceContainer(container);
                return this.replaceContainer(newGroup);
            }
        };
        Group.prototype.updatePages = function (pages) {
            return new Group(__assign({}, Object(this), { containers: this.containers.map(function (c) { return c.updatePages(pages); }) }));
        };
        Group.getContainerHistory = function (c, keepFwd) {
            return c instanceof Group ? c.getHistory(keepFwd) : c.history;
        };
        Group.computeDefault = function (h, defaulT, from, to, keepFwd) {
            var fromHistory = Group.getContainerHistory(from, keepFwd);
            var toHistory = Group.getContainerHistory(to, keepFwd);
            if (defaulT) {
                if (from.isDefault) {
                    return defaultBehavior.A_to_B(h, fromHistory, toHistory);
                }
                else {
                    if (to.isDefault) {
                        return defaultBehavior.B_to_A(h, fromHistory, toHistory);
                    }
                    else {
                        var defaultHistory = Group.getContainerHistory(defaulT, keepFwd);
                        return defaultBehavior.B_to_C(h, defaultHistory, fromHistory, toHistory);
                    }
                }
            }
            else {
                return nonDefaultBehavior.B_to_C(h, null, fromHistory, toHistory);
            }
        };
        Group.prototype.computeInterContainer = function (from, to, keepFwd) {
            var toHistory = Group.getContainerHistory(to, keepFwd);
            if (!from.isDefault && !to.isDefault && this.allowInterContainerHistory) {
                var fromHistory = Group.getContainerHistory(from, keepFwd);
                var sorted = sorter_1.sortContainersByFirstVisited([from, to]);
                if (sorted[0] === from) {
                    return interContainerHistory.D_to_E(toHistory, fromHistory, toHistory);
                }
                else {
                    return interContainerHistory.E_to_D(toHistory, fromHistory, toHistory);
                }
            }
            else {
                return toHistory;
            }
        };
        Group.computeFwd = function (h, keepFwd, from, to) {
            var fromHistory = Group.getContainerHistory(from, keepFwd);
            var toHistory = Group.getContainerHistory(to, keepFwd);
            if (keepFwd && from.wasManuallyVisited) {
                var sorted = sorter_1.sortContainersByFirstVisited([from, to]);
                if (sorted[0] === from) {
                    return keepFwdTabBehavior.D_to_E(h, fromHistory, toHistory);
                }
                else {
                    return keepFwdTabBehavior.E_to_D(h, fromHistory, toHistory);
                }
            }
            else {
                return removeFwdTabBehavior.E_to_D(h, fromHistory, toHistory);
            }
        };
        Group.prototype.computeHistory = function (from, to, keepFwd) {
            var defaulT = this.defaultContainer;
            var h1 = this.computeInterContainer(from, to, keepFwd);
            var h2 = Group.computeDefault(h1, defaulT, from, to, keepFwd);
            return Group.computeFwd(h2, keepFwd, from, to);
        };
        Group.getSingleHistory = function (container, keepFwd) {
            if (container instanceof Group) {
                return container.getHistory(keepFwd);
            }
            else {
                return container.history;
            }
        };
        Group.prototype.getHistory = function (keepFwd) {
            if (keepFwd === void 0) { keepFwd = false; }
            var containers = this.containerStackOrder.filter(function (c) { return c.wasManuallyVisited; });
            switch (containers.length) {
                case 0: return Group.getSingleHistory(this.activeContainer, keepFwd);
                case 1: return Group.getSingleHistory(containers[0], keepFwd);
                default: {
                    var from = containers[1];
                    var to = containers[0];
                    return this.computeHistory(from, to, keepFwd);
                }
            }
        };
        Group.prototype.activateContainer = function (containerName, time) {
            var visit = { time: time, type: PageVisit_4.VisitType.MANUAL };
            var from = this.activeContainer;
            var to = this.getContainerByName(containerName);
            if (from === to) {
                return this.replaceContainer(to.activate(visit));
            }
            else {
                var group = from.resetOnLeave && from.name !== to.name ?
                    this.replaceContainer(from.top(time, true)) : this;
                return group.replaceContainer(to.activate(__assign({}, visit, { time: visit.time + 1 })));
            }
        };
        Object.defineProperty(Group.prototype, "containerStackOrder", {
            get: function () {
                return sorter_1.sortContainersByLastVisited(this.containers.toArray());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "history", {
            get: function () {
                return this.getHistory();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "historyWithFwdMaintained", {
            get: function () {
                return this.getHistory(true);
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.loadFromUrl = function (url, time) {
            return new Group(__assign({}, Object(this), { containers: this.containers.map(function (c) { return c.loadFromUrl(url, time); }) }));
        };
        Group.prototype.patternsMatch = function (url) {
            return R.any(function (c) { return c.patternsMatch(url); }, this.containers.toArray());
        };
        Group.prototype.activate = function (visit) {
            var container = this.activeContainer.activate(visit);
            return this.replaceContainer(container);
        };
        Group.prototype.getContainerIndex = function (container) {
            return R.findIndex(function (c) { return c === container; }, this.containers.toArray());
        };
        Object.defineProperty(Group.prototype, "activeContainer", {
            get: function () {
                return this.containerStackOrder[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "activeContainerIndex", {
            get: function () {
                if (this.containers.size === 0) {
                    return 0;
                }
                else {
                    return this.getContainerIndex(this.containerStackOrder[0]);
                }
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.isContainerActiveAndEnabled = function (containerName) {
            if (this.containers.size === 0) {
                return false;
            }
            else {
                var c = this.activeContainer;
                return c.name === containerName && c.enabled;
            }
        };
        Group.prototype.isNestedGroupActive = function (groupName) {
            var activeContainer = this.activeContainer;
            if (activeContainer instanceof Group) {
                if (activeContainer.name === groupName) {
                    return true;
                }
                else if (activeContainer.hasNestedGroupWithName(groupName)) {
                    return activeContainer.isNestedGroupActive(groupName);
                }
            }
            return false;
        };
        Object.defineProperty(Group.prototype, "activeNestedContainer", {
            get: function () {
                var activeContainer = this.activeContainer;
                if (activeContainer instanceof Container_1.default) {
                    return activeContainer;
                }
                else if (activeContainer instanceof Group) {
                    return activeContainer.activeNestedContainer;
                }
                else {
                    throw new Error('activeContainer should be a Container or Group');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "defaultContainer", {
            get: function () {
                return R.find(function (c) { return c.isDefault; }, this.containers.toArray());
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.getActivePageInContainer = function (containerName) {
            return this.getContainerByName(containerName).activePage;
        };
        Object.defineProperty(Group.prototype, "activePage", {
            get: function () {
                return this.activeContainer.activePage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "activeUrl", {
            get: function () {
                return this.activeContainer.activeUrl;
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.getActiveUrlInContainer = function (containerName) {
            return this.getActivePageInContainer(containerName).url;
        };
        Group.prototype.top = function (time, reset) {
            if (reset === void 0) { reset = false; }
            var container = this.activeContainer.top(time, reset);
            return this.replaceContainer(container);
        };
        Group.prototype.push = function (page, time, type) {
            if (type === void 0) { type = PageVisit_4.VisitType.MANUAL; }
            var groupName = page.groupName, containerName = page.containerName;
            if (groupName === this.name) {
                var container = this.getContainerByName(containerName);
                var newContainer = container.push(page, time, type);
                return this.replaceContainer(newContainer);
            }
            else {
                var group = this.getNestedGroupByName(groupName);
                if (!group) {
                    throw new Error('Group \'' + groupName + '\' not found in ' + this.name);
                }
                var container = group.push(page, time, type);
                return this.replaceContainer(container);
            }
        };
        Object.defineProperty(Group.prototype, "activeContainerName", {
            get: function () {
                return this.activeContainer.name;
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.getShiftAmount = function (page) {
            return this.activeContainer.getShiftAmount(page);
        };
        Group.prototype.containsPage = function (page) {
            return this.activeContainer.containsPage(page);
        };
        /*
        private _go(goFn:GoFn, canGoFn:CanGoFn, n:number, time:number):Group {
          if (n === 0) {
            return this.activate(time)
          }
          const next = (g:Group):Group => g._go(goFn, canGoFn, n - 1, time)
          const container:IContainer = this.activeContainer
          if (canGoFn(container)) {
            return next(this.replaceContainer(goFn(container).activate(time)))
          }
          else {
            if (canGoFn(this)) {
              return this.replacePages(goFn(this.pages))
            }
            else {
              throw new Error('Cannot go ' + n + ' in that direction')
            }
          }
        }
        */
        Group.prototype._go = function (goFn, lengthFn, nextPageFn, n, time) {
            if (n === 0) {
                return this.activate({ time: time, type: PageVisit_4.VisitType.MANUAL });
            }
            var container = this.activeContainer;
            var containerLength = lengthFn(container);
            var amount = Math.min(n, containerLength);
            var group = this.replaceContainer(goFn(container, amount, time));
            var remainder = n - amount;
            if (remainder > 0) {
                if (lengthFn(group) >= remainder) {
                    var nextContainer = nextPageFn(group).containerName;
                    var newGroup = group.activateContainer(nextContainer, time + 1);
                    if (remainder > 1) {
                        return this._go(goFn, lengthFn, nextPageFn, remainder - 1, time + 2);
                    }
                    else {
                        return newGroup;
                    }
                }
                else {
                    throw new Error('Cannot go ' + n + ' in that direction');
                }
            }
            else {
                return group;
            }
        };
        Group.prototype.forward = function (n, time) {
            if (n === void 0) { n = 1; }
            return this._go(function (c, n, t) { return c.forward(n, t); }, function (c) { return c.forwardLength; }, function (c) { return c.forwardPage; }, n, time);
        };
        Group.prototype.back = function (n, time) {
            if (n === void 0) { n = 1; }
            return this._go(function (c, n, t) { return c.back(n, t); }, function (c) { return c.backLength; }, function (c) { return c.backPage; }, n, time);
        };
        Group.prototype.go = function (n, time) {
            return n > 0 ? this.forward(n, time) : this.back(0 - n, time);
        };
        Object.defineProperty(Group.prototype, "backPage", {
            get: function () {
                return R.last(this.backPages);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "forwardPage", {
            get: function () {
                return this.forwardPages[0];
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.canGoBack = function (n) {
            if (n === void 0) { n = 1; }
            return this.pages.canGoBack(n);
        };
        Group.prototype.canGoForward = function (n) {
            if (n === void 0) { n = 1; }
            return this.pages.canGoForward(n);
        };
        Group.prototype.shiftTo = function (page, time) {
            return this.go(this.getShiftAmount(page), time);
        };
        Object.defineProperty(Group.prototype, "subGroups", {
            get: function () {
                return this.containers.filter(function (c) { return c instanceof Group; });
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.computeSubGroups = function () {
            return immutable_2.fromJS(this.subGroups.map(function (g) { return g.computeState(); }));
        };
        Object.defineProperty(Group.prototype, "wasManuallyVisited", {
            get: function () {
                var c = this.activeContainer;
                return c ? c.wasManuallyVisited : false;
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.getNestedContainerByName = function (name) {
            var foundContainer = null;
            this.containers.forEach(function (container) {
                if (container.name === name) {
                    foundContainer = container;
                    return;
                }
                else if (container instanceof Group) {
                    var c = container.getNestedGroupByName(name);
                    if (c) {
                        foundContainer = c;
                        return;
                    }
                }
            });
            return foundContainer;
        };
        Group.prototype.getNestedGroupByName = function (name) {
            var container = this.getNestedContainerByName(name);
            if (container && !(container instanceof Group)) {
                throw new Error("Found " + name + " but it's not a Group");
            }
            return container;
        };
        Group.prototype.hasNestedGroupWithName = function (name) {
            return !!this.getNestedGroupByName(name);
        };
        Group.prototype.hasNestedGroup = function (group) {
            return this.hasNestedGroupWithName(group.name);
        };
        Group.prototype.getContainerByName = function (name) {
            var c = this.containers.get(name);
            if (!c) {
                throw new Error("Container '" + name + "' not found in '" + this.name + "'");
            }
            else {
                return c;
            }
        };
        Group.prototype.hasContainerWithName = function (name) {
            return this.containers.has(name);
        };
        Group.prototype.hasNestedContainerWithName = function (name) {
            return !!this.getNestedContainerByName(name);
        };
        Group.prototype.hasNestedContainer = function (container) {
            return this.hasNestedContainerWithName(container.name);
        };
        Group.prototype.hasContainer = function (container) {
            return this.hasContainerWithName(container.name);
        };
        Object.defineProperty(Group.prototype, "hasEnabledContainers", {
            get: function () {
                return this.containers.some(function (c) { return c.enabled; });
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.getSubGroupHavingContainer = function (container) {
            return R.find(function (g) { return g.hasNestedContainer(container); }, this.subGroups.toArray());
        };
        Group.prototype.getSubGroupHavingContainerWithName = function (name) {
            return R.find(function (g) { return g.hasNestedContainerWithName(name); }, this.subGroups.toArray());
        };
        Object.defineProperty(Group.prototype, "isInitialized", {
            get: function () {
                return this.containers.size > 0 &&
                    R.all(function (g) { return g.isInitialized; }, this.subGroups.toArray());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "initialUrl", {
            get: function () {
                var defaultContainer = this.defaultContainer;
                if (defaultContainer) {
                    return defaultContainer.initialUrl;
                }
                else {
                    return this.containers.first().initialUrl;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "groupName", {
            get: function () {
                return this.parentGroupName;
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.getContainerLinkUrl = function (containerName) {
            var activeContainer = this.activeContainer;
            var isActive = activeContainer && activeContainer.name === containerName;
            if (isActive && this.gotoTopOnSelectActive) {
                return activeContainer.initialUrl;
            }
            else {
                return this.getActiveUrlInContainer(containerName);
            }
        };
        Object.defineProperty(Group.prototype, "isAtTopPage", {
            get: function () {
                return this.activeContainer.isAtTopPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "patterns", {
            get: function () {
                return R.flatten(this.containers.toArray().map(function (c) { return c.patterns; }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "pages", {
            get: function () {
                return new Pages_5.default(this.history.flatten(), false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "firstManualVisit", {
            get: function () {
                return this.pages.firstManualVisit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "lastVisit", {
            get: function () {
                return this.pages.lastVisit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "backPages", {
            get: function () {
                return this.containers.isEmpty() ? [] : this.history.back;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "forwardPages", {
            get: function () {
                return this.containers.isEmpty() ? [] : this.history.forward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "backLength", {
            get: function () {
                return this.containers.isEmpty() ? 0 : this.history.back.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "forwardLength", {
            get: function () {
                return this.containers.isEmpty() ? 0 : this.history.forward.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "isGroup", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Group.prototype.setEnabled = function (enabled) {
            return new Group(__assign({}, Object(this), { enabled: enabled }));
        };
        Group.prototype.computeState = function () {
            if (this.containers.isEmpty()) {
                throw new Error("Group '" + this.name + "' has no containers");
            }
            return {
                name: this.name,
                enabled: this.enabled,
                isTopLevel: !this.parentGroupName,
                containers: immutable_2.fromJS(this.containers.map(function (c) { return c.computeState(); })),
                stackOrder: this.containerStackOrder.map(function (c) { return c.computeState(); }),
                activeContainerIndex: this.activeContainerIndex,
                activeContainerName: this.activeContainerName,
                activeUrl: this.activeUrl,
                backPage: this.backPage,
                history: this.history
            };
        };
        return Group;
    }());
    exports.default = Group;
});
define("model/ISubGroup", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("model/PathTitle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("model/HistoryWindow", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HistoryWindow = (function () {
        function HistoryWindow(_a) {
            var forName = _a.forName;
            this.forName = forName;
        }
        return HistoryWindow;
    }());
    exports.default = HistoryWindow;
});
define("model/State", ["require", "exports", "model/Container", "ramda", "model/Group", "model/VistedPage", "model/PageVisit", "immutable", "model/HistoryWindow"], function (require, exports, Container_2, R, Group_1, VistedPage_3, PageVisit_5, immutable_3, HistoryWindow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var State = (function () {
        function State(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.groups, groups = _c === void 0 ? immutable_3.fromJS({}) : _c, _d = _b.windows, windows = _d === void 0 ? immutable_3.fromJS({}) : _d, zeroPage = _b.zeroPage, _e = _b.lastUpdate, lastUpdate = _e === void 0 ? 0 : _e, _f = _b.loadedFromRefresh, loadedFromRefresh = _f === void 0 ? false : _f, _g = _b.isOnZeroPage, isOnZeroPage = _g === void 0 ? false : _g, _h = _b.titles, titles = _h === void 0 ? [] : _h;
            this.groups = groups;
            this.windows = windows;
            this.zeroPage = zeroPage;
            this.lastUpdate = lastUpdate;
            this.loadedFromRefresh = loadedFromRefresh;
            this.isOnZeroPage = isOnZeroPage;
            this.titles = titles;
        }
        Object.defineProperty(State.prototype, "allComputedGroups", {
            get: function () {
                return (_a = immutable_3.fromJS({})).merge.apply(_a, [this.groups.map(function (g) { return g.computeState(); })].concat(this.groups.toArray().map(function (g) { return g.computeSubGroups(); })));
                var _a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(State.prototype, "computedWindows", {
            get: function () {
                var _this = this;
                return immutable_3.fromJS(this.windows.map(function (w) { return (__assign({}, w, { visible: _this.getContainerByName(w.forName).enabled })); }));
            },
            enumerable: true,
            configurable: true
        });
        State.prototype.computeState = function () {
            return {
                isInitialized: this.isInitialized,
                loadedFromRefresh: this.loadedFromRefresh,
                activeUrl: this.activeUrl,
                groups: this.allComputedGroups,
                windows: this.computedWindows,
                activeGroupName: this.activeGroupName,
                lastUpdate: this.lastUpdate,
                pages: this.pages,
                activeTitle: this.activeTitle
            };
        };
        State.prototype.replaceGroup = function (group) {
            if (group.parentGroupName) {
                var parentGroup = this.getGroupByName(group.parentGroupName);
                return this.replaceGroup(parentGroup.replaceContainer(group));
            }
            else {
                return this.assign({
                    groups: this.groups.set(group.name, group)
                });
            }
        };
        State.prototype.replaceWindow = function (w) {
            return this.assign({
                windows: this.windows.set(w.forName, w)
            });
        };
        State.prototype.disallowDuplicateContainerOrGroup = function (name) {
            if (this.hasGroupOrContainerWithName(name)) {
                throw new Error("A group or container with name: '" + name + "' already exists");
            }
        };
        State.prototype.addTopLevelGroup = function (_a) {
            var name = _a.name, _b = _a.resetOnLeave, resetOnLeave = _b === void 0 ? false : _b, _c = _a.allowInterContainerHistory, allowInterContainerHistory = _c === void 0 ? false : _c, _d = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _d === void 0 ? false : _d;
            this.disallowDuplicateContainerOrGroup(name);
            var group = new Group_1.default({
                name: name,
                resetOnLeave: resetOnLeave,
                gotoTopOnSelectActive: gotoTopOnSelectActive,
                allowInterContainerHistory: allowInterContainerHistory,
                parentGroupName: '',
                isDefault: false
            });
            return this.replaceGroup(group);
        };
        State.prototype.addSubGroup = function (_a) {
            var name = _a.name, parentGroupName = _a.parentGroupName, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.allowInterContainerHistory, allowInterContainerHistory = _c === void 0 ? false : _c, _d = _a.resetOnLeave, resetOnLeave = _d === void 0 ? false : _d, _e = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _e === void 0 ? false : _e;
            this.disallowDuplicateContainerOrGroup(name);
            var group = new Group_1.default({
                name: name,
                resetOnLeave: resetOnLeave,
                gotoTopOnSelectActive: gotoTopOnSelectActive,
                allowInterContainerHistory: allowInterContainerHistory,
                parentGroupName: parentGroupName,
                isDefault: isDefault
            });
            return this.replaceGroup(group);
        };
        State.prototype.addContainer = function (_a) {
            var time = _a.time, name = _a.name, groupName = _a.groupName, initialUrl = _a.initialUrl, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, patterns = _a.patterns;
            this.disallowDuplicateContainerOrGroup(name);
            var group = this.getGroupByName(groupName);
            var container = new Container_2.default({
                time: time,
                initialUrl: initialUrl,
                patterns: patterns,
                resetOnLeave: resetOnLeave,
                groupName: groupName,
                name: name,
                isDefault: isDefault
            });
            return this.replaceGroup(group.replaceContainer(container));
        };
        State.prototype.setWindowVisibility = function (_a) {
            var forName = _a.forName, _b = _a.visible, visible = _b === void 0 ? true : _b;
            var container = this.getContainerByName(forName);
            var group = this.getGroupByName(container.groupName);
            return this.replaceGroup(group.replaceContainer(container.setEnabled(visible)));
        };
        State.prototype.addWindow = function (_a) {
            var forName = _a.forName, _b = _a.visible, visible = _b === void 0 ? true : _b;
            var w = new HistoryWindow_1.default({ forName: forName });
            return this.replaceWindow(w).setWindowVisibility({ forName: forName, visible: visible });
        };
        /**
         * Finds a group (top-level or subgroup) by its name
         */
        State.prototype.getGroupByName = function (name) {
            var g = this.groups.get(name);
            if (g) {
                return g;
            }
            else {
                var foundGroup_1 = null;
                this.groups.forEach(function (group) {
                    var g = group.getNestedGroupByName(name);
                    if (g) {
                        foundGroup_1 = g;
                        return;
                    }
                });
                if (foundGroup_1) {
                    return foundGroup_1;
                }
                else {
                    throw new Error('Group \'' + name + '\' not found');
                }
            }
        };
        State.prototype.getContainerByName = function (name) {
            var foundContainer = null;
            this.groups.forEach(function (group) {
                var c = group.getNestedContainerByName(name);
                if (c) {
                    foundContainer = c;
                    return;
                }
            });
            if (foundContainer) {
                return foundContainer;
            }
            else {
                throw new Error('Container \'' + name + '\' not found');
            }
        };
        Object.defineProperty(State.prototype, "history", {
            get: function () {
                return this.getHistory(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(State.prototype, "historyWithFwdMaintained", {
            get: function () {
                return this.getHistory(true);
            },
            enumerable: true,
            configurable: true
        });
        State.prototype.hasGroupWithName = function (name) {
            try {
                this.getGroupByName(name);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        State.prototype.hasContainerWithName = function (name) {
            try {
                this.getContainerByName(name);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        State.prototype.hasGroupOrContainerWithName = function (name) {
            return this.hasGroupWithName(name) || this.hasContainerWithName(name);
        };
        State.prototype.addTitle = function (_a) {
            var pathname = _a.pathname, title = _a.title;
            var existingTitle = this.getTitleForPath(pathname);
            return existingTitle ? this :
                this.assign({ titles: this.titles.concat([{ pathname: pathname, title: title }]) });
        };
        State.prototype.getTitleForPath = function (pathname) {
            var found = R.find(function (t) { return t.pathname === pathname; }, this.titles);
            return found ? found.title : null;
        };
        State.prototype.hasTitleForPath = function (pathname) {
            return !!this.getTitleForPath(pathname);
        };
        Object.defineProperty(State.prototype, "activeTitle", {
            get: function () {
                return this.getTitleForPath(this.activeUrl);
            },
            enumerable: true,
            configurable: true
        });
        State.createZeroPage = function (url) {
            return new VistedPage_3.default({
                url: url,
                params: {},
                groupName: '',
                containerName: '',
                isZeroPage: true,
                visits: [{ time: -1, type: PageVisit_5.VisitType.AUTO }]
            });
        };
        /**
         * Gets the zero page, or if it's not set defaults to using
         * the initialUrl of the first container in the first group
         */
        State.prototype.getZeroPage = function () {
            return State.createZeroPage(this.zeroPage || this.groups.first().containers.first().initialUrl);
        };
        return State;
    }());
    exports.default = State;
});
define("model/Step", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("util/browserFunctions", ["require", "exports", "fbjs/lib/ExecutionEnvironment", "history/createBrowserHistory", "history/createMemoryHistory", "bowser"], function (require, exports, ExecutionEnvironment_1, createBrowserHistory_1, createMemoryHistory_1, bowser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.canUseWindowLocation = ExecutionEnvironment_1.canUseDOM &&
        typeof window.location === 'object';
    exports.needsPopstateConfirmation = exports.canUseWindowLocation &&
        !bowser.gecko &&
        !bowser.msedge &&
        !bowser.msie;
    exports.wasLoadedFromRefresh = exports.canUseWindowLocation &&
        window.performance &&
        window.performance.navigation.type === 1;
    exports._history = exports.canUseWindowLocation ?
        createBrowserHistory_1.default() :
        createMemoryHistory_1.default();
    exports._resetHistory = function () {
        if (exports.canUseWindowLocation) {
            throw new Error('This is only for tests');
        }
        else {
            exports._history = createMemoryHistory_1.default();
        }
    };
    exports.push = function (page) { return exports._history.push(page.url, page.state); };
    exports.replace = function (page) { return exports._history.replace(page.url, page.state); };
    exports.go = function (n) { return exports._history.go(n); };
    exports.back = function (n) {
        if (n === void 0) { n = 1; }
        return exports.go(0 - n);
    };
    exports.forward = function (n) {
        if (n === void 0) { n = 1; }
        return exports.go(n);
    };
    //export const setHistory = (h:History) => _history = h
    exports.listen = function (fn) { return exports._history.listen(fn); };
    exports.listenPromise = function () { return new Promise(function (resolve) {
        var unListen = exports._history.listen(function (location) {
            unListen();
            return resolve(location);
        });
    }); };
});
define("model/steps/BackStep", ["require", "exports", "util/browserFunctions"], function (require, exports, browser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BackStep = (function () {
        function BackStep(n) {
            if (n === void 0) { n = 1; }
            this.needsPopListener = true;
            this.n = n;
        }
        BackStep.prototype.run = function () {
            browser.back(this.n);
        };
        return BackStep;
    }());
    exports.default = BackStep;
});
define("model/steps/PushStep", ["require", "exports", "util/browserFunctions"], function (require, exports, browser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PushStep = (function () {
        function PushStep(page) {
            this.needsPopListener = false;
            this.page = page;
        }
        PushStep.prototype.run = function () {
            browser.push(this.page);
        };
        return PushStep;
    }());
    exports.default = PushStep;
});
define("model/steps/ReplaceStep", ["require", "exports", "util/browserFunctions"], function (require, exports, browser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReplaceStep = (function () {
        function ReplaceStep(page) {
            this.needsPopListener = false;
            this.page = page;
        }
        ReplaceStep.prototype.run = function () {
            browser.replace(this.page);
        };
        return ReplaceStep;
    }());
    exports.default = ReplaceStep;
});
define("model/UninitializedState", ["require", "exports", "model/State", "model/Pages"], function (require, exports, State_1, Pages_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UNINITIALIZED_MESSAGE = 'State is uninitialized';
    var UninitializedState = (function (_super) {
        __extends(UninitializedState, _super);
        function UninitializedState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(UninitializedState.prototype, "pages", {
            get: function () {
                return new Pages_6.default();
            },
            enumerable: true,
            configurable: true
        });
        UninitializedState.prototype.assign = function (obj) {
            return new UninitializedState(__assign({}, Object(this), obj));
        };
        Object.defineProperty(UninitializedState.prototype, "isInitialized", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        UninitializedState.prototype.switchToGroup = function (_a) {
            var groupName = _a.groupName, time = _a.time;
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.switchToContainer = function (_a) {
            var groupName = _a.groupName, name = _a.name, time = _a.time;
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.openWindow = function (forName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.closeWindow = function (forName, time) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.go = function (n, time) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.back = function (n, time) {
            if (n === void 0) { n = 1; }
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.forward = function (n, time) {
            if (n === void 0) { n = 1; }
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.canGoBack = function (n) {
            if (n === void 0) { n = 1; }
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.canGoForward = function (n) {
            if (n === void 0) { n = 1; }
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.isContainerAtTopPage = function (groupName, containerName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.top = function (_a) {
            var groupName = _a.groupName, time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getShiftAmount = function (page) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.containsPage = function (page) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getRootGroupOfGroupByName = function (name) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getRootGroupOfGroup = function (group) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.push = function (page, time) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getHistory = function (maintainFwd) {
            if (maintainFwd === void 0) { maintainFwd = false; }
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        Object.defineProperty(UninitializedState.prototype, "groupStackOrder", {
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });
        UninitializedState.prototype.getBackPageInGroup = function (groupName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getActiveContainerNameInGroup = function (groupName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getActiveContainerIndexInGroup = function (groupName) {
            return 0;
        };
        UninitializedState.prototype.getActivePageInGroup = function (groupName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getActiveUrlInGroup = function (groupName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.urlMatchesGroup = function (url, groupName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.isGroupActive = function (groupName) {
            return false;
        };
        Object.defineProperty(UninitializedState.prototype, "activePage", {
            get: function () {
                throw new Error(UNINITIALIZED_MESSAGE);
            },
            enumerable: true,
            configurable: true
        });
        UninitializedState.prototype.isContainerActiveAndEnabled = function (groupName, containerName) {
            return false;
        };
        Object.defineProperty(UninitializedState.prototype, "activeUrl", {
            get: function () {
                return '';
            },
            enumerable: true,
            configurable: true
        });
        UninitializedState.prototype.getActivePageInContainer = function (groupName, containerName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getActiveUrlInContainer = function (groupName, containerName) {
            return '';
        };
        Object.defineProperty(UninitializedState.prototype, "activeGroup", {
            get: function () {
                throw new Error(UNINITIALIZED_MESSAGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UninitializedState.prototype, "activeGroupName", {
            get: function () {
                throw new Error(UNINITIALIZED_MESSAGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UninitializedState.prototype, "activeContainer", {
            get: function () {
                throw new Error(UNINITIALIZED_MESSAGE);
            },
            enumerable: true,
            configurable: true
        });
        UninitializedState.prototype.getContainer = function (groupName, containerName) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.getContainerNameByIndex = function (groupName, index) {
            throw new Error(UNINITIALIZED_MESSAGE);
        };
        UninitializedState.prototype.isActiveContainer = function (groupName, containerName) {
            return false;
        };
        UninitializedState.prototype.getContainerStackOrderForGroup = function (groupName) {
            return [];
        };
        return UninitializedState;
    }(State_1.default));
    exports.default = UninitializedState;
});
define("store/ISerialized", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("store/serializer", ["require", "exports", "ramda", "store/serializables"], function (require, exports, R, serializables_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @param classObject - An object of a class with a @Serializable decorator
     * @returns a plain object containing all the original object data plus a type
     */
    function serialize(classObject) {
        var obj = {};
        var keys = Object.keys(classObject);
        keys.forEach(function (key) {
            var value = classObject[key];
            if (value != null) {
                // recursively serialize children from @Serializable classes
                obj[key] = isSerializable(value) ? serialize(value) : value;
            }
        });
        return __assign({ type: classObject.constructor.name }, obj);
    }
    exports.serialize = serialize;
    /**
     * @param obj - A plain object with a type attribute
     * @returns an object of the original @Serializable class
     */
    function deserialize(obj) {
        var ser = serializables_2.default.get(obj.type);
        if (!ser) {
            console.log(serializables_2.default);
            throw new Error(obj.type + ' not found in serializables');
        }
        var constructor = ser.bind(ser);
        var data = R.omit(['type'], obj);
        var keys = Object.keys(data);
        var classObject;
        try {
            classObject = new constructor(); // For primative args
        }
        catch (TypeError) {
            try {
                classObject = new constructor({}); // For object args
            }
            catch (TypeError) {
                classObject = new constructor(data); // For nested serialized object args
            }
        }
        keys.forEach(function (key) {
            var value = data[key];
            // recursively deserialize children from @Serializable classes
            classObject[key] = isSerialized(value) ? deserialize(value) : value;
        });
        return classObject;
    }
    exports.deserialize = deserialize;
    function isSerialized(obj) {
        return obj && !!obj.type && serializables_2.default.has(obj.type);
    }
    exports.isSerialized = isSerialized;
    function isSerializable(obj) {
        return obj && !!obj.constructor.name && serializables_2.default.has(obj.constructor.name);
    }
    exports.isSerializable = isSerializable;
});
define("store/actions/ClearActions", ["require", "exports", "store/Action"], function (require, exports, Action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Only for testing purposes
     */
    var ClearActions = (function (_super) {
        __extends(ClearActions, _super);
        function ClearActions(_a) {
            var time = (_a === void 0 ? {} : _a).time;
            var _this = _super.call(this, { time: time }) || this;
            _this.type = ClearActions.type;
            return _this;
        }
        ClearActions.prototype.store = function (actions) {
            return [];
        };
        return ClearActions;
    }(Action_1.default));
    ClearActions.type = 'ClearActions';
    exports.default = ClearActions;
});
define("store/store", ["require", "exports", "store/serializer", "ramda", "store", "store/actions/ClearActions"], function (require, exports, serializer_1, R, store, ClearActions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function deriveState(actions, state) {
        return actions.reduce(function (s, a) { return a.reduce(s); }, state);
    }
    exports.deriveState = deriveState;
    function createStore(_a) {
        var _b = _a.loadFromPersist, loadFromPersist = _b === void 0 ? false : _b, initialState = _a.initialState;
        var actions = [];
        var storedRawState = initialState;
        var storedComputedState = { actions: [] };
        var timeStored = 0;
        var listeners = [];
        function loadActions() {
            if (store.enabled) {
                var objects = store.get('actions');
                if (objects) {
                    actions = objects.map(function (obj) { return serializer_1.deserialize(obj); });
                }
            }
        }
        function init() {
            if (loadFromPersist) {
                loadActions();
            }
            else {
                clearActions();
            }
        }
        function _dispatch(action) {
            actions = action.store(actions);
            if (action instanceof ClearActions_1.default) {
                timeStored = 0;
                storedRawState = initialState;
            }
            else {
                recomputeState();
                if (storedRawState.isInitialized) {
                    updateListeners();
                }
            }
            if (store.enabled) {
                store.set('actions', actions.map(function (a) { return serializer_1.serialize(a); }));
            }
        }
        function dispatch(action) {
            var state = getRawState();
            var as = action.filter(state);
            as.forEach(function (a) { return (a === action ? _dispatch : dispatch)(a); });
        }
        /**
         * Derives the state from the list of actions
         * Caches the last derived state for performance
         */
        function getRawState() {
            if (actions.length === 0) {
                return initialState;
            }
            else {
                var lastTime = R.last(actions).time;
                var prevTime = actions.length > 1 ?
                    R.takeLast(2, actions)[0].time : lastTime;
                if (lastTime === prevTime && prevTime === timeStored) {
                    storedRawState = deriveState(actions, initialState); // Just derive all
                }
                else {
                    var newActions = actions.filter(function (a) { return a.time > timeStored; });
                    storedRawState = deriveState(newActions, storedRawState);
                    timeStored = lastTime;
                }
            }
            return storedRawState;
        }
        function recomputeState() {
            var rawState = getRawState();
            if (rawState.isInitialized) {
                storedComputedState = rawState.computeState();
            }
        }
        function getState() {
            return __assign({}, Object(storedComputedState), { isInitialized: storedRawState.isInitialized, actions: actions });
        }
        function subscribe(listener) {
            listeners.push(listener);
            var index = listeners.indexOf(listener);
            return function () {
                listeners = listeners.slice(0, index).concat(listeners.slice(index + 1));
            };
        }
        function clearActions() {
            if (store.enabled) {
                actions = [];
            }
        }
        function updateListeners() {
            listeners.forEach(function (fn) { return fn(); });
        }
        init();
        return {
            dispatch: dispatch,
            subscribe: subscribe,
            getState: getState,
            getRawState: getRawState,
            replaceReducer: function () { throw new Error('Not implemented'); }
        };
    }
    exports.createStore = createStore;
});
define("model/steps/GoStep", ["require", "exports", "util/browserFunctions"], function (require, exports, browser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GoStep = (function () {
        function GoStep(n) {
            this.needsPopListener = true;
            this.n = n;
        }
        GoStep.prototype.run = function () {
            browser.go(this.n);
        };
        return GoStep;
    }());
    exports.default = GoStep;
});
define("util/reconciler", ["require", "exports", "model/steps/BackStep", "ramda", "model/steps/PushStep", "model/steps/ReplaceStep", "model/UninitializedState", "store/store", "model/steps/GoStep"], function (require, exports, BackStep_1, R, PushStep_1, ReplaceStep_1, UninitializedState_1, store_1, GoStep_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("model/BaseAction", ["require", "exports", "util/reconciler", "store/Action", "store/decorators/Serializable"], function (require, exports, reconciler_1, Action_2, Serializable_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseAction = (function (_super) {
        __extends(BaseAction, _super);
        function BaseAction(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.time, time = _c === void 0 ? new Date().getTime() : _c, _d = _b.origin, origin = _d === void 0 ? exports.USER : _d;
            var _this = _super.call(this, { time: time }) || this;
            _this.origin = origin;
            return _this;
        }
        /**
         * Generate steps to run in the browser
         * @param steps - The original steps before this action runs
         * @param state - The original state before this action runs
         * @returns {Step[]} - The original steps plus steps generated by this action
         */
        BaseAction.prototype.addSteps = function (steps, state) {
            var newState = this.reduce(state);
            return steps.concat(reconciler_1.diffPagesToSteps(state.pages, newState.pages));
        };
        return BaseAction;
    }(Action_2.default));
    var SystemOrigin = SystemOrigin_1 = (function () {
        function SystemOrigin() {
            this.type = SystemOrigin_1.type;
        }
        return SystemOrigin;
    }());
    SystemOrigin.type = 'system';
    SystemOrigin = SystemOrigin_1 = __decorate([
        Serializable_2.default
    ], SystemOrigin);
    exports.SystemOrigin = SystemOrigin;
    var UserOrigin = UserOrigin_1 = (function () {
        function UserOrigin() {
            this.type = UserOrigin_1.type;
        }
        return UserOrigin;
    }());
    UserOrigin.type = 'user';
    UserOrigin = UserOrigin_1 = __decorate([
        Serializable_2.default
    ], UserOrigin);
    exports.UserOrigin = UserOrigin;
    var ActionOrigin = ActionOrigin_1 = (function () {
        function ActionOrigin(action) {
            this.type = ActionOrigin_1.type;
            this.action = action;
        }
        return ActionOrigin;
    }());
    ActionOrigin.type = 'action';
    ActionOrigin = ActionOrigin_1 = __decorate([
        Serializable_2.default,
        __metadata("design:paramtypes", [BaseAction])
    ], ActionOrigin);
    exports.ActionOrigin = ActionOrigin;
    exports.SYSTEM = new SystemOrigin();
    exports.USER = new UserOrigin();
    exports.default = BaseAction;
    var SystemOrigin_1, UserOrigin_1, ActionOrigin_1;
});
define("model/actions/SwitchToGroup", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_1, Serializable_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SwitchToGroup = SwitchToGroup_1 = (function (_super) {
        __extends(SwitchToGroup, _super);
        function SwitchToGroup(_a) {
            var time = _a.time, origin = _a.origin, groupName = _a.groupName;
            var _this = _super.call(this, { time: time, origin: origin }) || this;
            _this.type = SwitchToGroup_1.type;
            _this.groupName = groupName;
            return _this;
        }
        SwitchToGroup.prototype.reduce = function (state) {
            return state.switchToGroup({
                groupName: this.groupName,
                time: this.time
            });
        };
        SwitchToGroup.prototype.filter = function (state) {
            return state.isGroupActive(this.groupName) ? [] : [this];
        };
        return SwitchToGroup;
    }(BaseAction_1.default));
    SwitchToGroup.type = 'SwitchToGroup';
    SwitchToGroup = SwitchToGroup_1 = __decorate([
        Serializable_3.default,
        __metadata("design:paramtypes", [Object])
    ], SwitchToGroup);
    exports.default = SwitchToGroup;
    var SwitchToGroup_1;
});
define("model/actions/Top", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_2, Serializable_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Top = Top_1 = (function (_super) {
        __extends(Top, _super);
        function Top(_a) {
            var time = _a.time, origin = _a.origin, groupName = _a.groupName, containerName = _a.containerName, _b = _a.reset, reset = _b === void 0 ? false : _b;
            var _this = _super.call(this, { time: time, origin: origin }) || this;
            _this.type = Top_1.type;
            _this.groupName = groupName;
            _this.containerName = containerName;
            _this.reset = reset;
            return _this;
        }
        Top.prototype.reduce = function (state) {
            return state.top({
                groupName: this.groupName,
                containerName: this.containerName,
                reset: this.reset,
                time: this.time,
            });
        };
        Top.prototype.filter = function (state) {
            var alreadyAtTop = state.isContainerAtTopPage(this.groupName, this.containerName);
            return alreadyAtTop ? [] : [this];
        };
        return Top;
    }(BaseAction_2.default));
    Top.type = 'Top';
    Top = Top_1 = __decorate([
        Serializable_4.default,
        __metadata("design:paramtypes", [Object])
    ], Top);
    exports.default = Top;
    var Top_1;
});
define("model/actions/SwitchToContainer", ["require", "exports", "model/BaseAction", "model/actions/Top", "store/decorators/Serializable"], function (require, exports, BaseAction_3, Top_2, Serializable_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SwitchToContainer = SwitchToContainer_1 = (function (_super) {
        __extends(SwitchToContainer, _super);
        function SwitchToContainer(_a) {
            var time = _a.time, origin = _a.origin, groupName = _a.groupName, _b = _a.name, name = _b === void 0 ? null : _b, _c = _a.index, index = _c === void 0 ? null : _c;
            var _this = _super.call(this, { time: time, origin: origin }) || this;
            _this.type = SwitchToContainer_1.type;
            _this.groupName = groupName;
            _this.name = name;
            _this.index = index;
            return _this;
        }
        SwitchToContainer.prototype.getContainerName = function (state) {
            if (this.name) {
                return this.name;
            }
            else if (this.index != null) {
                return state.getContainerNameByIndex(this.groupName, this.index);
            }
            else {
                throw new Error('Need to pass name or index to SwitchToContainer');
            }
        };
        SwitchToContainer.prototype.reduce = function (state) {
            return state.switchToContainer({
                groupName: this.groupName,
                name: this.getContainerName(state),
                time: this.time
            });
        };
        SwitchToContainer.prototype.filter = function (state) {
            var containerName = this.getContainerName(state);
            if (state.isContainerActiveAndEnabled(this.groupName, containerName)) {
                if (this.origin === BaseAction_3.USER) {
                    var group = state.getGroupByName(this.groupName);
                    if (group.gotoTopOnSelectActive) {
                        return [new Top_2.default({
                                groupName: this.groupName,
                                containerName: containerName,
                                origin: new BaseAction_3.ActionOrigin(this)
                            })];
                    }
                }
                return [];
            }
            else {
                return [this];
            }
        };
        return SwitchToContainer;
    }(BaseAction_3.default));
    SwitchToContainer.type = 'SwitchToContainer';
    SwitchToContainer = SwitchToContainer_1 = __decorate([
        Serializable_5.default,
        __metadata("design:paramtypes", [Object])
    ], SwitchToContainer);
    exports.default = SwitchToContainer;
    var SwitchToContainer_1;
});
define("model/actions/Push", ["require", "exports", "model/BaseAction", "model/Page", "util/url", "model/actions/SwitchToGroup", "model/actions/SwitchToContainer", "store/decorators/Serializable"], function (require, exports, BaseAction_4, Page_4, url_2, SwitchToGroup_2, SwitchToContainer_2, Serializable_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Push = Push_1 = (function (_super) {
        __extends(Push, _super);
        function Push(_a) {
            var time = _a.time, origin = _a.origin, groupName = _a.groupName, containerName = _a.containerName, url = _a.url;
            var _this = _super.call(this, { time: time, origin: origin }) || this;
            _this.type = Push_1.type;
            _this.groupName = groupName;
            _this.containerName = containerName;
            _this.url = url;
            return _this;
        }
        Push.prototype.reduce = function (state) {
            var container = state.getContainer(this.groupName, this.containerName);
            var params = url_2.parseParamsFromPatterns(container.patterns, this.url);
            var page = new Page_4.default({
                params: params,
                url: this.url,
                groupName: this.groupName,
                containerName: this.containerName
            });
            return state.push(page, this.time);
        };
        Push.prototype.filter = function (state) {
            if (state.activeUrl === this.url) {
                return [];
            }
            else {
                var data = {
                    groupName: this.groupName,
                    origin: new BaseAction_4.ActionOrigin(this)
                };
                return [
                    new SwitchToGroup_2.default(__assign({}, data, { time: this.time - 2 })),
                    new SwitchToContainer_2.default(__assign({}, data, { time: this.time - 1, name: this.containerName })),
                    this
                ];
            }
        };
        return Push;
    }(BaseAction_4.default));
    Push.type = 'Push';
    Push = Push_1 = __decorate([
        Serializable_6.default,
        __metadata("design:paramtypes", [Object])
    ], Push);
    exports.default = Push;
    var Push_1;
});
define("react/selectors", ["require", "exports", "reselect", "ramda"], function (require, exports, reselect_1, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDeepEqualSelector = reselect_1.createSelectorCreator(reselect_1.defaultMemoize, R.equals);
    exports.createCachingSelector = reselect_1.createSelectorCreator(R.memoize, R.equals);
    exports.EMPTY_OBJ = {};
    exports.getGroupName = function (_, ownProps) { return ownProps.groupName; };
    exports.getGroup = function (state, ownProps) {
        return state.groups.get(ownProps.groupName);
    };
    exports.getContainer = function (state, ownProps) {
        return exports.getGroup(state, ownProps).containers.get(ownProps.containerName);
    };
    exports.getActiveGroupContainerName = function (state, ownProps) {
        return exports.getGroup(state, ownProps).activeContainerName;
    };
    exports.getBackPageInGroup = function (state, ownProps) {
        return exports.getGroup(state, ownProps).backPage;
    };
    exports.getIsGroupActive = function (state, ownProps) {
        return exports.getGroup(state, ownProps).name === state.activeGroupName;
    };
    exports.getIsInitialized = function (state) {
        return state.isInitialized;
    };
    exports.getLoadedFromRefresh = function (state) {
        return state.loadedFromRefresh;
    };
    exports.getPathname = function (state) {
        return state.activeUrl;
    };
});
define("react/waitForInitialization", ["require", "exports", "react", "react", "react-redux"], function (require, exports, React, react_1, react_redux_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function waitForInitialization(component) {
        var mapStateToProps = function (state) {
            return {
                isInitialized: state.isInitialized
            };
        };
        var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
        var WrappedComponent = function (_a) {
            var isInitialized = _a.isInitialized, props = __rest(_a, ["isInitialized"]);
            return isInitialized ? react_1.createElement(component, props) : null;
        };
        var ConnectedComponent = react_redux_1.connect(mapStateToProps, {}, mergeProps)(WrappedComponent);
        return _a = (function (_super) {
                __extends(WaitForInitialization, _super);
                function WaitForInitialization() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                WaitForInitialization.prototype.render = function () {
                    var rrnhStore = this.context.rrnhStore;
                    return React.createElement(ConnectedComponent, __assign({ store: rrnhStore }, this.props));
                };
                return WaitForInitialization;
            }(react_1.Component)),
            _a.contextTypes = {
                rrnhStore: react_1.PropTypes.object.isRequired
            },
            _a;
        var _a;
    }
    exports.default = waitForInitialization;
});
define("react/components/HistoryLink", ["require", "exports", "react", "react", "history/PathUtils", "react-redux", "model/actions/Push", "ramda", "react/selectors", "react/waitForInitialization"], function (require, exports, React, react_2, PathUtils_1, react_redux_2, Push_2, R, selectors_1, waitForInitialization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerHistoryLink = (function (_super) {
        __extends(InnerHistoryLink, _super);
        function InnerHistoryLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerHistoryLink.prototype.componentDidMount = function () {
            if (this.props.groupName == null) {
                throw new Error('HistoryLink needs to be inside a ContainerGroup');
            }
            if (this.props.containerName == null) {
                throw new Error('HistoryLink needs to be inside a Container');
            }
        };
        InnerHistoryLink.prototype.getUrl = function () {
            var to = this.props.to;
            return typeof (to) === 'string' ? to : PathUtils_1.createPath(to);
        };
        InnerHistoryLink.prototype.onClick = function (event) {
            var push = this.props.push;
            push(this.getUrl());
            event.stopPropagation();
            event.preventDefault();
        };
        InnerHistoryLink.prototype.onMouseDown = function (event) {
            event.stopPropagation();
            event.preventDefault();
        };
        InnerHistoryLink.prototype.render = function () {
            var aProps = __rest(R.omit([
                'to',
                'groupName',
                'containerName',
                'store',
                'push',
                'storeSubscription'
            ], this.props), []);
            return (React.createElement("a", __assign({ href: this.getUrl(), onMouseDown: this.onMouseDown.bind(this), onClick: this.onClick.bind(this) }, aProps), this.props.children));
        };
        return InnerHistoryLink;
    }(react_2.Component));
    var getContainerName = function (_, ownProps) { return ownProps.containerName; };
    var nameSelector = selectors_1.createCachingSelector(selectors_1.getGroupName, getContainerName, function (groupName, containerName) { return ({
        groupName: groupName,
        containerName: containerName
    }); });
    var mapDispatchToProps = function (dispatch, ownProps) {
        var _a = nameSelector(selectors_1.EMPTY_OBJ, ownProps), groupName = _a.groupName, containerName = _a.containerName;
        return {
            push: function (url) { return dispatch(new Push_2.default({
                url: url,
                groupName: groupName,
                containerName: containerName
            })); }
        };
    };
    var ConnectedHistoryLink = react_redux_2.connect(function () { return (selectors_1.EMPTY_OBJ); }, mapDispatchToProps)(InnerHistoryLink);
    var HistoryLink = (function (_super) {
        __extends(HistoryLink, _super);
        function HistoryLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HistoryLink.prototype.render = function () {
            var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
            return React.createElement(ConnectedHistoryLink, __assign({ store: rrnhStore }, context, this.props));
        };
        return HistoryLink;
    }(react_2.Component));
    HistoryLink.contextTypes = {
        rrnhStore: react_2.PropTypes.object.isRequired,
        groupName: react_2.PropTypes.string.isRequired,
        containerName: react_2.PropTypes.string.isRequired
    };
    exports.default = waitForInitialization_1.default(HistoryLink);
});
define("model/actions/Back", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_5, Serializable_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Back = Back_1 = (function (_super) {
        __extends(Back, _super);
        function Back(_a) {
            var _b = _a === void 0 ? {} : _a, time = _b.time, _c = _b.n, n = _c === void 0 ? 1 : _c;
            var _this = _super.call(this, { time: time }) || this;
            _this.type = Back_1.type;
            _this.n = n;
            return _this;
        }
        Back.prototype.reduce = function (state) {
            return state.back(this.n, this.time);
        };
        return Back;
    }(BaseAction_5.default));
    Back.type = 'Back';
    Back = Back_1 = __decorate([
        Serializable_7.default,
        __metadata("design:paramtypes", [Object])
    ], Back);
    exports.default = Back;
    var Back_1;
});
define("react/components/BackLink", ["require", "exports", "react", "react", "react-redux", "model/actions/SwitchToGroup", "model/actions/Back", "ramda", "reselect", "react/selectors", "react/waitForInitialization"], function (require, exports, React, react_3, react_redux_3, SwitchToGroup_3, Back_2, R, reselect_2, selectors_2, waitForInitialization_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerBackLink = (function (_super) {
        __extends(InnerBackLink, _super);
        function InnerBackLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerBackLink.prototype.componentDidMount = function () {
            if (this.props.groupName == null) {
                throw new Error('BackLink needs to be inside a ContainerGroup');
            }
        };
        // Don't disappear when transitioning back to previous page
        InnerBackLink.prototype.shouldComponentUpdate = function (newProps) {
            return !this.props.backPage && newProps.backPage;
        };
        InnerBackLink.prototype.onClick = function (event) {
            var back = this.props.back;
            back();
            event.stopPropagation();
            event.preventDefault();
        };
        InnerBackLink.prototype.onMouseDown = function (event) {
            event.stopPropagation();
            event.preventDefault();
        };
        InnerBackLink.prototype.render = function () {
            var _a = R.omit([
                'groupName',
                'containerName',
                'store',
                'back',
                'params',
                'storeSubscription'
            ], this.props), children = _a.children, backPage = _a.backPage, aProps = __rest(_a, ["children", "backPage"]);
            if (backPage) {
                return (React.createElement("a", __assign({ href: backPage.url, onMouseDown: this.onMouseDown.bind(this), onClick: this.onClick.bind(this) }, aProps), children ?
                    (children instanceof Function ? children({ params: backPage.params })
                        : children) : 'Back'));
            }
            else {
                return React.createElement("span", null, " ");
            }
        };
        return InnerBackLink;
    }(react_3.Component));
    var selector = reselect_2.createSelector(selectors_2.getBackPageInGroup, function (backPage) { return ({
        backPage: backPage
    }); });
    var mapStateToProps = function (state, ownProps) {
        var s = selector(state, ownProps);
        return {
            backPage: s.backPage
        };
    };
    var mapDispatchToProps = function (dispatch, ownProps) {
        return {
            back: function () {
                dispatch(new SwitchToGroup_3.default({ groupName: ownProps.groupName }));
                dispatch(new Back_2.default());
            }
        };
    };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedBackLink = react_redux_3.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerBackLink);
    var BackLink = (function (_super) {
        __extends(BackLink, _super);
        function BackLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BackLink.prototype.render = function () {
            var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
            return React.createElement(ConnectedBackLink, __assign({ store: rrnhStore }, context, this.props));
        };
        return BackLink;
    }(react_3.Component));
    BackLink.contextTypes = {
        rrnhStore: react_3.PropTypes.object.isRequired,
        groupName: react_3.PropTypes.string.isRequired
    };
    exports.default = waitForInitialization_2.default(BackLink);
});
define("react/components/HeaderLink", ["require", "exports", "react", "react", "react-redux", "model/actions/SwitchToContainer", "ramda", "react/selectors", "react/waitForInitialization"], function (require, exports, React, react_4, react_redux_4, SwitchToContainer_3, R, selectors_3, waitForInitialization_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerHeaderLink = (function (_super) {
        __extends(InnerHeaderLink, _super);
        function InnerHeaderLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerHeaderLink.prototype.componentDidMount = function () {
            if (this.props.groupName == null) {
                throw new Error('HeaderLink needs to be inside a ContainerGroup');
            }
        };
        InnerHeaderLink.prototype.onClick = function (event) {
            var onClick = this.props.onClick;
            onClick();
            event.stopPropagation();
            event.preventDefault();
        };
        InnerHeaderLink.prototype.onMouseDown = function (event) {
            event.stopPropagation();
            event.preventDefault();
        };
        InnerHeaderLink.prototype.getClassName = function () {
            var _a = this.props, className = _a.className, activeClassName = _a.activeClassName, isActive = _a.isActive;
            return isActive && activeClassName ? activeClassName : className || '';
        };
        InnerHeaderLink.prototype.render = function () {
            var _a = R.omit([
                'toContainer',
                'groupName',
                'containerName',
                'activeClassName',
                'className',
                'store',
                'onClick',
                'isActive',
                'storeSubscription'
            ], this.props), children = _a.children, url = _a.url, aProps = __rest(_a, ["children", "url"]);
            return (React.createElement("a", __assign({ href: url, className: this.getClassName(), onMouseDown: this.onMouseDown.bind(this), onClick: this.onClick.bind(this) }, aProps), children));
        };
        return InnerHeaderLink;
    }(react_4.Component));
    exports.getContainer = function (state, ownProps) {
        return selectors_3.getGroup(state, ownProps).containers.get(ownProps.toContainer);
    };
    var mapStateToProps = function (state, ownProps) {
        var container = exports.getContainer(state, ownProps);
        var activeGroupContainerName = selectors_3.getActiveGroupContainerName(state, ownProps);
        return {
            url: container.activeUrl,
            isActive: activeGroupContainerName === container.name
        };
    };
    var mapDispatchToProps = function (dispatch, ownProps) {
        var groupName = ownProps.groupName, toContainer = ownProps.toContainer;
        return {
            onClick: function () { return dispatch(new SwitchToContainer_3.default({
                groupName: groupName,
                name: toContainer
            })); }
        };
    };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedHeaderLink = react_redux_4.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerHeaderLink);
    var HeaderLink = (function (_super) {
        __extends(HeaderLink, _super);
        function HeaderLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeaderLink.prototype.render = function () {
            var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
            return React.createElement(ConnectedHeaderLink, __assign({ store: rrnhStore }, context, this.props));
        };
        return HeaderLink;
    }(react_4.Component));
    HeaderLink.contextTypes = {
        rrnhStore: react_4.PropTypes.object.isRequired,
        groupName: react_4.PropTypes.string.isRequired
    };
    exports.default = waitForInitialization_3.default(HeaderLink);
});
define("react/components/DumbContainerGroup", ["require", "exports", "react", "react", "ramda"], function (require, exports, React, react_5, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DumbContainerGroup = (function (_super) {
        __extends(DumbContainerGroup, _super);
        function DumbContainerGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DumbContainerGroup.prototype.getChildContext = function () {
            var _a = this.props, name = _a.name, _b = _a.hideInactiveContainers, hideInactiveContainers = _b === void 0 ? true : _b;
            return {
                groupName: name,
                hideInactiveContainers: hideInactiveContainers,
            };
        };
        DumbContainerGroup.prototype.update = function (_a) {
            var currentContainerIndex = _a.currentContainerIndex, currentContainerName = _a.currentContainerName, stackOrder = _a.stackOrder;
            if (this.props.onContainerActivate &&
                currentContainerIndex != null && currentContainerName && stackOrder) {
                this.props.onContainerActivate({
                    currentContainerIndex: currentContainerIndex,
                    currentContainerName: currentContainerName,
                    stackOrder: stackOrder
                });
            }
        };
        DumbContainerGroup.prototype.componentDidMount = function () {
            var _a = this.props, storedCurrentContainerIndex = _a.storedCurrentContainerIndex, storedCurrentContainerName = _a.storedCurrentContainerName, storedStackOrder = _a.storedStackOrder;
            this.update({
                currentContainerIndex: storedCurrentContainerIndex,
                currentContainerName: storedCurrentContainerName,
                stackOrder: storedStackOrder
            });
        };
        /**
         * II = Input Index
         * SI = Stored Index
         * IN = Input Name
         * SN = Stored Name
         */
        DumbContainerGroup.prototype.componentWillReceiveProps = function (nextProps) {
            var oldII = this.props.currentContainerIndex;
            var oldSI = this.props.storedCurrentContainerIndex;
            var newII = nextProps.currentContainerIndex;
            var newSI = nextProps.storedCurrentContainerIndex;
            var oldIN = this.props.currentContainerName;
            var oldSN = this.props.storedCurrentContainerName;
            var newIN = nextProps.currentContainerName;
            var newSN = nextProps.storedCurrentContainerName;
            var oldStackOrder = this.props.storedStackOrder;
            var newStackOrder = nextProps.storedStackOrder;
            if (newSI !== oldSI || newSN !== oldSN ||
                !R.equals(oldStackOrder, newStackOrder)) {
                this.update({
                    currentContainerIndex: newSI,
                    currentContainerName: newSN,
                    stackOrder: newStackOrder
                });
            }
            else if (newII != null) {
                this.props.switchToContainerIndex(newII);
            }
            else if (newIN) {
                this.props.switchToContainerName(newIN);
            }
        };
        DumbContainerGroup.prototype.renderDiv = function (divChildren) {
            var _a = R.omit([
                'groupName',
                'children',
                'storedCurrentContainerIndex',
                'storedStackOrder',
                'hideInactiveContainers',
                'store',
                'isOnTop',
                'dispatch',
                'storedCurrentContainerName',
                'currentContainerIndex',
                'currentContainerName',
                'onContainerActivate',
                'gotoTopOnSelectActive',
                'createGroup',
                'switchToContainerIndex',
                'switchToContainerName',
                'isDefault',
                'parentGroupName',
                'allowInterContainerHistory',
                'loadedFromRefresh',
                'isInitialized',
                'initializing',
                'storeSubscription'
            ], this.props), _b = _a.style, style = _b === void 0 ? {} : _b, divProps = __rest(_a, ["style"]);
            var divStyle = __assign({}, style, { width: '100%', height: '100%', position: 'inherit', overflow: 'hidden' });
            return React.createElement("div", __assign({ style: divStyle }, divProps), divChildren);
        };
        DumbContainerGroup.prototype.render = function () {
            var _a = this.props, children = _a.children, storedCurrentContainerIndex = _a.storedCurrentContainerIndex, storedCurrentContainerName = _a.storedCurrentContainerName, storedStackOrder = _a.storedStackOrder, switchToContainerName = _a.switchToContainerName, switchToContainerIndex = _a.switchToContainerIndex;
            if (children instanceof Function) {
                var args = {
                    currentContainerIndex: storedCurrentContainerIndex,
                    currentContainerName: storedCurrentContainerName,
                    stackOrder: storedStackOrder,
                    setCurrentContainerIndex: switchToContainerIndex,
                    setCurrentContainerName: switchToContainerName,
                };
                return this.renderDiv(children(args));
            }
            else {
                return this.renderDiv(children);
            }
        };
        return DumbContainerGroup;
    }(react_5.Component));
    DumbContainerGroup.childContextTypes = {
        groupName: react_5.PropTypes.string.isRequired,
        hideInactiveContainers: react_5.PropTypes.bool,
        initializing: react_5.PropTypes.bool
    };
    exports.default = DumbContainerGroup;
});
define("model/actions/NonStepAction", ["require", "exports", "model/BaseAction"], function (require, exports, BaseAction_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NonStepAction = (function (_super) {
        __extends(NonStepAction, _super);
        function NonStepAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NonStepAction.prototype.addSteps = function (steps, state) {
            return steps; // just return original steps
        };
        return NonStepAction;
    }(BaseAction_6.default));
    exports.default = NonStepAction;
});
define("model/actions/CreateGroup", ["require", "exports", "model/actions/NonStepAction", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, NonStepAction_1, BaseAction_7, Serializable_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CreateGroup = CreateGroup_1 = (function (_super) {
        __extends(CreateGroup, _super);
        function CreateGroup(_a) {
            var time = _a.time, name = _a.name, _b = _a.allowInterContainerHistory, allowInterContainerHistory = _b === void 0 ? false : _b, _c = _a.parentGroupName, parentGroupName = _c === void 0 ? undefined : _c, _d = _a.isDefault, isDefault = _d === void 0 ? parentGroupName ? false : undefined : _d, _e = _a.resetOnLeave, resetOnLeave = _e === void 0 ? false : _e, _f = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _f === void 0 ? false : _f;
            var _this = _super.call(this, { time: time, origin: BaseAction_7.SYSTEM }) || this;
            _this.type = CreateGroup_1.type;
            _this.name = name;
            _this.parentGroupName = parentGroupName;
            _this.isDefault = isDefault;
            _this.allowInterContainerHistory = allowInterContainerHistory;
            _this.resetOnLeave = resetOnLeave;
            _this.gotoTopOnSelectActive = gotoTopOnSelectActive;
            return _this;
        }
        CreateGroup.prototype.reduce = function (state) {
            if (this.parentGroupName && this.isDefault != null) {
                return state.addSubGroup({
                    name: this.name,
                    parentGroupName: this.parentGroupName,
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
        CreateGroup.prototype.filter = function (state) {
            return state.loadedFromRefresh ? [] : [this];
        };
        return CreateGroup;
    }(NonStepAction_1.default));
    CreateGroup.type = 'CreateGroup';
    CreateGroup = CreateGroup_1 = __decorate([
        Serializable_8.default,
        __metadata("design:paramtypes", [Object])
    ], CreateGroup);
    exports.default = CreateGroup;
    var CreateGroup_1;
});
define("react/components/SmartContainerGroup", ["require", "exports", "react", "react", "react-redux", "react/components/DumbContainerGroup", "model/actions/SwitchToContainer"], function (require, exports, React, react_6, react_redux_5, DumbContainerGroup_1, SwitchToContainer_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGroup = function (state, ownProps) {
        return state.groups.get(ownProps.name);
    };
    var mapStateToProps = function (state, ownProps) {
        var group = exports.getGroup(state, ownProps);
        return {
            storedStackOrder: group.stackOrder,
            storedCurrentContainerIndex: group.activeContainerIndex,
            storedCurrentContainerName: group.activeContainerName
        };
    };
    var mapDispatchToProps = function (dispatch, ownProps) { return ({
        createGroup: function (action) { return dispatch(action); },
        switchToContainerIndex: function (index) { return dispatch(new SwitchToContainer_4.default({
            groupName: ownProps.name,
            index: index
        })); },
        switchToContainerName: function (name) { return dispatch(new SwitchToContainer_4.default({
            groupName: ownProps.name,
            name: name
        })); }
    }); };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedContainerGroup = react_redux_5.connect(mapStateToProps, mapDispatchToProps, mergeProps)(DumbContainerGroup_1.default);
    var SmartContainerGroup = (function (_super) {
        __extends(SmartContainerGroup, _super);
        function SmartContainerGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SmartContainerGroup.prototype.render = function () {
            var _a = this.context, groupName = _a.groupName, rrnhStore = _a.rrnhStore;
            return (React.createElement(ConnectedContainerGroup, __assign({ parentGroupName: groupName, store: rrnhStore }, this.props)));
        };
        return SmartContainerGroup;
    }(react_6.Component));
    SmartContainerGroup.contextTypes = {
        groupName: react_6.PropTypes.string,
        rrnhStore: react_6.PropTypes.object.isRequired
    };
    exports.default = SmartContainerGroup;
});
define("react/components/WindowGroup", ["require", "exports", "react", "react", "react/components/ContainerGroup"], function (require, exports, React, react_7, ContainerGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultToFalse = function (p) { return p == null ? false : p; };
    var changeDefaults = function (props) { return (__assign({}, props, { hideInactiveContainers: defaultToFalse(props.hideInactiveContainers) })); };
    var InnerWindowGroup = (function (_super) {
        __extends(InnerWindowGroup, _super);
        function InnerWindowGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerWindowGroup.prototype.getChildContext = function () {
            var _a = this.props, stackOrder = _a.stackOrder, setCurrentContainerName = _a.setCurrentContainerName;
            return {
                stackOrder: stackOrder,
                setCurrentContainerName: setCurrentContainerName
            };
        };
        InnerWindowGroup.prototype.render = function () {
            return (React.createElement("div", { style: {
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                } }, this.props.children));
        };
        return InnerWindowGroup;
    }(react_7.Component));
    InnerWindowGroup.childContextTypes = {
        stackOrder: react_7.PropTypes.arrayOf(react_7.PropTypes.object).isRequired,
        setCurrentContainerName: react_7.PropTypes.func.isRequired
    };
    var WindowGroup = function (_a) {
        var children = _a.children, groupProps = __rest(_a, ["children"]);
        return (React.createElement(ContainerGroup_1.default, __assign({}, changeDefaults(groupProps)), function (props) { return (React.createElement(InnerWindowGroup, { stackOrder: props.stackOrder, setCurrentContainerName: props.setCurrentContainerName }, children instanceof Function ? children(props) : children)); }));
    };
    exports.default = WindowGroup;
});
define("react/components/DumbContainer", ["require", "exports", "react", "react", "util/url", "ramda"], function (require, exports, React, react_8, url_3, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DumbContainer = (function (_super) {
        __extends(DumbContainer, _super);
        function DumbContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DumbContainer.prototype.getChildContext = function () {
            var _a = this.props, name = _a.name, groupName = _a.groupName, patterns = _a.patterns, animate = _a.animate;
            return {
                pathname: this.getFilteredLocation(),
                containerName: name,
                groupName: groupName,
                patterns: patterns,
                animate: animate
            };
        };
        DumbContainer.prototype.matchesCurrentUrl = function () {
            var _a = this.props, patterns = _a.patterns, pathname = _a.pathname;
            return url_3.patternsMatch(patterns, pathname);
        };
        DumbContainer.prototype.getKey = function () {
            var _a = this.props, name = _a.name, groupName = _a.groupName;
            return groupName + '_' + name;
        };
        DumbContainer.prototype.getNewLocation = function () {
            var _a = this.props, initialUrl = _a.initialUrl, pathname = _a.pathname;
            var key = this.getKey();
            if (pathname) {
                if (this.matchesCurrentUrl()) {
                    return pathname;
                }
                else if (DumbContainer.locations[key]) {
                    return DumbContainer.locations[key]; // Use old location
                }
            }
            return initialUrl; // Use default location
        };
        DumbContainer.prototype.saveLocation = function (pathname) {
            DumbContainer.locations[this.getKey()] = pathname;
        };
        DumbContainer.prototype.getFilteredLocation = function () {
            var pathname = this.getNewLocation();
            this.saveLocation(pathname);
            return pathname;
        };
        DumbContainer.prototype.render = function () {
            var _a = R.omit([
                'animate',
                'resetOnLeave',
                'initialUrl',
                'patterns',
                'pathname',
                'addTitle',
                'groupName',
                'name',
                'isOnTop',
                'store',
                'initializing',
                'isDefault',
                'isInitialized',
                'createContainer',
                'loadedFromRefresh',
                'group',
                'isGroupActive',
                'storeSubscription'
            ], this.props), hideInactiveContainers = _a.hideInactiveContainers, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, switchToGroup = _a.switchToGroup, matchesLocation = _a.matchesLocation, divProps = __rest(_a, ["hideInactiveContainers", "children", "style", "switchToGroup", "matchesLocation"]);
            if (!hideInactiveContainers || matchesLocation) {
                return (React.createElement("div", __assign({}, divProps, { onMouseDown: switchToGroup, style: __assign({}, style, { width: '100%', height: '100%', position: 'relative' }) }), children));
            }
            else {
                return React.createElement("div", null);
            }
        };
        return DumbContainer;
    }(react_8.Component));
    DumbContainer.locations = {}; // Stays stored even if Container is unmounted
    DumbContainer.childContextTypes = {
        groupName: react_8.PropTypes.string.isRequired,
        containerName: react_8.PropTypes.string.isRequired,
        pathname: react_8.PropTypes.string.isRequired,
        patterns: react_8.PropTypes.arrayOf(react_8.PropTypes.string).isRequired,
        animate: react_8.PropTypes.bool.isRequired
    };
    exports.default = DumbContainer;
});
define("model/actions/CreateContainer", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_8, Serializable_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CreateContainer = CreateContainer_1 = (function (_super) {
        __extends(CreateContainer, _super);
        function CreateContainer(_a) {
            var time = _a.time, name = _a.name, groupName = _a.groupName, initialUrl = _a.initialUrl, patterns = _a.patterns, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c;
            var _this = _super.call(this, { time: time, origin: BaseAction_8.SYSTEM }) || this;
            _this.type = CreateContainer_1.type;
            _this.name = name;
            _this.groupName = groupName;
            _this.initialUrl = initialUrl;
            _this.patterns = patterns;
            _this.isDefault = isDefault;
            _this.resetOnLeave = resetOnLeave;
            return _this;
        }
        CreateContainer.prototype.reduce = function (state) {
            return state.addContainer({
                time: this.time,
                name: this.name,
                groupName: this.groupName,
                initialUrl: this.initialUrl,
                isDefault: this.isDefault,
                resetOnLeave: this.resetOnLeave,
                patterns: this.patterns
            });
        };
        CreateContainer.prototype.filter = function (state) {
            return state.loadedFromRefresh ? [] : [this];
        };
        return CreateContainer;
    }(BaseAction_8.default));
    CreateContainer.type = 'CreateContainer';
    CreateContainer = CreateContainer_1 = __decorate([
        Serializable_9.default,
        __metadata("design:paramtypes", [Object])
    ], CreateContainer);
    exports.default = CreateContainer;
    var CreateContainer_1;
});
define("model/actions/AddTitle", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_9, Serializable_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AddTitle = AddTitle_1 = (function (_super) {
        __extends(AddTitle, _super);
        function AddTitle(_a) {
            var time = _a.time, pathname = _a.pathname, title = _a.title;
            var _this = _super.call(this, { time: time, origin: BaseAction_9.SYSTEM }) || this;
            _this.type = AddTitle_1.type;
            _this.pathname = pathname;
            _this.title = title;
            return _this;
        }
        AddTitle.prototype.reduce = function (state) {
            return state.addTitle({
                pathname: this.pathname,
                title: this.title
            });
        };
        AddTitle.prototype.filter = function (state) {
            return state.hasTitleForPath(this.pathname) ? [] : [this];
        };
        return AddTitle;
    }(BaseAction_9.default));
    AddTitle.type = 'AddTitle';
    AddTitle = AddTitle_1 = __decorate([
        Serializable_10.default,
        __metadata("design:paramtypes", [Object])
    ], AddTitle);
    exports.default = AddTitle;
    var AddTitle_1;
});
define("react/components/SmartContainer", ["require", "exports", "react", "react", "react-redux", "react/components/DumbContainer", "util/url", "history/ExecutionEnvironment", "model/actions/AddTitle", "model/actions/SwitchToGroup", "react/selectors"], function (require, exports, React, react_9, react_redux_6, DumbContainer_1, url_4, ExecutionEnvironment_2, AddTitle_2, SwitchToGroup_4, selectors_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerSmartContainer = (function (_super) {
        __extends(InnerSmartContainer, _super);
        function InnerSmartContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerSmartContainer.prototype.addTitleForPath = function (pathname) {
            var addTitle = this.props.addTitle;
            if (ExecutionEnvironment_2.canUseDOM) {
                addTitle({
                    pathname: pathname,
                    title: document.title
                });
            }
        };
        InnerSmartContainer.prototype.componentDidUpdate = function () {
            var _a = this.props, patterns = _a.patterns, pathname = _a.pathname;
            if (pathname) {
                if (url_4.patternsMatch(patterns, pathname)) {
                    this.addTitleForPath(pathname);
                }
            }
        };
        InnerSmartContainer.prototype.render = function () {
            var initializing = this.props.initializing;
            if (initializing) {
                return React.createElement("div", null);
            }
            else {
                var _a = this.props.animate, animate = _a === void 0 ? true : _a;
                var props = __assign({}, this.props, { animate: animate });
                return React.createElement(DumbContainer_1.default, __assign({}, props));
            }
        };
        return InnerSmartContainer;
    }(react_9.Component));
    var matchesLocation = function (group, isGroupActive, pathname, patterns) {
        var activeGroupUrl = group.activeUrl;
        if (activeGroupUrl) {
            var isActiveInGroup = url_4.patternsMatch(patterns, activeGroupUrl);
            if (isActiveInGroup) {
                if (isGroupActive) {
                    return pathname === activeGroupUrl;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    var mapStateToProps = function (state, ownProps) {
        var group = selectors_4.getGroup(state, ownProps);
        var pathname = selectors_4.getPathname(state);
        var isGroupActive = selectors_4.getIsGroupActive(state, ownProps);
        return {
            group: group,
            isGroupActive: isGroupActive,
            pathname: pathname,
            matchesLocation: matchesLocation(group, isGroupActive, pathname, ownProps.patterns)
        };
    };
    var mapDispatchToProps = function (dispatch, ownProps) { return ({
        createContainer: function (action) { return dispatch(action); },
        addTitle: function (title) { return dispatch(new AddTitle_2.default(title)); },
        switchToGroup: function () { return dispatch(new SwitchToGroup_4.default({ groupName: ownProps.groupName })); }
    }); };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedSmartContainer = react_redux_6.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerSmartContainer);
    var SmartContainer = (function (_super) {
        __extends(SmartContainer, _super);
        function SmartContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SmartContainer.prototype.render = function () {
            var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
            return React.createElement(ConnectedSmartContainer, __assign({ store: rrnhStore }, context, this.props));
        };
        return SmartContainer;
    }(react_9.Component));
    SmartContainer.contextTypes = {
        rrnhStore: react_9.PropTypes.object.isRequired,
        groupName: react_9.PropTypes.string.isRequired,
        initializing: react_9.PropTypes.bool,
        hideInactiveContainers: react_9.PropTypes.bool
    };
    exports.default = SmartContainer;
});
define("react/components/Container", ["require", "exports", "react", "react", "react-redux", "react/components/DumbContainer", "react-dom/server", "model/actions/CreateContainer", "history/ExecutionEnvironment", "model/actions/AddTitle", "react/components/SmartContainer"], function (require, exports, React, react_10, react_redux_7, DumbContainer_2, server_1, CreateContainer_2, ExecutionEnvironment_3, AddTitle_3, SmartContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerContainer = (function (_super) {
        __extends(InnerContainer, _super);
        function InnerContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerContainer.prototype.componentWillMount = function () {
            var _a = this.props, initializing = _a.initializing, loadedFromRefresh = _a.loadedFromRefresh;
            if (initializing && !loadedFromRefresh) {
                this.initialize();
            }
        };
        InnerContainer.prototype.initialize = function () {
            var _a = this.props, store = _a.store, children = _a.children, name = _a.name, patterns = _a.patterns, initialUrl = _a.initialUrl, _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, createContainer = _a.createContainer, groupName = _a.groupName, _d = _a.initializing, initializing = _d === void 0 ? false : _d, _e = _a.isDefault, isDefault = _e === void 0 ? false : _e;
            createContainer(new CreateContainer_2.default({
                name: name,
                groupName: groupName,
                initialUrl: initialUrl,
                patterns: patterns,
                resetOnLeave: resetOnLeave,
                isDefault: isDefault
            }));
            if (initializing) {
                var T = (function (_super) {
                    __extends(T, _super);
                    function T() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    T.prototype.getChildContext = function () {
                        return {
                            rrnhStore: store,
                            groupName: groupName,
                            animate: animate,
                            containerName: name,
                            pathname: initialUrl,
                            patterns: patterns
                        };
                    };
                    T.prototype.render = function () {
                        return React.createElement("div", null, children);
                    };
                    return T;
                }(react_10.Component));
                T.childContextTypes = __assign({}, DumbContainer_2.default.childContextTypes, { rrnhStore: react_10.PropTypes.object.isRequired });
                server_1.renderToStaticMarkup(React.createElement(T, null));
                this.addTitleForPath(initialUrl);
            }
        };
        InnerContainer.prototype.addTitleForPath = function (pathname) {
            var addTitle = this.props.addTitle;
            if (ExecutionEnvironment_3.canUseDOM) {
                addTitle({
                    pathname: pathname,
                    title: document.title
                });
            }
        };
        InnerContainer.prototype.render = function () {
            return this.props.isInitialized ?
                React.createElement(SmartContainer_1.default, __assign({}, this.props)) : React.createElement("div", null);
        };
        return InnerContainer;
    }(react_10.Component));
    var mapStateToProps = function (state) { return ({
        loadedFromRefresh: state.loadedFromRefresh,
        isInitialized: state.isInitialized
    }); };
    var mapDispatchToProps = function (dispatch, ownProps) { return ({
        createContainer: function (action) { return dispatch(action); },
        addTitle: function (title) { return dispatch(new AddTitle_3.default(title)); }
    }); };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedContainer = react_redux_7.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerContainer);
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Container.prototype.render = function () {
            var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
            return React.createElement(ConnectedContainer, __assign({ store: rrnhStore }, context, this.props));
        };
        return Container;
    }(react_10.Component));
    Container.contextTypes = {
        rrnhStore: react_10.PropTypes.object.isRequired,
        groupName: react_10.PropTypes.string.isRequired,
        initializing: react_10.PropTypes.bool,
        hideInactiveContainers: react_10.PropTypes.bool
    };
    exports.default = Container;
});
define("util/children", ["require", "exports", "react", "ramda"], function (require, exports, react_11, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var match = function (comp, C) { return comp instanceof C || comp.type === C; };
    function _processChildren(component, next) {
        var children = component.props.children;
        if (children instanceof Function) {
            return next(react_11.createElement(children));
        }
        else {
            var cs = Array.isArray(children) ?
                R.flatten(children) : react_11.Children.toArray(children);
            return R.flatten(cs.map(function (c) { return next(c); }));
        }
    }
    function _getChildren(component, stopAt, stopAtNested, depth) {
        if (stopAtNested === void 0) { stopAtNested = []; }
        var matchAny = function (cs) { return R.any(function (c) { return match(component, c); }, cs); };
        var next = function (c) { return _getChildren(c, stopAt, stopAtNested, depth + 1); };
        if (!(component instanceof react_11.Component) && !component.type) {
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
});
define("model/actions/CloseWindow", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_10, Serializable_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CloseWindow = CloseWindow_1 = (function (_super) {
        __extends(CloseWindow, _super);
        function CloseWindow(_a) {
            var time = _a.time, forName = _a.forName;
            var _this = _super.call(this, { time: time }) || this;
            _this.type = CloseWindow_1.type;
            _this.forName = forName;
            return _this;
        }
        CloseWindow.prototype.reduce = function (state) {
            return state.closeWindow(this.forName, this.time);
        };
        return CloseWindow;
    }(BaseAction_10.default));
    CloseWindow.type = 'CloseWindow';
    CloseWindow = CloseWindow_1 = __decorate([
        Serializable_11.default,
        __metadata("design:paramtypes", [Object])
    ], CloseWindow);
    exports.default = CloseWindow;
    var CloseWindow_1;
});
define("react/components/DumbHistoryWindow", ["require", "exports", "react", "react", "ramda"], function (require, exports, React, react_12, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getWindowZIndex = function (stackOrder, name) {
        if (stackOrder && !R.isEmpty(stackOrder)) {
            var index = R.findIndex(function (c) { return c.name === name; }, stackOrder);
            if (index !== -1) {
                return stackOrder.length - index + 1;
            }
        }
        return 1;
    };
    var isWindowOnTop = function (stackOrder, name) {
        if (stackOrder && !R.isEmpty(stackOrder)) {
            var index = R.findIndex(function (c) { return c.name === name; }, stackOrder);
            return index === 0;
        }
        return false;
    };
    var DumbHistoryWindow = (function (_super) {
        __extends(DumbHistoryWindow, _super);
        function DumbHistoryWindow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DumbHistoryWindow.prototype.onMouseDown = function (event) {
            var open = this.props.open;
            open();
            //event.stopPropagation()
        };
        DumbHistoryWindow.prototype.getClassName = function () {
            var _a = this.props, className = _a.className, topClassName = _a.topClassName, forName = _a.forName, stackOrder = _a.stackOrder;
            var isOnTop = isWindowOnTop(stackOrder, forName);
            return isOnTop && topClassName ? topClassName : className || '';
        };
        DumbHistoryWindow.prototype.componentWillReceiveProps = function (newProps) {
            var visible = newProps.visible, open = newProps.open, close = newProps.close;
            if (visible !== this.props.visible) {
                (visible ? open : close)();
            }
        };
        DumbHistoryWindow.prototype.render = function () {
            var _a = this.props, forName = _a.forName, top = _a.top, left = _a.left, children = _a.children, stackOrder = _a.stackOrder, storedVisible = _a.storedVisible, open = _a.open, close = _a.close;
            var zIndex = getWindowZIndex(stackOrder, forName);
            return (React.createElement("div", { className: this.getClassName(), onMouseDown: this.onMouseDown.bind(this), style: {
                    zIndex: zIndex,
                    position: 'absolute',
                    top: top ? top + 'px' : '',
                    left: left ? left + 'px' : '',
                    visibility: storedVisible ? 'visible' : 'hidden'
                } }, children instanceof Function ? children({ open: open, close: close }) : children));
        };
        return DumbHistoryWindow;
    }(react_12.Component));
    exports.default = DumbHistoryWindow;
});
define("react/components/SmartHistoryWindow", ["require", "exports", "react", "react", "react-redux", "reselect", "model/actions/CloseWindow", "react/components/DumbHistoryWindow"], function (require, exports, React, react_13, react_redux_8, reselect_3, CloseWindow_2, DumbHistoryWindow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindow = function (state, ownProps) {
        return state.windows.get(ownProps.forName);
    };
    var selector = reselect_3.createSelector(exports.getWindow, function (w) { return ({
        window: w
    }); });
    var mapStateToProps = function (state, ownProps) {
        var s = selector(state, ownProps);
        return {
            storedVisible: s.window.visible
        };
    };
    var mapDispatchToProps = function (dispatch, ownProps) {
        var forName = ownProps.forName, setCurrentContainerName = ownProps.setCurrentContainerName;
        return {
            open: function () { return setCurrentContainerName(forName); },
            close: function () { return dispatch(new CloseWindow_2.default({ forName: forName })); }
        };
    };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedSmartHistoryWindow = react_redux_8.connect(mapStateToProps, mapDispatchToProps, mergeProps)(DumbHistoryWindow_1.default);
    var SmartHistoryWindow = (function (_super) {
        __extends(SmartHistoryWindow, _super);
        function SmartHistoryWindow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SmartHistoryWindow.prototype.render = function () {
            var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
            return (React.createElement(ConnectedSmartHistoryWindow, __assign({ store: rrnhStore }, context, this.props)));
        };
        return SmartHistoryWindow;
    }(react_13.Component));
    SmartHistoryWindow.contextTypes = {
        rrnhStore: react_13.PropTypes.object.isRequired,
        stackOrder: react_13.PropTypes.arrayOf(react_13.PropTypes.object).isRequired,
        setCurrentContainerName: react_13.PropTypes.func.isRequired
    };
    exports.default = SmartHistoryWindow;
});
define("model/actions/CreateWindow", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_11, Serializable_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CreateWindow = CreateWindow_1 = (function (_super) {
        __extends(CreateWindow, _super);
        function CreateWindow(_a) {
            var time = _a.time, forName = _a.forName, _b = _a.visible, visible = _b === void 0 ? true : _b;
            var _this = _super.call(this, { time: time, origin: BaseAction_11.SYSTEM }) || this;
            _this.type = CreateWindow_1.type;
            _this.forName = forName;
            _this.visible = visible;
            return _this;
        }
        CreateWindow.prototype.reduce = function (state) {
            return state.addWindow({
                forName: this.forName,
                visible: this.visible
            });
        };
        CreateWindow.prototype.filter = function (state) {
            return state.loadedFromRefresh ? [] : [this];
        };
        return CreateWindow;
    }(BaseAction_11.default));
    CreateWindow.type = 'CreateWindow';
    CreateWindow = CreateWindow_1 = __decorate([
        Serializable_12.default,
        __metadata("design:paramtypes", [Object])
    ], CreateWindow);
    exports.default = CreateWindow;
    var CreateWindow_1;
});
define("react/components/HistoryWindow", ["require", "exports", "react", "react", "react-redux", "react/components/SmartHistoryWindow", "model/actions/CreateWindow"], function (require, exports, React, react_14, react_redux_9, SmartHistoryWindow_1, CreateWindow_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerHistoryWindow = (function (_super) {
        __extends(InnerHistoryWindow, _super);
        function InnerHistoryWindow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerHistoryWindow.prototype.componentWillMount = function () {
            var _a = this.props, initializing = _a.initializing, loadedFromRefresh = _a.loadedFromRefresh;
            if (initializing && !loadedFromRefresh) {
                this.props.createWindow();
            }
        };
        InnerHistoryWindow.prototype.render = function () {
            return this.props.isInitialized ?
                React.createElement(SmartHistoryWindow_1.default, __assign({}, this.props)) : React.createElement("div", null);
        };
        return InnerHistoryWindow;
    }(react_14.Component));
    var mapStateToProps = function (state, ownProps) { return ({
        loadedFromRefresh: state.loadedFromRefresh,
        isInitialized: state.isInitialized
    }); };
    var mapDispatchToProps = function (dispatch, ownProps) { return ({
        createWindow: function () { return dispatch(new CreateWindow_2.default({
            forName: ownProps.forName,
            visible: ownProps.visible
        })); }
    }); };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedHistoryWindow = react_redux_9.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerHistoryWindow);
    var HistoryWindow = (function (_super) {
        __extends(HistoryWindow, _super);
        function HistoryWindow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HistoryWindow.prototype.render = function () {
            var _a = this.context, rrnhStore = _a.rrnhStore, context = __rest(_a, ["rrnhStore"]);
            return React.createElement(ConnectedHistoryWindow, __assign({ store: rrnhStore }, context, this.props));
        };
        return HistoryWindow;
    }(react_14.Component));
    HistoryWindow.contextTypes = {
        rrnhStore: react_14.PropTypes.object.isRequired,
        initializing: react_14.PropTypes.bool,
        stackOrder: react_14.PropTypes.arrayOf(react_14.PropTypes.object).isRequired
    };
    exports.default = HistoryWindow;
});
define("react/components/ContainerGroup", ["require", "exports", "react", "react", "react-redux", "react/components/SmartContainerGroup", "model/actions/CreateGroup", "react-dom/server", "react/components/WindowGroup", "react/components/DumbContainerGroup", "react/components/Container", "util/children", "react/components/HistoryWindow"], function (require, exports, React, react_15, react_redux_10, SmartContainerGroup_1, CreateGroup_2, server_2, WindowGroup_1, DumbContainerGroup_2, Container_3, children_1, HistoryWindow_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerContainerGroup = (function (_super) {
        __extends(InnerContainerGroup, _super);
        function InnerContainerGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerContainerGroup.prototype.componentWillMount = function () {
            var _a = this.props, parentGroupName = _a.parentGroupName, initializing = _a.initializing, loadedFromRefresh = _a.loadedFromRefresh;
            if ((!parentGroupName || initializing) && !loadedFromRefresh) {
                this.initialize();
            }
        };
        InnerContainerGroup.prototype.initialize = function () {
            var _a = this.props, store = _a.store, name = _a.name, createGroup = _a.createGroup, resetOnLeave = _a.resetOnLeave, allowInterContainerHistory = _a.allowInterContainerHistory, gotoTopOnSelectActive = _a.gotoTopOnSelectActive, parentGroupName = _a.parentGroupName, isDefault = _a.isDefault;
            createGroup(new CreateGroup_2.default({
                name: name,
                parentGroupName: parentGroupName,
                isDefault: isDefault,
                resetOnLeave: resetOnLeave,
                allowInterContainerHistory: allowInterContainerHistory,
                gotoTopOnSelectActive: gotoTopOnSelectActive
            }));
            var G = (function (_super) {
                __extends(G, _super);
                function G() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                G.prototype.getChildContext = function () {
                    return {
                        rrnhStore: store,
                        groupName: name,
                        initializing: true
                    };
                };
                G.prototype.render = function () {
                    var children = this.props.children;
                    return React.createElement("div", null, children);
                };
                return G;
            }(react_15.Component));
            G.childContextTypes = {
                rrnhStore: react_15.PropTypes.object.isRequired,
                groupName: react_15.PropTypes.string.isRequired,
                initializing: react_15.PropTypes.bool
            };
            // Initialize the Containers in this group
            // (since most tab libraries lazy load tabs)
            var cs = children_1.getChildren(this, [Container_3.default], [ContainerGroup, SmartContainerGroup_1.default, DumbContainerGroup_2.default, WindowGroup_1.default]).concat(children_1.getChildren(this, [HistoryWindow_2.default], [ContainerGroup, SmartContainerGroup_1.default, DumbContainerGroup_2.default, WindowGroup_1.default]));
            cs.forEach(function (c) { return server_2.renderToStaticMarkup(React.createElement(G, { children: c })); });
        };
        InnerContainerGroup.prototype.render = function () {
            return this.props.isInitialized ?
                React.createElement(SmartContainerGroup_1.default, __assign({}, this.props)) : React.createElement("div", null);
        };
        return InnerContainerGroup;
    }(react_15.Component));
    var mapStateToProps = function (state) { return ({
        loadedFromRefresh: state.loadedFromRefresh,
        isInitialized: state.isInitialized
    }); };
    var mapDispatchToProps = function (dispatch) { return ({
        createGroup: function (action) { return dispatch(action); }
    }); };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedContainerGroup = react_redux_10.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerContainerGroup);
    var ContainerGroup = (function (_super) {
        __extends(ContainerGroup, _super);
        function ContainerGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ContainerGroup.prototype.render = function () {
            var _a = this.context, groupName = _a.groupName, rrnhStore = _a.rrnhStore, initializing = _a.initializing;
            return (React.createElement(ConnectedContainerGroup, __assign({ parentGroupName: groupName, store: rrnhStore, initializing: initializing }, this.props)));
        };
        return ContainerGroup;
    }(react_15.Component));
    ContainerGroup.contextTypes = {
        groupName: react_15.PropTypes.string,
        initializing: react_15.PropTypes.bool,
        rrnhStore: react_15.PropTypes.object.isRequired
    };
    exports.default = ContainerGroup;
});
define("react/components/DumbHistoryRouter", ["require", "exports", "react", "react", "react-router", "history/createBrowserHistory", "util/browserFunctions"], function (require, exports, React, react_16, react_router_1, createBrowserHistory_2, browserFunctions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DumbHistoryRouter = (function (_super) {
        __extends(DumbHistoryRouter, _super);
        function DumbHistoryRouter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DumbHistoryRouter.prototype.render = function () {
            var children = this.props.children;
            if (browserFunctions_1.canUseWindowLocation) {
                return React.createElement(react_router_1.Router, { history: createBrowserHistory_2.default(this.props), children: children });
            }
            else {
                return React.createElement(react_router_1.StaticRouter, __assign({}, this.props, { context: {} }));
            }
        };
        return DumbHistoryRouter;
    }(react_16.Component));
    exports.default = DumbHistoryRouter;
});
define("model/InitializedState", ["require", "exports", "model/State", "model/Pages", "model/PageVisit", "util/sorter"], function (require, exports, State_2, Pages_7, PageVisit_6, sorter_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InitializedState = (function (_super) {
        __extends(InitializedState, _super);
        function InitializedState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(InitializedState.prototype, "pages", {
            get: function () {
                return this.history.toPages();
            },
            enumerable: true,
            configurable: true
        });
        InitializedState.prototype.assign = function (obj) {
            return new InitializedState(__assign({}, Object(this), obj));
        };
        Object.defineProperty(InitializedState.prototype, "isInitialized", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        InitializedState.prototype.switchToGroup = function (_a) {
            var groupName = _a.groupName, time = _a.time;
            var group = this.getGroupByName(groupName);
            return this
                .replaceGroup(group.activate({ time: time, type: PageVisit_6.VisitType.MANUAL }));
            //.openWindow(groupName)
            // TODO: What if switching to a window holding a Group?
        };
        InitializedState.prototype.switchToContainer = function (_a) {
            var groupName = _a.groupName, name = _a.name, time = _a.time;
            var group = this.getGroupByName(groupName);
            var c = group.activateContainer(name, time);
            return this
                .replaceGroup(c)
                .openWindow(name);
        };
        InitializedState.prototype.openWindow = function (forName) {
            return this.setWindowVisibility({ forName: forName, visible: true });
        };
        InitializedState.prototype.closeWindow = function (forName, time) {
            var container = this.getContainerByName(forName);
            var groupName = container.groupName;
            var state = this.setWindowVisibility({ forName: forName, visible: false });
            var group = state.getGroupByName(groupName);
            if (group.hasEnabledContainers) {
                return state.switchToGroup({ groupName: groupName, time: time });
            }
            else {
                return state.back(1, time);
            }
        };
        InitializedState.prototype.go = function (n, time) {
            var _this = this;
            if (this.isOnZeroPage && n > 0) {
                var state = this.assign({ isOnZeroPage: false });
                return state.go(n - 1, time);
            }
            var f = function (x) { return _this.replaceGroup(_this.activeGroup.go(x, time)); };
            if (n < 0 && !this.canGoBack(0 - n)) {
                return (n < -1 ? f(n + 1) : this).assign({ isOnZeroPage: true });
            }
            else {
                return f(n);
            }
        };
        InitializedState.prototype.back = function (n, time) {
            if (n === void 0) { n = 1; }
            return this.go(0 - n, time);
        };
        InitializedState.prototype.forward = function (n, time) {
            if (n === void 0) { n = 1; }
            return this.go(n, time);
        };
        InitializedState.prototype.canGoBack = function (n) {
            if (n === void 0) { n = 1; }
            return this.activeGroup.canGoBack(n);
        };
        InitializedState.prototype.canGoForward = function (n) {
            if (n === void 0) { n = 1; }
            return this.activeGroup.canGoForward(n);
        };
        InitializedState.prototype.isContainerAtTopPage = function (groupName, containerName) {
            var container = this.getContainer(groupName, containerName);
            return container.isAtTopPage;
        };
        InitializedState.prototype.top = function (_a) {
            var groupName = _a.groupName, containerName = _a.containerName, time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
            var group = this.getGroupByName(groupName);
            var container = group.getContainerByName(containerName);
            return this.replaceGroup(group.replaceContainer(container.top(time, reset)));
        };
        InitializedState.prototype.getShiftAmount = function (page) {
            return this.pages.getShiftAmount(page);
        };
        InitializedState.prototype.containsPage = function (page) {
            return this.pages.containsPage(page);
        };
        InitializedState.prototype.getRootGroupOfGroupByName = function (name) {
            var group = this.getGroupByName(name);
            if (group.parentGroupName) {
                return this.getRootGroupOfGroupByName(group.parentGroupName);
            }
            else {
                return group;
            }
        };
        InitializedState.prototype.getRootGroupOfGroup = function (group) {
            return this.getRootGroupOfGroupByName(group.name);
        };
        InitializedState.prototype.push = function (page, time) {
            var group = this.getRootGroupOfGroupByName(page.groupName);
            return this.replaceGroup(group.push(page, time, PageVisit_6.VisitType.MANUAL));
        };
        InitializedState.prototype.getHistory = function (maintainFwd) {
            if (maintainFwd === void 0) { maintainFwd = false; }
            var g = this.activeGroup;
            var groupHistory = maintainFwd ? g.historyWithFwdMaintained : g.history;
            if (this.isOnZeroPage) {
                return new Pages_7.HistoryStack({
                    back: [],
                    current: this.getZeroPage(),
                    forward: groupHistory.flatten()
                });
            }
            else {
                return new Pages_7.HistoryStack(__assign({}, groupHistory, { back: [this.getZeroPage()].concat(groupHistory.back) }));
            }
        };
        Object.defineProperty(InitializedState.prototype, "groupStackOrder", {
            get: function () {
                return sorter_2.sortContainersByLastVisited(this.groups.toArray());
            },
            enumerable: true,
            configurable: true
        });
        InitializedState.prototype.getBackPageInGroup = function (groupName) {
            return this.getGroupByName(groupName).backPage;
        };
        InitializedState.prototype.getActiveContainerNameInGroup = function (groupName) {
            return this.getGroupByName(groupName).activeContainerName;
        };
        InitializedState.prototype.getActiveContainerIndexInGroup = function (groupName) {
            return this.getGroupByName(groupName).activeContainerIndex;
        };
        InitializedState.prototype.getActivePageInGroup = function (groupName) {
            return this.getGroupByName(groupName).activePage;
        };
        InitializedState.prototype.getActiveUrlInGroup = function (groupName) {
            return this.getActivePageInGroup(groupName).url;
        };
        InitializedState.prototype.urlMatchesGroup = function (url, groupName) {
            return this.getGroupByName(groupName).patternsMatch(url);
        };
        Object.defineProperty(InitializedState.prototype, "activePage", {
            get: function () {
                return this.activeGroup.activePage;
            },
            enumerable: true,
            configurable: true
        });
        InitializedState.prototype.isContainerActiveAndEnabled = function (groupName, containerName) {
            return this.getGroupByName(groupName).isContainerActiveAndEnabled(containerName);
        };
        Object.defineProperty(InitializedState.prototype, "activeUrl", {
            get: function () {
                return this.activePage.url;
            },
            enumerable: true,
            configurable: true
        });
        InitializedState.prototype.getActivePageInContainer = function (groupName, containerName) {
            return this.getGroupByName(groupName).getActivePageInContainer(containerName);
        };
        InitializedState.prototype.getActiveUrlInContainer = function (groupName, containerName) {
            return this.getActivePageInContainer(groupName, containerName).url;
        };
        InitializedState.prototype.isGroupActive = function (groupName) {
            var activeGroup = this.activeGroup;
            if (activeGroup.name === groupName) {
                return true;
            }
            else {
                if (this.activeGroup.hasNestedGroupWithName(groupName)) {
                    return this.activeGroup.isNestedGroupActive(groupName);
                }
            }
            return false;
        };
        Object.defineProperty(InitializedState.prototype, "activeGroup", {
            get: function () {
                return this.groupStackOrder[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InitializedState.prototype, "activeContainer", {
            get: function () {
                return this.activeGroup.activeContainer;
            },
            enumerable: true,
            configurable: true
        });
        InitializedState.prototype.getContainer = function (groupName, containerName) {
            return this.getGroupByName(groupName).getContainerByName(containerName);
        };
        InitializedState.prototype.getContainerNameByIndex = function (groupName, index) {
            var group = this.getGroupByName(groupName);
            var container = group.containers.toArray()[index];
            if (container) {
                return container.name;
            }
            else {
                throw new Error("No container found at index " + index + " in '" + groupName + "' " +
                    ("(size: " + group.containers.size + ")"));
            }
        };
        InitializedState.prototype.isActiveContainer = function (groupName, containerName) {
            var c = this.activeContainer;
            return c.groupName === groupName && c.name === containerName;
        };
        InitializedState.prototype.getContainerStackOrderForGroup = function (groupName) {
            return this.getGroupByName(groupName).containerStackOrder;
        };
        Object.defineProperty(InitializedState.prototype, "activeGroupName", {
            get: function () {
                return this.activeGroup.name;
            },
            enumerable: true,
            configurable: true
        });
        return InitializedState;
    }(State_2.default));
    exports.default = InitializedState;
});
define("model/actions/LoadFromUrl", ["require", "exports", "model/BaseAction", "model/InitializedState", "store/decorators/Serializable"], function (require, exports, BaseAction_12, InitializedState_1, Serializable_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var load = function (state, url, time) {
        return new InitializedState_1.default(state.groups.reduce(function (s, group) {
            return s.replaceGroup(group.loadFromUrl(url, time));
        }, state));
    };
    var LoadFromUrl = LoadFromUrl_1 = (function (_super) {
        __extends(LoadFromUrl, _super);
        function LoadFromUrl(_a) {
            var time = _a.time, url = _a.url, _b = _a.fromRefresh, fromRefresh = _b === void 0 ? false : _b;
            var _this = _super.call(this, { time: time, origin: BaseAction_12.USER }) || this;
            _this.type = LoadFromUrl_1.type;
            _this.url = url;
            _this.fromRefresh = fromRefresh;
            return _this;
        }
        LoadFromUrl.prototype.reduce = function (state) {
            return this.fromRefresh ? new InitializedState_1.default(state) :
                load(state, this.url, this.time);
        };
        LoadFromUrl.prototype.addSteps = function (steps, state) {
            return this.fromRefresh ? [] : _super.prototype.addSteps.call(this, steps, state);
        };
        return LoadFromUrl;
    }(BaseAction_12.default));
    LoadFromUrl.type = 'LoadFromUrl';
    LoadFromUrl = LoadFromUrl_1 = __decorate([
        Serializable_13.default,
        __metadata("design:paramtypes", [Object])
    ], LoadFromUrl);
    exports.default = LoadFromUrl;
    var LoadFromUrl_1;
});
define("model/actions/SetZeroPage", ["require", "exports", "model/actions/NonStepAction", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, NonStepAction_2, BaseAction_13, Serializable_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SetZeroPage = SetZeroPage_1 = (function (_super) {
        __extends(SetZeroPage, _super);
        function SetZeroPage(_a) {
            var time = _a.time, url = _a.url;
            var _this = _super.call(this, { time: time, origin: BaseAction_13.SYSTEM }) || this;
            _this.type = SetZeroPage_1.type;
            _this.url = url;
            return _this;
        }
        SetZeroPage.prototype.reduce = function (state) {
            return state.assign({
                zeroPage: this.url
            });
        };
        return SetZeroPage;
    }(NonStepAction_2.default));
    SetZeroPage.type = 'SetZeroPage';
    SetZeroPage = SetZeroPage_1 = __decorate([
        Serializable_14.default,
        __metadata("design:paramtypes", [Object])
    ], SetZeroPage);
    exports.default = SetZeroPage;
    var SetZeroPage_1;
});
define("model/actions/PopState", ["require", "exports", "util/reconciler", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, reconciler_2, BaseAction_14, Serializable_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PopState = PopState_1 = (function (_super) {
        __extends(PopState, _super);
        function PopState(_a) {
            var time = _a.time, n = _a.n;
            var _this = _super.call(this, { time: time }) || this;
            _this.type = PopState_1.type;
            _this.n = n;
            return _this;
        }
        PopState.prototype.reduce = function (state) {
            return state.go(this.n, this.time);
        };
        PopState.prototype.addSteps = function (steps, state) {
            var newState = this.reduce(state);
            var h1 = newState.historyWithFwdMaintained;
            if (h1.current.isZeroPage) {
                return steps;
            }
            else {
                var h2 = newState.history;
                return steps.concat(reconciler_2.diffPagesToSteps(h1.toPages(), h2.toPages()));
            }
        };
        return PopState;
    }(BaseAction_14.default));
    PopState.type = 'PopState';
    PopState = PopState_1 = __decorate([
        Serializable_15.default,
        __metadata("design:paramtypes", [Object])
    ], PopState);
    exports.default = PopState;
    var PopState_1;
});
define("model/actions/UpdateBrowser", ["require", "exports", "model/actions/NonStepAction", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, NonStepAction_3, BaseAction_15, Serializable_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UpdateBrowser = UpdateBrowser_1 = (function (_super) {
        __extends(UpdateBrowser, _super);
        function UpdateBrowser(_a) {
            var time = (_a === void 0 ? {} : _a).time;
            var _this = _super.call(this, { time: time, origin: BaseAction_15.SYSTEM }) || this;
            _this.type = UpdateBrowser_1.type;
            return _this;
        }
        UpdateBrowser.prototype.reduce = function (state) {
            return state.assign({
                lastUpdate: this.time
            });
        };
        return UpdateBrowser;
    }(NonStepAction_3.default));
    UpdateBrowser.type = 'UpdateBrowser';
    UpdateBrowser = UpdateBrowser_1 = __decorate([
        Serializable_16.default,
        __metadata("design:paramtypes", [Object])
    ], UpdateBrowser);
    exports.default = UpdateBrowser;
    var UpdateBrowser_1;
});
define("util/stepRunner", ["require", "exports", "promise-queue", "util/browserFunctions"], function (require, exports, Queue, browser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("react/components/StepRunner", ["require", "exports", "react", "react", "react-redux", "model/Page", "model/actions/PopState", "util/browserFunctions", "util/reconciler", "model/actions/UpdateBrowser", "util/stepRunner", "react/waitForInitialization"], function (require, exports, React, react_17, react_redux_11, Page_5, PopState_2, browser, reconciler_3, UpdateBrowser_2, stepRunner_1, waitForInitialization_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerStepRunner = (function (_super) {
        __extends(InnerStepRunner, _super);
        function InnerStepRunner() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isListening = true;
            return _this;
        }
        InnerStepRunner.prototype.update = function (props) {
            var _this = this;
            var actions = props.actions, lastUpdate = props.lastUpdate, recordBrowserUpdate = props.recordBrowserUpdate;
            var steps = reconciler_3.createStepsSince(actions, lastUpdate);
            if (steps.length > 0) {
                recordBrowserUpdate();
                var before = function () { return _this.isListening = false; };
                var after = function () { return _this.isListening = true; };
                stepRunner_1.runSteps(steps, before, after);
            }
        };
        InnerStepRunner.prototype.componentWillReceiveProps = function (newProps) {
            this.update(newProps);
        };
        InnerStepRunner.prototype.componentWillMount = function () {
            var _this = this;
            this.unlistenForPopState = browser.listen(function (location) {
                if (_this.isListening && location.state) {
                    var popstate = _this.props.popstate;
                    var page = new Page_5.default(location.state);
                    popstate(page);
                }
            });
        };
        InnerStepRunner.prototype.componentWillUnmount = function () {
            this.unlistenForPopState();
        };
        InnerStepRunner.prototype.componentDidMount = function () {
            this.update(this.props);
        };
        InnerStepRunner.prototype.render = function () {
            return React.createElement("div", null);
        };
        return InnerStepRunner;
    }(react_17.Component));
    var mapStateToProps = function (state) { return ({
        actions: state.actions,
        lastUpdate: state.lastUpdate,
        pages: state.pages
    }); };
    var mapDispatchToProps = function (dispatch, ownProps) { return ({
        recordBrowserUpdate: function () { return dispatch(new UpdateBrowser_2.default()); },
        dispatch: dispatch
    }); };
    var mergeProps = function (stateProps, dispatchProps, ownProps) {
        var popstate = function (page) {
            dispatchProps.dispatch(new PopState_2.default({
                n: stateProps.pages.getShiftAmount(page)
            }));
        };
        return __assign({}, stateProps, dispatchProps, ownProps, { popstate: popstate });
    };
    var ConnectedStepRunner = react_redux_11.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerStepRunner);
    var StepRunner = function (_a) {
        var store = _a.store;
        return (React.createElement(ConnectedStepRunner, { store: store }));
    };
    exports.default = waitForInitialization_4.default(StepRunner);
});
define("react/components/TitleSetter", ["require", "exports", "react", "react", "react-redux", "util/browserFunctions", "react/waitForInitialization"], function (require, exports, React, react_18, react_redux_12, browserFunctions_2, waitForInitialization_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerTitleSetter = (function (_super) {
        __extends(InnerTitleSetter, _super);
        function InnerTitleSetter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerTitleSetter.prototype.componentWillReceiveProps = function (newProps) {
            var activeTitle = newProps.activeTitle;
            if (browserFunctions_2.canUseWindowLocation) {
                if (activeTitle) {
                    document.title = activeTitle;
                }
            }
        };
        InnerTitleSetter.prototype.render = function () {
            return null;
        };
        return InnerTitleSetter;
    }(react_18.Component));
    var mapStateToProps = function (state, ownProps) { return (__assign({}, ownProps, { activeTitle: state.activeTitle })); };
    var ConnectedTitleSetter = react_redux_12.connect(mapStateToProps)(InnerTitleSetter);
    var TitleSetter = function (_a) {
        var store = _a.store;
        return (React.createElement(ConnectedTitleSetter, { store: store }));
    };
    exports.default = waitForInitialization_5.default(TitleSetter);
});
define("model/actions/Refresh", ["require", "exports", "model/BaseAction", "model/actions/NonStepAction", "store/decorators/Serializable", "model/actions/LoadFromUrl"], function (require, exports, BaseAction_16, NonStepAction_4, Serializable_17, LoadFromUrl_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Refresh = Refresh_1 = (function (_super) {
        __extends(Refresh, _super);
        function Refresh(_a) {
            var time = (_a === void 0 ? {} : _a).time;
            var _this = _super.call(this, { time: time, origin: BaseAction_16.USER }) || this;
            _this.type = Refresh_1.type;
            return _this;
        }
        Refresh.prototype.reduce = function (state) {
            return state.assign({
                loadedFromRefresh: true,
                lastUpdate: this.time
            });
        };
        Refresh.prototype.store = function (actions) {
            var updatedActions = actions.map(function (action) {
                if (action instanceof LoadFromUrl_2.default) {
                    return new LoadFromUrl_2.default(__assign({}, action, { fromRefresh: true }));
                }
                else {
                    return action;
                }
            });
            return _super.prototype.store.call(this, updatedActions);
        };
        return Refresh;
    }(NonStepAction_4.default));
    Refresh.type = 'Refresh';
    Refresh = Refresh_1 = __decorate([
        Serializable_17.default,
        __metadata("design:paramtypes", [Object])
    ], Refresh);
    exports.default = Refresh;
    var Refresh_1;
});
define("react/components/HistoryRouter", ["require", "exports", "react", "react", "react-redux", "store/store", "react/components/DumbHistoryRouter", "util/browserFunctions", "model/actions/LoadFromUrl", "model/actions/SetZeroPage", "react/components/StepRunner", "react/components/TitleSetter", "model/UninitializedState", "model/actions/Refresh", "promise-polyfill"], function (require, exports, React, react_19, react_redux_13, store_2, DumbHistoryRouter_1, browserFunctions_3, LoadFromUrl_3, SetZeroPage_2, StepRunner_1, TitleSetter_1, UninitializedState_2, Refresh_2, Promise) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    if (!window.Promise) {
        window.Promise = Promise;
    }
    var InnerHistoryRouter = (function (_super) {
        __extends(InnerHistoryRouter, _super);
        function InnerHistoryRouter(props) {
            var _this = _super.call(this, props) || this;
            var _a = _this.props, loadedFromRefresh = _a.loadedFromRefresh, refresh = _a.refresh;
            if (loadedFromRefresh) {
                refresh();
            }
            else {
                _this.initialize();
            }
            return _this;
        }
        InnerHistoryRouter.prototype.initialize = function () {
            var _a = this.props, zeroPage = _a.zeroPage, setZeroPage = _a.setZeroPage;
            if (zeroPage) {
                setZeroPage(zeroPage);
            }
            /*
             class R extends Component<{children: ReactNode}, undefined> {
               static childContextTypes = {
                 rrnhStore: PropTypes.object.isRequired,
                 initializing: PropTypes.bool,
                 router: PropTypes.object,
               }
        
               getChildContext() {
                 return {
                   rrnhStore: store,
                   initializing: true,
                   router: {
                   location: {pathname: '/'},
                   listen: () => {},
                   push: () => {},
                   replace: () => {}
                   }
                 }
               }
        
               render() {
                 return <div>{this.props.children}</div>
               }
             }
        
             // Initialize the ContainerGroups
             // (since most tab libraries lazy load tabs)
             const cs = getChildren(this, [ContainerGroup, DumbContainerGroup, WindowGroup])
             cs.forEach(c => renderToStaticMarkup(<R children={c} />))
             */
        };
        InnerHistoryRouter.prototype.componentDidMount = function () {
            var _a = this.props, loadFromUrl = _a.loadFromUrl, isInitialized = _a.isInitialized;
            if (!isInitialized) {
                loadFromUrl(this.getLocation());
            }
        };
        InnerHistoryRouter.prototype.getChildContext = function () {
            return {
                rrnhStore: this.props.store
            };
        };
        InnerHistoryRouter.prototype.getLocation = function () {
            if (browserFunctions_3.canUseWindowLocation) {
                return window.location.pathname;
            }
            else {
                var location_1 = this.props.location;
                if (location_1) {
                    return location_1;
                }
                else {
                    console.warn('You should pass location when testing');
                    return '/';
                }
            }
        };
        InnerHistoryRouter.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement(DumbHistoryRouter_1.default, __assign({}, this.props)),
                React.createElement(StepRunner_1.default, { store: this.props.store }),
                React.createElement(TitleSetter_1.default, { store: this.props.store })));
        };
        return InnerHistoryRouter;
    }(react_19.Component));
    InnerHistoryRouter.childContextTypes = {
        rrnhStore: react_19.PropTypes.object.isRequired
    };
    var mapStateToProps = function (state) { return ({
        isInitialized: state.isInitialized,
        loadedFromRefresh: browserFunctions_3.wasLoadedFromRefresh
    }); };
    var mapDispatchToProps = function (dispatch, ownProps) { return ({
        loadFromUrl: function (url) { return dispatch(new LoadFromUrl_3.default({ url: url })); },
        refresh: function () { return dispatch(new Refresh_2.default()); },
        setZeroPage: function (url) { return dispatch(new SetZeroPage_2.default({ url: url })); }
    }); };
    var mergeProps = function (stateProps, dispatchProps, ownProps) { return (__assign({}, stateProps, dispatchProps, ownProps)); };
    var ConnectedHistoryRouter = react_redux_13.connect(mapStateToProps, mapDispatchToProps, mergeProps)(InnerHistoryRouter);
    var HistoryRouter = function (props) { return (React.createElement(ConnectedHistoryRouter, __assign({}, props, { store: store_2.createStore({
            loadFromPersist: browserFunctions_3.wasLoadedFromRefresh,
            initialState: new UninitializedState_2.default()
        }) }))); };
    var WrappedHistoryRouter = function (props) { return (React.createElement(HistoryRouter, __assign({}, props))); };
    exports.default = WrappedHistoryRouter;
});
define("model/actions/Forward", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_17, Serializable_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Forward = Forward_1 = (function (_super) {
        __extends(Forward, _super);
        function Forward(_a) {
            var _b = _a === void 0 ? {} : _a, time = _b.time, _c = _b.n, n = _c === void 0 ? 1 : _c;
            var _this = _super.call(this, { time: time }) || this;
            _this.type = Forward_1.type;
            _this.n = n;
            return _this;
        }
        Forward.prototype.reduce = function (state) {
            return state.forward(this.n, this.time);
        };
        return Forward;
    }(BaseAction_17.default));
    Forward.type = 'Forward';
    Forward = Forward_1 = __decorate([
        Serializable_18.default,
        __metadata("design:paramtypes", [Object])
    ], Forward);
    exports.default = Forward;
    var Forward_1;
});
define("react/components/AnimatedPage", ["require", "exports", "react", "react", "react-router-transition", "model/actions/Push", "model/actions/Back", "model/actions/Forward", "model/actions/Top", "model/actions/PopState", "react-redux", "model/actions/UpdateBrowser", "ramda", "immutable"], function (require, exports, React, react_20, react_router_transition_1, Push_3, Back_3, Forward_2, Top_3, PopState_3, react_redux_14, UpdateBrowser_3, R, immutable_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var createTransitions = function () {
        var ts = {};
        ts[Push_3.default.type] = slideLeft;
        ts[Forward_2.default.type] = slideLeft;
        ts[Back_3.default.type] = slideRight;
        ts[Top_3.default.type] = slideRight;
        ts[PopState_3.default.type] = popstate;
        return ts;
    };
    var transitions = immutable_4.fromJS(createTransitions());
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
    }(react_20.Component));
    InnerAnimatedPage.contextTypes = {
        animate: react_20.PropTypes.bool.isRequired,
        pathname: react_20.PropTypes.string.isRequired
    };
    var mapStateToProps = function (state, ownProps) { return ({
        lastAction: R.last(state.actions.filter(function (a) { return !(a instanceof UpdateBrowser_3.default); }))
    }); };
    var ConnectedPage = react_redux_14.connect(mapStateToProps)(InnerAnimatedPage);
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
    }(react_20.Component));
    AnimatedPage.contextTypes = {
        rrnhStore: react_20.PropTypes.object.isRequired
    };
    exports.default = AnimatedPage;
});
define("react/components/HistoryRoute", ["require", "exports", "react", "react", "react-router/matchPath", "react/components/AnimatedPage"], function (require, exports, React, react_21, matchPath_2, AnimatedPage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var computeMatch = function (pathname, _a) {
        var computedMatch = _a.computedMatch, path = _a.path, exact = _a.exact, strict = _a.strict;
        return computedMatch || matchPath_2.default(pathname, { path: path, exact: exact, strict: strict });
    };
    var r = function (_a) {
        var component = _a.component, children = _a.children, render = _a.render, match = _a.match, props = _a.props;
        return (component ? (match ? React.createElement(component, props) : null) : render ? (match ? render(props) : null) : children ? (typeof children === 'function' ? (children(props)) : !Array.isArray(children) || children.length ? (React.Children.only(children)) : (null)) : (null));
    };
    var InnerHistoryRoute = (function (_super) {
        __extends(InnerHistoryRoute, _super);
        function InnerHistoryRoute() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InnerHistoryRoute.prototype.shouldComponentUpdate = function (nextProps) {
            return this.props.pathname !== nextProps.pathname;
        };
        InnerHistoryRoute.prototype.render = function () {
            var _a = this.props, pathname = _a.pathname, children = _a.children, component = _a.component, render = _a.render;
            var match = computeMatch(pathname, this.props);
            var props = { match: match, location: { pathname: pathname } };
            return r({ component: component, children: children, render: render, match: match, props: props });
        };
        return InnerHistoryRoute;
    }(react_21.Component));
    var HistoryRoute = function (_a, _b) {
        var component = _a.component, children = _a.children, render = _a.render, props = __rest(_a, ["component", "children", "render"]);
        var pathname = _b.pathname;
        return (React.createElement(InnerHistoryRoute, __assign({}, props, { pathname: pathname, children: function (p) { return (React.createElement(AnimatedPage_1.default, __assign({}, p), p.match && r({ component: component, children: children, render: render, match: p.match, props: p }))); } })));
    };
    HistoryRoute.contextTypes = {
        pathname: react_21.PropTypes.string.isRequired
    };
    HistoryRoute.propTypes = {
        computedMatch: react_21.PropTypes.object,
        path: react_21.PropTypes.string,
        exact: react_21.PropTypes.bool,
        strict: react_21.PropTypes.bool,
        component: react_21.PropTypes.func,
        render: react_21.PropTypes.func,
        children: react_21.PropTypes.oneOfType([
            react_21.PropTypes.func,
            react_21.PropTypes.node
        ])
    };
    exports.default = HistoryRoute;
});
define("react/components/ScrollArea", ["require", "exports", "react", "react", "ramda"], function (require, exports, React, react_22, R) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScrollArea = (function (_super) {
        __extends(ScrollArea, _super);
        function ScrollArea(props) {
            return _super.call(this, props) || this;
        }
        ScrollArea.prototype.checkProps = function () {
            if (this.context.groupName == null) {
                throw new Error('ScrollArea needs to be inside a ContainerGroup');
            }
            if (this.context.containerName == null) {
                throw new Error('ScrollArea needs to be inside a Container');
            }
        };
        ScrollArea.prototype.getKey = function () {
            var _a = this.context, groupName = _a.groupName, containerName = _a.containerName;
            return groupName + '_' + containerName;
        };
        ScrollArea.prototype.saveScrolls = function (_a) {
            var _b = _a.left, left = _b === void 0 ? 0 : _b, _c = _a.top, top = _c === void 0 ? 0 : _c;
            var key = this.getKey();
            ScrollArea.scrollLefts[key] = left;
            ScrollArea.scrollTops[key] = top;
        };
        ScrollArea.prototype.onScroll = function (event) {
            this.saveScrolls({
                left: event.target.scrollLeft,
                top: event.target.scrollTop
            });
        };
        ScrollArea.prototype.loadScrolls = function () {
            var key = this.getKey();
            if (this.scrollArea) {
                this.scrollArea.scrollLeft = ScrollArea.scrollLefts[key] || 0;
                this.scrollArea.scrollTop = ScrollArea.scrollTops[key] || 0;
            }
        };
        ScrollArea.prototype.clearScrolls = function () {
            this.saveScrolls({});
        };
        ScrollArea.prototype.componentDidMount = function () {
            this.checkProps();
            this.loadScrolls();
        };
        ScrollArea.prototype.componentWillUnmount = function () {
            if (this.props.resetOnLeave) {
                this.clearScrolls();
            }
        };
        ScrollArea.prototype.render = function () {
            var _this = this;
            var _a = R.omit(['resetOnLeave'], this.props), children = _a.children, _b = _a.horizontal, horizontal = _b === void 0 ? false : _b, _c = _a.vertical, vertical = _c === void 0 ? false : _c, _d = _a.style, style = _d === void 0 ? {} : _d, divProps = __rest(_a, ["children", "horizontal", "vertical", "style"]);
            return (React.createElement("div", __assign({ ref: function (ref) { return _this.scrollArea = ref; }, onScroll: this.onScroll.bind(this) }, divProps, { style: __assign({}, style, { width: '100%', height: '100%', overflowX: horizontal ? 'scroll' : 'auto', overflowY: vertical ? 'scroll' : 'auto' }) }), children));
        };
        return ScrollArea;
    }(react_22.Component));
    ScrollArea.scrollLefts = {};
    ScrollArea.scrollTops = {};
    ScrollArea.contextTypes = {
        groupName: react_22.PropTypes.string.isRequired,
        containerName: react_22.PropTypes.string.isRequired
    };
    exports.default = ScrollArea;
});
define("react/connectToStore", ["require", "exports", "react", "react", "react-redux"], function (require, exports, React, react_23, react_redux_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function connectToStore(component) {
        var mapStateToProps = function (state, ownProps) { return (__assign({}, Object(ownProps), state)); };
        var WrappedComponent = function (props) { return react_23.createElement(component, props); };
        var ConnectedComponent = react_redux_15.connect(mapStateToProps)(WrappedComponent);
        return _a = (function (_super) {
                __extends(ConnectToStore, _super);
                function ConnectToStore() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ConnectToStore.prototype.render = function () {
                    var rrnhStore = this.context.rrnhStore;
                    return React.createElement(ConnectedComponent, __assign({ store: rrnhStore }, this.props));
                };
                return ConnectToStore;
            }(react_23.Component)),
            _a.contextTypes = {
                rrnhStore: react_23.PropTypes.object.isRequired
            },
            _a;
        var _a;
    }
    exports.default = connectToStore;
});
define("index", ["require", "exports", "react/components/HistoryLink", "react/components/BackLink", "react/components/HeaderLink", "react/components/ContainerGroup", "react/components/Container", "react/components/WindowGroup", "react/components/HistoryWindow", "react/components/HistoryRouter", "react/components/HistoryRoute", "react/components/ScrollArea", "react/connectToStore", "react/waitForInitialization"], function (require, exports, HistoryLink_1, BackLink_1, HeaderLink_1, ContainerGroup_2, Container_4, WindowGroup_2, HistoryWindow_3, HistoryRouter_1, HistoryRoute_1, ScrollArea_1, connectToStore_1, waitForInitialization_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HistoryLink = HistoryLink_1.default;
    exports.BackLink = BackLink_1.default;
    exports.HeaderLink = HeaderLink_1.default;
    exports.ContainerGroup = ContainerGroup_2.default;
    exports.Container = Container_4.default;
    exports.WindowGroup = WindowGroup_2.default;
    exports.HistoryWindow = HistoryWindow_3.default;
    exports.HistoryRouter = HistoryRouter_1.default;
    exports.HistoryRoute = HistoryRoute_1.default;
    exports.ScrollArea = ScrollArea_1.default;
    exports.connectToStore = connectToStore_1.default;
    exports.waitForInitialization = waitForInitialization_6.default;
});
define("model/actions/Go", ["require", "exports", "model/BaseAction", "store/decorators/Serializable"], function (require, exports, BaseAction_18, Serializable_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Go = Go_1 = (function (_super) {
        __extends(Go, _super);
        function Go(_a) {
            var time = _a.time, n = _a.n;
            var _this = _super.call(this, { time: time }) || this;
            _this.type = Go_1.type;
            _this.n = n;
            return _this;
        }
        Go.prototype.reduce = function (state) {
            return state.go(this.n, this.time);
        };
        return Go;
    }(BaseAction_18.default));
    Go.type = 'Go';
    Go = Go_1 = __decorate([
        Serializable_19.default,
        __metadata("design:paramtypes", [Object])
    ], Go);
    exports.default = Go;
    var Go_1;
});
define("model/steps/ForwardStep", ["require", "exports", "util/browserFunctions"], function (require, exports, browser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ForwardStep = (function () {
        function ForwardStep(n) {
            if (n === void 0) { n = 1; }
            this.needsPopListener = true;
            this.n = n;
        }
        ForwardStep.prototype.run = function () {
            browser.forward(this.n);
        };
        return ForwardStep;
    }());
    exports.default = ForwardStep;
});
//# sourceMappingURL=bundle.js.map