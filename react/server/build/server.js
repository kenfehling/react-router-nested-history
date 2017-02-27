/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 449);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _isPlaceholder = __webpack_require__(46);


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2
             : _curry1(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
             : fn(a, b);
    }
  };
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _isPlaceholder = __webpack_require__(46);


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _curry2 = __webpack_require__(0);
var _isPlaceholder = __webpack_require__(46);


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3
             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _curry1(function(_c) { return fn(a, b, _c); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
             : fn(a, b, c);
    }
  };
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _isArray = __webpack_require__(19);
var _isTransformer = __webpack_require__(66);


/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
module.exports = function _dispatchable(methodNames, xf, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
  init: function() {
    return this.xf['@@transducer/init']();
  },
  result: function(result) {
    return this.xf['@@transducer/result'](result);
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var R = __webpack_require__(7);
// @Serializable decorator for a class
function Serializable(target) {
    if (target.type) {
        serializables.set(target.type, target); // Use the class name as a type
    }
    else {
        throw new Error("target " + target + " has no type");
    }
}
exports.Serializable = Serializable;
// Map to store all classes with @Serializable decorator
var serializables = new Map();
/**
 * @param classObject - An object of a class with a @Serializable decorator
 * @returns a plain object containing all the original object data plus a type
 */
function serialize(classObject) {
    var obj = {};
    var keys = Object.keys(classObject);
    keys.forEach(function (key) {
        var value = classObject[key];
        // recursively serialize children from @Serializable classes
        obj[key] = isSerializable(value) ? serialize(value) : value;
    });
    return __assign({ type: classObject.constructor.name }, obj);
}
exports.serialize = serialize;
/**
 * @param obj - A plain object with a type attribute
 * @returns an object of the original @Serializable class
 */
function deserialize(obj) {
    var ser = serializables.get(obj.type);
    if (!ser) {
        console.log(serializables);
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
    return obj && !!obj.type && serializables.has(obj.type);
}
exports.isSerialized = isSerialized;
function isSerializable(obj) {
    return obj && !!obj.constructor.name && serializables.has(obj.constructor.name);
}
exports.isSerializable = isSerializable;
// Mostly just for unit tests
function getSerializables() {
    return serializables;
}
exports.getSerializables = getSerializables;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  F: __webpack_require__(234),
  T: __webpack_require__(235),
  __: __webpack_require__(236),
  add: __webpack_require__(40),
  addIndex: __webpack_require__(237),
  adjust: __webpack_require__(96),
  all: __webpack_require__(238),
  allPass: __webpack_require__(239),
  always: __webpack_require__(23),
  and: __webpack_require__(97),
  any: __webpack_require__(98),
  anyPass: __webpack_require__(240),
  ap: __webpack_require__(57),
  aperture: __webpack_require__(241),
  append: __webpack_require__(242),
  apply: __webpack_require__(99),
  applySpec: __webpack_require__(243),
  ascend: __webpack_require__(244),
  assoc: __webpack_require__(41),
  assocPath: __webpack_require__(100),
  binary: __webpack_require__(245),
  bind: __webpack_require__(101),
  both: __webpack_require__(246),
  call: __webpack_require__(247),
  chain: __webpack_require__(58),
  clamp: __webpack_require__(248),
  clone: __webpack_require__(249),
  comparator: __webpack_require__(250),
  complement: __webpack_require__(251),
  compose: __webpack_require__(59),
  composeK: __webpack_require__(102),
  composeP: __webpack_require__(252),
  concat: __webpack_require__(60),
  cond: __webpack_require__(253),
  construct: __webpack_require__(254),
  constructN: __webpack_require__(103),
  contains: __webpack_require__(255),
  converge: __webpack_require__(104),
  countBy: __webpack_require__(256),
  curry: __webpack_require__(42),
  curryN: __webpack_require__(8),
  dec: __webpack_require__(257),
  descend: __webpack_require__(258),
  defaultTo: __webpack_require__(105),
  difference: __webpack_require__(106),
  differenceWith: __webpack_require__(107),
  dissoc: __webpack_require__(108),
  dissocPath: __webpack_require__(259),
  divide: __webpack_require__(260),
  drop: __webpack_require__(109),
  dropLast: __webpack_require__(261),
  dropLastWhile: __webpack_require__(262),
  dropRepeats: __webpack_require__(263),
  dropRepeatsWith: __webpack_require__(110),
  dropWhile: __webpack_require__(264),
  either: __webpack_require__(265),
  empty: __webpack_require__(111),
  eqBy: __webpack_require__(266),
  eqProps: __webpack_require__(267),
  equals: __webpack_require__(15),
  evolve: __webpack_require__(268),
  filter: __webpack_require__(61),
  find: __webpack_require__(269),
  findIndex: __webpack_require__(270),
  findLast: __webpack_require__(271),
  findLastIndex: __webpack_require__(272),
  flatten: __webpack_require__(273),
  flip: __webpack_require__(43),
  forEach: __webpack_require__(274),
  forEachObjIndexed: __webpack_require__(275),
  fromPairs: __webpack_require__(276),
  groupBy: __webpack_require__(277),
  groupWith: __webpack_require__(278),
  gt: __webpack_require__(279),
  gte: __webpack_require__(280),
  has: __webpack_require__(281),
  hasIn: __webpack_require__(282),
  head: __webpack_require__(283),
  identical: __webpack_require__(112),
  identity: __webpack_require__(62),
  ifElse: __webpack_require__(284),
  inc: __webpack_require__(285),
  indexBy: __webpack_require__(286),
  indexOf: __webpack_require__(287),
  init: __webpack_require__(288),
  insert: __webpack_require__(289),
  insertAll: __webpack_require__(290),
  intersection: __webpack_require__(325),
  intersectionWith: __webpack_require__(326),
  intersperse: __webpack_require__(327),
  into: __webpack_require__(328),
  invert: __webpack_require__(329),
  invertObj: __webpack_require__(330),
  invoker: __webpack_require__(29),
  is: __webpack_require__(127),
  isArrayLike: __webpack_require__(30),
  isEmpty: __webpack_require__(331),
  isNil: __webpack_require__(332),
  join: __webpack_require__(333),
  juxt: __webpack_require__(128),
  keys: __webpack_require__(17),
  keysIn: __webpack_require__(334),
  last: __webpack_require__(129),
  lastIndexOf: __webpack_require__(335),
  length: __webpack_require__(130),
  lens: __webpack_require__(49),
  lensIndex: __webpack_require__(336),
  lensPath: __webpack_require__(337),
  lensProp: __webpack_require__(338),
  lift: __webpack_require__(50),
  liftN: __webpack_require__(131),
  lt: __webpack_require__(339),
  lte: __webpack_require__(340),
  map: __webpack_require__(10),
  mapAccum: __webpack_require__(341),
  mapAccumRight: __webpack_require__(342),
  mapObjIndexed: __webpack_require__(343),
  match: __webpack_require__(344),
  mathMod: __webpack_require__(345),
  max: __webpack_require__(24),
  maxBy: __webpack_require__(346),
  mean: __webpack_require__(132),
  median: __webpack_require__(347),
  memoize: __webpack_require__(348),
  merge: __webpack_require__(349),
  mergeAll: __webpack_require__(350),
  mergeWith: __webpack_require__(351),
  mergeWithKey: __webpack_require__(133),
  min: __webpack_require__(352),
  minBy: __webpack_require__(353),
  modulo: __webpack_require__(354),
  multiply: __webpack_require__(134),
  nAry: __webpack_require__(51),
  negate: __webpack_require__(355),
  none: __webpack_require__(356),
  not: __webpack_require__(135),
  nth: __webpack_require__(31),
  nthArg: __webpack_require__(357),
  objOf: __webpack_require__(136),
  of: __webpack_require__(358),
  omit: __webpack_require__(359),
  once: __webpack_require__(360),
  or: __webpack_require__(137),
  over: __webpack_require__(138),
  pair: __webpack_require__(361),
  partial: __webpack_require__(362),
  partialRight: __webpack_require__(363),
  partition: __webpack_require__(364),
  path: __webpack_require__(32),
  pathEq: __webpack_require__(365),
  pathOr: __webpack_require__(366),
  pathSatisfies: __webpack_require__(367),
  pick: __webpack_require__(368),
  pickAll: __webpack_require__(139),
  pickBy: __webpack_require__(369),
  pipe: __webpack_require__(140),
  pipeK: __webpack_require__(370),
  pipeP: __webpack_require__(141),
  pluck: __webpack_require__(33),
  prepend: __webpack_require__(142),
  product: __webpack_require__(371),
  project: __webpack_require__(372),
  prop: __webpack_require__(67),
  propEq: __webpack_require__(373),
  propIs: __webpack_require__(374),
  propOr: __webpack_require__(375),
  propSatisfies: __webpack_require__(376),
  props: __webpack_require__(377),
  range: __webpack_require__(378),
  reduce: __webpack_require__(18),
  reduceBy: __webpack_require__(52),
  reduceRight: __webpack_require__(143),
  reduceWhile: __webpack_require__(379),
  reduced: __webpack_require__(380),
  reject: __webpack_require__(53),
  remove: __webpack_require__(381),
  repeat: __webpack_require__(382),
  replace: __webpack_require__(383),
  reverse: __webpack_require__(54),
  scan: __webpack_require__(384),
  sequence: __webpack_require__(144),
  set: __webpack_require__(385),
  slice: __webpack_require__(22),
  sort: __webpack_require__(386),
  sortBy: __webpack_require__(387),
  sortWith: __webpack_require__(388),
  split: __webpack_require__(389),
  splitAt: __webpack_require__(390),
  splitEvery: __webpack_require__(391),
  splitWhen: __webpack_require__(392),
  subtract: __webpack_require__(393),
  sum: __webpack_require__(145),
  symmetricDifference: __webpack_require__(394),
  symmetricDifferenceWith: __webpack_require__(395),
  tail: __webpack_require__(68),
  take: __webpack_require__(146),
  takeLast: __webpack_require__(396),
  takeLastWhile: __webpack_require__(397),
  takeWhile: __webpack_require__(398),
  tap: __webpack_require__(399),
  test: __webpack_require__(400),
  times: __webpack_require__(147),
  toLower: __webpack_require__(401),
  toPairs: __webpack_require__(402),
  toPairsIn: __webpack_require__(403),
  toString: __webpack_require__(34),
  toUpper: __webpack_require__(404),
  transduce: __webpack_require__(405),
  transpose: __webpack_require__(406),
  traverse: __webpack_require__(407),
  trim: __webpack_require__(408),
  tryCatch: __webpack_require__(409),
  type: __webpack_require__(69),
  unapply: __webpack_require__(410),
  unary: __webpack_require__(411),
  uncurryN: __webpack_require__(412),
  unfold: __webpack_require__(413),
  union: __webpack_require__(414),
  unionWith: __webpack_require__(415),
  uniq: __webpack_require__(70),
  uniqBy: __webpack_require__(148),
  uniqWith: __webpack_require__(71),
  unless: __webpack_require__(416),
  unnest: __webpack_require__(417),
  until: __webpack_require__(418),
  update: __webpack_require__(149),
  useWith: __webpack_require__(150),
  values: __webpack_require__(151),
  valuesIn: __webpack_require__(419),
  view: __webpack_require__(420),
  when: __webpack_require__(421),
  where: __webpack_require__(152),
  whereEq: __webpack_require__(422),
  without: __webpack_require__(423),
  xprod: __webpack_require__(424),
  zip: __webpack_require__(425),
  zipObj: __webpack_require__(426),
  zipWith: __webpack_require__(427)
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _curry1 = __webpack_require__(1);
var _curry2 = __webpack_require__(0);
var _curryN = __webpack_require__(44);


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _map = __webpack_require__(48);
var _reduce = __webpack_require__(11);
var _xmap = __webpack_require__(321);
var curryN = __webpack_require__(8);
var keys = __webpack_require__(17);


/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */
module.exports = _curry2(_dispatchable(['map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    default:
      return _map(fn, functor);
  }
}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var _xwrap = __webpack_require__(126);
var bind = __webpack_require__(101);
var isArrayLike = __webpack_require__(30);


module.exports = (function() {
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      idx += 1;
    }
    return xf['@@transducer/result'](acc);
  }

  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();
    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      step = iter.next();
    }
    return xf['@@transducer/result'](acc);
  }

  function _methodReduce(xf, acc, obj) {
    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
  return function _reduce(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }
    if (isArrayLike(list)) {
      return _arrayReduce(fn, acc, list);
    }
    if (typeof list.reduce === 'function') {
      return _methodReduce(fn, acc, list);
    }
    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }
    if (typeof list.next === 'function') {
      return _iterableReduce(fn, acc, list);
    }
    throw new TypeError('reduce: list must be array or iterable');
  };
}());


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var actions_1 = __webpack_require__(222);
var browser = __webpack_require__(26);
var store_1 = __webpack_require__(92);
var Queue = __webpack_require__(231);
var location_1 = __webpack_require__(56);
var url_1 = __webpack_require__(39);
var Page_1 = __webpack_require__(37);
var UpdateBrowser_1 = __webpack_require__(85);
var LoadFromUrl_1 = __webpack_require__(203);
var Go_1 = __webpack_require__(202);
var Back_1 = __webpack_require__(78);
var Forward_1 = __webpack_require__(79);
var Top_1 = __webpack_require__(84);
var SetZeroPage_1 = __webpack_require__(82);
var Push_1 = __webpack_require__(81);
var SwitchToContainer_1 = __webpack_require__(205);
var PopState_1 = __webpack_require__(80);
var SwitchToGroup_1 = __webpack_require__(206);
var Startup_1 = __webpack_require__(83);
var InitializedState_1 = __webpack_require__(76);
var queue = new Queue(1, Infinity); // maxConcurrent = 1, maxQueue = Infinity
var unlisten;
var stepListeners = [];
var changeListeners = [];
exports.addStepListener = function (listener) { return stepListeners.push(listener); };
exports.addChangeListener = function (listener) {
    changeListeners.push(listener);
    if (exports.isInitialized()) {
        updateChangeListeners();
    }
};
var startListeningForPopState = function () {
    unlisten = browser.listen(function (location) {
        if (location.state) {
            var page = new Page_1.default(location.state);
            var state = store_1.default.getState();
            store_1.default.dispatch(new PopState_1.default({ n: state.getShiftAmount(page) }));
        }
    });
};
var unlistenPromise = function () { return new Promise(function (resolve) {
    unlisten();
    return resolve();
}); };
var startListeningPromise = function () { return new Promise(function (resolve) {
    startListeningForPopState();
    return resolve();
}); };
exports.getGroupByName = function (name) {
    return store_1.default.getState().getGroupByName(name);
};
exports.hasGroupWithName = function (name) {
    return store_1.default.getState().hasGroupWithName(name);
};
var createGroup = function (action) {
    store_1.default.dispatch(action);
    return store_1.default.getState().getGroupByName(action.name);
};
exports.getOrCreateGroup = function (action) {
    if (exports.hasGroupWithName(action.name)) {
        return exports.getGroupByName(action.name);
    }
    else {
        return createGroup(action);
    }
};
var createContainer = function (action) {
    store_1.default.dispatch(action);
    return store_1.default.getState().getGroupByName(action.groupName)
        .getContainerByName(action.name);
};
exports.getOrCreateContainer = function (action) {
    var state = store_1.default.getState();
    var group = state.getGroupByName(action.groupName);
    if (group.hasContainerWithName(action.name)) {
        return group.getContainerByName(action.name);
    }
    else {
        return createContainer(action);
    }
};
exports.switchToGroup = function (groupName) {
    if (!exports.isGroupActive(groupName)) {
        store_1.default.dispatch(new SwitchToGroup_1.default({ groupName: groupName }));
    }
};
var switchToContainerName = function (groupName, containerName, fromPush) {
    if (fromPush === void 0) { fromPush = false; }
    if (exports.isContainerActive(groupName, containerName)) {
        if (!fromPush) {
            var group = exports.getGroupByName(groupName);
            if (group.gotoTopOnSelectActive) {
                store_1.default.dispatch(new Top_1.default({ groupName: groupName }));
            }
        }
    }
    else {
        store_1.default.dispatch(new SwitchToContainer_1.default({ groupName: groupName, containerName: containerName }));
    }
};
exports.switchToContainer = function (groupName, containerName) {
    return switchToContainerName(groupName, containerName, false);
};
exports.switchToContainerIndex = function (groupName, index) {
    var group = exports.getGroupByName(groupName);
    var container = group.containers[index];
    if (container) {
        return switchToContainerName(groupName, container.name);
    }
    else {
        throw new Error("No container found at index " + index + " in '" + groupName + "' " +
            ("(size: " + group.containers.length + ")"));
    }
};
exports.push = function (groupName, containerName, url, patterns) {
    var params = url_1.parseParamsFromPatterns(patterns, url);
    var page = new Page_1.default({
        url: url,
        params: params,
        groupName: groupName,
        containerName: containerName,
        lastVisited: new Date().getTime()
    });
    exports.switchToGroup(groupName);
    switchToContainerName(groupName, containerName, true);
    store_1.default.dispatch(new Push_1.default({ page: page }));
};
exports.startup = function () {
    return store_1.default.dispatch(new Startup_1.default({ fromRefresh: browser.wasLoadedFromRefresh }));
};
exports.loadFromUrl = function (url) {
    return store_1.default.dispatch(new LoadFromUrl_1.default({
        url: url,
        fromRefresh: browser.wasLoadedFromRefresh
    }));
};
exports.setZeroPage = function (url) {
    return store_1.default.dispatch(new SetZeroPage_1.default({ url: url }));
};
exports.getLastAction = function () { return store_1.default.getLastAction(); };
exports.getLastActionType = function () { return exports.getLastAction().type; };
exports.loadActions = function () { return store_1.default.loadActions(); };
exports.top = function (action) { return store_1.default.dispatch(action); };
exports.go = function (n) {
    if (n === void 0) { n = 1; }
    return store_1.default.dispatch(new Go_1.default({ n: n }));
};
exports.back = function (n) {
    if (n === void 0) { n = 1; }
    return store_1.default.dispatch(new Back_1.default({ n: n }));
};
exports.forward = function (n) {
    if (n === void 0) { n = 1; }
    return store_1.default.dispatch(new Forward_1.default({ n: n }));
};
exports.getBackPageInGroup = function (groupName) {
    return store_1.default.getState().getBackPageInGroup(groupName);
};
exports.goBackInGroup = function (groupName, n) {
    if (n === void 0) { n = 1; }
    exports.switchToGroup(groupName);
    exports.back(n);
};
exports.goForwardInGroup = function (groupName, n) {
    if (n === void 0) { n = 1; }
    exports.switchToGroup(groupName);
    exports.forward(n);
};
exports.getActivePageInGroup = function (groupName) {
    return store_1.default.getState().getActivePageInGroup(groupName);
};
exports.getActiveUrlInGroup = function (groupName) {
    return store_1.default.getState().getActivePageInGroup(groupName).url;
};
exports.urlMatchesGroup = function (url, groupName) {
    return exports.getGroupByName(groupName).patternsMatch(url);
};
exports.getActivePageInContainer = function (groupName, containerName) {
    return store_1.default.getState().getActivePageInContainer(groupName, containerName);
};
exports.getActiveUrlInContainer = function (groupName, containerName) {
    return store_1.default.getState().getActiveUrlInContainer(groupName, containerName);
};
exports.getContainerLinkUrl = function (groupName, containerName) {
    return store_1.default.getState().getContainerLinkUrl(groupName, containerName);
};
exports.isContainerActive = function (groupName, containerName) {
    return store_1.default.getState().isContainerActive(groupName, containerName);
};
exports.getIndexedContainerStackOrder = function (groupName) {
    return store_1.default.getState().getIndexedContainerStackOrderForGroup(groupName);
};
exports.getActiveContainerIndexInGroup = function (groupName) {
    return store_1.default.getState().getActiveContainerIndexInGroup(groupName);
};
exports.getActiveContainerNameInGroup = function (groupName) {
    return store_1.default.getState().getActiveContainerNameInGroup(groupName);
};
exports.isGroupActive = function (groupName) {
    return store_1.default.getState().isGroupActive(groupName);
};
exports.isInitialized = function () {
    return store_1.default.getState() instanceof InitializedState_1.default;
};
function runStep(step) {
    var stepPromise = function () {
        var currentUrl = browser.getLocation().pathname;
        stepListeners.forEach(function (listener) { return listener.before(currentUrl); });
        step.run();
        var p = location_1.canUseWindowLocation && step.needsPopListener ?
            browser.listenPromise() : Promise.resolve();
        return p.then(function () {
            var currentUrl = browser.getLocation().pathname;
            stepListeners.forEach(function (listener) { return listener.after(currentUrl); });
        });
    };
    return [unlistenPromise, stepPromise, startListeningPromise].reduce(function (p, s) { return p.then(s); }, Promise.resolve());
}
function runSteps(steps) {
    var ps = function () {
        return steps.reduce(function (p, step) { return p.then(function () { return runStep(step); }); }, Promise.resolve());
    };
    return queue.add(ps);
}
exports.runSteps = runSteps;
var updateChangeListeners = function () {
    var state = store_1.default.getState();
    var data = {
        lastAction: exports.getLastAction(),
        state: state
    };
    changeListeners.forEach(function (listener) { return listener(data); });
};
exports.listenToStore = function () { return store_1.default.subscribe(function () {
    if (exports.isInitialized()) {
        var state = store_1.default.getState();
        var lastUpdate = state.lastUpdate;
        var steps = actions_1.createStepsSince(store_1.default.actions, lastUpdate);
        if (steps.length > 0) {
            store_1.default.dispatch(new UpdateBrowser_1.default());
            runSteps(steps).then(updateChangeListeners);
        }
        else {
            updateChangeListeners();
            updateChangeListeners(); // For some reason this helps?
        }
    }
}); };
startListeningForPopState();


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var reconciler_1 = __webpack_require__(93);
var Action = (function () {
    function Action(_a) {
        var _b = (_a === void 0 ? {} : _a).time, time = _b === void 0 ? new Date().getTime() : _b;
        this.time = time;
    }
    Action.prototype.updateAfterRefresh = function (time) {
        return this.constructor(__assign({}, Object(this), { time: time }));
    };
    /**
     * Reducer for this action
     * @param state - The original state
     * @returns {IState} - The new state
     */
    Action.prototype.reduce = function (state) {
        return state;
    };
    /**
     * Reducer for the store, typically used for just storing this action
     * but can be overridden to do things like clear some or all of the actions
     */
    Action.prototype.store = function (actions) {
        return actions.concat([this]);
    };
    /**
     * Generate steps to run in the browser
     * @param steps - The original steps before this action runs
     * @param state - The original state before this action runs
     * @returns {Step[]} - The original steps plus steps generated by this action
     */
    Action.prototype.addSteps = function (steps, state) {
        var newState = this.reduce(state);
        return steps.concat(reconciler_1.diffStateToSteps(state, newState));
    };
    Action.prototype.compareTo = function (other) {
        return other.time - this.time;
    };
    return Action;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Action;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
module.exports = function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _equals = __webpack_require__(296);


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
module.exports = _curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _has = __webpack_require__(9);
var _isArguments = __webpack_require__(119);


/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
module.exports = (function() {
  // cover IE < 9 keys issues
  var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
                            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
  // Safari bug
  var hasArgsEnumBug = (function() {
    'use strict';
    return arguments.propertyIsEnumerable('length');
  }());

  var contains = function contains(list, item) {
    var idx = 0;
    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }
      idx += 1;
    }
    return false;
  };

  return typeof Object.keys === 'function' && !hasArgsEnumBug ?
    _curry1(function keys(obj) {
      return Object(obj) !== obj ? [] : Object.keys(obj);
    }) :
    _curry1(function keys(obj) {
      if (Object(obj) !== obj) {
        return [];
      }
      var prop, nIdx;
      var ks = [];
      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
      for (prop in obj) {
        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
          ks[ks.length] = prop;
        }
      }
      if (hasEnumBug) {
        nIdx = nonEnumerableProps.length - 1;
        while (nIdx >= 0) {
          prop = nonEnumerableProps[nIdx];
          if (_has(prop, obj) && !contains(ks, prop)) {
            ks[ks.length] = prop;
          }
          nIdx -= 1;
        }
      }
      return ks;
    });
}());


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var _reduce = __webpack_require__(11);


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * `R.reduced` to shortcut the iteration.
 *
 * The arguments' order of `reduceRight`'s iterator function is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *                -               -10
 *               / \              / \
 *              -   4           -6   4
 *             / \              / \
 *            -   3   ==>     -3   3
 *           / \              / \
 *          -   2           -1   2
 *         / \              / \
 *        0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */
module.exports = _curry3(_reduce);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x :
    {
      '@@transducer/value': x,
      '@@transducer/reduced': true
    };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var _indexOf = __webpack_require__(118);


module.exports = function _contains(a, list) {
  return _indexOf(list, a, 0) >= 0;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = __webpack_require__(28);
var _curry3 = __webpack_require__(2);


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */
module.exports = _curry1(function always(val) {
  return function() {
    return val;
  };
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */
module.exports = _curry2(function max(a, b) { return b > a ? b : a; });


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollArea = exports.HistoryRoute = exports.HistoryRouter = exports.Window = exports.WindowGroup = exports.Container = exports.ContainerGroup = exports.HeaderLink = exports.BackLink = exports.HistoryLink = exports.isGroupActive = exports.addChangeListener = exports.switchToContainer = undefined;

var _main = __webpack_require__(12);

Object.defineProperty(exports, 'switchToContainer', {
  enumerable: true,
  get: function get() {
    return _main.switchToContainer;
  }
});
Object.defineProperty(exports, 'addChangeListener', {
  enumerable: true,
  get: function get() {
    return _main.addChangeListener;
  }
});
Object.defineProperty(exports, 'isGroupActive', {
  enumerable: true,
  get: function get() {
    return _main.isGroupActive;
  }
});

var _HistoryLink2 = __webpack_require__(216);

var _HistoryLink3 = _interopRequireDefault(_HistoryLink2);

var _BackLink2 = __webpack_require__(212);

var _BackLink3 = _interopRequireDefault(_BackLink2);

var _HeaderLink2 = __webpack_require__(215);

var _HeaderLink3 = _interopRequireDefault(_HeaderLink2);

var _ContainerGroup2 = __webpack_require__(88);

var _ContainerGroup3 = _interopRequireDefault(_ContainerGroup2);

var _Container2 = __webpack_require__(87);

var _Container3 = _interopRequireDefault(_Container2);

var _WindowGroup2 = __webpack_require__(220);

var _WindowGroup3 = _interopRequireDefault(_WindowGroup2);

var _Window2 = __webpack_require__(219);

var _Window3 = _interopRequireDefault(_Window2);

var _HistoryRouter2 = __webpack_require__(217);

var _HistoryRouter3 = _interopRequireDefault(_HistoryRouter2);

var _HistoryRoute2 = __webpack_require__(186);

var _HistoryRoute3 = _interopRequireDefault(_HistoryRoute2);

var _ScrollArea2 = __webpack_require__(218);

var _ScrollArea3 = _interopRequireDefault(_ScrollArea2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HistoryLink = _HistoryLink3.default;
exports.BackLink = _BackLink3.default;
exports.HeaderLink = _HeaderLink3.default;
exports.ContainerGroup = _ContainerGroup3.default;
exports.Container = _Container3.default;
exports.WindowGroup = _WindowGroup3.default;
exports.Window = _Window3.default;
exports.HistoryRouter = _HistoryRouter3.default;
exports.HistoryRoute = _HistoryRoute3.default;
exports.ScrollArea = _ScrollArea3.default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createBrowserHistory_1 = __webpack_require__(72);
var createMemoryHistory_1 = __webpack_require__(159);
var location_1 = __webpack_require__(56);
exports._history = location_1.canUseWindowLocation ?
    createBrowserHistory_1.default() :
    createMemoryHistory_1.default();
exports._resetHistory = function () {
    if (location_1.canUseWindowLocation) {
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
exports.getLocation = function () { return exports._history.location; };
exports.wasLoadedFromRefresh = location_1.canUseWindowLocation &&
    window.performance &&
    window.performance.navigation.type === 1;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Action_1 = __webpack_require__(13);
var NonStepAction = (function (_super) {
    __extends(NonStepAction, _super);
    function NonStepAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NonStepAction.prototype.addSteps = function (steps, state) {
        return steps; // just return original steps
    };
    return NonStepAction;
}(Action_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NonStepAction;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _isArray = __webpack_require__(19);


/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
module.exports = function _checkForMethod(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
      fn.apply(this, arguments) :
      obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isFunction = __webpack_require__(45);
var curryN = __webpack_require__(8);
var toString = __webpack_require__(34);


/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */
module.exports = _curry2(function invoker(arity, method) {
  return curryN(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _isArray = __webpack_require__(19);
var _isString = __webpack_require__(47);


/**
 * Tests whether or not an object is similar to an array.
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @deprecated since v0.23.0
 * @example
 *
 *      R.isArrayLike([]); //=> true
 *      R.isArrayLike(true); //=> false
 *      R.isArrayLike({}); //=> false
 *      R.isArrayLike({length: 10}); //=> false
 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
module.exports = _curry1(function isArrayLike(x) {
  if (_isArray(x)) { return true; }
  if (!x) { return false; }
  if (typeof x !== 'object') { return false; }
  if (_isString(x)) { return false; }
  if (x.nodeType === 1) { return !!x.length; }
  if (x.length === 0) { return true; }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isString = __webpack_require__(47);


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */
module.exports = _curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
module.exports = _curry2(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var map = __webpack_require__(10);
var prop = __webpack_require__(67);


/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig k -> [{k: v}] -> [v]
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} list The array to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */
module.exports = _curry2(function pluck(p, list) {
  return map(prop(p), list);
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _toString = __webpack_require__(308);


/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
module.exports = _curry1(function toString(val) { return _toString(val, []); });


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactSideEffect = __webpack_require__(178);

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _deepEqual = __webpack_require__(169);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _objectAssign = __webpack_require__(447);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__(177);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HELMET_ATTRIBUTE = "data-react-helmet";

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props[property]) {
            return props[property];
        }
    }
    return null;
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, "title");
    var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, "defaultTitle");

    return innermostTitle || innermostDefaultTitle || "";
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, "onChangeClientState") || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        return typeof props[tagName] !== "undefined";
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var updateTitle = function updateTitle(title, attributes) {
    document.title = title || document.title;
    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var htmlTag = document.getElementsByTagName(tagName)[0];
    var helmetAttributeString = htmlTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";
        htmlTag.setAttribute(attribute, value);

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        htmlTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        htmlTag.removeAttribute(HELMET_ATTRIBUTE);
    } else {
        htmlTag.setAttribute(HELMET_ATTRIBUTE, helmetAttributes.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector("head");
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === "innerHTML") {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === "cssText") {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes) {
    var attributeString = generateHtmlAttributesAsString(attributes);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(title) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(title) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === "innerHTML" || attribute === "cssText");
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute]) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = [_HelmetConstants.TAG_NAMES.NOSCRIPT, _HelmetConstants.TAG_NAMES.SCRIPT, _HelmetConstants.TAG_NAMES.STYLE].indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    // assigning into an array to define toString function on it
    var initProps = _defineProperty({
        key: title
    }, HELMET_ATTRIBUTE, true);
    var props = Object.keys(attributes).reduce(function (obj, key) {
        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);

    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var mappedTag = _defineProperty({
            key: i
        }, HELMET_ATTRIBUTE, true);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return _react2.default.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes);
                }
            };
        case _HelmetConstants.TAG_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return tags;
                },
                toString: function toString() {
                    return generateHtmlAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var htmlAttributes = _ref.htmlAttributes,
        title = _ref.title,
        titleAttributes = _ref.titleAttributes,
        baseTag = _ref.baseTag,
        metaTags = _ref.metaTags,
        linkTags = _ref.linkTags,
        scriptTags = _ref.scriptTags,
        noscriptTags = _ref.noscriptTags,
        styleTags = _ref.styleTags;
    return {
        htmlAttributes: getMethodsForTag(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }),
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };
};

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, (HelmetWrapper.__proto__ || Object.getPrototypeOf(HelmetWrapper)).apply(this, arguments));
        }

        _createClass(HelmetWrapper, [{
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps) {
                return !(0, _deepEqual2.default)(this.props, nextProps);
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(Component, this.props);
            }
        }], [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.
            set: function set(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
            /**
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {String} title: "Title"
             * @param {String} defaultTitle: "Default Title"
             * @param {String} titleTemplate: "MySite.com - %s"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div{ display: block; color: blue; }"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             */

        }]);

        return HelmetWrapper;
    }(_react2.default.Component), _class.propTypes = {
        htmlAttributes: _react2.default.PropTypes.object,
        title: _react2.default.PropTypes.string,
        defaultTitle: _react2.default.PropTypes.string,
        titleTemplate: _react2.default.PropTypes.string,
        titleAttributes: _react2.default.PropTypes.object,
        base: _react2.default.PropTypes.object,
        meta: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
        link: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
        script: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
        noscript: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
        style: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
        onChangeClientState: _react2.default.PropTypes.func
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                htmlAttributes: {},
                title: "",
                titleAttributes: {},
                baseTag: [],
                metaTags: [],
                linkTags: [],
                scriptTags: [],
                noscriptTags: [],
                styleTags: []
            });
        }

        return mappedState;
    }, _temp;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.TAG_NAMES.HTML, propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        onChangeClientState: getOnChangeClientState(propsList)
    };
};

var handleClientStateChange = function handleClientStateChange(newState) {
    var htmlAttributes = newState.htmlAttributes,
        title = newState.title,
        titleAttributes = newState.titleAttributes,
        baseTag = newState.baseTag,
        metaTags = newState.metaTags,
        linkTags = newState.linkTags,
        scriptTags = newState.scriptTags,
        noscriptTags = newState.noscriptTags,
        styleTags = newState.styleTags,
        onChangeClientState = newState.onChangeClientState;


    updateAttributes("html", htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    onChangeClientState(newState, addedTags, removedTags);
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

exports.default = Helmet(HelmetSideEffects);
module.exports = exports["default"];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var R = __webpack_require__(7);
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
    HistoryStack.prototype.activate = function (time) {
        return new HistoryStack(__assign({}, Object(this), { current: this.current.touch(time) }));
    };
    HistoryStack.prototype.push = function (page) {
        return new HistoryStack({
            back: this.back.concat([this.current]),
            current: page,
            forward: []
        });
    };
    /**
     * Go back to the first page of the history
     * @param time - The time this action was originally run
     * @param reset - Should it remove the forward pages from history?
     */
    HistoryStack.prototype.top = function (time, reset) {
        if (reset === void 0) { reset = false; }
        var h = this.shiftTo(this.back[0] || this.current, time);
        if (reset) {
            return new HistoryStack(__assign({}, h, { forward: [] }));
        }
        else {
            return h;
        }
    };
    HistoryStack.prototype.goBack = function (n, time) {
        if (n === void 0) { n = 1; }
        return n === 0 ? this.activate(time) : new HistoryStack({
            back: R.init(this.back),
            current: R.last(this.back),
            forward: [this.current].concat(this.forward)
        }).goBack(n - 1, time);
    };
    HistoryStack.prototype.goForward = function (n, time) {
        if (n === void 0) { n = 1; }
        return n === 0 ? this.activate(time) : new HistoryStack({
            back: this.back.concat([this.current]),
            current: R.head(this.forward),
            forward: R.tail(this.forward)
        }).goForward(n - 1, time);
    };
    HistoryStack.prototype.go = function (n, time) {
        return n === 0 ? this : n < 0 ?
            this.goBack(0 - n, time) : this.goForward(n, time);
    };
    /**
     * @returns {[Page]} This HistoryStack as a flat array of Page objects
     */
    HistoryStack.prototype.flatten = function () {
        return this.back.concat([this.current], this.forward);
    };
    Object.defineProperty(HistoryStack.prototype, "index", {
        /**
         * @returns {number} The index of the current page in the stack
         */
        get: function () {
            return this.back.length;
        },
        enumerable: true,
        configurable: true
    });
    HistoryStack.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.back.length > n - 1;
    };
    HistoryStack.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.forward.length > n - 1;
    };
    HistoryStack.prototype.containsPage = function (page) {
        try {
            this.getShiftAmount(page);
            return true;
        }
        catch (Error) {
            return false;
        }
    };
    /**
     * Gets the distance and direction of a page on the stack
     * @param page - The page to look for
     * @returns {number} - The amount (-2 = 2 steps back)
     * @throws Error if page not found
     */
    HistoryStack.prototype.getShiftAmount = function (page) {
        if (page.equals(this.current)) {
            return 0;
        }
        else {
            var findIndex = R.findIndex(page.equals.bind(page));
            if (!R.isEmpty(this.back)) {
                var i = findIndex(this.back);
                if (i !== -1) {
                    return 0 - (this.back.length - i);
                }
            }
            if (!R.isEmpty(this.forward)) {
                var i = findIndex(this.forward);
                if (i !== -1) {
                    return i + 1;
                }
            }
        }
        throw new Error('Page not found');
    };
    /**
     * Go to a given page on the stack
     * @param page - The page to look for
     * @param time - The time this action was originally run
     * @returns {HistoryStack} - A new HistoryStack with this action performed
     * @throws Error if page not found
     */
    HistoryStack.prototype.shiftTo = function (page, time) {
        return this.go(this.getShiftAmount(page), time);
    };
    Object.defineProperty(HistoryStack.prototype, "activePage", {
        get: function () {
            return this.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HistoryStack.prototype, "backPage", {
        get: function () {
            return R.last(this.back);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HistoryStack.prototype, "forwardPage", {
        get: function () {
            return R.head(this.forward);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HistoryStack.prototype, "firstVisited", {
        get: function () {
            return (this.back.concat([this.current])[0]).firstVisited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HistoryStack.prototype, "lastVisited", {
        get: function () {
            return this.current.lastVisited;
        },
        enumerable: true,
        configurable: true
    });
    HistoryStack.prototype.compareTo = function (other) {
        return this.current.compareTo(other.current);
    };
    HistoryStack.prototype.equals = function (other) {
        if (this.back.length !== other.back.length ||
            this.forward.length !== other.forward.length) {
            return false;
        }
        if (!this.current.equals(other.current)) {
            return false;
        }
        for (var i = 0; i < this.back.length; i++) {
            if (!this.back[i].equals(other.back[i])) {
                return false;
            }
        }
        for (var i = 0; i < this.forward.length; i++) {
            if (!this.forward[i].equals(other.forward[i])) {
                return false;
            }
        }
        return true;
    };
    return HistoryStack;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HistoryStack;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var serializer_1 = __webpack_require__(6);
var R = __webpack_require__(7);
var Page = Page_1 = (function () {
    function Page(_a) {
        var url = _a.url, params = _a.params, groupName = _a.groupName, containerName = _a.containerName, _b = _a.firstVisited, firstVisited = _b === void 0 ? 0 : _b, _c = _a.lastVisited, lastVisited = _c === void 0 ? 0 : _c, _d = _a.isZeroPage, isZeroPage = _d === void 0 ? false : _d;
        this.type = Page_1.type;
        this.url = url;
        this.params = params;
        this.firstVisited = firstVisited;
        this.lastVisited = Math.max(firstVisited, lastVisited);
        this.containerName = containerName;
        this.groupName = groupName;
        this.isZeroPage = isZeroPage;
    }
    Page.createZeroPage = function (url) {
        return new Page_1({
            url: url,
            params: {},
            groupName: '',
            containerName: '',
            isZeroPage: true
        });
    };
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
    Page.prototype.touch = function (time) {
        return new Page_1(__assign({}, Object(this), { firstVisited: this.firstVisited === 0 ? time : this.firstVisited, lastVisited: time }));
    };
    Page.prototype.compareTo = function (other) {
        return other.lastVisited - this.lastVisited;
    };
    Page.prototype.equals = function (other) {
        return R.equals(this.state, other.state);
    };
    return Page;
}());
Page.type = 'Page';
Page = Page_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], Page);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
var Page_1;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redux_1 = __webpack_require__(157);
var redux_thunk_1 = __webpack_require__(433);
var reducers_1 = __webpack_require__(221);
var store = redux_1.createStore(reducers_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = store;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pathToRegexp = __webpack_require__(448);
var matchPath_1 = __webpack_require__(161);
var R = __webpack_require__(7);
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
    return R.last(R.sort(_compareSize, paramResults));
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */
module.exports = _curry2(function add(a, b) {
  return Number(a) + Number(b);
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry3(function assoc(prop, val, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var curryN = __webpack_require__(8);


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var curry = __webpack_require__(42);


/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */
module.exports = _curry1(function flip(fn) {
  return curry(function(a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _isPlaceholder = __webpack_require__(46);


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined)
                     : _arity(left, _curryN(length, combined, fn));
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var map = __webpack_require__(10);


/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
module.exports = _curry2(function lens(getter, setter) {
  return function(toFunctorFn) {
    return function(target) {
      return map(
        function(focus) {
          return setter(focus, target);
        },
        toFunctorFn(getter(target))
      );
    };
  };
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var liftN = __webpack_require__(131);


/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */
module.exports = _curry1(function lift(fn) {
  return liftN(fn.length, fn);
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */
module.exports = _curry2(function nAry(n, fn) {
  switch (n) {
    case 0: return function() {return fn.call(this);};
    case 1: return function(a0) {return fn.call(this, a0);};
    case 2: return function(a0, a1) {return fn.call(this, a0, a1);};
    case 3: return function(a0, a1, a2) {return fn.call(this, a0, a1, a2);};
    case 4: return function(a0, a1, a2, a3) {return fn.call(this, a0, a1, a2, a3);};
    case 5: return function(a0, a1, a2, a3, a4) {return fn.call(this, a0, a1, a2, a3, a4);};
    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.call(this, a0, a1, a2, a3, a4, a5);};
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6);};
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);};
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);};
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);};
    default: throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var _curryN = __webpack_require__(44);
var _dispatchable = __webpack_require__(4);
var _has = __webpack_require__(9);
var _reduce = __webpack_require__(11);
var _xreduceBy = __webpack_require__(322);


/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general `groupBy` function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
 *      var namesByGrade = reduceToNamesBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Lucy', score: 92},
 *                      {name: 'Drew', score: 85},
 *                      // ...
 *                      {name: 'Bart', score: 62}];
 *      namesByGrade(students);
 *      // {
 *      //   'A': ['Lucy'],
 *      //   'B': ['Drew']
 *      //   // ...,
 *      //   'F': ['Bart']
 *      // }
 */
module.exports = _curryN(4, [], _dispatchable([], _xreduceBy,
  function reduceBy(valueFn, valueAcc, keyFn, list) {
    return _reduce(function(acc, elt) {
      var key = keyFn(elt);
      acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
      return acc;
    }, {}, list);
  }));


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var _complement = __webpack_require__(115);
var _curry2 = __webpack_require__(0);
var filter = __webpack_require__(61);


/**
 * The complement of `filter`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
module.exports = _curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _isString = __webpack_require__(47);


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
module.exports = _curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') :
                           Array.prototype.slice.call(list, 0).reverse();
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.connect = exports.Provider = undefined;

var _Provider = __webpack_require__(428);

var _Provider2 = _interopRequireDefault(_Provider);

var _connect = __webpack_require__(429);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.Provider = _Provider2["default"];
exports.connect = _connect2["default"];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ExecutionEnvironment_1 = __webpack_require__(441);
exports.canUseWindowLocation = ExecutionEnvironment_1.canUseDOM &&
    window.location instanceof Object;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry2 = __webpack_require__(0);
var _reduce = __webpack_require__(11);
var map = __webpack_require__(10);


/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @param {Array} fns An array of functions
 * @param {Array} vs An array of values
 * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */
module.exports = _curry2(function ap(applicative, fn) {
  return (
    typeof applicative.ap === 'function' ?
      applicative.ap(fn) :
    typeof applicative === 'function' ?
      function(x) { return applicative(x)(fn(x)); } :
    // else
      _reduce(function(acc, f) { return _concat(acc, map(f, fn)); }, [], applicative)
  );
});


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _makeFlat = __webpack_require__(123);
var _xchain = __webpack_require__(311);
var map = __webpack_require__(10);


/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */
module.exports = _curry2(_dispatchable(['chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function(x) { return fn(monad(x))(x); };
  }
  return _makeFlat(false)(map(fn, monad));
}));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var pipe = __webpack_require__(140);
var reverse = __webpack_require__(54);


/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
module.exports = function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isArray = __webpack_require__(19);
var _isFunction = __webpack_require__(45);
var toString = __webpack_require__(34);


/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */
module.exports = _curry2(function concat(a, b) {
  if (a == null || !_isFunction(a.concat)) {
    throw new TypeError(toString(a) + ' does not have a method named "concat"');
  }
  if (_isArray(a) && !_isArray(b)) {
    throw new TypeError(toString(b) + ' is not an array');
  }
  return a.concat(b);
});


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _filter = __webpack_require__(117);
var _isObject = __webpack_require__(122);
var _reduce = __webpack_require__(11);
var _xfilter = __webpack_require__(316);
var keys = __webpack_require__(17);


/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
module.exports = _curry2(_dispatchable(['filter'], _xfilter, function(pred, filterable) {
  return (
    _isObject(filterable) ?
      _reduce(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys(filterable)) :
    // else
      _filter(pred, filterable)
  );
}));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _identity = __webpack_require__(65);


/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */
module.exports = _curry1(_identity);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var _objectAssign = __webpack_require__(301);

module.exports =
  typeof Object.assign === 'function' ? Object.assign : _objectAssign;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function _containsWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function _identity(x) { return x; };


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */
module.exports = _curry2(function prop(p, obj) { return obj[p]; });


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = __webpack_require__(28);
var _curry1 = __webpack_require__(1);
var slice = __webpack_require__(22);


/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
module.exports = _curry1(_checkForMethod('tail', slice(1, Infinity)));


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 */
module.exports = _curry1(function type(val) {
  return val === null      ? 'Null'      :
         val === undefined ? 'Undefined' :
         Object.prototype.toString.call(val).slice(8, -1);
});


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(62);
var uniqBy = __webpack_require__(148);


/**
 * Returns a new list containing only one copy of each element in the original
 * list. `R.equals` is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */
module.exports = uniqBy(identity);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var _containsWith = __webpack_require__(64);
var _curry2 = __webpack_require__(0);


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig (a, a -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      var strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */
module.exports = _curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!_containsWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Page_1 = __webpack_require__(37);
var HistoryStack_1 = __webpack_require__(36);
var url_1 = __webpack_require__(39);
var Container = (function () {
    /**
     * Construct a new Container
     * @param name - The container's name
     * @param initialUrl - The starting URL of this container
     * @param patterns - Patterns of URLs that this container handles
     * @param isDefault - Is this the default container?
     * @param resetOnLeave - Keep container history after navigating away?
     * @param groupName - The name of this container's group
     * @param history - Optional but only if time is specified
     */
    function Container(_a) {
        var name = _a.name, initialUrl = _a.initialUrl, patterns = _a.patterns, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, groupName = _a.groupName, history = _a.history;
        this.name = name;
        this.initialUrl = initialUrl;
        this.patterns = patterns;
        this.isDefault = isDefault;
        this.resetOnLeave = resetOnLeave;
        this.groupName = groupName;
        this.history = history ? history : new HistoryStack_1.default({
            back: [],
            current: new Page_1.default({
                url: initialUrl,
                params: url_1.parseParamsFromPatterns(patterns, initialUrl),
                containerName: name,
                groupName: groupName
            }),
            forward: []
        });
    }
    Container.prototype.replaceHistory = function (history) {
        return new Container(__assign({}, Object(this), { history: history }));
    };
    Container.prototype.patternsMatch = function (url) {
        return url_1.patternsMatch(this.patterns, url);
    };
    Container.prototype.push = function (page) {
        return this.replaceHistory(this.history.push(page));
    };
    Container.prototype.pushUrl = function (url, time) {
        if (this.activePage.url === url) {
            return this.activate(time);
        }
        else {
            var page = new Page_1.default({
                url: url,
                params: url_1.parseParamsFromPatterns(this.patterns, url),
                containerName: this.name,
                groupName: this.groupName
            });
            return this.push(page.touch(time));
        }
    };
    Container.prototype.loadFromUrl = function (url, time) {
        if (this.patternsMatch(url)) {
            return this.pushUrl(url, time);
        }
        else {
            return this;
        }
    };
    Container.prototype.activate = function (time) {
        return this.replaceHistory(this.history.activate(time));
    };
    Container.prototype.top = function (time, reset) {
        if (reset === void 0) { reset = false; }
        return this.replaceHistory(this.history.top(time, reset));
    };
    Container.prototype.go = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.replaceHistory(this.history.go(n, time));
    };
    Container.prototype.goForward = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.replaceHistory(this.history.goForward(n, time));
    };
    Container.prototype.goBack = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.replaceHistory(this.history.goBack(n, time));
    };
    Container.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.history.canGoForward(n);
    };
    Container.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.history.canGoBack(n);
    };
    Container.prototype.getShiftAmount = function (page) {
        return this.history.getShiftAmount(page);
    };
    Container.prototype.shiftTo = function (page, time) {
        return this.replaceHistory(this.history.shiftTo(page, time));
    };
    Container.prototype.containsPage = function (page) {
        return this.history.containsPage(page);
    };
    Object.defineProperty(Container.prototype, "activePage", {
        get: function () {
            return this.history.activePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "backPage", {
        get: function () {
            return this.history.backPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "forwardPage", {
        get: function () {
            return this.history.forwardPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "firstVisited", {
        get: function () {
            return this.history.firstVisited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "lastVisited", {
        get: function () {
            return this.history.lastVisited;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.compareTo = function (other) {
        try {
            return this.history.compareTo(other.history);
        }
        catch (e) {
            return -1;
        }
    };
    Object.defineProperty(Container.prototype, "isGroup", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return Container;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Container;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Page_1 = __webpack_require__(37);
var Container_1 = __webpack_require__(74);
var R = __webpack_require__(7);
var Group_1 = __webpack_require__(197);
var IState = (function () {
    function IState(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.groups, groups = _c === void 0 ? [] : _c, zeroPage = _b.zeroPage, _d = _b.lastUpdate, lastUpdate = _d === void 0 ? 0 : _d, _e = _b.loadedFromRefresh, loadedFromRefresh = _e === void 0 ? false : _e, _f = _b.isOnZeroPage, isOnZeroPage = _f === void 0 ? false : _f;
        this.groups = groups;
        this.zeroPage = zeroPage;
        this.lastUpdate = lastUpdate;
        this.loadedFromRefresh = loadedFromRefresh;
        this.isOnZeroPage = isOnZeroPage;
    }
    IState.prototype.replaceGroup = function (group) {
        if (group.parentGroupName) {
            var parentGroup = this.getGroupByName(group.parentGroupName);
            return this.replaceGroup(parentGroup.replaceContainer(group));
        }
        else {
            var i = R.findIndex(function (g) { return g.name === group.name; }, this.groups);
            if (i === -1) {
                return this.assign({
                    groups: this.groups.concat([group])
                });
            }
            else {
                return this.assign({
                    groups: this.groups.slice(0, i).concat([
                        group
                    ], this.groups.slice(i + 1))
                });
            }
        }
    };
    IState.prototype.addTopLevelGroup = function (_a) {
        var name = _a.name, _b = _a.resetOnLeave, resetOnLeave = _b === void 0 ? false : _b, _c = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _c === void 0 ? false : _c;
        var group = new Group_1.default({
            name: name,
            resetOnLeave: resetOnLeave,
            gotoTopOnSelectActive: gotoTopOnSelectActive,
            parentGroupName: null,
            isDefault: null
        });
        return this.replaceGroup(group);
    };
    IState.prototype.addSubGroup = function (_a) {
        var name = _a.name, parentGroupName = _a.parentGroupName, _b = _a.parentUsesDefault, parentUsesDefault = _b === void 0 ? true : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, _d = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _d === void 0 ? false : _d;
        var parentGroup = this.getGroupByName(parentGroupName);
        var group = new Group_1.default({
            name: name,
            resetOnLeave: resetOnLeave,
            gotoTopOnSelectActive: gotoTopOnSelectActive,
            parentGroupName: parentGroupName,
            isDefault: parentUsesDefault ? parentGroup.containers.length === 0 : null
        });
        return this.replaceGroup(group);
    };
    IState.prototype.addContainer = function (_a) {
        var name = _a.name, groupName = _a.groupName, initialUrl = _a.initialUrl, _b = _a.useDefault, useDefault = _b === void 0 ? true : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c, patterns = _a.patterns;
        var group = this.getGroupByName(groupName);
        var container = new Container_1.default({
            initialUrl: initialUrl,
            patterns: patterns,
            resetOnLeave: resetOnLeave,
            groupName: groupName,
            name: name,
            isDefault: group.containers.length === 0 && useDefault
        });
        return this.replaceGroup(group.replaceContainer(container));
    };
    IState.prototype.getGroupByName = function (name) {
        var g = R.find(function (g) { return g.name === name; }, this.groups);
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
    Object.defineProperty(IState.prototype, "browserHistory", {
        get: function () {
            return this.getHistory(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IState.prototype, "browserHistoryWithFwdMaintained", {
        get: function () {
            return this.getHistory(true);
        },
        enumerable: true,
        configurable: true
    });
    IState.prototype.hasGroupWithName = function (name) {
        try {
            this.getGroupByName(name);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Gets the zero page, or if it's not set defaults to using
     * the initialUrl of the first container in the first group
     */
    IState.prototype.getZeroPage = function () {
        return this.zeroPage || Page_1.default.createZeroPage(this.groups[0].containers[0].initialUrl);
    };
    return IState;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IState;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var R = __webpack_require__(7);
var IState_1 = __webpack_require__(75);
var HistoryStack_1 = __webpack_require__(36);
var InitializedState = (function (_super) {
    __extends(InitializedState, _super);
    function InitializedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitializedState.prototype.assign = function (obj) {
        return new InitializedState(__assign({}, Object(this), obj));
    };
    InitializedState.prototype.switchToGroup = function (_a) {
        var groupName = _a.groupName, time = _a.time;
        var group = this.getGroupByName(groupName);
        return this.replaceGroup(group.activate(time));
    };
    InitializedState.prototype.switchToContainer = function (_a) {
        var groupName = _a.groupName, containerName = _a.containerName, time = _a.time;
        var group = this.getGroupByName(groupName);
        return this.replaceGroup(group.activateContainer(containerName, time));
    };
    Object.defineProperty(InitializedState.prototype, "backPage", {
        get: function () {
            return this.activeGroup.backPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitializedState.prototype, "forwardPage", {
        get: function () {
            return this.activeGroup.forwardPage;
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.go = function (n, time) {
        var _this = this;
        if (this.isOnZeroPage && n > 0) {
            var state = this.assign({
                isOnZeroPage: false
            });
            return state.go(n - 1, time);
        }
        var f = function (x) { return _this.replaceGroup(_this.activeGroup.go(x, time)); };
        if (n < 0 && !this.canGoBack(0 - n)) {
            return (n < -1 ? f(n + 1) : this).assign({
                isOnZeroPage: true // go back through group if needed
            });
        }
        else {
            return f(n);
        }
    };
    InitializedState.prototype.goBack = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.replaceGroup(this.activeGroup.goBack(n, time));
    };
    InitializedState.prototype.goForward = function (n, time) {
        if (n === void 0) { n = 1; }
        return this.replaceGroup(this.activeGroup.goForward(n, time));
    };
    InitializedState.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.activeGroup.canGoBack(n);
    };
    InitializedState.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.activeGroup.canGoForward(n);
    };
    InitializedState.prototype.top = function (_a) {
        var groupName = _a.groupName, time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
        var group = groupName != null ?
            this.getGroupByName(groupName) : this.activeGroup;
        return this.replaceGroup(group.top(time, reset));
    };
    InitializedState.prototype.getShiftAmount = function (page) {
        return this.browserHistory.getShiftAmount(page);
    };
    InitializedState.prototype.containsPage = function (page) {
        return this.browserHistory.containsPage(page);
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
    InitializedState.prototype.push = function (page) {
        var group = this.getRootGroupOfGroupByName(page.groupName);
        return this.replaceGroup(group.push(page));
    };
    InitializedState.prototype.getContainerLinkUrl = function (groupName, containerName) {
        var group = this.getGroupByName(groupName);
        return group.getContainerLinkUrl(containerName);
    };
    InitializedState.prototype.getHistory = function (maintainFwd) {
        if (maintainFwd === void 0) { maintainFwd = false; }
        var groupHistory = maintainFwd ?
            this.activeGroup.historyWithFwdMaintained : this.activeGroup.history;
        if (this.isOnZeroPage) {
            return new HistoryStack_1.default({
                back: [],
                current: this.getZeroPage(),
                forward: groupHistory.flatten()
            });
        }
        else {
            return new HistoryStack_1.default(__assign({}, groupHistory, { back: [this.getZeroPage()].concat(groupHistory.back) }));
        }
    };
    Object.defineProperty(InitializedState.prototype, "groupStackOrder", {
        get: function () {
            return R.sort(function (g1, g2) { return g1.compareTo(g2); }, this.groups);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitializedState.prototype, "indexedGroupStackOrder", {
        /**
         * Gets the stack order values as an array of numbers,
         * in original group index order instead of stack order
         */
        get: function () {
            var order = this.groupStackOrder;
            return this.groups.map(function (orig) {
                return R.findIndex(function (g) { return orig.name === g.name; }, order);
            });
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
    Object.defineProperty(InitializedState.prototype, "activePage", {
        get: function () {
            return this.activeGroup.activePage;
        },
        enumerable: true,
        configurable: true
    });
    InitializedState.prototype.isContainerActive = function (groupName, containerName) {
        return this.getGroupByName(groupName).isContainerActive(containerName);
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
            var activeContainer = activeGroup.activeNestedContainer;
            var group = this.getGroupByName(groupName);
            return group.hasNestedContainer(activeContainer);
        }
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
        return this.getGroupByName(groupName).containers[containerName];
    };
    InitializedState.prototype.isActiveContainer = function (groupName, containerName) {
        var c = this.activeContainer;
        return c.groupName === groupName && c.name === containerName;
    };
    InitializedState.prototype.getContainerStackOrderForGroup = function (groupName) {
        return this.getGroupByName(groupName).containerStackOrder;
    };
    InitializedState.prototype.getIndexedContainerStackOrderForGroup = function (groupName) {
        return this.getGroupByName(groupName).indexedContainerStackOrder;
    };
    return InitializedState;
}(IState_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InitializedState;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var IState_1 = __webpack_require__(75);
var UninitializedState = (function (_super) {
    __extends(UninitializedState, _super);
    function UninitializedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UninitializedState.prototype.assign = function (obj) {
        return new UninitializedState(__assign({}, Object(this), obj));
    };
    UninitializedState.prototype.switchToGroup = function (_a) {
        var groupName = _a.groupName, time = _a.time;
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.switchToContainer = function (_a) {
        var groupName = _a.groupName, containerName = _a.containerName, time = _a.time;
        throw new Error('State is uninitialized');
    };
    Object.defineProperty(UninitializedState.prototype, "backPage", {
        get: function () {
            throw new Error('State is uninitialized');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UninitializedState.prototype, "forwardPage", {
        get: function () {
            throw new Error('State is uninitialized');
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.go = function (n, time) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.goBack = function (n, time) {
        if (n === void 0) { n = 1; }
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.goForward = function (n, time) {
        if (n === void 0) { n = 1; }
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.top = function (_a) {
        var groupName = _a.groupName, time = _a.time, _b = _a.reset, reset = _b === void 0 ? false : _b;
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.getShiftAmount = function (page) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.containsPage = function (page) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.getRootGroupOfGroupByName = function (name) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.getRootGroupOfGroup = function (group) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.push = function (page) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.getContainerLinkUrl = function (groupName, containerName) {
        return '';
    };
    UninitializedState.prototype.getHistory = function (maintainFwd) {
        if (maintainFwd === void 0) { maintainFwd = false; }
        throw new Error('State is uninitialized');
    };
    Object.defineProperty(UninitializedState.prototype, "groupStackOrder", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UninitializedState.prototype, "indexedGroupStackOrder", {
        /**
         * Gets the stack order values as an array of numbers,
         * in original group index order instead of stack order
         */
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.getBackPageInGroup = function (groupName) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.getActiveContainerNameInGroup = function (groupName) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.getActiveContainerIndexInGroup = function (groupName) {
        return 0;
    };
    UninitializedState.prototype.getActivePageInGroup = function (groupName) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.isGroupActive = function (groupName) {
        return false;
    };
    Object.defineProperty(UninitializedState.prototype, "activePage", {
        get: function () {
            throw new Error('State is uninitialized');
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.isContainerActive = function (groupName, containerName) {
        return false;
    };
    Object.defineProperty(UninitializedState.prototype, "activeUrl", {
        get: function () {
            throw new Error('State is uninitialized');
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.getActivePageInContainer = function (groupName, containerName) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.getActiveUrlInContainer = function (groupName, containerName) {
        return '';
    };
    Object.defineProperty(UninitializedState.prototype, "activeGroup", {
        get: function () {
            throw new Error('State is uninitialized');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UninitializedState.prototype, "activeContainer", {
        get: function () {
            throw new Error('State is uninitialized');
        },
        enumerable: true,
        configurable: true
    });
    UninitializedState.prototype.getContainer = function (groupName, containerName) {
        throw new Error('State is uninitialized');
    };
    UninitializedState.prototype.isActiveContainer = function (groupName, containerName) {
        return false;
    };
    UninitializedState.prototype.getContainerStackOrderForGroup = function (groupName) {
        return [];
    };
    UninitializedState.prototype.getIndexedContainerStackOrderForGroup = function (groupName) {
        return [];
    };
    return UninitializedState;
}(IState_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UninitializedState;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
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
        return state.goBack(this.n, this.time);
    };
    return Back;
}(Action_1.default));
Back.type = 'Back';
Back = Back_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], Back);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Back;
var Back_1;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
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
        return state.goForward(this.n, this.time);
    };
    return Forward;
}(Action_1.default));
Forward.type = 'Forward';
Forward = Forward_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], Forward);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Forward;
var Forward_1;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var serializer_1 = __webpack_require__(6);
var reconciler_1 = __webpack_require__(93);
var Action_1 = __webpack_require__(13);
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
        var h1 = newState.browserHistoryWithFwdMaintained;
        if (h1.current.isZeroPage) {
            return steps;
        }
        else {
            var h2 = newState.browserHistory;
            return steps.concat(reconciler_1.diffHistoryToSteps(h1, h2));
        }
    };
    return PopState;
}(Action_1.default));
PopState.type = 'PopState';
PopState = PopState_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], PopState);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PopState;
var PopState_1;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var serializer_1 = __webpack_require__(6);
var PageAction_1 = __webpack_require__(204);
var Push = Push_1 = (function (_super) {
    __extends(Push, _super);
    function Push() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = Push_1.type;
        return _this;
    }
    Push.prototype.reduce = function (state) {
        return state.push(this.page);
    };
    return Push;
}(PageAction_1.default));
Push.type = 'Push';
Push = Push_1 = __decorate([
    serializer_1.Serializable
], Push);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Push;
var Push_1;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NonStepAction_1 = __webpack_require__(27);
var Page_1 = __webpack_require__(37);
var serializer_1 = __webpack_require__(6);
var SetZeroPage = SetZeroPage_1 = (function (_super) {
    __extends(SetZeroPage, _super);
    function SetZeroPage(_a) {
        var time = _a.time, url = _a.url;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = SetZeroPage_1.type;
        _this.url = url;
        return _this;
    }
    SetZeroPage.prototype.reduce = function (state) {
        return state.assign({
            zeroPage: this.url ? Page_1.default.createZeroPage(this.url) : null
        });
    };
    return SetZeroPage;
}(NonStepAction_1.default));
SetZeroPage.type = 'SetZeroPage';
SetZeroPage = SetZeroPage_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], SetZeroPage);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetZeroPage;
var SetZeroPage_1;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var serializer_1 = __webpack_require__(6);
var NonStepAction_1 = __webpack_require__(27);
var SetZeroPage_1 = __webpack_require__(82);
var Startup = Startup_1 = (function (_super) {
    __extends(Startup, _super);
    function Startup(_a) {
        var _b = _a === void 0 ? {} : _a, time = _b.time, _c = _b.fromRefresh, fromRefresh = _c === void 0 ? false : _c;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = Startup_1.type;
        _this.fromRefresh = fromRefresh;
        return _this;
    }
    Startup.prototype.updateAfterRefresh = function (time) {
        return new Startup_1(__assign({}, Object(this), { time: time, fromRefresh: true }));
    };
    Startup.prototype.reduce = function (state) {
        return state.assign({
            loadedFromRefresh: this.fromRefresh,
            lastUpdate: this.fromRefresh ? this.time : state.lastUpdate
        });
    };
    Startup.prototype.store = function (actions) {
        var _this = this;
        if (this.fromRefresh) {
            return actions.map(function (a) { return a.updateAfterRefresh(_this.time); }).slice();
        }
        else {
            if (actions.length > 0 && actions[0] instanceof SetZeroPage_1.default) {
                return [actions[0], this];
            }
            else {
                return [this];
            }
        }
    };
    return Startup;
}(NonStepAction_1.default));
Startup.type = 'Startup';
Startup = Startup_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], Startup);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Startup;
var Startup_1;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
var Top = Top_1 = (function (_super) {
    __extends(Top, _super);
    function Top(_a) {
        var time = _a.time, groupName = _a.groupName, _b = _a.reset, reset = _b === void 0 ? false : _b;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = Top_1.type;
        _this.groupName = groupName;
        _this.reset = reset;
        return _this;
    }
    Top.prototype.reduce = function (state) {
        return state.top({
            groupName: this.groupName,
            reset: this.reset,
            time: this.time,
        });
    };
    return Top;
}(Action_1.default));
Top.type = 'Top';
Top = Top_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], Top);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Top;
var Top_1;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NonStepAction_1 = __webpack_require__(27);
var serializer_1 = __webpack_require__(6);
var UpdateBrowser = UpdateBrowser_1 = (function (_super) {
    __extends(UpdateBrowser, _super);
    function UpdateBrowser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = UpdateBrowser_1.type;
        return _this;
    }
    UpdateBrowser.prototype.reduce = function (state) {
        return state.assign({
            lastUpdate: this.time
        });
    };
    return UpdateBrowser;
}(NonStepAction_1.default));
UpdateBrowser.type = 'UpdateBrowser';
UpdateBrowser = UpdateBrowser_1 = __decorate([
    serializer_1.Serializable
], UpdateBrowser);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateBrowser;
var UpdateBrowser_1;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ActionTypes_1 = __webpack_require__(90);
var main_1 = __webpack_require__(12);
exports.locationChanged = function (data) { return (__assign({ type: ActionTypes_1.LOCATION_CHANGED }, data)); };
//const locTrigger = (dispatch, e) => dispatch(locationChanged(e.detail.location))
exports.listenToLocation = function () {
    return function (dispatch) {
        main_1.addChangeListener(function (data) { return dispatch(exports.locationChanged(data)); });
    };
};
exports.unlistenToLocation = function () {
    return function (dispatch) {
        // ???
    };
};
exports.addTitle = function (title) { return (__assign({ type: ActionTypes_1.ADD_LOCATION_TITLE }, title)); };


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var react_redux_1 = __webpack_require__(55);
var store_1 = __webpack_require__(38);
var DumbContainer_1 = __webpack_require__(89);
var main_1 = __webpack_require__(12);
var server_1 = __webpack_require__(73);
var LocationActions_1 = __webpack_require__(86);
var url_1 = __webpack_require__(39);
var CreateContainer_1 = __webpack_require__(200);
var ExecutionEnvironment_1 = __webpack_require__(442);
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(props, context) {
        var _this = _super.call(this, props, context) || this;
        var _a = _this.props, children = _a.children, name = _a.name, patterns = _a.patterns, initialUrl = _a.initialUrl, _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c;
        var _d = _this.context, groupName = _d.groupName, _e = _d.initializing, initializing = _e === void 0 ? false : _e, _f = _d.useDefaultContainer, useDefaultContainer = _f === void 0 ? true : _f;
        main_1.getOrCreateContainer(new CreateContainer_1.default({
            name: name,
            groupName: groupName,
            initialUrl: initialUrl,
            patterns: patterns,
            resetOnLeave: resetOnLeave,
            useDefault: useDefaultContainer
        }));
        if (initializing) {
            var T = (function (_super) {
                __extends(T, _super);
                function T() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                T.prototype.getChildContext = function () {
                    return {
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
            }(react_1.Component));
            T.childContextTypes = DumbContainer_1.default.childContextTypes;
            server_1.renderToStaticMarkup(React.createElement(T, null));
            _this.addTitleForPath(initialUrl);
        }
        return _this;
    }
    Container.prototype.addTitleForPath = function (pathname) {
        var addTitle = this.props.addTitle;
        if (ExecutionEnvironment_1.canUseDOM) {
            addTitle({
                pathname: pathname,
                title: document.title
            });
        }
    };
    Container.prototype.componentDidUpdate = function () {
        var _a = this.props, patterns = _a.patterns, pathname = _a.pathname;
        if (pathname) {
            if (url_1.patternsMatch(patterns, pathname)) {
                this.addTitleForPath(pathname);
            }
        }
    };
    Container.prototype.render = function () {
        var initializing = this.context.initializing;
        if (initializing) {
            return React.createElement("div", null);
        }
        else {
            var _a = this.props.animate, animate = _a === void 0 ? true : _a;
            var props = __assign({}, this.props, this.context, { animate: animate });
            return React.createElement(DumbContainer_1.default, __assign({}, props));
        }
    };
    return Container;
}(react_1.Component));
Container.contextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    initializing: react_1.PropTypes.bool,
    useDefaultContainer: react_1.PropTypes.bool,
    hideInactiveContainers: react_1.PropTypes.bool
};
var mapStateToProps = function (state, ownProps) {
    return __assign({}, ownProps, { pathname: state.pathname });
};
var ConnectedContainer = react_redux_1.connect(mapStateToProps, { addTitle: LocationActions_1.addTitle })(Container);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (props) { return React.createElement(ConnectedContainer, __assign({ store: store_1.default }, props)); };


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var react_redux_1 = __webpack_require__(55);
var store_1 = __webpack_require__(38);
var DumbContainerGroup_1 = __webpack_require__(213);
var main_1 = __webpack_require__(12);
var Container_1 = __webpack_require__(87);
var DumbContainer_1 = __webpack_require__(89);
var server_1 = __webpack_require__(73);
var R = __webpack_require__(7);
var CreateGroup_1 = __webpack_require__(201);
var createElement = React.createElement;
/**
 * Recursively gets the children of a component for simlated rendering
 * so that the containers are initialized even if they're hidden inside tabs
 */
function getChildren(component, depth) {
    if (depth === void 0) { depth = 0; }
    if (!(component instanceof react_1.Component) && !component.type) {
        return [];
    }
    if (component instanceof Container_1.default || component.type === Container_1.default ||
        component instanceof DumbContainer_1.default || component.type === DumbContainer_1.default ||
        (depth > 0 &&
            (component instanceof ContainerGroup || component.type === ContainerGroup ||
                component instanceof DumbContainerGroup_1.default || component.type === DumbContainerGroup_1.default))) {
        return [component]; // Stop if you find a Container or nested ContainerGroup
    }
    else if (component.props && component.props.children) {
        if (component.props.children instanceof Function) {
            return getChildren(createElement(component.props.children), depth + 1);
        }
        else {
            var children = react_1.Children.toArray(component.props.children);
            return R.flatten(children.map(function (c) { return getChildren(c, depth + 1); }));
        }
    }
    else {
        return [component];
    }
}
var mapStateToProps = function (state, ownProps) {
    var name = ownProps.name;
    var initialized = main_1.isInitialized();
    return {
        name: name,
        storedCurrentContainerIndex: main_1.getActiveContainerIndexInGroup(name),
        storedCurrentContainerName: initialized ? main_1.getActiveContainerNameInGroup(name) : null,
        storedIndexedStackOrder: main_1.getIndexedContainerStackOrder(name)
    };
};
var ConnectedContainerGroup = react_redux_1.connect(mapStateToProps)(DumbContainerGroup_1.default);
var ContainerGroup = (function (_super) {
    __extends(ContainerGroup, _super);
    function ContainerGroup(props, context) {
        var _this = _super.call(this, props, context) || this;
        var _a = _this.props, name = _a.name, useDefaultContainer = _a.useDefaultContainer, resetOnLeave = _a.resetOnLeave, gotoTopOnSelectActive = _a.gotoTopOnSelectActive;
        var parentGroupName = _this.context ?
            _this.context.groupName : undefined;
        var parentUsesDefault = _this.context ?
            _this.context.useDefaultContainer : undefined;
        main_1.getOrCreateGroup(new CreateGroup_1.default({
            name: name,
            parentGroupName: parentGroupName,
            parentUsesDefault: parentUsesDefault,
            resetOnLeave: resetOnLeave,
            gotoTopOnSelectActive: gotoTopOnSelectActive
        }));
        var G = (function (_super) {
            __extends(G, _super);
            function G() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            G.prototype.getChildContext = function () {
                return {
                    groupName: name,
                    useDefaultContainer: useDefaultContainer,
                    initializing: true
                };
            };
            G.prototype.render = function () {
                return React.createElement("div", null, this.props.children);
            };
            return G;
        }(react_1.Component));
        G.childContextTypes = {
            groupName: react_1.PropTypes.string.isRequired,
            useDefaultContainer: react_1.PropTypes.bool,
            initializing: react_1.PropTypes.bool
        };
        // Initialize the Containers in this group
        // (since most tab libraries lazy load tabs)
        var children = getChildren(_this);
        children.forEach(function (c) { return server_1.renderToStaticMarkup(React.createElement(G, { children: c })); });
        return _this;
    }
    ContainerGroup.prototype.render = function () {
        return (React.createElement(ConnectedContainerGroup, __assign({ store: store_1.default }, this.props)));
    };
    return ContainerGroup;
}(react_1.Component));
ContainerGroup.contextTypes = {
    groupName: react_1.PropTypes.string,
    useDefaultContainer: react_1.PropTypes.bool // From parent (if any)
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContainerGroup;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var main_1 = __webpack_require__(12);
var url_1 = __webpack_require__(39);
var R = __webpack_require__(7);
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
        return url_1.patternsMatch(patterns, pathname);
    };
    DumbContainer.prototype.matchesLocation = function (_a) {
        var groupName = _a.groupName, patterns = _a.patterns;
        var pathname = this.props.pathname;
        if (main_1.isInitialized()) {
            var activeGroupUrl = main_1.getActiveUrlInGroup(groupName);
            var isActiveInGroup = url_1.patternsMatch(patterns, activeGroupUrl);
            var isGroupActive = main_1.urlMatchesGroup(pathname, groupName);
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
    DumbContainer.prototype.onClick = function () {
        var groupName = this.props.groupName;
        main_1.switchToGroup(groupName);
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
            'useDefaultContainer'
        ], this.props), hideInactiveContainers = _a.hideInactiveContainers, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, divProps = __rest(_a, ["hideInactiveContainers", "children", "style"]);
        if (!hideInactiveContainers || this.matchesLocation(this.props)) {
            return (React.createElement("div", __assign({}, divProps, { onClick: this.onClick.bind(this), style: __assign({}, style, { width: '100%', height: '100%', position: 'relative' }) }), children));
        }
        else {
            return React.createElement("div", null);
        }
    };
    return DumbContainer;
}(react_1.Component));
DumbContainer.locations = {}; // Stays stored even if Container is unmounted
DumbContainer.childContextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    containerName: react_1.PropTypes.string.isRequired,
    pathname: react_1.PropTypes.string.isRequired,
    patterns: react_1.PropTypes.arrayOf(react_1.PropTypes.string).isRequired,
    animate: react_1.PropTypes.bool.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DumbContainer;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.LOCATION_CHANGED = 'location-changed';
exports.ADD_LOCATION_TITLE = 'add-location-title';


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var R = __webpack_require__(7);
exports.getTitleForUrl = function (titles, url) {
    var found = R.find(function (t) { return t.pathname === url; }, titles);
    return found ? found.title : null;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var serializer_1 = __webpack_require__(6);
var R = __webpack_require__(7);
var UninitializedState_1 = __webpack_require__(77);
var store = __webpack_require__(437);
var ClearActions_1 = __webpack_require__(199);
var UpdateBrowser_1 = __webpack_require__(85);
var Store = (function () {
    function Store() {
        this.timeStored = 0;
        this.listeners = [];
        this.actions = [];
        this.timeStored = 0;
    }
    Store.prototype.loadActions = function () {
        if (store.enabled) {
            var objects = store.get('actions');
            if (objects) {
                this.actions = objects.map(function (obj) { return serializer_1.deserialize(obj); });
            }
        }
    };
    Store.prototype.dispatch = function (action) {
        this.actions = action.store(this.actions);
        if (action instanceof ClearActions_1.default) {
            this.timeStored = 0;
            this.storedState = new UninitializedState_1.default();
        }
        this.listeners.forEach(function (fn) { return fn(); });
        if (store.enabled) {
            store.set('actions', this.actions.map(function (a) { return serializer_1.serialize(a); }));
        }
    };
    Store.prototype.deriveState = function (actions, state) {
        if (state === void 0) { state = new UninitializedState_1.default(); }
        return actions.reduce(function (s, a) { return a.reduce(s); }, state);
    };
    /**
     * Derives the state from the list of actions
     * Caches the last derived state for performance
     */
    Store.prototype.getState = function () {
        var _this = this;
        if (this.actions.length === 0) {
            return new UninitializedState_1.default();
        }
        else {
            var lastTime = R.last(this.actions).time;
            var prevTime = this.actions.length > 1 ?
                R.takeLast(2, this.actions)[0].time : lastTime;
            if (lastTime === prevTime && prevTime === this.timeStored) {
                this.storedState = this.deriveState(this.actions); // Just derive all
            }
            else {
                var newActions = this.actions.filter(function (a) { return a.time > _this.timeStored; });
                this.storedState = this.deriveState(newActions, this.storedState);
                this.timeStored = lastTime;
            }
            return this.storedState;
        }
    };
    Store.prototype.getLastAction = function () {
        return R.last(this.actions.filter(function (a) { return !(a instanceof UpdateBrowser_1.default); }));
    };
    Store.prototype.getLastUpdate = function () {
        return this.getState().lastUpdate;
    };
    Store.prototype.subscribe = function (fn) {
        this.listeners.push(fn);
    };
    return Store;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Store();


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var BackStep_1 = __webpack_require__(207);
var R = __webpack_require__(7);
var PushStep_1 = __webpack_require__(209);
var HistoryDiff_1 = __webpack_require__(198);
var ReplaceStep_1 = __webpack_require__(210);
var GoStep_1 = __webpack_require__(208);
var UninitializedState_1 = __webpack_require__(77);
var getFirstDifferenceIndex = function (ps1, ps2) {
    var n = Math.min(ps1.length, ps2.length);
    for (var i = 0; i < n; i++) {
        if (!ps1[i].equals(ps2[i])) {
            return i;
        }
    }
    return n;
};
exports.diffHistory = function (h1, h2) {
    var ps1 = h1 ? h1.flatten() : [];
    var ps2 = h2.flatten();
    var i = getFirstDifferenceIndex(ps1, ps2);
    return new HistoryDiff_1.default({
        same: ps1.slice(0, i),
        removed: ps1.slice(i),
        added: ps2.slice(i),
        oldCurrentIndex: h1 ? h1.index : 0,
        newCurrentIndex: h2 ? h2.index : 0
    });
};
var addStep = function (p) { return new (p.isZeroPage ? ReplaceStep_1.default : PushStep_1.default)(p); };
exports.diffToSteps = function (diff) {
    var addSteps = diff.added.map(addStep);
    if (diff.removed.length > 0) {
        var newIndexFromEnd = diff.newIndexFromEnd;
        if (addSteps.length === 0) {
            if (diff.same.length === 0) {
                throw new Error('diff.same is empty');
            }
            var extraAddStep = addStep(R.last(diff.same));
            if (newIndexFromEnd > 0) {
                return [extraAddStep, new BackStep_1.default(newIndexFromEnd)];
            }
            else {
                return [new BackStep_1.default(), extraAddStep];
            }
        }
        else {
            var backAmount = diff.removed.length - diff.oldIndexFromEnd;
            var steps = backAmount > 0 ? [new BackStep_1.default(backAmount)] : [];
            steps = steps.concat(addSteps);
            if (newIndexFromEnd > 0) {
                steps = steps.concat([new BackStep_1.default(newIndexFromEnd)]);
            }
            return steps;
        }
    }
    else {
        if (addSteps.length === 0 && diff.indexDelta !== 0) {
            return [new GoStep_1.default(diff.indexDelta)];
        }
        else {
            return addSteps;
        }
    }
};
exports.diffHistoryToSteps = R.compose(exports.diffToSteps, exports.diffHistory);
/**
 * Get the difference between oldState and newState and return a list of
 * browser functions to transform the browser history from oldState to newState
 * @param oldState {IState} The original historyStore state
 * @param newState {IState} The new historyStore state
 * @returns {Step[]} An array of steps to get from old state to new state
 */
exports.diffStateToSteps = function (oldState, newState) {
    if (newState instanceof UninitializedState_1.default) {
        return [];
    }
    var h2 = newState.browserHistory;
    if (oldState instanceof UninitializedState_1.default) {
        return exports.diffHistoryToSteps(null, h2);
    }
    var h1 = oldState.browserHistory;
    return exports.diffHistoryToSteps(h1, h2);
};


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(229);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = Symbol;


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(230);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = isPlainObject;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry3 = __webpack_require__(2);


/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */
module.exports = _curry3(function adjust(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */
module.exports = _curry2(function and(a, b) {
  return a && b;
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xany = __webpack_require__(124);


/**
 * Returns `true` if at least one of elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      var lessThan0 = R.flip(R.lt)(0);
 *      var lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */
module.exports = _curry2(_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */
module.exports = _curry2(function apply(fn, args) {
  return fn.apply(this, args);
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var _has = __webpack_require__(9);
var _isArray = __webpack_require__(19);
var _isInteger = __webpack_require__(120);
var assoc = __webpack_require__(41);


/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */
module.exports = _curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _curry2 = __webpack_require__(0);


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */
module.exports = _curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var chain = __webpack_require__(58);
var compose = __webpack_require__(59);
var map = __webpack_require__(10);


/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       var get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       var getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */
module.exports = function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }
  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return compose(compose.apply(this, map(chain, init)), last);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var curry = __webpack_require__(42);
var nAry = __webpack_require__(51);


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      };
 *      Salad.prototype.recipe = function() {
 *        var instructions = R.map((ingredient) => (
 *          'Add a whollop of ' + ingredient, this.ingredients)
 *        )
 *        return R.join('\n', instructions)
 *      }
 *
 *      var ThreeLayerSalad = R.constructN(3, Salad)
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup')
 *      console.log(salad.recipe());
 *      // Add a whollop of Mayonnaise
 *      // Add a whollop of Potato Chips
 *      // Add a whollop of Potato Ketchup
 */
module.exports = _curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }
  if (n === 0) {
    return function() { return new Fn(); };
  }
  return curry(nAry(n, function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case  1: return new Fn($0);
      case  2: return new Fn($0, $1);
      case  3: return new Fn($0, $1, $2);
      case  4: return new Fn($0, $1, $2, $3);
      case  5: return new Fn($0, $1, $2, $3, $4);
      case  6: return new Fn($0, $1, $2, $3, $4, $5);
      case  7: return new Fn($0, $1, $2, $3, $4, $5, $6);
      case  8: return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case  9: return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10: return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _map = __webpack_require__(48);
var curryN = __webpack_require__(8);
var max = __webpack_require__(24);
var pluck = __webpack_require__(33);
var reduce = __webpack_require__(18);


/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig (x1 -> x2 -> ... -> z) -> [(a -> b -> ... -> x1), (a -> b -> ... -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */
module.exports = _curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function() {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function(fn) {
      return fn.apply(context, args);
    }, fns));
  });
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */
module.exports = _curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__(21);
var _curry2 = __webpack_require__(0);


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared are compared
 * in terms of value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */
module.exports = _curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var _containsWith = __webpack_require__(64);
var _curry3 = __webpack_require__(2);


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      var cmp = (x, y) => x.a === y.a;
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      var l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */
module.exports = _curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_containsWith(pred, first[idx], second) &&
        !_containsWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
module.exports = _curry2(function dissoc(prop, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xdrop = __webpack_require__(312);
var slice = __webpack_require__(22);


/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {[a]} list
 * @return {[a]} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */
module.exports = _curry2(_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xdropRepeatsWith = __webpack_require__(125);
var last = __webpack_require__(129);


/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a, a -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */
module.exports = _curry2(_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));



/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _isArguments = __webpack_require__(119);
var _isArray = __webpack_require__(19);
var _isObject = __webpack_require__(122);
var _isString = __webpack_require__(47);


/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty` and/or
 * `<Type>.prototype.empty`.
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */
module.exports = _curry1(function empty(x) {
  return (
    (x != null && typeof x.empty === 'function') ?
      x.empty() :
    (x != null && x.constructor != null && typeof x.constructor.empty === 'function') ?
      x.constructor.empty() :
    _isArray(x) ?
      [] :
    _isString(x) ?
      '' :
    _isObject(x) ?
      {} :
    _isArguments(x) ?
      (function() { return arguments; }()) :
    // else
      void 0
  );
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
module.exports = _curry2(function identical(a, b) {
  // SameValue algorithm
  if (a === b) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var _cloneRegExp = __webpack_require__(114);
var type = __webpack_require__(69);


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
module.exports = function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ?
        _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':  return copy({});
    case 'Array':   return copy([]);
    case 'Date':    return new Date(value.valueOf());
    case 'RegExp':  return _cloneRegExp(value);
    default:        return value;
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global     ? 'g' : '') +
                                    (pattern.ignoreCase ? 'i' : '') +
                                    (pattern.multiline  ? 'm' : '') +
                                    (pattern.sticky     ? 'y' : '') +
                                    (pattern.unicode    ? 'u' : ''));
};


/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _curry2 = __webpack_require__(0);


module.exports = function _createPartialApplicator(concat) {
  return _curry2(function(fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function() {
      return fn.apply(this, concat(args, arguments));
    });
  });
};


/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var equals = __webpack_require__(15);


module.exports = function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var _has = __webpack_require__(9);


module.exports = (function() {
  var toString = Object.prototype.toString;
  return toString.call(arguments) === '[object Arguments]' ?
    function _isArguments(x) { return toString.call(x) === '[object Arguments]'; } :
    function _isArguments(x) { return _has('callee', x); };
}());


/***/ }),
/* 120 */
/***/ (function(module, exports) {

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return (n << 0) === n;
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
};


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(30);


/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */
module.exports = function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduced = __webpack_require__(20);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny.prototype['@@transducer/init'] = _xfBase.init;
  XAny.prototype['@@transducer/result'] = function(result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAny.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }
    return result;
  };

  return _curry2(function _xany(f, xf) { return new XAny(f, xf); });
}());


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
  XDropRepeatsWith.prototype['@@transducer/step'] = function(result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xdropRepeatsWith(pred, xf) { return new XDropRepeatsWith(pred, xf); });
}());


/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = (function() {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function() {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
  XWrap.prototype['@@transducer/step'] = function(acc, x) {
    return this.f(acc, x);
  };

  return function _xwrap(fn) { return new XWrap(fn); };
}());


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */
module.exports = _curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var converge = __webpack_require__(104);


/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      var getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */
module.exports = _curry1(function juxt(fns) {
  return converge(function() { return Array.prototype.slice.call(arguments, 0); }, fns);
});


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var nth = __webpack_require__(31);


/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */
module.exports = nth(-1);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _isNumber = __webpack_require__(121);


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */
module.exports = _curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduce = __webpack_require__(11);
var ap = __webpack_require__(57);
var curryN = __webpack_require__(8);
var map = __webpack_require__(10);


/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */
module.exports = _curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function() {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var sum = __webpack_require__(145);


/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */
module.exports = _curry1(function mean(list) {
  return sum(list) / list.length;
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var _has = __webpack_require__(9);


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object. The key
 * will be excluded from the returned object if the resulting value is
 * `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig (String -> a -> a -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */
module.exports = _curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !(_has(k, result))) {
      result[k] = r[k];
    }
  }

  return result;
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */
module.exports = _curry2(function multiply(a, b) { return a * b; });


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */
module.exports = _curry1(function not(a) {
  return !a;
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */
module.exports = _curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */
module.exports = _curry2(function or(a, b) {
  return a || b;
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */
module.exports = (function() {
  // `Identity` is a functor that holds a single value, where `map` simply
  // transforms the held value with the provided function.
  var Identity = function(x) {
    return {value: x, map: function(f) { return Identity(f(x)); }};
  };

  return _curry3(function over(lens, f, x) {
    // The value returned by the getter function is first transformed with `f`,
    // then set as the value of an `Identity`. This is then mapped over with the
    // setter function of the lens.
    return lens(function(y) { return Identity(f(y)); })(x).value;
  });
}());


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */
module.exports = _curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _pipe = __webpack_require__(303);
var reduce = __webpack_require__(18);
var tail = __webpack_require__(68);


/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
module.exports = function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length,
                reduce(_pipe, arguments[0], tail(arguments)));
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _pipeP = __webpack_require__(304);
var reduce = __webpack_require__(18);
var tail = __webpack_require__(68);


/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The leftmost function may have any arity; the remaining functions
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */
module.exports = function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }
  return _arity(arguments[0].length,
                reduce(_pipeP, arguments[0], tail(arguments)));
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry2 = __webpack_require__(0);


/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */
module.exports = _curry2(function prepend(el, list) {
  return _concat([el], list);
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to `reduce`, except moves through the input list from the right to
 * the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a, b -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *          -               -2
 *         / \              / \
 *        1   -            1   3
 *           / \              / \
 *          2   -     ==>    2  -1
 *             / \              / \
 *            3   -            3   4
 *               / \              / \
 *              4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */
module.exports = _curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var ap = __webpack_require__(57);
var map = __webpack_require__(10);
var prepend = __webpack_require__(142);
var reduceRight = __webpack_require__(143);


/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */
module.exports = _curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ?
    traversable.sequence(of) :
    reduceRight(function(x, acc) { return ap(map(prepend, x), acc); },
                of([]),
                traversable);
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var add = __webpack_require__(40);
var reduce = __webpack_require__(18);


/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */
module.exports = reduce(add, 0);


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xtake = __webpack_require__(323);
var slice = __webpack_require__(22);


/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */
module.exports = _curry2(_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */
module.exports = _curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var _Set = __webpack_require__(291);
var _curry2 = __webpack_require__(0);


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. `R.equals` is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */
module.exports = _curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var adjust = __webpack_require__(96);
var always = __webpack_require__(23);


/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */
module.exports = _curry3(function update(idx, x, list) {
  return adjust(always(x), idx, list);
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var curryN = __webpack_require__(8);


/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (x1 -> x2 -> ... -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */
module.exports = _curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function() {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var keys = __webpack_require__(17);


/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */
module.exports = _curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _has = __webpack_require__(9);


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as `filter` and `find`.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(__, 10),
 *        y: R.lt(__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */
module.exports = _curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }
  return true;
});


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(3);

exports["default"] = _react.PropTypes.shape({
  subscribe: _react.PropTypes.func.isRequired,
  dispatch: _react.PropTypes.func.isRequired,
  getState: _react.PropTypes.func.isRequired
});

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(158);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}



/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = require("history/createMemoryHistory");

/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = require("react-router/matchPath");

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = require("react-tabs");

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(180);

var _App2 = _interopRequireDefault(_App);

var _server = __webpack_require__(73);

var _reactRouter = __webpack_require__(160);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(req, res) {
  var context = {};

  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRouter.StaticRouter,
    { location: req.url, context: context },
    _react2.default.createElement(_App2.default, null)
  ));

  //res.setHeader('Content-Type', 'text/html charset=utf-8')

  if (context.url) {
    return res.redirect(302, context.url);
  }

  //res.render('index.ejs', { reactOutput: html} )
  return res.status(context.status || 200).send('\n      <!doctype html>\n      <html lang="en">\n        <head>\n          <meta charSet="utf-8" />\n          <title>React Starter</title>\n          <link rel="stylesheet" href="/static/style.css" />\n        </head>\n        <body>\n          <div id="root">' + html + '</div>\n          <script src="/static/client.js"></script>\n        </body>\n      </html>\n    ');
}

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(171);
var isArguments = __webpack_require__(170);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 170 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 171 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),
/* 173 */
/***/ (function(module, exports) {

/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;


/***/ }),
/* 174 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;


/***/ }),
/* 175 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = __webpack_require__(173),
    isArguments = __webpack_require__(174),
    isArray = __webpack_require__(175);

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;


/***/ }),
/* 177 */
/***/ (function(module, exports) {

exports.__esModule = true;
var TAG_NAMES = exports.TAG_NAMES = {
    HTML: "htmlAttributes",
    TITLE: "title",
    BASE: "base",
    META: "meta",
    LINK: "link",
    SCRIPT: "script",
    NOSCRIPT: "noscript",
    STYLE: "style"
};

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    NAME: "name",
    CHARSET: "charset",
    HTTPEQUIV: "http-equiv",
    REL: "rel",
    HREF: "href",
    PROPERTY: "property",
    SRC: "src",
    INNER_HTML: "innerHTML",
    CSS_TEXT: "cssText",
    ITEM_PROP: "itemprop"
};

var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
    "charset": "charSet",
    "http-equiv": "httpEquiv",
    "itemprop": "itemProp",
    "class": "className"
};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _exenv = __webpack_require__(172);

var _exenv2 = _interopRequireDefault(_exenv);

var _shallowequal = __webpack_require__(179);

var _shallowequal2 = _interopRequireDefault(_shallowequal);

module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = undefined;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = (function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        _Component.apply(this, arguments);
      }

      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !_shallowequal2['default'](nextProps, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return _react2['default'].createElement(WrappedComponent, this.props);
      };

      _createClass(SideEffect, null, [{
        key: 'displayName',

        // Try to use displayName of wrapped component
        value: 'SideEffect(' + getDisplayName(WrappedComponent) + ')',

        // Expose canUseDOM so tests can monkeypatch it
        enumerable: true
      }, {
        key: 'canUseDOM',
        value: _exenv2['default'].canUseDOM,
        enumerable: true
      }]);

      return SideEffect;
    })(_react.Component);

    return SideEffect;
  };
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fetchKeys = __webpack_require__(176);

module.exports = function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
        return !!ret;
    }

    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = fetchKeys(objA);
    var keysB = fetchKeys(objB);

    var len = keysA.length;
    if (len !== keysB.length) {
        return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < len; i++) {
        var key = keysA[i];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];

        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (_ret === false || _ret === void 0 && valueA !== valueB) {
            return false;
        }
    }

    return true;
};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _Tabs = __webpack_require__(184);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Windows = __webpack_require__(185);

var _Windows2 = _interopRequireDefault(_Windows);

var _NestedGroup = __webpack_require__(181);

var _NestedGroup2 = _interopRequireDefault(_NestedGroup);

var _ScrollAreaExample = __webpack_require__(182);

var _ScrollAreaExample2 = _interopRequireDefault(_ScrollAreaExample);

var _StateTree = __webpack_require__(183);

var _StateTree2 = _interopRequireDefault(_StateTree);

__webpack_require__(187);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: 'app-container' },
    _react2.default.createElement(
      'div',
      { className: 'left-container' },
      _react2.default.createElement(
        'div',
        { className: 'top-container' },
        _react2.default.createElement(
          'div',
          { className: 'tabs-container' },
          _react2.default.createElement(_Tabs2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'windows-container' },
          _react2.default.createElement(_Windows2.default, null)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'bottom-container' },
        _react2.default.createElement(
          'div',
          { className: 'nested-group-container' },
          _react2.default.createElement(_NestedGroup2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'scroll-area-container' },
          _react2.default.createElement(_ScrollAreaExample2.default, null)
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'state-tree-container' },
      _react2.default.createElement(_StateTree2.default, null)
    )
  );
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRouterNestedHistory = __webpack_require__(25);

__webpack_require__(188);

var _reactHelmet = __webpack_require__(35);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = function regex(c) {
  return ':category(' + c + ')';
};

var foods = {
  'Fruit': {
    'Apple': ['Green', 'Red'],
    'Orange': ['Tangerine', 'Mandarin', 'Clementine'],
    'Banana': ['Plantain']
  },
  'Vegetables': {
    'Carrot': ['Baby', 'Full'],
    'Pepper': ['Green', 'Red', 'Yellow', 'Orange']
  },
  'Meat': {
    'Poultry': ['Chicken', 'Turkey', 'Duck'],
    'Fish': ['Salmon', 'Flounder'],
    'Pork': ['Ham', 'Chop'],
    'Beef': ['Hamburger', 'Steak']
  },
  'Dairy': {
    'Milk': ['4%', '2%', '1%', 'Skim'],
    'Cheese': ['Cheddar', 'Swiss', 'Gouda']
  }
};
var foodGroups = Object.keys(foods);

var FoodsHeader = function FoodsHeader() {
  return _react2.default.createElement(
    'div',
    { className: 'header' },
    foodGroups.map(function (c) {
      return _react2.default.createElement(
        _reactRouterNestedHistory.HeaderLink,
        { key: c,
          toContainer: c,
          className: 'header-item',
          activeClassName: 'active-header-item' },
        c
      );
    })
  );
};

var FoodsMaster = function FoodsMaster(_ref) {
  var category = _ref.match.params.category;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'food-title' },
      category
    ),
    _react2.default.createElement(
      'ul',
      null,
      Object.keys(foods[category]).map(function (foods) {
        return _react2.default.createElement(
          'li',
          { key: foods },
          _react2.default.createElement(
            _reactRouterNestedHistory.HistoryLink,
            { to: '/foods/' + category + '/' + foods },
            foods
          )
        );
      })
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: category })
  );
};

var FoodDetail = function FoodDetail(_ref2) {
  var _ref2$match$params = _ref2.match.params,
      category = _ref2$match$params.category,
      food = _ref2$match$params.food,
      className = _ref2.className;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactRouterNestedHistory.BackLink, null),
    _react2.default.createElement(
      'p',
      { className: 'food-title' },
      category,
      ' > ',
      food
    ),
    _react2.default.createElement(
      'ul',
      null,
      foods[category][food].map(function (type) {
        return _react2.default.createElement(
          'li',
          { key: type },
          _react2.default.createElement(
            _reactRouterNestedHistory.HistoryLink,
            { to: '/foods/' + category + '/' + food + '/' + type },
            type
          )
        );
      })
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: category + ' - ' + food })
  );
};

var FoodTypeDetail = function FoodTypeDetail(_ref3) {
  var _ref3$match$params = _ref3.match.params,
      category = _ref3$match$params.category,
      food = _ref3$match$params.food,
      type = _ref3$match$params.type,
      className = _ref3.className;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactRouterNestedHistory.BackLink, null),
    _react2.default.createElement(
      'p',
      { className: 'food-title' },
      category,
      ' > ',
      food,
      ' > ',
      type
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: category + ' - ' + food + ' - ' + type })
  );
};

var Notes = function Notes() {
  return _react2.default.createElement(
    'div',
    null,
    'This just has notes in it',
    _react2.default.createElement(_reactHelmet2.default, { title: 'Notes' })
  );
};

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: 'nested windows' },
    _react2.default.createElement(
      'h2',
      null,
      'Nested group example'
    ),
    _react2.default.createElement(
      'div',
      { className: 'description' },
      _react2.default.createElement(
        'p',
        null,
        'Two groups are nested inside another group.'
      ),
      _react2.default.createElement(
        'p',
        null,
        foodGroups[0],
        ' is considered the default tab.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'When selecting an already active tab, it will go to the top of that tree.'
      )
    ),
    _react2.default.createElement(
      _reactRouterNestedHistory.WindowGroup,
      { name: 'nested' },
      _react2.default.createElement(
        _reactRouterNestedHistory.Window,
        { className: 'window foods' },
        _react2.default.createElement(
          _reactRouterNestedHistory.ContainerGroup,
          { name: 'foods', gotoTopOnSelectActive: true },
          _react2.default.createElement(FoodsHeader, null),
          foodGroups.map(function (c) {
            return _react2.default.createElement(
              _reactRouterNestedHistory.Container,
              {
                name: c,
                key: c,
                initialUrl: '/foods/' + c,
                resetOnLeave: true,
                patterns: ['/foods/' + regex(c), '/foods/' + regex(c) + '/:food', '/foods/' + regex(c) + '/:food/:type']
              },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { path: '/foods/' + regex(c), exact: true,
                  component: FoodsMaster }),
                _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { path: '/foods/' + regex(c) + '/:food', exact: true,
                  component: FoodDetail }),
                _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { path: '/foods/' + regex(c) + '/:food/:type', exact: true,
                  component: FoodTypeDetail })
              )
            );
          })
        )
      ),
      _react2.default.createElement(
        _reactRouterNestedHistory.Window,
        { className: 'window nested-window notes' },
        _react2.default.createElement(
          _reactRouterNestedHistory.Container,
          { name: 'notes', animate: false, initialUrl: '/notes', patterns: ['/notes'] },
          _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { path: '/notes', exact: true, component: Notes })
        )
      )
    )
  );
};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactTabs = __webpack_require__(162);

var _reactRouterNestedHistory = __webpack_require__(25);

var _reactHelmet = __webpack_require__(35);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

__webpack_require__(189);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollArea1 = function ScrollArea1() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'tab-title' },
      'Tab 1'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This is scroll tab #1.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'When you switch to another tab it will remember the position of this tab\'s scroll.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'You could also make it forget the scroll when leaving the container by using the `resetOnLeave` boolean prop, but in this case it\'s not set.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'When you switch to another tab it will remember the position of this tab\'s scroll.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'You could also make it forget the scroll when leaving the container by using the `resetOnLeave` boolean prop, but in this case it\'s not set.'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Scroll 1' })
  );
};

var ScrollArea2 = function ScrollArea2() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'tab-title' },
      'Tab 2'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This is scroll tab #2.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'When you switch to another tab it will remember the position of this tab\'s scroll.'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Scroll 2' })
  );
};

var ScrollArea3 = function ScrollArea3() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'tab-title' },
      'Tab 3'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This is scroll tab #3.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'When you switch to another tab it will remember the position of this tab\'s scroll.'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Scroll 3' })
  );
};

var Scroll = function Scroll(_ref) {
  var number = _ref.number,
      children = _ref.children;

  var path = '/scroll/' + number;
  return _react2.default.createElement(
    _reactRouterNestedHistory.Container,
    { name: 'scroll' + number, initialUrl: path, patterns: [path] },
    _react2.default.createElement(
      _reactRouterNestedHistory.HistoryRoute,
      { exact: true, path: path },
      function () {
        return _react2.default.createElement(
          _reactRouterNestedHistory.ScrollArea,
          null,
          children
        );
      }
    )
  );
};

var Scroll1 = function Scroll1() {
  return _react2.default.createElement(
    Scroll,
    { number: 1 },
    _react2.default.createElement(ScrollArea1, null)
  );
};
var Scroll2 = function Scroll2() {
  return _react2.default.createElement(
    Scroll,
    { number: 2 },
    _react2.default.createElement(ScrollArea2, null)
  );
};
var Scroll3 = function Scroll3() {
  return _react2.default.createElement(
    Scroll,
    { number: 3 },
    _react2.default.createElement(ScrollArea3, null)
  );
};

var ScrollAreaExample = function (_Component) {
  _inherits(ScrollAreaExample, _Component);

  function ScrollAreaExample(props) {
    _classCallCheck(this, ScrollAreaExample);

    var _this = _possibleConstructorReturn(this, (ScrollAreaExample.__proto__ || Object.getPrototypeOf(ScrollAreaExample)).call(this, props));

    _this.state = {
      activeTabIndex: 0
    };
    return _this;
  }

  _createClass(ScrollAreaExample, [{
    key: 'onContainerActivate',
    value: function onContainerActivate(_ref2) {
      var currentContainerIndex = _ref2.currentContainerIndex;

      this.setState({ activeTabIndex: currentContainerIndex });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'ScrollArea example'
        ),
        _react2.default.createElement(
          'div',
          { className: 'description' },
          _react2.default.createElement(
            'p',
            null,
            'Each tab remembers its own scroll position.'
          )
        ),
        _react2.default.createElement(
          _reactRouterNestedHistory.ContainerGroup,
          { name: 'scroll',
            currentContainerIndex: this.state.activeTabIndex,
            onContainerActivate: this.onContainerActivate.bind(this),
            gotoTopOnSelectActive: true
          },
          _react2.default.createElement(
            _reactTabs.Tabs,
            { onSelect: function onSelect(activeTabIndex) {
                return _this2.setState({ activeTabIndex: activeTabIndex });
              },
              selectedIndex: this.state.activeTabIndex },
            _react2.default.createElement(
              _reactTabs.TabList,
              null,
              _react2.default.createElement(
                _reactTabs.Tab,
                null,
                'One'
              ),
              _react2.default.createElement(
                _reactTabs.Tab,
                null,
                'Two'
              ),
              _react2.default.createElement(
                _reactTabs.Tab,
                null,
                'Three'
              )
            ),
            _react2.default.createElement(
              _reactTabs.TabPanel,
              null,
              _react2.default.createElement(
                'div',
                { className: 'tab-content' },
                _react2.default.createElement(Scroll1, null)
              )
            ),
            _react2.default.createElement(
              _reactTabs.TabPanel,
              null,
              _react2.default.createElement(
                'div',
                { className: 'tab-content' },
                _react2.default.createElement(Scroll2, null)
              )
            ),
            _react2.default.createElement(
              _reactTabs.TabPanel,
              null,
              _react2.default.createElement(
                'div',
                { className: 'tab-content' },
                _react2.default.createElement(Scroll3, null)
              )
            )
          )
        )
      );
    }
  }]);

  return ScrollAreaExample;
}(_react.Component);

exports.default = ScrollAreaExample;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRouterNestedHistory = __webpack_require__(25);

__webpack_require__(190);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HistoryTree = function HistoryTree(_ref) {
  var history = _ref.history,
      className = _ref.className;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      history.back.map(function (page, i) {
        return _react2.default.createElement(
          'div',
          { key: i },
          page.url
        );
      })
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { className: className + ' current-page' },
        history.current.url
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      history.forward.map(function (page, i) {
        return _react2.default.createElement(
          'div',
          { key: i },
          page.url
        );
      })
    )
  );
};

var GroupTree = function GroupTree(_ref2) {
  var group = _ref2.group;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      'Group: ' + group.name
    ),
    _react2.default.createElement(HistoryTree, { history: group.history,
      className: (0, _reactRouterNestedHistory.isGroupActive)(group.name) ? 'active group' : 'group' }),
    _react2.default.createElement(
      'div',
      null,
      group.containers.map(function (container) {
        return _react2.default.createElement(
          'div',
          { key: group.name + ' ' + container.name },
          container.isGroup ? _react2.default.createElement(GroupTree, { group: container }) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              null,
              'Container: ' + container.name
            ),
            _react2.default.createElement(HistoryTree, { history: container.history, className: 'container' })
          )
        );
      })
    )
  );
};

var StateTree = function StateTree(_ref3) {
  var groups = _ref3.groups,
      activeGroup = _ref3.activeGroup;
  return _react2.default.createElement(
    'div',
    { className: 'state-tree' },
    groups.map(function (group) {
      return _react2.default.createElement(GroupTree, { key: group.name,
        group: group,
        activeGroup: activeGroup
      });
    })
  );
};

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    _this.state = {
      groups: []
    };
    return _this;
  }

  _createClass(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.unlisten = (0, _reactRouterNestedHistory.addChangeListener)(function (_ref4) {
        var groups = _ref4.state.groups;

        _this2.setState({
          groups: groups
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unlisten();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(StateTree, this.state);
    }
  }]);

  return _class;
}(_react.Component);

exports.default = _class;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactTabs = __webpack_require__(162);

var _reactRouterNestedHistory = __webpack_require__(25);

var _reactHelmet = __webpack_require__(35);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

__webpack_require__(191);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabMaster1 = function TabMaster1() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'tab-title' },
      'Tab 1'
    ),
    _react2.default.createElement(
      _reactRouterNestedHistory.HistoryLink,
      { to: '/tabs/1/balloon' },
      'Balloon'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Clicking the link will push a new page to this tab\'s history.'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Tab 1' })
  );
};

var TabMaster2 = function TabMaster2() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'tab-title' },
      'Tab 2'
    ),
    _react2.default.createElement(
      _reactRouterNestedHistory.HistoryLink,
      { to: '/tabs/2/flower' },
      'flower'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Using the browser\'s back button will go back to the default tab.'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Tab 2' })
  );
};

var TabMaster3 = function TabMaster3() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'tab-title' },
      'Tab 3'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Tab 3' })
  );
};

var TabPage = function TabPage(_ref) {
  var page = _ref.match.params.page;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      { className: 'page-content' },
      'Page: ',
      page
    ),
    _react2.default.createElement(
      'p',
      null,
      'Using the browser\'s back button will go back to this tab\'s previous page.'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Tabs: ' + page })
  );
};

var Tab = function Tab(_ref2) {
  var name = _ref2.name,
      initialUrl = _ref2.initialUrl,
      patterns = _ref2.patterns,
      masterComponent = _ref2.masterComponent;
  return _react2.default.createElement(
    _reactRouterNestedHistory.Container,
    { name: name, initialUrl: initialUrl, patterns: patterns },
    _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { exact: true, path: patterns[0], component: masterComponent }),
    _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { exact: true, path: patterns[1], component: TabPage })
  );
};

var Tab1 = function Tab1() {
  return _react2.default.createElement(Tab, { name: 'tab1',
    initialUrl: '/tabs/1',
    patterns: ['/tabs/1', '/tabs/1/:page'],
    masterComponent: TabMaster1 });
};

var Tab2 = function Tab2() {
  return _react2.default.createElement(Tab, { name: 'tab2',
    initialUrl: '/tabs/2',
    patterns: ['/tabs/2', '/tabs/2/:page'],
    masterComponent: TabMaster2 });
};

var Tab3 = function Tab3() {
  return _react2.default.createElement(Tab, { name: 'tab3',
    initialUrl: '/tabs/3',
    patterns: ['/tabs/3', '/tabs/3/:page'],
    masterComponent: TabMaster3 });
};

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _this.state = {
      activeTabIndex: 0
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'onContainerActivate',
    value: function onContainerActivate(_ref3) {
      var currentContainerIndex = _ref3.currentContainerIndex;

      this.setState({ activeTabIndex: currentContainerIndex });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Tabs example'
        ),
        _react2.default.createElement(
          'div',
          { className: 'description' },
          _react2.default.createElement(
            'p',
            null,
            'Each tab has its own individual history.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Tab 1 is considered a default tab.'
          )
        ),
        _react2.default.createElement(
          _reactRouterNestedHistory.ContainerGroup,
          { name: 'tabs',
            currentContainerIndex: this.state.activeTabIndex,
            onContainerActivate: this.onContainerActivate.bind(this),
            gotoTopOnSelectActive: true
          },
          _react2.default.createElement(
            _reactTabs.Tabs,
            { onSelect: function onSelect(activeTabIndex) {
                return _this2.setState({ activeTabIndex: activeTabIndex });
              },
              selectedIndex: this.state.activeTabIndex },
            _react2.default.createElement(
              _reactTabs.TabList,
              null,
              _react2.default.createElement(
                _reactTabs.Tab,
                null,
                'One'
              ),
              _react2.default.createElement(
                _reactTabs.Tab,
                null,
                'Two'
              ),
              _react2.default.createElement(
                _reactTabs.Tab,
                null,
                'Three'
              )
            ),
            _react2.default.createElement(
              _reactTabs.TabPanel,
              null,
              _react2.default.createElement(
                'div',
                { className: 'tab-content' },
                _react2.default.createElement(Tab1, null)
              )
            ),
            _react2.default.createElement(
              _reactTabs.TabPanel,
              null,
              _react2.default.createElement(
                'div',
                { className: 'tab-content' },
                _react2.default.createElement(Tab2, null)
              )
            ),
            _react2.default.createElement(
              _reactTabs.TabPanel,
              null,
              _react2.default.createElement(
                'div',
                { className: 'tab-content' },
                _react2.default.createElement(Tab3, null)
              )
            )
          )
        )
      );
    }
  }]);

  return Tabs;
}(_react.Component);

exports.default = Tabs;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRouterNestedHistory = __webpack_require__(25);

var _reactHelmet = __webpack_require__(35);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

__webpack_require__(192);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var windowName = function windowName(index) {
  return 'window' + (index + 1);
};
var windowUrl = function windowUrl(index) {
  return '/windows/' + (index + 1);
};

var WindowMaster1 = function WindowMaster1() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'Hello'
    ),
    _react2.default.createElement(
      _reactRouterNestedHistory.HistoryLink,
      { to: '/windows/1/boris' },
      'Boris'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Window 1' })
  );
};

var WindowMaster2 = function WindowMaster2() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      'World'
    ),
    _react2.default.createElement(_reactHelmet2.default, { title: 'Window 2' })
  );
};

var WindowPage = function WindowPage(_ref) {
  var page = _ref.match.params.page;
  return _react2.default.createElement(
    'div',
    null,
    'Page: ',
    page,
    _react2.default.createElement(_reactHelmet2.default, { title: 'Windows: ' + page })
  );
};

var ExampleWindow = function ExampleWindow(_ref2) {
  var index = _ref2.index,
      masterComponent = _ref2.masterComponent;
  return _react2.default.createElement(_reactRouterNestedHistory.Window, { className: 'window ' + windowName(index), children: function children(_ref3) {
      var isOnTop = _ref3.isOnTop;
      return _react2.default.createElement(
        _reactRouterNestedHistory.Container,
        { name: windowName(index),
          animate: false,
          className: isOnTop ? 'top container' : 'container',
          initialUrl: windowUrl(index),
          patterns: [windowUrl(index), windowUrl(index) + '/:page']
        },
        _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { exact: true,
          path: windowUrl(index),
          component: masterComponent
        }),
        _react2.default.createElement(_reactRouterNestedHistory.HistoryRoute, { exact: true,
          path: windowUrl(index) + '/:page',
          component: WindowPage
        })
      );
    } });
};

var Windows = function (_Component) {
  _inherits(Windows, _Component);

  function Windows(props) {
    _classCallCheck(this, Windows);

    var _this = _possibleConstructorReturn(this, (Windows.__proto__ || Object.getPrototypeOf(Windows)).call(this, props));

    _this.state = {
      currentWindow: null,
      currentIndex: null
    };
    return _this;
  }

  _createClass(Windows, [{
    key: 'onNameClick',
    value: function onNameClick(index) {
      this.setState({ currentName: windowName(index) });
    }
  }, {
    key: 'onIndexClick',
    value: function onIndexClick(index) {
      this.setState({ currentIndex: index });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'windows' },
        _react2.default.createElement(
          'h2',
          null,
          'Windows example'
        ),
        _react2.default.createElement(
          'div',
          { className: 'description' },
          _react2.default.createElement(
            'p',
            null,
            'Each window has its own individual history.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Clicking on a window brings it to the front.'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'window-group' },
          _react2.default.createElement(
            _reactRouterNestedHistory.WindowGroup,
            { name: 'windows',
              currentContainerName: this.state.currentName,
              currentContainerIndex: this.state.currentIndex },
            _react2.default.createElement(ExampleWindow, { index: 0, masterComponent: WindowMaster1 }),
            _react2.default.createElement(ExampleWindow, { index: 1, masterComponent: WindowMaster2 })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'window-menu' },
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.onNameClick(0);
              } },
            'Window 1'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.onNameClick(1);
              } },
            'Window 2'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.onIndexClick(0);
              } },
            '0'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.onIndexClick(1);
              } },
            '1'
          )
        )
      );
    }
  }]);

  return Windows;
}(_react.Component);

exports.default = Windows;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _matchPath = __webpack_require__(161);

var _matchPath2 = _interopRequireDefault(_matchPath);

var _AnimatedPage = __webpack_require__(211);

var _AnimatedPage2 = _interopRequireDefault(_AnimatedPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var computeMatch = function computeMatch(pathname, _ref) {
  var computedMatch = _ref.computedMatch,
      path = _ref.path,
      exact = _ref.exact,
      strict = _ref.strict;
  return computedMatch || (0, _matchPath2.default)(pathname, path, { exact: exact, strict: strict });
};

var r = function r(_ref2) {
  var component = _ref2.component,
      children = _ref2.children,
      render = _ref2.render,
      match = _ref2.match,
      props = _ref2.props;
  return component ? // component prop gets first priority, only called if there's a match
  match ? _react2.default.createElement(component, props) : null : render ? // render prop is next, only called if there's a match
  match ? render(props) : null : children ? // children come last, always called
  typeof children === 'function' ? children(props) : !Array.isArray(children) || children.length ? // Preact defaults to empty children array
  _react2.default.Children.only(children) : null : null;
};

var InnerHistoryRoute = function (_Component) {
  _inherits(InnerHistoryRoute, _Component);

  function InnerHistoryRoute() {
    _classCallCheck(this, InnerHistoryRoute);

    return _possibleConstructorReturn(this, (InnerHistoryRoute.__proto__ || Object.getPrototypeOf(InnerHistoryRoute)).apply(this, arguments));
  }

  _createClass(InnerHistoryRoute, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.pathname !== nextProps.pathname;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          pathname = _props.pathname,
          children = _props.children,
          component = _props.component,
          render = _props.render;

      var match = computeMatch(pathname, this.props);
      var props = { match: match, location: { pathname: pathname } };
      return r({ component: component, children: children, render: render, match: match, props: props });
    }
  }]);

  return InnerHistoryRoute;
}(_react.Component);

var HistoryRoute = function HistoryRoute(_ref3, _ref4) {
  var component = _ref3.component,
      _children = _ref3.children,
      render = _ref3.render,
      props = _objectWithoutProperties(_ref3, ['component', 'children', 'render']);

  var pathname = _ref4.pathname;
  return _react2.default.createElement(InnerHistoryRoute, _extends({}, props, { pathname: pathname, children: function children(p) {
      return _react2.default.createElement(
        _AnimatedPage2.default,
        p,
        p.match && r({ component: component, children: _children, render: render, match: p.match, props: p })
      );
    } }));
};

HistoryRoute.contextTypes = {
  pathname: _react.PropTypes.string.isRequired
};

HistoryRoute.propTypes = {
  computedMatch: _react.PropTypes.object, // private, from <Switch>
  path: _react.PropTypes.string,
  exact: _react.PropTypes.bool,
  strict: _react.PropTypes.bool,
  component: _react.PropTypes.func,
  render: _react.PropTypes.func,
  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node])
};

exports.default = HistoryRoute;

/***/ }),
/* 187 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 188 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 189 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 190 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 191 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var HistoryStack_1 = __webpack_require__(36);
/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 */
exports.A_to_B = function (A, B) { return new HistoryStack_1.default({
    back: A.back.concat([A.current], B.back),
    current: B.current,
    forward: B.forward
}); };
exports.B_to_C = function (A, B, C) { return new HistoryStack_1.default({
    back: A.back.concat([A.current], C.back),
    current: C.current,
    forward: C.forward
}); };
exports.B_to_A = function (A, B) { return A; };


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var HistoryStack_1 = __webpack_require__(36);
/**
 * In this world, forward history is kept even if it's a different tab
 */
exports.B_to_A = function (A, B) { return new HistoryStack_1.default({
    back: A.back,
    current: A.current,
    forward: [B.current].concat(B.forward)
}); };


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Switch tab with no default (all tabs are equal)
 */
exports.B_to_C = function (A, B, C) { return C; };


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var R = __webpack_require__(7);
var defaultBehavior = __webpack_require__(194);
var nonDefaultBehavior = __webpack_require__(196);
var keepFwdTabBehavior = __webpack_require__(195);
var Container_1 = __webpack_require__(74);
var Group = (function () {
    function Group(_a) {
        var name = _a.name, _b = _a.parentGroupName, parentGroupName = _b === void 0 ? null : _b, _c = _a.containers, containers = _c === void 0 ? [] : _c, _d = _a.isDefault, isDefault = _d === void 0 ? false : _d, _e = _a.resetOnLeave, resetOnLeave = _e === void 0 ? false : _e, _f = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _f === void 0 ? false : _f;
        this.name = name;
        this.parentGroupName = parentGroupName;
        this.containers = containers;
        this.isDefault = isDefault;
        this.resetOnLeave = resetOnLeave;
        this.gotoTopOnSelectActive = gotoTopOnSelectActive;
    }
    Group.prototype.replaceContainer = function (container) {
        var groupName = container.groupName;
        if (groupName === this.name) {
            var i = R.findIndex(function (c) { return c.name === container.name; }, this.containers);
            if (i === -1) {
                return new Group(__assign({}, Object(this), { containers: this.containers.concat([container]) }));
            }
            else {
                return new Group(__assign({}, Object(this), { containers: this.containers.slice(0, i).concat([
                        container
                    ], this.containers.slice(i + 1)) }));
            }
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
    Group.prototype.computeHistory = function (from, to, maintainFwd) {
        var defaulT = this.defaultContainer;
        var fromHistory = from.history;
        var toHistory = to.history;
        if (defaulT) {
            var defaultHistory = defaulT.history;
            if (from.isDefault) {
                return defaultBehavior.A_to_B(fromHistory, toHistory);
            }
            else {
                if (to.isDefault) {
                    if (maintainFwd && fromHistory.lastVisited > toHistory.activePage.firstVisited) {
                        return keepFwdTabBehavior.B_to_A(toHistory, fromHistory);
                    }
                    else {
                        return defaultBehavior.B_to_A(toHistory, fromHistory);
                    }
                }
                else {
                    return defaultBehavior.B_to_C(defaultHistory, fromHistory, toHistory);
                }
            }
        }
        else {
            return nonDefaultBehavior.B_to_C(null, fromHistory, toHistory);
        }
    };
    Group.prototype.getHistory = function (maintainFwd) {
        if (maintainFwd === void 0) { maintainFwd = false; }
        var containers = this.containerStackOrder;
        switch (containers.length) {
            case 0: throw new Error("'" + this.name + "' has no containers");
            case 1: {
                if (containers[0] instanceof Group) {
                    return containers[0].getHistory(maintainFwd);
                }
                else {
                    return containers[0].history;
                }
            }
            default: {
                var from = containers[1];
                var to = containers[0];
                if (to instanceof Group) {
                    // history doesn't cross Group boundary
                    return to.getHistory(maintainFwd);
                }
                else {
                    return this.computeHistory(from, to, maintainFwd);
                }
            }
        }
    };
    Group.prototype.activateContainer = function (containerName, time) {
        var from = this.activeContainer;
        var to = this.getContainerByName(containerName);
        var group = from.resetOnLeave && from.name !== to.name ?
            this.replaceContainer(from.top(time, true)) : this;
        return group.replaceContainer(to.activate(time + 1));
    };
    Object.defineProperty(Group.prototype, "containerStackOrder", {
        get: function () {
            return R.sort(function (c1, c2) { return c1.compareTo(c2); }, this.containers);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "indexedContainerStackOrder", {
        /**
         * Gets the stack order values as an array of numbers,
         * in original container index order instead of stack order
         */
        get: function () {
            var order = this.containerStackOrder;
            return this.containers.map(function (orig) {
                return R.findIndex(function (c) { return orig.name === c.name; }, order);
            });
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
        return R.any(function (c) { return c.patternsMatch(url); }, this.containers);
    };
    Group.prototype.activate = function (time) {
        return this.replaceContainer(this.activeContainer.activate(time));
    };
    Group.prototype.getContainerIndex = function (container) {
        return R.findIndex(function (c) { return c.name === container.name; }, this.containers);
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
            if (this.containers.length === 0) {
                return 0;
            }
            else {
                return this.getContainerIndex(this.containerStackOrder[0]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.isContainerActive = function (containerName) {
        if (this.containers.length === 0) {
            return false;
        }
        else {
            return this.activeContainer.name === containerName;
        }
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
            return R.find(function (c) { return c.isDefault; }, this.containers);
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
    Group.prototype.getActiveUrlInContainer = function (containerName) {
        return this.getActivePageInContainer(containerName).url;
    };
    Group.prototype.top = function (time, reset) {
        if (reset === void 0) { reset = false; }
        return this.replaceContainer(this.activeContainer.top(time, reset));
    };
    Group.prototype.push = function (page) {
        var groupName = page.groupName, containerName = page.containerName;
        if (groupName === this.name) {
            var container = this.getContainerByName(containerName);
            return this.replaceContainer(container.push(page));
        }
        else {
            var group = this.getNestedGroupByName(groupName);
            if (!group) {
                throw new Error('Group \'' + groupName + '\' not found in ' + this.name);
            }
            return this.replaceContainer(group.push(page));
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
    Group.prototype._go = function (goFn, canGoFn, n, time) {
        if (n === 0) {
            return this.activate(time);
        }
        var next = function (g) { return g._go(goFn, canGoFn, n - 1, time + 1); };
        var container = this.activeContainer;
        if (canGoFn(container)) {
            return next(this.replaceContainer(goFn(container).activate(time)));
        }
        else {
            if (canGoFn(this)) {
                var containerName = goFn(this.history).current.containerName;
                if (this.hasContainerWithName(containerName)) {
                    return next(this.activateContainer(containerName, time));
                }
                else {
                    var g = this.getSubGroupHavingContainerWithName(containerName);
                    return next(g.activateContainer(containerName, time));
                }
            }
            else {
                throw new Error('Cannot go ' + n + ' in that direction');
            }
        }
    };
    Group.prototype.goForward = function (n, time) {
        if (n === void 0) { n = 1; }
        return this._go(function (c) { return c.goForward(1, time); }, function (c) { return c.canGoForward(); }, n, time);
    };
    Group.prototype.goBack = function (n, time) {
        if (n === void 0) { n = 1; }
        return this._go(function (c) { return c.goBack(1, time); }, function (c) { return c.canGoBack(); }, n, time);
    };
    Object.defineProperty(Group.prototype, "backPage", {
        get: function () {
            return this.history.backPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "forwardPage", {
        get: function () {
            return this.history.forwardPage;
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.go = function (n, time) {
        if (n === void 0) { n = 1; }
        return n > 0 ? this.goForward(n, time) : this.goBack(0 - n, time);
    };
    Group.prototype.canGoBack = function (n) {
        if (n === void 0) { n = 1; }
        return this.history.canGoBack(n);
    };
    Group.prototype.canGoForward = function (n) {
        if (n === void 0) { n = 1; }
        return this.history.canGoForward(n);
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
        return R.find(function (c) { return c.name === name; }, this.containers);
    };
    Group.prototype.hasContainerWithName = function (name) {
        return R.any(function (c) { return c.name === name; }, this.containers);
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
    Group.prototype.getSubGroupHavingContainer = function (container) {
        return R.find(function (g) { return g.hasNestedContainer(container); }, this.subGroups);
    };
    Group.prototype.getSubGroupHavingContainerWithName = function (name) {
        return R.find(function (g) { return g.hasNestedContainerWithName(name); }, this.subGroups);
    };
    Object.defineProperty(Group.prototype, "firstVisited", {
        get: function () {
            return R.last(this.containerStackOrder).firstVisited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "lastVisited", {
        get: function () {
            return this.activeContainer.lastVisited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "isInitialized", {
        get: function () {
            return this.containers.length > 0 &&
                R.all(function (g) { return g.isInitialized; }, this.subGroups);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "initialUrl", {
        get: function () {
            return this.containers[0].initialUrl;
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
    Group.prototype.compareTo = function (other) {
        if (other instanceof Group) {
            var otherContainer = other.activeContainer;
            return otherContainer ? this.activeContainer.compareTo(otherContainer) : -1;
        }
        else if (other instanceof Container_1.default) {
            return this.activeContainer.compareTo(other);
        }
        else {
            throw new Error('other should be a Group or Container, received: ' + other);
        }
    };
    Object.defineProperty(Group.prototype, "isGroup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return Group;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Group;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var HistoryDiff = (function () {
    function HistoryDiff(_a) {
        var _b = _a.same, same = _b === void 0 ? [] : _b, _c = _a.removed, removed = _c === void 0 ? [] : _c, _d = _a.added, added = _d === void 0 ? [] : _d, oldCurrentIndex = _a.oldCurrentIndex, newCurrentIndex = _a.newCurrentIndex;
        this.same = same;
        this.removed = removed;
        this.added = added;
        this.oldCurrentIndex = oldCurrentIndex;
        this.newCurrentIndex = newCurrentIndex;
    }
    Object.defineProperty(HistoryDiff.prototype, "oldIndexFromEnd", {
        get: function () {
            return this.same.length + this.removed.length - 1 - this.oldCurrentIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HistoryDiff.prototype, "newIndexFromEnd", {
        get: function () {
            return this.same.length + this.added.length - 1 - this.newCurrentIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HistoryDiff.prototype, "indexDelta", {
        get: function () {
            return this.newCurrentIndex - this.oldCurrentIndex;
        },
        enumerable: true,
        configurable: true
    });
    return HistoryDiff;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HistoryDiff;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NonStepAction_1 = __webpack_require__(27);
var serializer_1 = __webpack_require__(6);
/**
 * Only for testing purposes
 */
var ClearActions = ClearActions_1 = (function (_super) {
    __extends(ClearActions, _super);
    function ClearActions(_a) {
        var time = (_a === void 0 ? {} : _a).time;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = ClearActions_1.type;
        return _this;
    }
    ClearActions.prototype.store = function (actions) {
        return [];
    };
    return ClearActions;
}(NonStepAction_1.default));
ClearActions.type = 'ClearActions';
ClearActions = ClearActions_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], ClearActions);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClearActions;
var ClearActions_1;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
var CreateContainer = CreateContainer_1 = (function (_super) {
    __extends(CreateContainer, _super);
    function CreateContainer(_a) {
        var time = _a.time, name = _a.name, groupName = _a.groupName, initialUrl = _a.initialUrl, patterns = _a.patterns, _b = _a.useDefault, useDefault = _b === void 0 ? true : _b, _c = _a.resetOnLeave, resetOnLeave = _c === void 0 ? false : _c;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = CreateContainer_1.type;
        _this.name = name;
        _this.groupName = groupName;
        _this.initialUrl = initialUrl;
        _this.patterns = patterns;
        _this.useDefault = useDefault;
        _this.resetOnLeave = resetOnLeave;
        return _this;
    }
    CreateContainer.prototype.reduce = function (state) {
        return state.addContainer({
            name: this.name,
            groupName: this.groupName,
            initialUrl: this.initialUrl,
            useDefault: this.useDefault,
            resetOnLeave: this.resetOnLeave,
            patterns: this.patterns
        });
    };
    return CreateContainer;
}(Action_1.default));
CreateContainer.type = 'CreateContainer';
CreateContainer = CreateContainer_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], CreateContainer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateContainer;
var CreateContainer_1;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var serializer_1 = __webpack_require__(6);
var NonStepAction_1 = __webpack_require__(27);
var CreateGroup = CreateGroup_1 = (function (_super) {
    __extends(CreateGroup, _super);
    function CreateGroup(_a) {
        var time = _a.time, name = _a.name, _b = _a.parentGroupName, parentGroupName = _b === void 0 ? null : _b, _c = _a.parentUsesDefault, parentUsesDefault = _c === void 0 ? parentGroupName ? true : null : _c, _d = _a.resetOnLeave, resetOnLeave = _d === void 0 ? false : _d, _e = _a.gotoTopOnSelectActive, gotoTopOnSelectActive = _e === void 0 ? false : _e;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = CreateGroup_1.type;
        _this.name = name;
        _this.parentGroupName = parentGroupName;
        _this.parentUsesDefault = parentUsesDefault;
        _this.resetOnLeave = resetOnLeave;
        _this.gotoTopOnSelectActive = gotoTopOnSelectActive;
        return _this;
    }
    CreateGroup.prototype.reduce = function (state) {
        if (this.parentGroupName && this.parentUsesDefault != null) {
            return state.addSubGroup({
                name: this.name,
                parentGroupName: this.parentGroupName,
                parentUsesDefault: this.parentUsesDefault,
                resetOnLeave: this.resetOnLeave,
                gotoTopOnSelectActive: this.gotoTopOnSelectActive
            });
        }
        else {
            return state.addTopLevelGroup({
                name: this.name,
                resetOnLeave: this.resetOnLeave,
                gotoTopOnSelectActive: this.gotoTopOnSelectActive
            });
        }
    };
    return CreateGroup;
}(NonStepAction_1.default));
CreateGroup.type = 'CreateGroup';
CreateGroup = CreateGroup_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], CreateGroup);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateGroup;
var CreateGroup_1;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
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
}(Action_1.default));
Go.type = 'Go';
Go = Go_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], Go);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Go;
var Go_1;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
var InitializedState_1 = __webpack_require__(76);
var load = function (state, url, time) {
    return new InitializedState_1.default(state.groups.reduce(function (s, group) {
        return s.replaceGroup(group.loadFromUrl(url, time));
    }, state));
};
var LoadFromUrl = LoadFromUrl_1 = (function (_super) {
    __extends(LoadFromUrl, _super);
    function LoadFromUrl(_a) {
        var time = _a.time, url = _a.url, _b = _a.fromRefresh, fromRefresh = _b === void 0 ? false : _b;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = LoadFromUrl_1.type;
        _this.url = url;
        _this.fromRefresh = fromRefresh;
        return _this;
    }
    LoadFromUrl.prototype.updateAfterRefresh = function (time) {
        return new LoadFromUrl_1(__assign({}, Object(this), { time: time, fromRefresh: true }));
    };
    LoadFromUrl.prototype.reduce = function (state) {
        return this.fromRefresh ? new InitializedState_1.default(state) :
            load(state, this.url, this.time);
    };
    LoadFromUrl.prototype.addSteps = function (steps, state) {
        return this.fromRefresh ? [] : _super.prototype.addSteps.call(this, steps, state);
    };
    return LoadFromUrl;
}(Action_1.default));
LoadFromUrl.type = 'LoadFromUrl';
LoadFromUrl = LoadFromUrl_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], LoadFromUrl);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoadFromUrl;
var LoadFromUrl_1;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Action_1 = __webpack_require__(13);
var PageAction = (function (_super) {
    __extends(PageAction, _super);
    function PageAction(_a) {
        var time = _a.time, page = _a.page;
        var _this = _super.call(this, { time: time }) || this;
        _this.page = page;
        return _this;
    }
    return PageAction;
}(Action_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PageAction;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
var SwitchToContainer = SwitchToContainer_1 = (function (_super) {
    __extends(SwitchToContainer, _super);
    function SwitchToContainer(_a) {
        var time = _a.time, groupName = _a.groupName, containerName = _a.containerName;
        var _this = _super.call(this, { time: time }) || this;
        _this.type = SwitchToContainer_1.type;
        _this.groupName = groupName;
        _this.containerName = containerName;
        return _this;
    }
    SwitchToContainer.prototype.reduce = function (state) {
        return state.switchToContainer({
            groupName: this.groupName,
            containerName: this.containerName,
            time: this.time
        });
    };
    return SwitchToContainer;
}(Action_1.default));
SwitchToContainer.type = 'SwitchToContainer';
SwitchToContainer = SwitchToContainer_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], SwitchToContainer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SwitchToContainer;
var SwitchToContainer_1;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Action_1 = __webpack_require__(13);
var serializer_1 = __webpack_require__(6);
var SwitchToGroup = SwitchToGroup_1 = (function (_super) {
    __extends(SwitchToGroup, _super);
    function SwitchToGroup(_a) {
        var time = _a.time, groupName = _a.groupName;
        var _this = _super.call(this, { time: time }) || this;
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
    return SwitchToGroup;
}(Action_1.default));
SwitchToGroup.type = 'SwitchToGroup';
SwitchToGroup = SwitchToGroup_1 = __decorate([
    serializer_1.Serializable,
    __metadata("design:paramtypes", [Object])
], SwitchToGroup);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SwitchToGroup;
var SwitchToGroup_1;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var browser = __webpack_require__(26);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackStep;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var browser = __webpack_require__(26);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoStep;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var browser = __webpack_require__(26);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PushStep;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var browser = __webpack_require__(26);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReplaceStep;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var react_router_transition_1 = __webpack_require__(432);
var Push_1 = __webpack_require__(81);
var Back_1 = __webpack_require__(78);
var Forward_1 = __webpack_require__(79);
var Top_1 = __webpack_require__(84);
var PopState_1 = __webpack_require__(80);
var react_redux_1 = __webpack_require__(55);
var store_1 = __webpack_require__(38);
var LifecycleStage;
(function (LifecycleStage) {
    LifecycleStage[LifecycleStage["WILL_ENTER"] = 0] = "WILL_ENTER";
    LifecycleStage[LifecycleStage["DID_ENTER"] = 1] = "DID_ENTER";
    LifecycleStage[LifecycleStage["DID_LEAVE"] = 2] = "DID_LEAVE";
    LifecycleStage[LifecycleStage["WILL_LEAVE"] = 3] = "WILL_LEAVE";
})(LifecycleStage || (LifecycleStage = {}));
var Side;
(function (Side) {
    Side[Side["LEFT"] = -110] = "LEFT";
    Side[Side["RIGHT"] = 110] = "RIGHT";
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
var transitions = new Map();
transitions.set(Push_1.default.type, slideLeft);
transitions.set(Forward_1.default.type, slideLeft);
transitions.set(Back_1.default.type, slideRight);
transitions.set(Top_1.default.type, slideRight);
transitions.set(PopState_1.default.type, popstate);
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
var AnimatedPage = (function (_super) {
    __extends(AnimatedPage, _super);
    function AnimatedPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimatedPage.prototype.shouldComponentUpdate = function (nextProps) {
        var match = this.props.match;
        var nextMatch = nextProps.match;
        return !(!match && !nextMatch) &&
            (!match || !nextMatch || match.url !== nextMatch.url);
    };
    AnimatedPage.prototype.render = function () {
        /*
         if (lastActionType === SwitchToContainer.type) {
            resetMasterScrolls()
         }
         */
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
    return AnimatedPage;
}(react_1.Component));
AnimatedPage.contextTypes = {
    animate: react_1.PropTypes.bool.isRequired,
    pathname: react_1.PropTypes.string.isRequired
};
var mapStateToProps = function (state, ownProps) { return (__assign({ lastAction: state.lastAction }, ownProps)); };
var ConnectedPage = react_redux_1.connect(mapStateToProps)(AnimatedPage);
var default_1 = (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.render = function () {
        return React.createElement(ConnectedPage, __assign({}, this.props, { store: store_1.default }));
    };
    return default_1;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var main_1 = __webpack_require__(12);
var BackLink = (function (_super) {
    __extends(BackLink, _super);
    function BackLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackLink.prototype.componentDidMount = function () {
        if (this.context.groupName == null) {
            throw new Error('BackLink needs to be inside a ContainerGroup');
        }
    };
    BackLink.prototype.shouldComponentUpdate = function () {
        return false; // Don't disappear when transitioning back to previous page
    };
    BackLink.prototype.onClick = function (event) {
        var groupName = this.context.groupName;
        main_1.goBackInGroup(groupName);
        event.preventDefault();
    };
    BackLink.prototype.render = function () {
        var _a = this.props, children = _a.children, nameFn = _a.nameFn;
        var groupName = this.context.groupName;
        var backPage = main_1.getBackPageInGroup(groupName);
        if (backPage) {
            return (React.createElement("a", { href: backPage.url, onClick: this.onClick.bind(this) }, children || nameFn ? nameFn({ params: backPage.params }) : 'Back'));
        }
        else {
            return React.createElement("span", null, " ");
        }
    };
    return BackLink;
}(react_1.Component));
BackLink.contextTypes = {
    groupName: react_1.PropTypes.string.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackLink;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var main_1 = __webpack_require__(12);
var R = __webpack_require__(7);
var DumbContainerGroup = (function (_super) {
    __extends(DumbContainerGroup, _super);
    function DumbContainerGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.switchContainerIndex = R.curry(main_1.switchToContainerIndex)(props.name);
        _this.switchContainerName = R.curry(main_1.switchToContainer)(props.name);
        return _this;
    }
    DumbContainerGroup.prototype.getChildContext = function () {
        var _a = this.props, name = _a.name, _b = _a.useDefaultContainer, useDefaultContainer = _b === void 0 ? true : _b, _c = _a.hideInactiveContainers, hideInactiveContainers = _c === void 0 ? true : _c;
        return {
            groupName: name,
            useDefaultContainer: useDefaultContainer,
            hideInactiveContainers: hideInactiveContainers
        };
    };
    DumbContainerGroup.prototype.update = function (currentContainerIndex, indexedStackOrder) {
        if (this.props.onContainerActivate) {
            this.props.onContainerActivate({ currentContainerIndex: currentContainerIndex, indexedStackOrder: indexedStackOrder });
        }
    };
    DumbContainerGroup.prototype.componentDidMount = function () {
        var _a = this.props, storedCurrentContainerIndex = _a.storedCurrentContainerIndex, storedIndexedStackOrder = _a.storedIndexedStackOrder;
        this.update(storedCurrentContainerIndex, storedIndexedStackOrder);
    };
    DumbContainerGroup.prototype.componentWillReceiveProps = function (nextProps) {
        var oldII = this.props.currentContainerIndex;
        var oldSI = this.props.storedCurrentContainerIndex;
        var newII = nextProps.currentContainerIndex;
        var newSI = nextProps.storedCurrentContainerIndex;
        var oldIN = this.props.currentContainerName;
        var oldSN = this.props.storedCurrentContainerName;
        var newIN = nextProps.currentContainerName;
        var newSN = nextProps.storedCurrentContainerName;
        var oldIndexedStackOrder = this.props.storedIndexedStackOrder;
        var newIndexedStackOrder = nextProps.storedIndexedStackOrder;
        if (newSI !== oldSI || newSN !== oldSN ||
            !R.equals(oldIndexedStackOrder, newIndexedStackOrder)) {
            this.update(newSI, newIndexedStackOrder);
        }
        else if (newII != null && newII !== oldII && newII !== newSI) {
            this.switchContainerIndex(newII);
        }
        else if (newIN && newIN !== oldIN && newIN !== newSN) {
            this.switchContainerName(newIN);
        }
    };
    DumbContainerGroup.prototype.renderDiv = function (divChildren) {
        var _a = R.omit([
            'children',
            'storedCurrentContainerIndex',
            'storedIndexedStackOrder',
            'useDefaultContainer',
            'hideInactiveContainers',
            'store',
            'isOnTop',
            'dispatch',
            'storedCurrentContainerName',
            'currentContainerIndex',
            'currentContainerName',
            'onContainerActivate',
            'gotoTopOnSelectActive'
        ], this.props), _b = _a.style, style = _b === void 0 ? {} : _b, divProps = __rest(_a, ["style"]);
        var divStyle = __assign({}, style, { width: '100%', height: '100%', position: 'inherit', overflow: 'hidden' });
        return React.createElement("div", __assign({ style: divStyle }, divProps), divChildren);
    };
    DumbContainerGroup.prototype.render = function () {
        var _a = this.props, children = _a.children, storedCurrentContainerIndex = _a.storedCurrentContainerIndex, storedIndexedStackOrder = _a.storedIndexedStackOrder;
        if (children instanceof Function) {
            var args = {
                currentContainerIndex: storedCurrentContainerIndex,
                indexedStackOrder: storedIndexedStackOrder,
                setCurrentContainerIndex: this.switchContainerIndex,
                setCurrentContainerName: this.switchContainerName
            };
            return this.renderDiv(children(args));
        }
        else {
            return this.renderDiv(children);
        }
    };
    return DumbContainerGroup;
}(react_1.Component));
DumbContainerGroup.childContextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    useDefaultContainer: react_1.PropTypes.bool,
    hideInactiveContainers: react_1.PropTypes.bool
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DumbContainerGroup;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var react_router_1 = __webpack_require__(160);
var main_1 = __webpack_require__(12);
var createBrowserHistory_1 = __webpack_require__(72);
var DumbHistoryRouter = (function (_super) {
    __extends(DumbHistoryRouter, _super);
    function DumbHistoryRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.history = createBrowserHistory_1.default(_this.props);
        return _this;
    }
    DumbHistoryRouter.prototype.componentWillMount = function () {
        var _a = this.props, zeroPage = _a.zeroPage, listenToLocation = _a.listenToLocation;
        main_1.loadActions();
        if (zeroPage) {
            main_1.setZeroPage(zeroPage);
        }
        main_1.startup();
        main_1.listenToStore();
        listenToLocation && listenToLocation();
    };
    DumbHistoryRouter.prototype.componentDidUpdate = function () {
        if (!main_1.isInitialized()) {
            main_1.loadFromUrl(this.props.pathname);
        }
    };
    DumbHistoryRouter.prototype.componentWillUnmount = function () {
        var unlistenToLocation = this.props.unlistenToLocation;
        //this.unlistenToStore()
        unlistenToLocation && unlistenToLocation();
    };
    DumbHistoryRouter.prototype.render = function () {
        var children = this.props.children;
        return React.createElement(react_router_1.Router, { history: this.history, children: children });
    };
    return DumbHistoryRouter;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DumbHistoryRouter;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var main_1 = __webpack_require__(12);
var HeaderLink = (function (_super) {
    __extends(HeaderLink, _super);
    function HeaderLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderLink.prototype.componentDidMount = function () {
        if (this.context.groupName == null) {
            throw new Error('HeaderLink needs to be inside a ContainerGroup');
        }
    };
    HeaderLink.prototype.onClick = function (event) {
        var groupName = this.context.groupName;
        var toContainer = this.props.toContainer;
        main_1.switchToContainer(groupName, toContainer);
        event.preventDefault();
    };
    HeaderLink.prototype.getClassName = function () {
        var groupName = this.context.groupName;
        var _a = this.props, toContainer = _a.toContainer, className = _a.className, activeClassName = _a.activeClassName;
        var isActive = main_1.isContainerActive(groupName, toContainer);
        return isActive && activeClassName ? activeClassName : className || '';
    };
    HeaderLink.prototype.render = function () {
        var groupName = this.context.groupName;
        var _a = this.props, children = _a.children, toContainer = _a.toContainer;
        var url = main_1.getContainerLinkUrl(groupName, toContainer);
        return (React.createElement("a", { href: url, className: this.getClassName(), onClick: this.onClick.bind(this) }, children));
    };
    return HeaderLink;
}(react_1.Component));
HeaderLink.contextTypes = {
    groupName: react_1.PropTypes.string.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderLink;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var PathUtils_1 = __webpack_require__(443);
var main_1 = __webpack_require__(12);
var HistoryLink = (function (_super) {
    __extends(HistoryLink, _super);
    function HistoryLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HistoryLink.prototype.componentDidMount = function () {
        if (this.context.groupName == null) {
            throw new Error('HistoryLink needs to be inside a ContainerGroup');
        }
        if (this.context.containerName == null) {
            throw new Error('HistoryLink needs to be inside a Container');
        }
    };
    HistoryLink.prototype.getUrl = function () {
        var to = this.props.to;
        return typeof (to) === 'string' ? to : PathUtils_1.createPath(to);
    };
    HistoryLink.prototype.onClick = function (event) {
        var _a = this.context, containerName = _a.containerName, groupName = _a.groupName, patterns = _a.patterns;
        main_1.push(groupName, containerName, this.getUrl(), patterns);
        event.preventDefault();
    };
    HistoryLink.prototype.render = function () {
        /*
        return <Link
            {...this.props}
            onClick={this.onClick.bind(this)}
        />
        */
        return (React.createElement("a", { href: this.getUrl(), onClick: this.onClick.bind(this) }, this.props.children));
    };
    return HistoryLink;
}(react_1.Component));
HistoryLink.contextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    containerName: react_1.PropTypes.string.isRequired,
    patterns: react_1.PropTypes.arrayOf(react_1.PropTypes.string)
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HistoryLink;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var react_redux_1 = __webpack_require__(55);
var store_1 = __webpack_require__(38);
var createBrowserHistory_1 = __webpack_require__(72);
var createMemoryHistory_1 = __webpack_require__(159);
var LocationActions_1 = __webpack_require__(86);
var main_1 = __webpack_require__(12);
var location_1 = __webpack_require__(56);
var DumbHistoryRouter_1 = __webpack_require__(214);
var titles_1 = __webpack_require__(91);
var HistoryRouter = (function (_super) {
    __extends(HistoryRouter, _super);
    function HistoryRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HistoryRouter.prototype.componentWillMount = function () {
        var _this = this;
        var onStep = function (currentUrl) {
            var titles = _this.props.titles;
            var title = titles_1.getTitleForUrl(titles, currentUrl);
            if (location_1.canUseWindowLocation) {
                if (title) {
                    document.title = title;
                }
                else {
                    console.warn('Cannot find title for ' + currentUrl);
                }
            }
        };
        main_1.addStepListener({ before: onStep, after: onStep });
    };
    HistoryRouter.prototype.getLocation = function () {
        if (location_1.canUseWindowLocation) {
            return window.location.pathname;
        }
        else {
            var location_2 = this.props.location;
            if (location_2) {
                return location_2;
            }
            else {
                console.warn('You should pass location when testing');
                return '/';
            }
        }
    };
    HistoryRouter.prototype.getCreateHistory = function () {
        return location_1.canUseWindowLocation ? createBrowserHistory_1.default : createMemoryHistory_1.default;
    };
    HistoryRouter.prototype.render = function () {
        var pathname = this.getLocation();
        var createHistory = this.getCreateHistory();
        return (React.createElement(DumbHistoryRouter_1.default, __assign({}, this.props, { createHistory: createHistory, pathname: pathname })));
    };
    return HistoryRouter;
}(react_1.Component));
var ConnectedHistoryRouter = react_redux_1.connect(function (state, ownProps) { return ({
    titles: state.titles
}); }, { listenToLocation: LocationActions_1.listenToLocation, unlistenToLocation: LocationActions_1.unlistenToLocation })(HistoryRouter);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (props) { return (React.createElement(ConnectedHistoryRouter, __assign({ store: store_1.default }, props))); };


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var R = __webpack_require__(7);
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
        var _a = R.omit(['resetOnLeave'], this.props), children = _a.children, _b = _a.horizontal, horizontal = _b === void 0 ? true : _b, _c = _a.vertical, vertical = _c === void 0 ? true : _c, _d = _a.style, style = _d === void 0 ? {} : _d, divProps = __rest(_a, ["children", "horizontal", "vertical", "style"]);
        return (React.createElement("div", __assign({ ref: function (ref) { return _this.scrollArea = ref; }, onScroll: this.onScroll.bind(this) }, divProps, { style: __assign({}, style, { width: '100%', height: '100%', overflowX: horizontal ? 'scroll' : 'auto', overflowY: vertical ? 'scroll' : 'auto' }) }), children));
    };
    return ScrollArea;
}(react_1.Component));
ScrollArea.scrollLefts = {};
ScrollArea.scrollTops = {};
ScrollArea.contextTypes = {
    groupName: react_1.PropTypes.string.isRequired,
    containerName: react_1.PropTypes.string.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScrollArea;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var Window = (function (_super) {
    __extends(Window, _super);
    function Window() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window.prototype.render = function () {
        // Pass through all props you could want on a div
        var _a = this.props, top = _a.top, left = _a.left, children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, divProps = __rest(_a, ["top", "left", "children", "style"]);
        var _c = this.context, zIndex = _c.zIndex, isOnTop = _c.isOnTop;
        return (React.createElement("div", __assign({}, divProps, { style: __assign({}, style, { zIndex: zIndex, position: 'absolute', top: top ? top + 'px' : '', left: left ? left + 'px' : '' }) }), children instanceof Function ? children({ isOnTop: isOnTop }) :
            react_1.cloneElement(react_1.Children.only(children), { isOnTop: isOnTop })));
    };
    return Window;
}(react_1.Component));
Window.contextTypes = {
    zIndex: react_1.PropTypes.number.isRequired,
    isOnTop: react_1.PropTypes.bool.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Window;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var React = __webpack_require__(3);
var react_1 = __webpack_require__(3);
var ContainerGroup_1 = __webpack_require__(88);
var R = __webpack_require__(7);
var getWindowZIndex = function (iOrder, index) {
    return iOrder && iOrder.length > index ? iOrder.length - iOrder[index] + 1 : 1;
};
var defaultToFalse = function (p) { return p == null ? false : p; };
var changeDefaults = function (props) { return (__assign({}, props, { useDefaultContainer: defaultToFalse(props.useDefaultContainer), hideInactiveContainers: defaultToFalse(props.hideInactiveContainers) })); };
var WindowWrapper = (function (_super) {
    __extends(WindowWrapper, _super);
    function WindowWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowWrapper.prototype.getChildContext = function () {
        return R.pick(['zIndex', 'isOnTop'], this.props);
    };
    WindowWrapper.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, children = _a.children;
        return React.createElement("div", { onClick: onClick }, children);
    };
    return WindowWrapper;
}(react_1.Component));
WindowWrapper.childContextTypes = {
    zIndex: react_1.PropTypes.number.isRequired,
    isOnTop: react_1.PropTypes.bool.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var children = _a.children, groupProps = __rest(_a, ["children"]);
    return (React.createElement(ContainerGroup_1.default, __assign({}, changeDefaults(groupProps)), function (props) {
        var c = children instanceof Function ?
            children(props).props.children : children;
        return (React.createElement("div", { style: { position: 'relative' } }, react_1.Children.map(c, function (child, i) { return (React.createElement(WindowWrapper, { key: i, onClick: function () { return props.setCurrentContainerIndex(i); }, zIndex: getWindowZIndex(props.indexedStackOrder, i), isOnTop: !!props.indexedStackOrder &&
                props.indexedStackOrder[i] === 0 }, child)); })));
    }));
};


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ActionTypes_1 = __webpack_require__(90);
var titles_1 = __webpack_require__(91);
var Startup_1 = __webpack_require__(83);
var initialState = {
    pathname: '/',
    lastAction: new Startup_1.default(),
    titles: []
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionTypes_1.LOCATION_CHANGED:
            var a = action;
            return __assign({}, state, { pathname: a.state.activeUrl, lastAction: a.lastAction });
        case ActionTypes_1.ADD_LOCATION_TITLE:
            var pathname = action.pathname, title = action.title;
            var existingTitle = titles_1.getTitleForUrl(state.titles, pathname);
            return existingTitle ? state : __assign({}, state, { titles: state.titles.concat([{ pathname: pathname, title: title }]) });
    }
    return state;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var store_1 = __webpack_require__(92);
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
    var oldState = store_1.default.deriveState(oldActions);
    var initial = { steps: [], state: oldState };
    return newActions.reduce(actionSteps, initial).steps;
}
exports.createStepsSince = createStepsSince;


/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(227);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = baseGetTag;


/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = freeGlobal;


/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(228);


/** Built-in value references. */
var getPrototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = getPrototype;


/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(94);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = getRawTag;


/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = objectToString;


/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = overArg;


/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(224);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = root;


/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = isObjectLike;


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = process.env.PROMISE_QUEUE_COVERAGE ?
    __webpack_require__(232) :
    __webpack_require__(233);


/***/ }),
/* 232 */
/***/ (function(module, exports) {



/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, Promise */
(function (root, factory) {
    'use strict';
    if (typeof module === 'object' && module.exports && "function" === 'function') {
        // CommonJS
        module.exports = factory();
    } else if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        // Browser globals
        root.Queue = factory();
    }
})
(this, function () {
    'use strict';

    /**
     * @return {Object}
     */
    var LocalPromise = typeof Promise !== 'undefined' ? Promise : function () {
        return {
            then: function () {
                throw new Error('Queue.configure() before use Queue');
            }
        };
    };

    var noop = function () {};

    /**
     * @param {*} value
     * @returns {LocalPromise}
     */
    var resolveWith = function (value) {
        if (value && typeof value.then === 'function') {
            return value;
        }

        return new LocalPromise(function (resolve) {
            resolve(value);
        });
    };

    /**
     * It limits concurrently executed promises
     *
     * @param {Number} [maxPendingPromises=Infinity] max number of concurrently executed promises
     * @param {Number} [maxQueuedPromises=Infinity]  max number of queued promises
     * @constructor
     *
     * @example
     *
     * var queue = new Queue(1);
     *
     * queue.add(function () {
     *     // resolve of this promise will resume next request
     *     return downloadTarballFromGithub(url, file);
     * })
     * .then(function (file) {
     *     doStuffWith(file);
     * });
     *
     * queue.add(function () {
     *     return downloadTarballFromGithub(url, file);
     * })
     * // This request will be paused
     * .then(function (file) {
     *     doStuffWith(file);
     * });
     */
    function Queue(maxPendingPromises, maxQueuedPromises) {
        this.pendingPromises = 0;
        this.maxPendingPromises = typeof maxPendingPromises !== 'undefined' ? maxPendingPromises : Infinity;
        this.maxQueuedPromises = typeof maxQueuedPromises !== 'undefined' ? maxQueuedPromises : Infinity;
        this.queue = [];
    }

    /**
     * Defines promise promiseFactory
     * @param {Function} GlobalPromise
     */
    Queue.configure = function (GlobalPromise) {
        LocalPromise = GlobalPromise;
    };

    /**
     * @param {Function} promiseGenerator
     * @return {LocalPromise}
     */
    Queue.prototype.add = function (promiseGenerator) {
        var self = this;
        return new LocalPromise(function (resolve, reject, notify) {
            // Do not queue to much promises
            if (self.queue.length >= self.maxQueuedPromises) {
                reject(new Error('Queue limit reached'));
                return;
            }

            // Add to queue
            self.queue.push({
                promiseGenerator: promiseGenerator,
                resolve: resolve,
                reject: reject,
                notify: notify || noop
            });

            self._dequeue();
        });
    };

    /**
     * Number of simultaneously running promises (which are resolving)
     *
     * @return {number}
     */
    Queue.prototype.getPendingLength = function () {
        return this.pendingPromises;
    };

    /**
     * Number of queued promises (which are waiting)
     *
     * @return {number}
     */
    Queue.prototype.getQueueLength = function () {
        return this.queue.length;
    };

    /**
     * @returns {boolean} true if first item removed from queue
     * @private
     */
    Queue.prototype._dequeue = function () {
        var self = this;
        if (this.pendingPromises >= this.maxPendingPromises) {
            return false;
        }

        // Remove from queue
        var item = this.queue.shift();
        if (!item) {
            return false;
        }

        try {
            this.pendingPromises++;

            resolveWith(item.promiseGenerator())
            // Forward all stuff
                .then(function (value) {
                    // It is not pending now
                    self.pendingPromises--;
                    // It should pass values
                    item.resolve(value);
                    self._dequeue();
                }, function (err) {
                    // It is not pending now
                    self.pendingPromises--;
                    // It should not mask errors
                    item.reject(err);
                    self._dequeue();
                }, function (message) {
                    // It should pass notifications
                    item.notify(message);
                });
        } catch (err) {
            self.pendingPromises--;
            item.reject(err);
            self._dequeue();

        }

        return true;
    };

    return Queue;
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var always = __webpack_require__(23);


/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */
module.exports = always(false);


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var always = __webpack_require__(23);


/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.F
 * @example
 *
 *      R.T(); //=> true
 */
module.exports = always(true);


/***/ }),
/* 236 */
/***/ (function(module, exports) {

/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = {'@@functional/placeholder': true};


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry1 = __webpack_require__(1);
var curryN = __webpack_require__(8);


/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, Ramda's simple `map` function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
module.exports = _curry1(function addIndex(fn) {
  return curryN(fn.length, function() {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function() {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xall = __webpack_require__(309);


/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      var equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */
module.exports = _curry2(_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var curryN = __webpack_require__(8);
var max = __webpack_require__(24);
var pluck = __webpack_require__(33);
var reduce = __webpack_require__(18);


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      var isQueen = R.propEq('rank', 'Q');
 *      var isSpade = R.propEq('suit', '♠︎');
 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */
module.exports = _curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var curryN = __webpack_require__(8);
var max = __webpack_require__(24);
var pluck = __webpack_require__(33);
var reduce = __webpack_require__(18);


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      var isClub = R.propEq('suit', '♣');
 *      var isSpade = R.propEq('suit', '♠');
 *      var isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */
module.exports = _curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var _aperture = __webpack_require__(292);
var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xaperture = __webpack_require__(310);


/**
 * Returns a new list, composed of n-tuples of consecutive elements If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */
module.exports = _curry2(_dispatchable([], _xaperture, _aperture));


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry2 = __webpack_require__(0);


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
module.exports = _curry2(function append(el, list) {
  return _concat(list, [el]);
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var apply = __webpack_require__(99);
var curryN = __webpack_require__(8);
var map = __webpack_require__(10);
var max = __webpack_require__(24);
var pluck = __webpack_require__(33);
var reduce = __webpack_require__(18);
var values = __webpack_require__(151);


/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *                                      sum: R.add,
 *                                      nested: { mul: R.multiply }
 *                                   });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
module.exports = _curry1(function applySpec(spec) {
  spec = map(function(v) { return typeof v == 'function' ? v : applySpec(v); },
             spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))),
                function() {
                  var args = arguments;
                  return map(function(f) { return apply(f, args); }, spec);
                });
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @example
 *
 *      var byAge = R.ascend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByYoungestFirst = R.sort(byAge, people);
 */
module.exports = _curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var nAry = __webpack_require__(51);


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @example
 *
 *      var takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      var takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */
module.exports = _curry1(function binary(fn) {
  return nAry(2, fn);
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isFunction = __webpack_require__(45);
var and = __webpack_require__(97);
var lift = __webpack_require__(50);


/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      var gt10 = R.gt(R.__, 10)
 *      var lt20 = R.lt(R.__, 20)
 *      var f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 */
module.exports = _curry2(function both(f, g) {
  return _isFunction(f) ?
    function _both() {
      return f.apply(this, arguments) && g.apply(this, arguments);
    } :
    lift(and)(f, g);
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var curry = __webpack_require__(42);


/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * `R.converge`: the left branch can produce a function while the right branch
 * produces a value to be passed to that function as an argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      var indentN = R.pipe(R.times(R.always(' ')),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */
module.exports = curry(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */
module.exports = _curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  return value < min ? min :
         value > max ? max :
         value;
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var _clone = __webpack_require__(113);
var _curry1 = __webpack_require__(1);


/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */
module.exports = _curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ?
    value.clone() :
    _clone(value, [], [], true);
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a, b -> Boolean) -> (a, b -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      var byAge = R.comparator((a, b) => a.age < b.age);
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByIncreasingAge = R.sort(byAge, people);
 */
module.exports = _curry1(function comparator(pred) {
  return function(a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var lift = __webpack_require__(50);
var not = __webpack_require__(135);


/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */
module.exports = lift(not);


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var pipeP = __webpack_require__(141);
var reverse = __webpack_require__(54);


/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The rightmost function may have any arity; the remaining
 * functions must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @example
 *
 *      var db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      var lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      var lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      var followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */
module.exports = function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }
  return pipeP.apply(this, reverse(arguments));
};


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _curry1 = __webpack_require__(1);
var map = __webpack_require__(10);
var max = __webpack_require__(24);
var reduce = __webpack_require__(18);


/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @example
 *
 *      var fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */
module.exports = _curry1(function cond(pairs) {
  var arity = reduce(max,
                     0,
                     map(function(pair) { return pair[0].length; }, pairs));
  return _arity(arity, function() {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var constructN = __webpack_require__(103);


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      var AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      var animalTypes = ["Lion", "Tiger", "Bear"];
 *      var animalSighting = R.invoker(0, 'sighting');
 *      var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */
module.exports = _curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__(21);
var _curry2 = __webpack_require__(0);


/**
 * Returns `true` if the specified value is equal, in `R.equals` terms, to at
 * least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */
module.exports = _curry2(_contains);


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var reduceBy = __webpack_require__(52);


/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */
module.exports = reduceBy(function(acc, elem) { return acc + 1; }, 0);


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var add = __webpack_require__(40);


/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */
module.exports = add(-1);


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @example
 *
 *      var byAge = R.descend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByOldestFirst = R.sort(byAge, people);
 */
module.exports = _curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var assoc = __webpack_require__(41);
var dissoc = __webpack_require__(108);


/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @sig [String] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */
module.exports = _curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return dissoc(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      return obj[head] == null ? obj : assoc(head, dissocPath(tail, obj[head]), obj);
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      var half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      var reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */
module.exports = _curry2(function divide(a, b) { return a / b; });


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _dropLast = __webpack_require__(294);
var _xdropLast = __webpack_require__(313);


/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */
module.exports = _curry2(_dispatchable([], _xdropLast, _dropLast));


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _dropLastWhile = __webpack_require__(295);
var _xdropLastWhile = __webpack_require__(314);


/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} predicate The function to be called on each element
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      var lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 */
module.exports = _curry2(_dispatchable([], _xdropLastWhile, _dropLastWhile));


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _dispatchable = __webpack_require__(4);
var _xdropRepeatsWith = __webpack_require__(125);
var dropRepeatsWith = __webpack_require__(110);
var equals = __webpack_require__(15);


/**
 * Returns a new list without any consecutively repeating elements. `R.equals`
 * is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */
module.exports = _curry1(_dispatchable([], _xdropRepeatsWith(equals), dropRepeatsWith(equals)));


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xdropWhile = __webpack_require__(315);


/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      var lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 */
module.exports = _curry2(_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len && pred(list[idx])) {
    idx += 1;
  }
  return Array.prototype.slice.call(list, idx);
}));


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isFunction = __webpack_require__(45);
var lift = __webpack_require__(50);
var or = __webpack_require__(137);


/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */
module.exports = _curry2(function either(f, g) {
  return _isFunction(f) ?
    function _either() {
      return f.apply(this, arguments) || g.apply(this, arguments);
    } :
    lift(or)(f, g);
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var equals = __webpack_require__(15);


/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */
module.exports = _curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var equals = __webpack_require__(15);


/**
 * Reports whether two objects have the same value, in `R.equals` terms, for
 * the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */
module.exports = _curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      var transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */
module.exports = _curry2(function evolve(transformations, object) {
  var result = {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function'                 ? transformation(object[key])
                : transformation && type === 'object' ? evolve(transformation, object[key])
                                                      : object[key];
  }
  return result;
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xfind = __webpack_require__(317);


/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
module.exports = _curry2(_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xfindIndex = __webpack_require__(318);


/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */
module.exports = _curry2(_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xfindLast = __webpack_require__(319);


/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */
module.exports = _curry2(_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xfindLastIndex = __webpack_require__(320);


/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */
module.exports = _curry2(_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _makeFlat = __webpack_require__(123);


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
module.exports = _curry1(_makeFlat(true));


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = __webpack_require__(28);
var _curry2 = __webpack_require__(0);


/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */
module.exports = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var keys = __webpack_require__(17);


/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */
module.exports = _curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = __webpack_require__(28);
var _curry2 = __webpack_require__(0);
var reduceBy = __webpack_require__(52);

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.transduce
 * @example
 *
 *      var byGrade = R.groupBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */
module.exports = _curry2(_checkForMethod('groupBy', reduceBy(function(acc, item) {
  if (acc == null) {
    acc = [];
  }
  acc.push(item);
  return acc;
}, null)));


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all "equal" according to the provided equality function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of equal elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */
module.exports = _curry2(function(fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[idx], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */
module.exports = _curry2(function gt(a, b) { return a > b; });


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */
module.exports = _curry2(function gte(a, b) { return a >= b; });


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _has = __webpack_require__(9);


/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      var hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      var point = {x: 0, y: 0};
 *      var pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */
module.exports = _curry2(_has);


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      var square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */
module.exports = _curry2(function hasIn(prop, obj) {
  return prop in obj;
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var nth = __webpack_require__(31);


/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */
module.exports = nth(0);


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var curryN = __webpack_require__(8);


/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */
module.exports = _curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length),
    function _ifElse() {
      return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
    }
  );
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

var add = __webpack_require__(40);


/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */
module.exports = add(1);


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var reduceBy = __webpack_require__(52);


/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */
module.exports = reduceBy(function(acc, elem) { return elem; }, null);


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _indexOf = __webpack_require__(118);
var _isArray = __webpack_require__(19);


/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. `R.equals` is used to determine
 * equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */
module.exports = _curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ?
    xs.indexOf(target) :
    _indexOf(xs, target, 0);
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var slice = __webpack_require__(22);


/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */
module.exports = slice(0, -1);


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Inserts the supplied element into the list, at index `index`. _Note that
 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */
module.exports = _curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Inserts the sub-list into the list, at index `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */
module.exports = _curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx),
                   elts,
                   Array.prototype.slice.call(list, idx));
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__(21);


// A simple Set type that honours R.equals semantics
module.exports = (function() {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function(item) {
    return !hasOrAdd(item, true, this);
  };

  //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //
  _Set.prototype.has = function(item) {
    return hasOrAdd(item, false, this);
  };

  //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //
  function hasOrAdd(item, shouldAdd, set) {
    var type = typeof item;
    var prevSize, newSize;
    switch (type) {
      case 'string':
      case 'number':
        // distinguish between +0 and -0
        if (item === 0 && 1 / item === -Infinity) {
          if (set._items['-0']) {
            return true;
          } else {
            if (shouldAdd) {
              set._items['-0'] = true;
            }
            return false;
          }
        }
        // these types can all utilise the native Set
        if (set._nativeSet !== null) {
          if (shouldAdd) {
            prevSize = set._nativeSet.size;
            set._nativeSet.add(item);
            newSize = set._nativeSet.size;
            return newSize === prevSize;
          } else {
            return set._nativeSet.has(item);
          }
        } else {
          if (!(type in set._items)) {
            if (shouldAdd) {
              set._items[type] = {};
              set._items[type][item] = true;
            }
            return false;
          } else if (item in set._items[type]) {
            return true;
          } else {
            if (shouldAdd) {
              set._items[type][item] = true;
            }
            return false;
          }
        }

      case 'boolean':
        // set._items['boolean'] holds a two element array
        // representing [ falseExists, trueExists ]
        if (type in set._items) {
          var bIdx = item ? 1 : 0;
          if (set._items[type][bIdx]) {
            return true;
          } else {
            if (shouldAdd) {
              set._items[type][bIdx] = true;
            }
            return false;
          }
        } else {
          if (shouldAdd) {
            set._items[type] = item ? [false, true] : [true, false];
          }
          return false;
        }

      case 'function':
        // compare functions for reference equality
        if (set._nativeSet !== null) {
          if (shouldAdd) {
            prevSize = set._nativeSet.size;
            set._nativeSet.add(item);
            newSize = set._nativeSet.size;
            return newSize === prevSize;
          } else {
            return set._nativeSet.has(item);
          }
        } else {
          if (!(type in set._items)) {
            if (shouldAdd) {
              set._items[type] = [item];
            }
            return false;
          }
          if (!_contains(item, set._items[type])) {
            if (shouldAdd) {
              set._items[type].push(item);
            }
            return false;
          }
          return true;
        }

      case 'undefined':
        if (set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type] = true;
          }
          return false;
        }

      case 'object':
        if (item === null) {
          if (!set._items['null']) {
            if (shouldAdd) {
              set._items['null'] = true;
            }
            return false;
          }
          return true;
        }
      /* falls through */
      default:
        // reduce the search size of heterogeneous sets by creating buckets
        // for each type.
        type = Object.prototype.toString.call(item);
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }
          return false;
        }
        // scan through all previously applied items
        if (!_contains(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }
          return false;
        }
        return true;
    }
  }
  return _Set;
}());


/***/ }),
/* 292 */
/***/ (function(module, exports) {

module.exports = function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
};


/***/ }),
/* 293 */
/***/ (function(module, exports) {

module.exports = function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
};


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var take = __webpack_require__(146);

module.exports = function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
};


/***/ }),
/* 295 */
/***/ (function(module, exports) {

module.exports = function dropLastWhile(pred, list) {
  var idx = list.length - 1;
  while (idx >= 0 && pred(list[idx])) {
    idx -= 1;
  }
  return Array.prototype.slice.call(list, 0, idx + 1);
};


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

var _arrayFromIterator = __webpack_require__(293);
var _functionName = __webpack_require__(299);
var _has = __webpack_require__(9);
var identical = __webpack_require__(112);
var keys = __webpack_require__(17);
var type = __webpack_require__(69);


module.exports = function _equals(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  if (type(a) !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) &&
           typeof b.equals === 'function' && b.equals(a);
  }

  switch (type(a)) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' &&
          _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline &&
            a.sticky === b.sticky &&
            a.unicode === b.unicode)) {
        return false;
      }
      break;
    case 'Map':
    case 'Set':
      if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
        return false;
      }
      break;
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
      break;
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  stackA.push(a);
  stackB.push(b);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
      return false;
    }
    idx -= 1;
  }
  stackA.pop();
  stackB.pop();
  return true;
};


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

var _forceReduced = __webpack_require__(298);
var _reduce = __webpack_require__(11);
var _xfBase = __webpack_require__(5);
var isArrayLike = __webpack_require__(30);

module.exports = (function() {
  var preservingReduced = function(xf) {
    return {
      '@@transducer/init': _xfBase.init,
      '@@transducer/result': function(result) {
        return xf['@@transducer/result'](result);
      },
      '@@transducer/step': function(result, input) {
        var ret = xf['@@transducer/step'](result, input);
        return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
      }
    };
  };

  return function _xcat(xf) {
    var rxf = preservingReduced(xf);
    return {
      '@@transducer/init': _xfBase.init,
      '@@transducer/result': function(result) {
        return rxf['@@transducer/result'](result);
      },
      '@@transducer/step': function(result, input) {
        return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
      }
    };
  };
}());


/***/ }),
/* 298 */
/***/ (function(module, exports) {

module.exports = function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
};


/***/ }),
/* 299 */
/***/ (function(module, exports) {

module.exports = function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
};


/***/ }),
/* 300 */
/***/ (function(module, exports) {

module.exports = function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
};


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

var _has = __webpack_require__(9);

// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
module.exports = function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
};


/***/ }),
/* 302 */
/***/ (function(module, exports) {

module.exports = function _of(x) { return [x]; };


/***/ }),
/* 303 */
/***/ (function(module, exports) {

module.exports = function _pipe(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
};


/***/ }),
/* 304 */
/***/ (function(module, exports) {

module.exports = function _pipeP(f, g) {
  return function() {
    var ctx = this;
    return f.apply(ctx, arguments).then(function(x) {
      return g.call(ctx, x);
    });
  };
};


/***/ }),
/* 305 */
/***/ (function(module, exports) {

module.exports = function _quote(s) {
  var escaped = s
    .replace(/\\/g, '\\\\')
    .replace(/[\b]/g, '\\b')  // \b matches word boundary; [\b] matches backspace
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\v/g, '\\v')
    .replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
};


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var _assign = __webpack_require__(63);
var _identity = __webpack_require__(65);
var _isTransformer = __webpack_require__(66);
var isArrayLike = __webpack_require__(30);
var objOf = __webpack_require__(136);


module.exports = (function() {
  var _stepCatArray = {
    '@@transducer/init': Array,
    '@@transducer/step': function(xs, x) {
      xs.push(x);
      return xs;
    },
    '@@transducer/result': _identity
  };
  var _stepCatString = {
    '@@transducer/init': String,
    '@@transducer/step': function(a, b) { return a + b; },
    '@@transducer/result': _identity
  };
  var _stepCatObject = {
    '@@transducer/init': Object,
    '@@transducer/step': function(result, input) {
      return _assign(
        result,
        isArrayLike(input) ? objOf(input[0], input[1]) : input
      );
    },
    '@@transducer/result': _identity
  };

  return function _stepCat(obj) {
    if (_isTransformer(obj)) {
      return obj;
    }
    if (isArrayLike(obj)) {
      return _stepCatArray;
    }
    if (typeof obj === 'string') {
      return _stepCatString;
    }
    if (typeof obj === 'object') {
      return _stepCatObject;
    }
    throw new Error('Cannot create transformer for ' + obj);
  };
}());


/***/ }),
/* 307 */
/***/ (function(module, exports) {

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
module.exports = (function() {
  var pad = function pad(n) { return (n < 10 ? '0' : '') + n; };

  return typeof Date.prototype.toISOString === 'function' ?
    function _toISOString(d) {
      return d.toISOString();
    } :
    function _toISOString(d) {
      return (
        d.getUTCFullYear() + '-' +
        pad(d.getUTCMonth() + 1) + '-' +
        pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds()) + '.' +
        (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z'
      );
    };
}());


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__(21);
var _map = __webpack_require__(48);
var _quote = __webpack_require__(305);
var _toISOString = __webpack_require__(307);
var keys = __webpack_require__(17);
var reject = __webpack_require__(53);


module.exports = function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function(obj, keys) {
    return _map(function(k) { return _quote(k) + ': ' + recur(obj[k]); }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function(k) { return /^\d+$/.test(k); }, keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
};


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduced = __webpack_require__(20);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase.init;
  XAll.prototype['@@transducer/result'] = function(result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function(result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }
    return result;
  };

  return _curry2(function _xall(f, xf) { return new XAll(f, xf); });
}());


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XAperture.prototype['@@transducer/init'] = _xfBase.init;
  XAperture.prototype['@@transducer/result'] = function(result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XAperture.prototype['@@transducer/step'] = function(result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };
  XAperture.prototype.store = function(input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  XAperture.prototype.getCopy = function() {
    return _concat(Array.prototype.slice.call(this.acc, this.pos),
                   Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return _curry2(function _xaperture(n, xf) { return new XAperture(n, xf); });
}());


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _flatCat = __webpack_require__(297);
var map = __webpack_require__(10);


module.exports = _curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;
  XDrop.prototype['@@transducer/step'] = function(result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xdrop(n, xf) { return new XDrop(n, xf); });
}());


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XDropLast.prototype['@@transducer/init'] = _xfBase.init;
  XDropLast.prototype['@@transducer/result'] =  function(result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLast.prototype['@@transducer/step'] = function(result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }
    this.store(input);
    return result;
  };
  XDropLast.prototype.store = function(input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return _curry2(function _xdropLast(n, xf) { return new XDropLast(n, xf); });
}());


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduce = __webpack_require__(11);
var _xfBase = __webpack_require__(5);

module.exports = (function() {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropLastWhile.prototype['@@transducer/result'] = function(result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLastWhile.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.retain(result, input)
                         : this.flush(result, input);
  };
  XDropLastWhile.prototype.flush = function(result, input) {
    result = _reduce(
      this.xf['@@transducer/step'],
      result,
      this.retained
    );
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };
  XDropLastWhile.prototype.retain = function(result, input) {
    this.retained.push(input);
    return result;
  };

  return _curry2(function _xdropLastWhile(fn, xf) { return new XDropLastWhile(fn, xf); });
}());


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
  XDropWhile.prototype['@@transducer/step'] = function(result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xdropWhile(f, xf) { return new XDropWhile(f, xf); });
}());


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;
  XFilter.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return _curry2(function _xfilter(f, xf) { return new XFilter(f, xf); });
}());


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduced = __webpack_require__(20);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase.init;
  XFind.prototype['@@transducer/result'] = function(result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return _curry2(function _xfind(f, xf) { return new XFind(f, xf); });
}());


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduced = __webpack_require__(20);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindIndex.prototype['@@transducer/result'] = function(result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFindIndex.prototype['@@transducer/step'] = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }
    return result;
  };

  return _curry2(function _xfindIndex(f, xf) { return new XFindIndex(f, xf); });
}());


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast.prototype['@@transducer/init'] = _xfBase.init;
  XFindLast.prototype['@@transducer/result'] = function(result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };
  XFindLast.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };

  return _curry2(function _xfindLast(f, xf) { return new XFindLast(f, xf); });
}());


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindLastIndex.prototype['@@transducer/result'] = function(result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };
  XFindLastIndex.prototype['@@transducer/step'] = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };

  return _curry2(function _xfindLastIndex(f, xf) { return new XFindLastIndex(f, xf); });
}());


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;
  XMap.prototype['@@transducer/step'] = function(result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
}());


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var _curryN = __webpack_require__(44);
var _has = __webpack_require__(9);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }
  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
  XReduceBy.prototype['@@transducer/result'] = function(result) {
    var key;
    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);
        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }
    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };
  XReduceBy.prototype['@@transducer/step'] = function(result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return _curryN(4, [],
                 function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
                   return new XReduceBy(valueFn, valueAcc, keyFn, xf);
                 });
}());


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduced = __webpack_require__(20);
var _xfBase = __webpack_require__(5);

module.exports = (function() {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }
  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;
  XTake.prototype['@@transducer/step'] = function(result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.i >= this.n ? _reduced(ret) : ret;
  };

  return _curry2(function _xtake(n, xf) { return new XTake(n, xf); });
}());


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduced = __webpack_require__(20);
var _xfBase = __webpack_require__(5);


module.exports = (function() {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
  XTakeWhile.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return _curry2(function _xtakeWhile(f, xf) { return new XTakeWhile(f, xf); });
}());


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__(21);
var _curry2 = __webpack_require__(0);
var _filter = __webpack_require__(117);
var flip = __webpack_require__(43);
var uniq = __webpack_require__(70);


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.intersectionWith
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */
module.exports = _curry2(function intersection(list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  return uniq(_filter(flip(_contains)(lookupList), filteredList));
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var _containsWith = __webpack_require__(64);
var _curry3 = __webpack_require__(2);
var uniqWith = __webpack_require__(71);


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate function that determines whether
 *        the two supplied elements are equal.
 * @param {Array} list1 One list of items to compare
 * @param {Array} list2 A second list of items to compare
 * @return {Array} A new list containing those elements common to both lists.
 * @see R.intersection
 * @example
 *
 *      var buffaloSpringfield = [
 *        {id: 824, name: 'Richie Furay'},
 *        {id: 956, name: 'Dewey Martin'},
 *        {id: 313, name: 'Bruce Palmer'},
 *        {id: 456, name: 'Stephen Stills'},
 *        {id: 177, name: 'Neil Young'}
 *      ];
 *      var csny = [
 *        {id: 204, name: 'David Crosby'},
 *        {id: 456, name: 'Stephen Stills'},
 *        {id: 539, name: 'Graham Nash'},
 *        {id: 177, name: 'Neil Young'}
 *      ];
 *
 *      R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield, csny);
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */
module.exports = _curry3(function intersectionWith(pred, list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  var results = [];
  var idx = 0;
  while (idx < filteredList.length) {
    if (_containsWith(pred, filteredList[idx], lookupList)) {
      results[results.length] = filteredList[idx];
    }
    idx += 1;
  }
  return uniqWith(pred, results);
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = __webpack_require__(28);
var _curry2 = __webpack_require__(0);


/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
 */
module.exports = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;
  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }
    idx += 1;
  }
  return out;
}));


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

var _clone = __webpack_require__(113);
var _curry3 = __webpack_require__(2);
var _isTransformer = __webpack_require__(66);
var _reduce = __webpack_require__(11);
var _stepCat = __webpack_require__(306);


/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with R.reduce after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      var intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */
module.exports = _curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ?
    _reduce(xf(acc), acc['@@transducer/init'](), list) :
    _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _has = __webpack_require__(9);
var keys = __webpack_require__(17);


/**
 * Same as R.invertObj, however this accounts for objects with duplicate values
 * by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys
 * in an array.
 * @example
 *
 *      var raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */
module.exports = _curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : (out[val] = []);
    list[list.length] = key;
    idx += 1;
  }
  return out;
});


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var keys = __webpack_require__(17);


/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @example
 *
 *      var raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      var raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */
module.exports = _curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var empty = __webpack_require__(111);
var equals = __webpack_require__(15);


/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */
module.exports = _curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */
module.exports = _curry1(function isNil(x) { return x == null; });


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

var invoker = __webpack_require__(29);


/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */
module.exports = invoker(1, 'join');


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */
module.exports = _curry1(function keysIn(obj) {
  var prop;
  var ks = [];
  for (prop in obj) {
    ks[ks.length] = prop;
  }
  return ks;
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isArray = __webpack_require__(19);
var equals = __webpack_require__(15);


/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. `R.equals` is used to determine
 * equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */
module.exports = _curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var lens = __webpack_require__(49);
var nth = __webpack_require__(31);
var update = __webpack_require__(149);


/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */
module.exports = _curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var assocPath = __webpack_require__(100);
var lens = __webpack_require__(49);
var path = __webpack_require__(32);


/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */
module.exports = _curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var assoc = __webpack_require__(41);
var lens = __webpack_require__(49);
var prop = __webpack_require__(67);


/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
module.exports = _curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */
module.exports = _curry2(function lt(a, b) { return a < b; });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */
module.exports = _curry2(function lte(a, b) { return a <= b; });


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * The mapAccum function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccumRight
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */
module.exports = _curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * The mapAccumRight function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to `mapAccum`, except moves through the input list from the right to
 * the left.
 *
 * The iterator function receives two arguments, *value* and *acc*, and should
 * return a tuple *[value, acc]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (x-> acc -> (y, acc)) -> acc -> [x] -> ([y], acc)
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var append = (a, b) => [a + b, a + b];
 *
 *      R.mapAccumRight(append, 5, digits); //=> [['12345', '2345', '345', '45'], '12345']
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   [
 *     f(b, f(c, f(d, a)[0])[0])[1],
 *     f(c, f(d, a)[0])[1],
 *     f(d, a)[1],
 *   ]
 *   f(b, f(c, f(d, a)[0])[0])[0],
 * ]
 */
module.exports = _curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(list[idx], tuple[0]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [result, tuple[0]];
});


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _reduce = __webpack_require__(11);
var keys = __webpack_require__(17);


/**
 * An Object-specific version of `map`. The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * `map` instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */
module.exports = _curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */
module.exports = _curry2(function match(rx, str) {
  return str.match(rx) || [];
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isInteger = __webpack_require__(120);


/**
 * mathMod behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, R.modulo). So while "-17 % 5" is -2,
 * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
 * when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      var clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      var seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */
module.exports = _curry2(function mathMod(m, p) {
  if (!_isInteger(m)) { return NaN; }
  if (!_isInteger(p) || p < 1) { return NaN; }
  return ((m % p) + p) % p;
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */
module.exports = _curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var mean = __webpack_require__(132);


/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */
module.exports = _curry1(function median(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _curry1 = __webpack_require__(1);
var _has = __webpack_require__(9);
var toString = __webpack_require__(34);


/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *
 *      var count = 0;
 *      var factorial = R.memoize(n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */
module.exports = _curry1(function memoize(fn) {
  var cache = {};
  return _arity(fn.length, function() {
    var key = toString(arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

var _assign = __webpack_require__(63);
var _curry2 = __webpack_require__(0);


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge({ x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: 5, z: 3 }
 */
module.exports = _curry2(function merge(l, r) {
  return _assign({}, l, r);
});


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

var _assign = __webpack_require__(63);
var _curry1 = __webpack_require__(1);


/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */
module.exports = _curry1(function mergeAll(list) {
  return _assign.apply(null, [{}].concat(list));
});


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var mergeWithKey = __webpack_require__(133);


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object. The key will be
 * excluded from the returned object if the resulting value is `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig (a -> a -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */
module.exports = _curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function(_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */
module.exports = _curry2(function min(a, b) { return b < a ? b : a; });


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */
module.exports = _curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see `mathMod`.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      var isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */
module.exports = _curry2(function modulo(a, b) { return a % b; });


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */
module.exports = _curry1(function negate(n) { return -n; });


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

var _complement = __webpack_require__(115);
var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xany = __webpack_require__(124);
var any = __webpack_require__(98);


/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isEven, [1, 3, 5, 7, 8, 11]); //=> false
 */
module.exports = _curry2(_complement(_dispatchable(['any'], _xany, any)));


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var curryN = __webpack_require__(8);
var nth = __webpack_require__(31);


/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */
module.exports = _curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function() {
    return nth(n, arguments);
  });
});


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _of = __webpack_require__(302);


/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */
module.exports = _curry1(_of);


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__(21);
var _curry2 = __webpack_require__(0);


/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */
module.exports = _curry2(function omit(names, obj) {
  var result = {};
  for (var prop in obj) {
    if (!_contains(prop, names)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _curry1 = __webpack_require__(1);


/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */
module.exports = _curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function() {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */
module.exports = _curry2(function pair(fst, snd) { return [fst, snd]; });


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _createPartialApplicator = __webpack_require__(116);


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight
 * @example
 *
 *      var multiply2 = (a, b) => a * b;
 *      var double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var sayHello = R.partial(greet, ['Hello']);
 *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */
module.exports = _createPartialApplicator(_concat);


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _createPartialApplicator = __webpack_require__(116);
var flip = __webpack_require__(43);


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */
module.exports = _createPartialApplicator(flip(_concat));


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var filter = __webpack_require__(61);
var juxt = __webpack_require__(128);
var reject = __webpack_require__(53);


/**
 * Takes a predicate and a list or other "filterable" object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */
module.exports = juxt([filter, reject]);


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var equals = __webpack_require__(15);
var path = __webpack_require__(32);


/**
 * Determines whether a nested path on an object has a specific value, in
 * `R.equals` terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      var user1 = { address: { zipCode: 90210 } };
 *      var user2 = { address: { zipCode: 55555 } };
 *      var user3 = { name: 'Bob' };
 *      var users = [ user1, user2, user3 ];
 *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */
module.exports = _curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var defaultTo = __webpack_require__(105);
var path = __webpack_require__(32);


/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
module.exports = _curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var path = __webpack_require__(32);


/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 */
module.exports = _curry3(function pathSatisfies(pred, propPath, obj) {
  return propPath.length > 0 && pred(path(propPath, obj));
});


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
module.exports = _curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      var isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */
module.exports = _curry2(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

var composeK = __webpack_require__(102);
var reverse = __webpack_require__(54);

/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      var getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */
module.exports = function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }
  return composeK.apply(this, reverse(arguments));
};


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

var multiply = __webpack_require__(134);
var reduce = __webpack_require__(18);


/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
module.exports = reduce(multiply, 1);


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

var _map = __webpack_require__(48);
var identity = __webpack_require__(62);
var pickAll = __webpack_require__(139);
var useWith = __webpack_require__(150);


/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      var kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */
module.exports = useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var equals = __webpack_require__(15);


/**
 * Returns `true` if the specified object property is equal, in `R.equals`
 * terms, to the given value; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.equals, R.propSatisfies
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */
module.exports = _curry3(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var is = __webpack_require__(127);


/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */
module.exports = _curry3(function propIs(type, name, obj) {
  return is(type, obj[name]);
});


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var _has = __webpack_require__(9);


/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */
module.exports = _curry3(function propOr(val, p, obj) {
  return (obj != null && _has(p, obj)) ? obj[p] : val;
});


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
module.exports = _curry3(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */
module.exports = _curry2(function props(ps, obj) {
  var len = ps.length;
  var out = [];
  var idx = 0;

  while (idx < len) {
    out[idx] = obj[ps[idx]];
    idx += 1;
  }

  return out;
});


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _isNumber = __webpack_require__(121);


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */
module.exports = _curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

var _curryN = __webpack_require__(44);
var _reduce = __webpack_require__(11);
var _reduced = __webpack_require__(20);


/**
 * Like `reduce`, `reduceWhile` returns a single item by iterating through
 * the list, successively calling the iterator function. `reduceWhile` also
 * takes a predicate that is evaluated before each step. If the predicate returns
 * `false`, it "short-circuits" the iteration and returns the current value
 * of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      var isOdd = (acc, x) => x % 2 === 1;
 *      var xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      var ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */
module.exports = _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function(acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _reduced = __webpack_require__(20);

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is unavailable to functions not explicitly listed
 * above. For instance, it is not currently supported by reduceRight.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.transduce
 * @example
 *
 *      R.reduce(
 *        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
 *        0,
 *        [1, 2, 3, 4, 5]) // 10
 */

module.exports = _curry1(_reduced);


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */
module.exports = _curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var always = __webpack_require__(23);
var times = __webpack_require__(147);


/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      var obj = {};
 *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */
module.exports = _curry2(function repeat(value, n) {
  return times(always(value), n);
});


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */
module.exports = _curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Scan is similar to reduce, but returns a list of successively reduced values
 * from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a,b -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */
module.exports = _curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
});


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var always = __webpack_require__(23);
var over = __webpack_require__(138);


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */
module.exports = _curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a,a -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */
module.exports = _curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      var sortByFirstItem = R.sortBy(R.prop(0));
 *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      var people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */
module.exports = _curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [a -> a -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      var alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      var bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      var people = [clara, bob, alice];
 *      var ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */
module.exports = _curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

var invoker = __webpack_require__(29);


/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `str`.
 * @see R.join
 * @example
 *
 *      var pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */
module.exports = invoker(1, 'split');


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var length = __webpack_require__(130);
var slice = __webpack_require__(22);


/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */
module.exports = _curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var slice = __webpack_require__(22);


/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */
module.exports = _curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }
  return result;
});


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */
module.exports = _curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */
module.exports = _curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var concat = __webpack_require__(60);
var difference = __webpack_require__(106);


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */
module.exports = _curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var concat = __webpack_require__(60);
var differenceWith = __webpack_require__(107);


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      var eqA = R.eqBy(R.prop('a'));
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */
module.exports = _curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var drop = __webpack_require__(109);


/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */
module.exports = _curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      var isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 */
module.exports = _curry2(function takeLastWhile(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0 && fn(list[idx])) {
    idx -= 1;
  }
  return Array.prototype.slice.call(list, idx + 1);
});


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var _dispatchable = __webpack_require__(4);
var _xtakeWhile = __webpack_require__(324);


/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      var isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 */
module.exports = _curry2(_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len && fn(list[idx])) {
    idx += 1;
  }
  return Array.prototype.slice.call(list, 0, idx);
}));


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */
module.exports = _curry2(function tap(fn, x) {
  fn(x);
  return x;
});


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

var _cloneRegExp = __webpack_require__(114);
var _curry2 = __webpack_require__(0);
var _isRegExp = __webpack_require__(300);
var toString = __webpack_require__(34);


/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */
module.exports = _curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

var invoker = __webpack_require__(29);


/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */
module.exports = invoker(0, 'toLowerCase');


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var _has = __webpack_require__(9);


/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */
module.exports = _curry1(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */
module.exports = _curry1(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

var invoker = __webpack_require__(29);


/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */
module.exports = invoker(0, 'toUpperCase');


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

var _reduce = __webpack_require__(11);
var _xwrap = __webpack_require__(126);
var curryN = __webpack_require__(8);


/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the `R.reduced` function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is R.identity. The init
 * function can be used to provide an initial accumulator, but is ignored by
 * transduce.
 *
 * The iteration is performed with R.reduce after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 */
module.exports = curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * If some of the rows are shorter than the following rows, their elements are skipped:
 *
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */
module.exports = _curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);
var map = __webpack_require__(10);
var sequence = __webpack_require__(144);


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */
module.exports = _curry3(function traverse(of, f, traversable) {
  return sequence(of, map(f, traversable));
});


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */
module.exports = (function() {
  var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
           '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
           '\u2029\uFEFF';
  var zeroWidth = '\u200b';
  var hasProtoTrim = (typeof String.prototype.trim === 'function');
  if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
    return _curry1(function trim(str) {
      var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
      var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
      return str.replace(beginRx, '').replace(endRx, '');
    });
  } else {
    return _curry1(function trim(str) {
      return str.trim();
    });
  }
}());


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(16);
var _concat = __webpack_require__(14);
var _curry2 = __webpack_require__(0);


/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */
module.exports = _curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function() {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, R.unapply derives a variadic function from a function which
 * takes an array. R.unapply is the inverse of R.apply.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */
module.exports = _curry1(function unapply(fn) {
  return function() {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);
var nAry = __webpack_require__(51);


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */
module.exports = _curry1(function unary(fn) {
  return nAry(1, fn);
});


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var curryN = __webpack_require__(8);


/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      var addFour = a => b => c => d => a + b + c + d;
 *
 *      var uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */
module.exports = _curry2(function uncurryN(depth, fn) {
  return curryN(depth, function() {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      var f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */
module.exports = _curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});


/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry2 = __webpack_require__(0);
var compose = __webpack_require__(59);
var uniq = __webpack_require__(70);


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */
module.exports = _curry2(compose(uniq, _concat));


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

var _concat = __webpack_require__(14);
var _curry3 = __webpack_require__(2);
var uniqWith = __webpack_require__(71);


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      var l1 = [{a: 1}, {a: 2}];
 *      var l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */
module.exports = _curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});


/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when
 * @example
 *
 *      // coerceArray :: (a|[a]) -> [a]
 *      var coerceArray = R.unless(R.isArrayLike, R.of);
 *      coerceArray([1, 2, 3]); //=> [1, 2, 3]
 *      coerceArray(1);         //=> [1]
 */
module.exports = _curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});


/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

var _identity = __webpack_require__(65);
var chain = __webpack_require__(58);


/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */
module.exports = chain(_identity);


/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */
module.exports = _curry3(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});


/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(1);


/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */
module.exports = _curry1(function valuesIn(obj) {
  var prop;
  var vs = [];
  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }
  return vs;
});


/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */
module.exports = (function() {
  // `Const` is a functor that effectively ignores the function given to `map`.
  var Const = function(x) {
    return {value: x, map: function() { return this; }};
  };

  return _curry2(function view(lens, x) {
    // Using `Const` effectively ignores the setter function of the `lens`,
    // leaving the value returned by the getter function unmodified.
    return lens(Const)(x).value;
  });
}());


/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless
 * @example
 *
 *      // truncate :: String -> String
 *      var truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */
module.exports = _curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});


/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);
var equals = __webpack_require__(15);
var map = __webpack_require__(10);
var where = __webpack_require__(152);


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in `R.equals` terms) as accessing that property of the spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */
module.exports = _curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});


/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__(21);
var _curry2 = __webpack_require__(0);
var flip = __webpack_require__(43);
var reject = __webpack_require__(53);


/**
 * Returns a new list without values in the first argument.
 * `R.equals` is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */
module.exports = _curry2(function(xs, list) {
  return reject(flip(_contains)(xs), list);
});


/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */
module.exports = _curry2(function xprod(a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];
  while (idx < ilen) {
    j = 0;
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }
    idx += 1;
  }
  return result;
});


/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */
module.exports = _curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});


/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__(0);


/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zipWith(pair), fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});


/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__(2);


/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a,b -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      var f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */
module.exports = _curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});


/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = undefined;

var _react = __webpack_require__(3);

var _storeShape = __webpack_require__(153);

var _storeShape2 = _interopRequireDefault(_storeShape);

var _warning = __webpack_require__(154);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

var Provider = function (_Component) {
  _inherits(Provider, _Component);

  Provider.prototype.getChildContext = function getChildContext() {
    return { store: this.store };
  };

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.store = props.store;
    return _this;
  }

  Provider.prototype.render = function render() {
    return _react.Children.only(this.props.children);
  };

  return Provider;
}(_react.Component);

exports["default"] = Provider;


if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;


    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
}

Provider.propTypes = {
  store: _storeShape2["default"].isRequired,
  children: _react.PropTypes.element.isRequired
};
Provider.childContextTypes = {
  store: _storeShape2["default"].isRequired
};

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = connect;

var _react = __webpack_require__(3);

var _storeShape = __webpack_require__(153);

var _storeShape2 = _interopRequireDefault(_storeShape);

var _shallowEqual = __webpack_require__(430);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _wrapActionCreators = __webpack_require__(431);

var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

var _warning = __webpack_require__(154);

var _warning2 = _interopRequireDefault(_warning);

var _isPlainObject = __webpack_require__(446);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _hoistNonReactStatics = __webpack_require__(444);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = __webpack_require__(445);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultMapStateToProps = function defaultMapStateToProps(state) {
  return {};
}; // eslint-disable-line no-unused-vars
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
  return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
  return _extends({}, parentProps, stateProps, dispatchProps);
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

var errorObject = { value: null };
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx);
  } catch (e) {
    errorObject.value = e;
    return errorObject;
  }
}

// Helps track hot reloading.
var nextVersion = 0;

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var shouldSubscribe = Boolean(mapStateToProps);
  var mapState = mapStateToProps || defaultMapStateToProps;

  var mapDispatch = void 0;
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps;
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps;
  } else {
    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
  }

  var finalMergeProps = mergeProps || defaultMergeProps;
  var _options$pure = options.pure,
      pure = _options$pure === undefined ? true : _options$pure,
      _options$withRef = options.withRef,
      withRef = _options$withRef === undefined ? false : _options$withRef;

  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

  // Helps track hot reloading.
  var version = nextVersion++;

  return function wrapWithConnect(WrappedComponent) {
    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

    function checkStateShape(props, methodName) {
      if (!(0, _isPlainObject2["default"])(props)) {
        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
      }
    }

    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
      if (process.env.NODE_ENV !== 'production') {
        checkStateShape(mergedProps, 'mergeProps');
      }
      return mergedProps;
    }

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
      };

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.store = props.store || context.store;

        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

        var storeState = _this.store.getState();
        _this.state = { storeState: storeState };
        _this.clearCache();
        return _this;
      }

      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props);
        }

        var state = store.getState();
        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps');
        }
        return stateProps;
      };

      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
        var mappedState = mapState(store.getState(), props);
        var isFactory = typeof mappedState === 'function';

        this.finalMapStateToProps = isFactory ? mappedState : mapState;
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

        if (isFactory) {
          return this.computeStateProps(store, props);
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps');
        }
        return mappedState;
      };

      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props);
        }

        var dispatch = store.dispatch;

        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(dispatchProps, 'mapDispatchToProps');
        }
        return dispatchProps;
      };

      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
        var mappedDispatch = mapDispatch(store.dispatch, props);
        var isFactory = typeof mappedDispatch === 'function';

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

        if (isFactory) {
          return this.computeDispatchProps(store, props);
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedDispatch, 'mapDispatchToProps');
        }
        return mappedDispatch;
      };

      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
        var nextStateProps = this.computeStateProps(this.store, this.props);
        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
          return false;
        }

        this.stateProps = nextStateProps;
        return true;
      };

      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
          return false;
        }

        this.dispatchProps = nextDispatchProps;
        return true;
      };

      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
          return false;
        }

        this.mergedProps = nextMergedProps;
        return true;
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return typeof this.unsubscribe === 'function';
      };

      Connect.prototype.trySubscribe = function trySubscribe() {
        if (shouldSubscribe && !this.unsubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
          this.handleChange();
        }
      };

      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        this.trySubscribe();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
          this.haveOwnPropsChanged = true;
        }
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        this.tryUnsubscribe();
        this.clearCache();
      };

      Connect.prototype.clearCache = function clearCache() {
        this.dispatchProps = null;
        this.stateProps = null;
        this.mergedProps = null;
        this.haveOwnPropsChanged = true;
        this.hasStoreStateChanged = true;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;
        this.renderedElement = null;
        this.finalMapDispatchToProps = null;
        this.finalMapStateToProps = null;
      };

      Connect.prototype.handleChange = function handleChange() {
        if (!this.unsubscribe) {
          return;
        }

        var storeState = this.store.getState();
        var prevStoreState = this.state.storeState;
        if (pure && prevStoreState === storeState) {
          return;
        }

        if (pure && !this.doStatePropsDependOnOwnProps) {
          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
          if (!haveStatePropsChanged) {
            return;
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value;
          }
          this.haveStatePropsBeenPrecalculated = true;
        }

        this.hasStoreStateChanged = true;
        this.setState({ storeState: storeState });
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

        return this.refs.wrappedInstance;
      };

      Connect.prototype.render = function render() {
        var haveOwnPropsChanged = this.haveOwnPropsChanged,
            hasStoreStateChanged = this.hasStoreStateChanged,
            haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
            statePropsPrecalculationError = this.statePropsPrecalculationError,
            renderedElement = this.renderedElement;


        this.haveOwnPropsChanged = false;
        this.hasStoreStateChanged = false;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError;
        }

        var shouldUpdateStateProps = true;
        var shouldUpdateDispatchProps = true;
        if (pure && renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
        }

        var haveStatePropsChanged = false;
        var haveDispatchPropsChanged = false;
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true;
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded();
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
        }

        var haveMergedPropsChanged = true;
        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
        } else {
          haveMergedPropsChanged = false;
        }

        if (!haveMergedPropsChanged && renderedElement) {
          return renderedElement;
        }

        if (withRef) {
          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
            ref: 'wrappedInstance'
          }));
        } else {
          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
        }

        return this.renderedElement;
      };

      return Connect;
    }(_react.Component);

    Connect.displayName = connectDisplayName;
    Connect.WrappedComponent = WrappedComponent;
    Connect.contextTypes = {
      store: _storeShape2["default"]
    };
    Connect.propTypes = {
      store: _storeShape2["default"]
    };

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version === version) {
          return;
        }

        // We are hot reloading!
        this.version = version;
        this.trySubscribe();
        this.clearCache();
      };
    }

    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
  };
}

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = shallowEqual;
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = wrapActionCreators;

var _redux = __webpack_require__(157);

function wrapActionCreators(actionCreators) {
  return function (dispatch) {
    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
  };
}

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(3));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouterTransition"] = factory(require("react"));
	else
		root["ReactRouterTransition"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _RouteTransition = __webpack_require__(1);
	
	Object.defineProperty(exports, 'RouteTransition', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_RouteTransition).default;
	  }
	});
	
	var _presets = __webpack_require__(19);
	
	Object.defineProperty(exports, 'presets', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_presets).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactMotion = __webpack_require__(3);
	
	var _ensureSpring = __webpack_require__(18);
	
	var _ensureSpring2 = _interopRequireDefault(_ensureSpring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RouteTransition = _react2.default.createClass({
	  displayName: 'RouteTransition',
	
	  propTypes: {
	    className: _react.PropTypes.string,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	    pathname: _react.PropTypes.string.isRequired,
	    atEnter: _react.PropTypes.object.isRequired,
	    atActive: _react.PropTypes.object.isRequired,
	    atLeave: _react.PropTypes.object.isRequired,
	    mapStyles: _react.PropTypes.func,
	    runOnMount: _react.PropTypes.bool,
	    style: _react.PropTypes.object
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'div',
	      runOnMount: true,
	      mapStyles: function mapStyles(val) {
	        return val;
	      }
	    };
	  },
	  getDefaultStyles: function getDefaultStyles() {
	    if (!this.props.runOnMount) {
	      return null;
	    }
	
	    if (!this.props.children) {
	      return [];
	    }
	
	    return [{
	      key: this.props.pathname,
	      data: this.props.children,
	      style: this.props.atEnter
	    }];
	  },
	
	  // there's only ever one route mounted at a time,
	  // so just return the current match
	  getStyles: function getStyles() {
	    if (!this.props.children) {
	      return [];
	    }
	
	    // TODO: maybe access route path from children for pathname?
	    return [{
	      key: this.props.pathname,
	      data: this.props.children,
	      style: (0, _ensureSpring2.default)(this.props.atActive)
	    }];
	  },
	  willEnter: function willEnter() {
	    return this.props.atEnter;
	  },
	  willLeave: function willLeave() {
	    return (0, _ensureSpring2.default)(this.props.atLeave);
	  },
	  renderRoute: function renderRoute(config) {
	    var props = {
	      style: this.props.mapStyles(config.style),
	      key: config.key
	    };
	
	    return this.props.component ? (0, _react.createElement)(this.props.component, props, config.data) : (0, _react.cloneElement)(config.data, props);
	  },
	  renderRoutes: function renderRoutes(interpolatedStyles) {
	    return _react2.default.createElement(
	      'div',
	      { className: this.props.className, style: this.props.style },
	      interpolatedStyles.map(this.renderRoute)
	    );
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      _reactMotion.TransitionMotion,
	      {
	        defaultStyles: this.getDefaultStyles(),
	        styles: this.getStyles(),
	        willEnter: this.willEnter,
	        willLeave: this.willLeave
	      },
	      this.renderRoutes
	    );
	  }
	});
	
	exports.default = RouteTransition;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }
	
	var _Motion = __webpack_require__(4);
	
	exports.Motion = _interopRequire(_Motion);
	
	var _StaggeredMotion = __webpack_require__(12);
	
	exports.StaggeredMotion = _interopRequire(_StaggeredMotion);
	
	var _TransitionMotion = __webpack_require__(13);
	
	exports.TransitionMotion = _interopRequire(_TransitionMotion);
	
	var _spring = __webpack_require__(15);
	
	exports.spring = _interopRequire(_spring);
	
	var _presets = __webpack_require__(16);
	
	exports.presets = _interopRequire(_presets);
	
	// deprecated, dummy warning function
	
	var _reorderKeys = __webpack_require__(17);
	
	exports.reorderKeys = _interopRequire(_reorderKeys);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mapToZero = __webpack_require__(5);
	
	var _mapToZero2 = _interopRequireDefault(_mapToZero);
	
	var _stripStyle = __webpack_require__(6);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var _stepper3 = __webpack_require__(7);
	
	var _stepper4 = _interopRequireDefault(_stepper3);
	
	var _performanceNow = __webpack_require__(8);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(10);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _shouldStopAnimation = __webpack_require__(11);
	
	var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var msPerFrame = 1000 / 60;
	
	var Motion = _react2['default'].createClass({
	  displayName: 'Motion',
	
	  propTypes: {
	    // TOOD: warn against putting a config in here
	    defaultStyle: _react.PropTypes.objectOf(_react.PropTypes.number),
	    style: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object])).isRequired,
	    children: _react.PropTypes.func.isRequired,
	    onRest: _react.PropTypes.func
	  },
	
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultStyle = _props.defaultStyle;
	    var style = _props.style;
	
	    var currentStyle = defaultStyle || _stripStyle2['default'](style);
	    var currentVelocity = _mapToZero2['default'](currentStyle);
	    return {
	      currentStyle: currentStyle,
	      currentVelocity: currentVelocity,
	      lastIdealStyle: currentStyle,
	      lastIdealVelocity: currentVelocity
	    };
	  },
	
	  wasAnimating: false,
	  animationID: null,
	  prevTime: 0,
	  accumulatedTime: 0,
	  // it's possible that currentStyle's value is stale: if props is immediately
	  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
	  // at 0 (didn't have time to tick and interpolate even once). If we naively
	  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	  // In reality currentStyle should be 400
	  unreadPropStyle: null,
	  // after checking for unreadPropStyle != null, we manually go set the
	  // non-interpolating values (those that are a number, without a spring
	  // config)
	  clearUnreadPropStyle: function clearUnreadPropStyle(destStyle) {
	    var dirty = false;
	    var _state = this.state;
	    var currentStyle = _state.currentStyle;
	    var currentVelocity = _state.currentVelocity;
	    var lastIdealStyle = _state.lastIdealStyle;
	    var lastIdealVelocity = _state.lastIdealVelocity;
	
	    for (var key in destStyle) {
	      if (!destStyle.hasOwnProperty(key)) {
	        continue;
	      }
	
	      var styleValue = destStyle[key];
	      if (typeof styleValue === 'number') {
	        if (!dirty) {
	          dirty = true;
	          currentStyle = _extends({}, currentStyle);
	          currentVelocity = _extends({}, currentVelocity);
	          lastIdealStyle = _extends({}, lastIdealStyle);
	          lastIdealVelocity = _extends({}, lastIdealVelocity);
	        }
	
	        currentStyle[key] = styleValue;
	        currentVelocity[key] = 0;
	        lastIdealStyle[key] = styleValue;
	        lastIdealVelocity[key] = 0;
	      }
	    }
	
	    if (dirty) {
	      this.setState({ currentStyle: currentStyle, currentVelocity: currentVelocity, lastIdealStyle: lastIdealStyle, lastIdealVelocity: lastIdealVelocity });
	    }
	  },
	
	  startAnimationIfNecessary: function startAnimationIfNecessary() {
	    var _this = this;
	
	    // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	    // call cb? No, otherwise accidental parent rerender causes cb trigger
	    this.animationID = _raf2['default'](function () {
	      // check if we need to animate in the first place
	      var propsStyle = _this.props.style;
	      if (_shouldStopAnimation2['default'](_this.state.currentStyle, propsStyle, _this.state.currentVelocity)) {
	        if (_this.wasAnimating && _this.props.onRest) {
	          _this.props.onRest();
	        }
	
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.wasAnimating = false;
	        _this.accumulatedTime = 0;
	        return;
	      }
	
	      _this.wasAnimating = true;
	
	      var currentTime = _performanceNow2['default']();
	      var timeDelta = currentTime - _this.prevTime;
	      _this.prevTime = currentTime;
	      _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	      // more than 10 frames? prolly switched browser tab. Restart
	      if (_this.accumulatedTime > msPerFrame * 10) {
	        _this.accumulatedTime = 0;
	      }
	
	      if (_this.accumulatedTime === 0) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.startAnimationIfNecessary();
	        return;
	      }
	
	      var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	      var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
	
	      var newLastIdealStyle = {};
	      var newLastIdealVelocity = {};
	      var newCurrentStyle = {};
	      var newCurrentVelocity = {};
	
	      for (var key in propsStyle) {
	        if (!propsStyle.hasOwnProperty(key)) {
	          continue;
	        }
	
	        var styleValue = propsStyle[key];
	        if (typeof styleValue === 'number') {
	          newCurrentStyle[key] = styleValue;
	          newCurrentVelocity[key] = 0;
	          newLastIdealStyle[key] = styleValue;
	          newLastIdealVelocity[key] = 0;
	        } else {
	          var newLastIdealStyleValue = _this.state.lastIdealStyle[key];
	          var newLastIdealVelocityValue = _this.state.lastIdealVelocity[key];
	          for (var i = 0; i < framesToCatchUp; i++) {
	            var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	            newLastIdealStyleValue = _stepper[0];
	            newLastIdealVelocityValue = _stepper[1];
	          }
	
	          var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	          var nextIdealX = _stepper2[0];
	          var nextIdealV = _stepper2[1];
	
	          newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	          newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	          newLastIdealStyle[key] = newLastIdealStyleValue;
	          newLastIdealVelocity[key] = newLastIdealVelocityValue;
	        }
	      }
	
	      _this.animationID = null;
	      // the amount we're looped over above
	      _this.accumulatedTime -= framesToCatchUp * msPerFrame;
	
	      _this.setState({
	        currentStyle: newCurrentStyle,
	        currentVelocity: newCurrentVelocity,
	        lastIdealStyle: newLastIdealStyle,
	        lastIdealVelocity: newLastIdealVelocity
	      });
	
	      _this.unreadPropStyle = null;
	
	      _this.startAnimationIfNecessary();
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if (this.unreadPropStyle != null) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyle);
	    }
	
	    this.unreadPropStyle = props.style;
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  },
	
	  render: function render() {
	    var renderedChildren = this.props.children(this.state.currentStyle);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  }
	});
	
	exports['default'] = Motion;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	
	
	// currently used to initiate the velocity style object to 0
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = mapToZero;
	
	function mapToZero(obj) {
	  var ret = {};
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      ret[key] = 0;
	    }
	  }
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	
	// turn {x: {val: 1, stiffness: 1, damping: 2}, y: 2} generated by
	// `{x: spring(1, {stiffness: 1, damping: 2}), y: 2}` into {x: 1, y: 2}
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = stripStyle;
	
	function stripStyle(style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = typeof style[key] === 'number' ? style[key] : style[key].val;
	  }
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	
	
	// stepper is used a lot. Saves allocation to return the same array wrapper.
	// This is fine and danger-free against mutations because the callsite
	// immediately destructures it and gets the numbers inside without passing the
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = stepper;
	
	var reusedTuple = [];
	
	function stepper(secondPerFrame, x, v, destX, k, b, precision) {
	  // Spring stiffness, in kg / s^2
	
	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);
	
	  // Damping, in kg / s
	  var Fdamper = -b * v;
	
	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;
	
	  var newV = v + a * secondPerFrame;
	  var newX = x + newV * secondPerFrame;
	
	  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
	    reusedTuple[0] = destX;
	    reusedTuple[1] = 0;
	    return reusedTuple;
	  }
	
	  reusedTuple[0] = newX;
	  reusedTuple[1] = newV;
	  return reusedTuple;
	}
	
	module.exports = exports["default"];
	// array reference around.

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(8)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
	
	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(global, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	
	// usage assumption: currentStyle values have already been rendered but it says
	// nothing of whether currentStyle is stale (see unreadPropStyle)
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = shouldStopAnimation;
	
	function shouldStopAnimation(currentStyle, style, currentVelocity) {
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	
	    if (currentVelocity[key] !== 0) {
	      return false;
	    }
	
	    var styleValue = typeof style[key] === 'number' ? style[key] : style[key].val;
	    // stepper will have already taken care of rounding precision errors, so
	    // won't have such thing as 0.9999 !=== 1
	    if (currentStyle[key] !== styleValue) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mapToZero = __webpack_require__(5);
	
	var _mapToZero2 = _interopRequireDefault(_mapToZero);
	
	var _stripStyle = __webpack_require__(6);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var _stepper3 = __webpack_require__(7);
	
	var _stepper4 = _interopRequireDefault(_stepper3);
	
	var _performanceNow = __webpack_require__(8);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(10);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _shouldStopAnimation = __webpack_require__(11);
	
	var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var msPerFrame = 1000 / 60;
	
	function shouldStopAnimationAll(currentStyles, styles, currentVelocities) {
	  for (var i = 0; i < currentStyles.length; i++) {
	    if (!_shouldStopAnimation2['default'](currentStyles[i], styles[i], currentVelocities[i])) {
	      return false;
	    }
	  }
	  return true;
	}
	
	var StaggeredMotion = _react2['default'].createClass({
	  displayName: 'StaggeredMotion',
	
	  propTypes: {
	    // TOOD: warn against putting a config in here
	    defaultStyles: _react.PropTypes.arrayOf(_react.PropTypes.objectOf(_react.PropTypes.number)),
	    styles: _react.PropTypes.func.isRequired,
	    children: _react.PropTypes.func.isRequired
	  },
	
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultStyles = _props.defaultStyles;
	    var styles = _props.styles;
	
	    var currentStyles = defaultStyles || styles().map(_stripStyle2['default']);
	    var currentVelocities = currentStyles.map(function (currentStyle) {
	      return _mapToZero2['default'](currentStyle);
	    });
	    return {
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      lastIdealStyles: currentStyles,
	      lastIdealVelocities: currentVelocities
	    };
	  },
	
	  animationID: null,
	  prevTime: 0,
	  accumulatedTime: 0,
	  // it's possible that currentStyle's value is stale: if props is immediately
	  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
	  // at 0 (didn't have time to tick and interpolate even once). If we naively
	  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	  // In reality currentStyle should be 400
	  unreadPropStyles: null,
	  // after checking for unreadPropStyles != null, we manually go set the
	  // non-interpolating values (those that are a number, without a spring
	  // config)
	  clearUnreadPropStyle: function clearUnreadPropStyle(unreadPropStyles) {
	    var _state = this.state;
	    var currentStyles = _state.currentStyles;
	    var currentVelocities = _state.currentVelocities;
	    var lastIdealStyles = _state.lastIdealStyles;
	    var lastIdealVelocities = _state.lastIdealVelocities;
	
	    var someDirty = false;
	    for (var i = 0; i < unreadPropStyles.length; i++) {
	      var unreadPropStyle = unreadPropStyles[i];
	      var dirty = false;
	
	      for (var key in unreadPropStyle) {
	        if (!unreadPropStyle.hasOwnProperty(key)) {
	          continue;
	        }
	
	        var styleValue = unreadPropStyle[key];
	        if (typeof styleValue === 'number') {
	          if (!dirty) {
	            dirty = true;
	            someDirty = true;
	            currentStyles[i] = _extends({}, currentStyles[i]);
	            currentVelocities[i] = _extends({}, currentVelocities[i]);
	            lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
	            lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
	          }
	          currentStyles[i][key] = styleValue;
	          currentVelocities[i][key] = 0;
	          lastIdealStyles[i][key] = styleValue;
	          lastIdealVelocities[i][key] = 0;
	        }
	      }
	    }
	
	    if (someDirty) {
	      this.setState({ currentStyles: currentStyles, currentVelocities: currentVelocities, lastIdealStyles: lastIdealStyles, lastIdealVelocities: lastIdealVelocities });
	    }
	  },
	
	  startAnimationIfNecessary: function startAnimationIfNecessary() {
	    var _this = this;
	
	    // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	    // call cb? No, otherwise accidental parent rerender causes cb trigger
	    this.animationID = _raf2['default'](function () {
	      var destStyles = _this.props.styles(_this.state.lastIdealStyles);
	
	      // check if we need to animate in the first place
	      if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities)) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.accumulatedTime = 0;
	        return;
	      }
	
	      var currentTime = _performanceNow2['default']();
	      var timeDelta = currentTime - _this.prevTime;
	      _this.prevTime = currentTime;
	      _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	      // more than 10 frames? prolly switched browser tab. Restart
	      if (_this.accumulatedTime > msPerFrame * 10) {
	        _this.accumulatedTime = 0;
	      }
	
	      if (_this.accumulatedTime === 0) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.startAnimationIfNecessary();
	        return;
	      }
	
	      var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	      var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
	
	      var newLastIdealStyles = [];
	      var newLastIdealVelocities = [];
	      var newCurrentStyles = [];
	      var newCurrentVelocities = [];
	
	      for (var i = 0; i < destStyles.length; i++) {
	        var destStyle = destStyles[i];
	        var newCurrentStyle = {};
	        var newCurrentVelocity = {};
	        var newLastIdealStyle = {};
	        var newLastIdealVelocity = {};
	
	        for (var key in destStyle) {
	          if (!destStyle.hasOwnProperty(key)) {
	            continue;
	          }
	
	          var styleValue = destStyle[key];
	          if (typeof styleValue === 'number') {
	            newCurrentStyle[key] = styleValue;
	            newCurrentVelocity[key] = 0;
	            newLastIdealStyle[key] = styleValue;
	            newLastIdealVelocity[key] = 0;
	          } else {
	            var newLastIdealStyleValue = _this.state.lastIdealStyles[i][key];
	            var newLastIdealVelocityValue = _this.state.lastIdealVelocities[i][key];
	            for (var j = 0; j < framesToCatchUp; j++) {
	              var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	              newLastIdealStyleValue = _stepper[0];
	              newLastIdealVelocityValue = _stepper[1];
	            }
	
	            var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	            var nextIdealX = _stepper2[0];
	            var nextIdealV = _stepper2[1];
	
	            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	            newLastIdealStyle[key] = newLastIdealStyleValue;
	            newLastIdealVelocity[key] = newLastIdealVelocityValue;
	          }
	        }
	
	        newCurrentStyles[i] = newCurrentStyle;
	        newCurrentVelocities[i] = newCurrentVelocity;
	        newLastIdealStyles[i] = newLastIdealStyle;
	        newLastIdealVelocities[i] = newLastIdealVelocity;
	      }
	
	      _this.animationID = null;
	      // the amount we're looped over above
	      _this.accumulatedTime -= framesToCatchUp * msPerFrame;
	
	      _this.setState({
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities,
	        lastIdealStyles: newLastIdealStyles,
	        lastIdealVelocities: newLastIdealVelocities
	      });
	
	      _this.unreadPropStyles = null;
	
	      _this.startAnimationIfNecessary();
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if (this.unreadPropStyles != null) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyles);
	    }
	
	    this.unreadPropStyles = props.styles(this.state.lastIdealStyles);
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  },
	
	  render: function render() {
	    var renderedChildren = this.props.children(this.state.currentStyles);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  }
	});
	
	exports['default'] = StaggeredMotion;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mapToZero = __webpack_require__(5);
	
	var _mapToZero2 = _interopRequireDefault(_mapToZero);
	
	var _stripStyle = __webpack_require__(6);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var _stepper3 = __webpack_require__(7);
	
	var _stepper4 = _interopRequireDefault(_stepper3);
	
	var _mergeDiff = __webpack_require__(14);
	
	var _mergeDiff2 = _interopRequireDefault(_mergeDiff);
	
	var _performanceNow = __webpack_require__(8);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(10);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _shouldStopAnimation = __webpack_require__(11);
	
	var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var msPerFrame = 1000 / 60;
	
	// the children function & (potential) styles function asks as param an
	// Array<TransitionPlainStyle>, where each TransitionPlainStyle is of the format
	// {key: string, data?: any, style: PlainStyle}. However, the way we keep
	// internal states doesn't contain such a data structure (check the state and
	// TransitionMotionState). So when children function and others ask for such
	// data we need to generate them on the fly by combining mergedPropsStyles and
	// currentStyles/lastIdealStyles
	function rehydrateStyles(mergedPropsStyles, unreadPropStyles, plainStyles) {
	  if (unreadPropStyles == null) {
	    // $FlowFixMe
	    return mergedPropsStyles.map(function (mergedPropsStyle, i) {
	      return {
	        key: mergedPropsStyle.key,
	        data: mergedPropsStyle.data,
	        style: plainStyles[i]
	      };
	    });
	  }
	  return mergedPropsStyles.map(function (mergedPropsStyle, i) {
	    // $FlowFixMe
	    for (var j = 0; j < unreadPropStyles.length; j++) {
	      // $FlowFixMe
	      if (unreadPropStyles[j].key === mergedPropsStyle.key) {
	        return {
	          // $FlowFixMe
	          key: unreadPropStyles[j].key,
	          data: unreadPropStyles[j].data,
	          style: plainStyles[i]
	        };
	      }
	    }
	    // $FlowFixMe
	    return { key: mergedPropsStyle.key, data: mergedPropsStyle.data, style: plainStyles[i] };
	  });
	}
	
	function shouldStopAnimationAll(currentStyles, destStyles, currentVelocities, mergedPropsStyles) {
	  if (mergedPropsStyles.length !== destStyles.length) {
	    return false;
	  }
	
	  for (var i = 0; i < mergedPropsStyles.length; i++) {
	    if (mergedPropsStyles[i].key !== destStyles[i].key) {
	      return false;
	    }
	  }
	
	  // we have the invariant that mergedPropsStyles and
	  // currentStyles/currentVelocities/last* are synced in terms of cells, see
	  // mergeAndSync comment for more info
	  for (var i = 0; i < mergedPropsStyles.length; i++) {
	    if (!_shouldStopAnimation2['default'](currentStyles[i], destStyles[i].style, currentVelocities[i])) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	// core key merging logic
	
	// things to do: say previously merged style is {a, b}, dest style (prop) is {b,
	// c}, previous current (interpolating) style is {a, b}
	// **invariant**: current[i] corresponds to merged[i] in terms of key
	
	// steps:
	// turn merged style into {a?, b, c}
	//    add c, value of c is destStyles.c
	//    maybe remove a, aka call willLeave(a), then merged is either {b, c} or {a, b, c}
	// turn current (interpolating) style from {a, b} into {a?, b, c}
	//    maybe remove a
	//    certainly add c, value of c is willEnter(c)
	// loop over merged and construct new current
	// dest doesn't change, that's owner's
	function mergeAndSync(willEnter, willLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldLastIdealStyles, oldLastIdealVelocities) {
	  var newMergedPropsStyles = _mergeDiff2['default'](oldMergedPropsStyles, destStyles, function (oldIndex, oldMergedPropsStyle) {
	    var leavingStyle = willLeave(oldMergedPropsStyle);
	    if (leavingStyle == null) {
	      return null;
	    }
	    if (_shouldStopAnimation2['default'](oldCurrentStyles[oldIndex], leavingStyle, oldCurrentVelocities[oldIndex])) {
	      return null;
	    }
	    return { key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data, style: leavingStyle };
	  });
	
	  var newCurrentStyles = [];
	  var newCurrentVelocities = [];
	  var newLastIdealStyles = [];
	  var newLastIdealVelocities = [];
	  for (var i = 0; i < newMergedPropsStyles.length; i++) {
	    var newMergedPropsStyleCell = newMergedPropsStyles[i];
	    var foundOldIndex = null;
	    for (var j = 0; j < oldMergedPropsStyles.length; j++) {
	      if (oldMergedPropsStyles[j].key === newMergedPropsStyleCell.key) {
	        foundOldIndex = j;
	        break;
	      }
	    }
	    // TODO: key search code
	    if (foundOldIndex == null) {
	      var plainStyle = willEnter(newMergedPropsStyleCell);
	      newCurrentStyles[i] = plainStyle;
	      newLastIdealStyles[i] = plainStyle;
	
	      // $FlowFixMe
	      var velocity = _mapToZero2['default'](newMergedPropsStyleCell.style);
	      newCurrentVelocities[i] = velocity;
	      newLastIdealVelocities[i] = velocity;
	    } else {
	      newCurrentStyles[i] = oldCurrentStyles[foundOldIndex];
	      newLastIdealStyles[i] = oldLastIdealStyles[foundOldIndex];
	      newCurrentVelocities[i] = oldCurrentVelocities[foundOldIndex];
	      newLastIdealVelocities[i] = oldLastIdealVelocities[foundOldIndex];
	    }
	  }
	
	  return [newMergedPropsStyles, newCurrentStyles, newCurrentVelocities, newLastIdealStyles, newLastIdealVelocities];
	}
	
	var TransitionMotion = _react2['default'].createClass({
	  displayName: 'TransitionMotion',
	
	  propTypes: {
	    defaultStyles: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	      key: _react.PropTypes.string.isRequired,
	      data: _react.PropTypes.any,
	      style: _react.PropTypes.objectOf(_react.PropTypes.number).isRequired
	    })),
	    styles: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.arrayOf(_react.PropTypes.shape({
	      key: _react.PropTypes.string.isRequired,
	      data: _react.PropTypes.any,
	      style: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object])).isRequired
	    }))]).isRequired,
	    children: _react.PropTypes.func.isRequired,
	    willLeave: _react.PropTypes.func,
	    willEnter: _react.PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      willEnter: function willEnter(styleThatEntered) {
	        return _stripStyle2['default'](styleThatEntered.style);
	      },
	      // recall: returning null makes the current unmounting TransitionStyle
	      // disappear immediately
	      willLeave: function willLeave() {
	        return null;
	      }
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultStyles = _props.defaultStyles;
	    var styles = _props.styles;
	    var willEnter = _props.willEnter;
	    var willLeave = _props.willLeave;
	
	    var destStyles = typeof styles === 'function' ? styles() : styles;
	
	    // this is special. for the first time around, we don't have a comparison
	    // between last (no last) and current merged props. we'll compute last so:
	    // say default is {a, b} and styles (dest style) is {b, c}, we'll
	    // fabricate last as {a, b}
	    var oldMergedPropsStyles = undefined;
	    if (defaultStyles == null) {
	      oldMergedPropsStyles = destStyles;
	    } else {
	      // $FlowFixMe
	      oldMergedPropsStyles = defaultStyles.map(function (defaultStyleCell) {
	        // TODO: key search code
	        for (var i = 0; i < destStyles.length; i++) {
	          if (destStyles[i].key === defaultStyleCell.key) {
	            return destStyles[i];
	          }
	        }
	        return defaultStyleCell;
	      });
	    }
	    var oldCurrentStyles = defaultStyles == null ? destStyles.map(function (s) {
	      return _stripStyle2['default'](s.style);
	    }) : defaultStyles.map(function (s) {
	      return _stripStyle2['default'](s.style);
	    });
	    var oldCurrentVelocities = defaultStyles == null ? destStyles.map(function (s) {
	      return _mapToZero2['default'](s.style);
	    }) : defaultStyles.map(function (s) {
	      return _mapToZero2['default'](s.style);
	    });
	
	    var _mergeAndSync = mergeAndSync(
	    // $FlowFixMe
	    willEnter,
	    // $FlowFixMe
	    willLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldCurrentStyles, // oldLastIdealStyles really
	    oldCurrentVelocities);
	
	    var mergedPropsStyles = _mergeAndSync[0];
	    var currentStyles = _mergeAndSync[1];
	    var currentVelocities = _mergeAndSync[2];
	    var lastIdealStyles = _mergeAndSync[3];
	    var lastIdealVelocities = _mergeAndSync[4];
	    // oldLastIdealVelocities really
	
	    return {
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      lastIdealStyles: lastIdealStyles,
	      lastIdealVelocities: lastIdealVelocities,
	      mergedPropsStyles: mergedPropsStyles
	    };
	  },
	
	  animationID: null,
	  prevTime: 0,
	  accumulatedTime: 0,
	  // it's possible that currentStyle's value is stale: if props is immediately
	  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
	  // at 0 (didn't have time to tick and interpolate even once). If we naively
	  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	  // In reality currentStyle should be 400
	  unreadPropStyles: null,
	  // after checking for unreadPropStyles != null, we manually go set the
	  // non-interpolating values (those that are a number, without a spring
	  // config)
	  clearUnreadPropStyle: function clearUnreadPropStyle(unreadPropStyles) {
	    var _mergeAndSync2 = mergeAndSync(
	    // $FlowFixMe
	    this.props.willEnter,
	    // $FlowFixMe
	    this.props.willLeave, this.state.mergedPropsStyles, unreadPropStyles, this.state.currentStyles, this.state.currentVelocities, this.state.lastIdealStyles, this.state.lastIdealVelocities);
	
	    var mergedPropsStyles = _mergeAndSync2[0];
	    var currentStyles = _mergeAndSync2[1];
	    var currentVelocities = _mergeAndSync2[2];
	    var lastIdealStyles = _mergeAndSync2[3];
	    var lastIdealVelocities = _mergeAndSync2[4];
	
	    for (var i = 0; i < unreadPropStyles.length; i++) {
	      var unreadPropStyle = unreadPropStyles[i].style;
	      var dirty = false;
	
	      for (var key in unreadPropStyle) {
	        if (!unreadPropStyle.hasOwnProperty(key)) {
	          continue;
	        }
	
	        var styleValue = unreadPropStyle[key];
	        if (typeof styleValue === 'number') {
	          if (!dirty) {
	            dirty = true;
	            currentStyles[i] = _extends({}, currentStyles[i]);
	            currentVelocities[i] = _extends({}, currentVelocities[i]);
	            lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
	            lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
	            mergedPropsStyles[i] = {
	              key: mergedPropsStyles[i].key,
	              data: mergedPropsStyles[i].data,
	              style: _extends({}, mergedPropsStyles[i].style)
	            };
	          }
	          currentStyles[i][key] = styleValue;
	          currentVelocities[i][key] = 0;
	          lastIdealStyles[i][key] = styleValue;
	          lastIdealVelocities[i][key] = 0;
	          mergedPropsStyles[i].style[key] = styleValue;
	        }
	      }
	    }
	
	    // unlike the other 2 components, we can't detect staleness and optionally
	    // opt out of setState here. each style object's data might contain new
	    // stuff we're not/cannot compare
	    this.setState({
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      mergedPropsStyles: mergedPropsStyles,
	      lastIdealStyles: lastIdealStyles,
	      lastIdealVelocities: lastIdealVelocities
	    });
	  },
	
	  startAnimationIfNecessary: function startAnimationIfNecessary() {
	    var _this = this;
	
	    // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	    // call cb? No, otherwise accidental parent rerender causes cb trigger
	    this.animationID = _raf2['default'](function () {
	      var propStyles = _this.props.styles;
	      var destStyles = typeof propStyles === 'function' ? propStyles(rehydrateStyles(_this.state.mergedPropsStyles, _this.unreadPropStyles, _this.state.lastIdealStyles)) : propStyles;
	
	      // check if we need to animate in the first place
	      if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities, _this.state.mergedPropsStyles)) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.accumulatedTime = 0;
	        return;
	      }
	
	      var currentTime = _performanceNow2['default']();
	      var timeDelta = currentTime - _this.prevTime;
	      _this.prevTime = currentTime;
	      _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	      // more than 10 frames? prolly switched browser tab. Restart
	      if (_this.accumulatedTime > msPerFrame * 10) {
	        _this.accumulatedTime = 0;
	      }
	
	      if (_this.accumulatedTime === 0) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.startAnimationIfNecessary();
	        return;
	      }
	
	      var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	      var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
	
	      var _mergeAndSync3 = mergeAndSync(
	      // $FlowFixMe
	      _this.props.willEnter,
	      // $FlowFixMe
	      _this.props.willLeave, _this.state.mergedPropsStyles, destStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);
	
	      var newMergedPropsStyles = _mergeAndSync3[0];
	      var newCurrentStyles = _mergeAndSync3[1];
	      var newCurrentVelocities = _mergeAndSync3[2];
	      var newLastIdealStyles = _mergeAndSync3[3];
	      var newLastIdealVelocities = _mergeAndSync3[4];
	
	      for (var i = 0; i < newMergedPropsStyles.length; i++) {
	        var newMergedPropsStyle = newMergedPropsStyles[i].style;
	        var newCurrentStyle = {};
	        var newCurrentVelocity = {};
	        var newLastIdealStyle = {};
	        var newLastIdealVelocity = {};
	
	        for (var key in newMergedPropsStyle) {
	          if (!newMergedPropsStyle.hasOwnProperty(key)) {
	            continue;
	          }
	
	          var styleValue = newMergedPropsStyle[key];
	          if (typeof styleValue === 'number') {
	            newCurrentStyle[key] = styleValue;
	            newCurrentVelocity[key] = 0;
	            newLastIdealStyle[key] = styleValue;
	            newLastIdealVelocity[key] = 0;
	          } else {
	            var newLastIdealStyleValue = newLastIdealStyles[i][key];
	            var newLastIdealVelocityValue = newLastIdealVelocities[i][key];
	            for (var j = 0; j < framesToCatchUp; j++) {
	              var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	              newLastIdealStyleValue = _stepper[0];
	              newLastIdealVelocityValue = _stepper[1];
	            }
	
	            var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	            var nextIdealX = _stepper2[0];
	            var nextIdealV = _stepper2[1];
	
	            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	            newLastIdealStyle[key] = newLastIdealStyleValue;
	            newLastIdealVelocity[key] = newLastIdealVelocityValue;
	          }
	        }
	
	        newLastIdealStyles[i] = newLastIdealStyle;
	        newLastIdealVelocities[i] = newLastIdealVelocity;
	        newCurrentStyles[i] = newCurrentStyle;
	        newCurrentVelocities[i] = newCurrentVelocity;
	      }
	
	      _this.animationID = null;
	      // the amount we're looped over above
	      _this.accumulatedTime -= framesToCatchUp * msPerFrame;
	
	      _this.setState({
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities,
	        lastIdealStyles: newLastIdealStyles,
	        lastIdealVelocities: newLastIdealVelocities,
	        mergedPropsStyles: newMergedPropsStyles
	      });
	
	      _this.unreadPropStyles = null;
	
	      _this.startAnimationIfNecessary();
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if (this.unreadPropStyles) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyles);
	    }
	
	    if (typeof props.styles === 'function') {
	      // $FlowFixMe
	      this.unreadPropStyles = props.styles(rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.lastIdealStyles));
	    } else {
	      this.unreadPropStyles = props.styles;
	    }
	
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  },
	
	  render: function render() {
	    var hydratedStyles = rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.currentStyles);
	    var renderedChildren = this.props.children(hydratedStyles);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  }
	});
	
	exports['default'] = TransitionMotion;
	module.exports = exports['default'];
	
	// list of styles, each containing interpolating values. Part of what's passed
	// to children function. Notice that this is
	// Array<ActualInterpolatingStyleObject>, without the wrapper that is {key: ...,
	// data: ... style: ActualInterpolatingStyleObject}. Only mergedPropsStyles
	// contains the key & data info (so that we only have a single source of truth
	// for these, and to save space). Check the comment for `rehydrateStyles` to
	// see how we regenerate the entirety of what's passed to children function
	
	// the array that keeps track of currently rendered stuff! Including stuff
	// that you've unmounted but that's still animating. This is where it lives

/***/ },
/* 14 */
/***/ function(module, exports) {

	
	
	// core keys merging algorithm. If previous render's keys are [a, b], and the
	// next render's [c, b, d], what's the final merged keys and ordering?
	
	// - c and a must both be before b
	// - b before d
	// - ordering between a and c ambiguous
	
	// this reduces to merging two partially ordered lists (e.g. lists where not
	// every item has a definite ordering, like comparing a and c above). For the
	// ambiguous ordering we deterministically choose to place the next render's
	// item after the previous'; so c after a
	
	// this is called a topological sorting. Except the existing algorithms don't
	// work well with js bc of the amount of allocation, and isn't optimized for our
	// current use-case bc the runtime is linear in terms of edges (see wiki for
	// meaning), which is huge when two lists have many common elements
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = mergeDiff;
	
	function mergeDiff(prev, next, onRemove) {
	  // bookkeeping for easier access of a key's index below. This is 2 allocations +
	  // potentially triggering chrome hash map mode for objs (so it might be faster
	
	  var prevKeyIndex = {};
	  for (var i = 0; i < prev.length; i++) {
	    prevKeyIndex[prev[i].key] = i;
	  }
	  var nextKeyIndex = {};
	  for (var i = 0; i < next.length; i++) {
	    nextKeyIndex[next[i].key] = i;
	  }
	
	  // first, an overly elaborate way of merging prev and next, eliminating
	  // duplicates (in terms of keys). If there's dupe, keep the item in next).
	  // This way of writing it saves allocations
	  var ret = [];
	  for (var i = 0; i < next.length; i++) {
	    ret[i] = next[i];
	  }
	  for (var i = 0; i < prev.length; i++) {
	    if (!nextKeyIndex.hasOwnProperty(prev[i].key)) {
	      // this is called my TM's `mergeAndSync`, which calls willLeave. We don't
	      // merge in keys that the user desires to kill
	      var fill = onRemove(i, prev[i]);
	      if (fill != null) {
	        ret.push(fill);
	      }
	    }
	  }
	
	  // now all the items all present. Core sorting logic to have the right order
	  return ret.sort(function (a, b) {
	    var nextOrderA = nextKeyIndex[a.key];
	    var nextOrderB = nextKeyIndex[b.key];
	    var prevOrderA = prevKeyIndex[a.key];
	    var prevOrderB = prevKeyIndex[b.key];
	
	    if (nextOrderA != null && nextOrderB != null) {
	      // both keys in next
	      return nextKeyIndex[a.key] - nextKeyIndex[b.key];
	    } else if (prevOrderA != null && prevOrderB != null) {
	      // both keys in prev
	      return prevKeyIndex[a.key] - prevKeyIndex[b.key];
	    } else if (nextOrderA != null) {
	      // key a in next, key b in prev
	
	      // how to determine the order between a and b? We find a "pivot" (term
	      // abuse), a key present in both prev and next, that is sandwiched between
	      // a and b. In the context of our above example, if we're comparing a and
	      // d, b's (the only) pivot
	      for (var i = 0; i < next.length; i++) {
	        var pivot = next[i].key;
	        if (!prevKeyIndex.hasOwnProperty(pivot)) {
	          continue;
	        }
	
	        if (nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]) {
	          return -1;
	        } else if (nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]) {
	          return 1;
	        }
	      }
	      // pluggable. default to: next bigger than prev
	      return 1;
	    }
	    // prevOrderA, nextOrderB
	    for (var i = 0; i < next.length; i++) {
	      var pivot = next[i].key;
	      if (!prevKeyIndex.hasOwnProperty(pivot)) {
	        continue;
	      }
	      if (nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]) {
	        return 1;
	      } else if (nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]) {
	        return -1;
	      }
	    }
	    // pluggable. default to: next bigger than prev
	    return -1;
	  });
	}
	
	module.exports = exports['default'];
	// to loop through and find a key's index each time), but I no longer care

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = spring;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _presets = __webpack_require__(16);
	
	var _presets2 = _interopRequireDefault(_presets);
	
	var defaultConfig = _extends({}, _presets2['default'].noWobble, {
	  precision: 0.01
	});
	
	function spring(val, config) {
	  return _extends({}, defaultConfig, config, { val: val });
	}
	
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = {
	  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
	  gentle: { stiffness: 120, damping: 14 },
	  wobbly: { stiffness: 180, damping: 12 },
	  stiff: { stiffness: 210, damping: 20 }
	};
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports['default'] = reorderKeys;
	
	var hasWarned = false;
	
	function reorderKeys() {
	  if (process.env.NODE_ENV === 'development') {
	    if (!hasWarned) {
	      hasWarned = true;
	      console.error('`reorderKeys` has been removed, since it is no longer needed for TransitionMotion\'s new styles array API.');
	    }
	  }
	}
	
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ensureSpring;
	
	var _reactMotion = __webpack_require__(3);
	
	function ensureSpring(styles) {
	  return Object.keys(styles).reduce(function (acc, key) {
	    var value = styles[key];
	    acc[key] = typeof value === 'number' ? (0, _reactMotion.spring)(value) : value;
	    return acc;
	  }, {});
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactMotion = __webpack_require__(3);
	
	var fadeConfig = { stiffness: 200, damping: 22 };
	var popConfig = { stiffness: 360, damping: 25 };
	var slideConfig = { stiffness: 330, damping: 30 };
	
	var fade = {
	  atEnter: {
	    opacity: 0
	  },
	  atLeave: {
	    opacity: (0, _reactMotion.spring)(0, fadeConfig)
	  },
	  atActive: {
	    opacity: (0, _reactMotion.spring)(1, fadeConfig)
	  }
	};
	
	var pop = {
	  atEnter: {
	    scale: 0.8,
	    opacity: 0
	  },
	  atLeave: {
	    scale: (0, _reactMotion.spring)(0.8, popConfig),
	    opacity: (0, _reactMotion.spring)(0, popConfig)
	  },
	  atActive: {
	    scale: (0, _reactMotion.spring)(1, popConfig),
	    opacity: 1
	  },
	  mapStyles: function mapStyles(styles) {
	    return {
	      opacity: styles.opacity,
	      transform: 'scale(' + styles.scale + ')'
	    };
	  }
	};
	
	var slideLeft = {
	  atEnter: {
	    opacity: 0,
	    offset: 100
	  },
	  atLeave: {
	    opacity: (0, _reactMotion.spring)(0, fadeConfig),
	    offset: (0, _reactMotion.spring)(-100, slideConfig)
	  },
	  atActive: {
	    opacity: (0, _reactMotion.spring)(1, slideConfig),
	    offset: (0, _reactMotion.spring)(0, slideConfig)
	  },
	  mapStyles: function mapStyles(styles) {
	    return {
	      opacity: styles.opacity,
	      transform: 'translateX(' + styles.offset + '%)'
	    };
	  }
	};
	
	var slideRight = {
	  atEnter: {
	    opacity: 0,
	    offset: -100
	  },
	  atLeave: {
	    opacity: (0, _reactMotion.spring)(0, fadeConfig),
	    offset: (0, _reactMotion.spring)(100, slideConfig)
	  },
	  atActive: {
	    opacity: (0, _reactMotion.spring)(1, slideConfig),
	    offset: (0, _reactMotion.spring)(0, slideConfig)
	  },
	  mapStyles: function mapStyles(styles) {
	    return {
	      opacity: styles.opacity,
	      transform: 'translateX(' + styles.offset + '%)'
	    };
	  }
	};
	
	exports.default = { fade: fade, pop: pop, slideLeft: slideLeft, slideRight: slideRight };

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-router-transition.map

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;

/***/ }),
/* 434 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(155);
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 435 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 436 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(158);
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.store = factory();
  }
}(this, function () {
	
	// Store.js
	var store = {},
		win = (typeof window != 'undefined' ? window : global),
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage

	store.disabled = false
	store.version = '1.3.20'
	store.set = function(key, value) {}
	store.get = function(key, defaultVal) {}
	store.has = function(key) { return store.get(key) !== undefined }
	store.remove = function(key) {}
	store.clear = function() {}
	store.transact = function(key, defaultVal, transactionFn) {
		if (transactionFn == null) {
			transactionFn = defaultVal
			defaultVal = null
		}
		if (defaultVal == null) {
			defaultVal = {}
		}
		var val = store.get(key, defaultVal)
		transactionFn(val)
		store.set(key, val)
	}
	store.getAll = function() {}
	store.forEach = function() {}

	store.serialize = function(value) {
		return JSON.stringify(value)
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined }
		try { return JSON.parse(value) }
		catch(e) { return value || undefined }
	}

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]) }
		catch(err) { return false }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName]
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key) }
			storage.setItem(key, store.serialize(val))
			return val
		}
		store.get = function(key, defaultVal) {
			var val = store.deserialize(storage.getItem(key))
			return (val === undefined ? defaultVal : val)
		}
		store.remove = function(key) { storage.removeItem(key) }
		store.clear = function() { storage.clear() }
		store.getAll = function() {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i)
				callback(key, store.get(key))
			}
		}
	} else if (doc && doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer
		// Since #userData storage applies only to specific paths, we need to
		// somehow link our data to a specific path.  We choose /favicon.ico
		// as a pretty safe option, since all browsers already make a request to
		// this URL anyway and being a 404 will not hurt us here.  We wrap an
		// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
		// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
		// since the iframe access rules appear to allow direct access and
		// manipulation of the document element, even for a 404 page.  This
		// document can be used instead of the current document (which would
		// have been limited to the current path) to perform #userData storage.
		try {
			storageContainer = new ActiveXObject('htmlfile')
			storageContainer.open()
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
			storageContainer.close()
			storageOwner = storageContainer.w.frames[0].document
			storage = storageOwner.createElement('div')
		} catch(e) {
			// somehow ActiveXObject instantiation failed (perhaps some special
			// security settings or otherwse), fall back to per-path storage
			storage = doc.createElement('div')
			storageOwner = doc.body
		}
		var withIEStorage = function(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0)
				args.unshift(storage)
				// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
				// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
				storageOwner.appendChild(storage)
				storage.addBehavior('#default#userData')
				storage.load(localStorageName)
				var result = storeFunction.apply(store, args)
				storageOwner.removeChild(storage)
				return result
			}
		}

		// In IE7, keys cannot start with a digit or contain certain chars.
		// See https://github.com/marcuswestin/store.js/issues/40
		// See https://github.com/marcuswestin/store.js/issues/83
		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
		var ieKeyFix = function(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key)
			if (val === undefined) { return store.remove(key) }
			storage.setAttribute(key, store.serialize(val))
			storage.save(localStorageName)
			return val
		})
		store.get = withIEStorage(function(storage, key, defaultVal) {
			key = ieKeyFix(key)
			var val = store.deserialize(storage.getAttribute(key))
			return (val === undefined ? defaultVal : val)
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			storage.removeAttribute(key)
			storage.save(localStorageName)
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes
			storage.load(localStorageName)
			for (var i=attributes.length-1; i>=0; i--) {
				storage.removeAttribute(attributes[i].name)
			}
			storage.save(localStorageName)
		})
		store.getAll = function(storage) {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
			}
		})
	}

	try {
		var testKey = '__storejs__'
		store.set(testKey, testKey)
		if (store.get(testKey) != testKey) { store.disabled = true }
		store.remove(testKey)
	} catch(e) {
		store.disabled = true
	}
	store.enabled = !store.disabled
	
	return store
}));


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(439);


/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(440);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(193)(module)))

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 441 */
/***/ (function(module, exports) {

module.exports = require("fbjs/lib/ExecutionEnvironment");

/***/ }),
/* 442 */
/***/ (function(module, exports) {

module.exports = require("history/ExecutionEnvironment");

/***/ }),
/* 443 */
/***/ (function(module, exports) {

module.exports = require("history/PathUtils");

/***/ }),
/* 444 */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),
/* 445 */
/***/ (function(module, exports) {

module.exports = require("invariant");

/***/ }),
/* 446 */
/***/ (function(module, exports) {

module.exports = require("lodash/isPlainObject");

/***/ }),
/* 447 */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),
/* 448 */
/***/ (function(module, exports) {

module.exports = require("path-to-regexp");

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(165);

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = __webpack_require__(167);

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = __webpack_require__(166);

var _path2 = _interopRequireDefault(_path);

var _compression = __webpack_require__(164);

var _compression2 = _interopRequireDefault(_compression);

var _render = __webpack_require__(163);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(168).install();

var app = (0, _express2.default)();
app.use('/static', _express2.default.static(_path2.default.join(__dirname, 'build')));
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'public', 'favicon.ico')));
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'ejs')

var isProduction = process.env.NODE_ENV === 'production';

/*
app.get('/static/*', (req, res) => {
  res.sendFile(req.params['0'], {root: buildDir})
})
*/

app.use((0, _compression2.default)());

/*
if (isProduction) {
  app.use(compression())
} else {
  const {
    webpackDevMiddleware,
    webpackHotMiddleware,
  } = require('./middleware/webpack')

  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddleware)
}
*/

app.use(_render2.default);

var port = process.env.PORT || 3000;
app.listen(port, console.log('Server running on port ' + port));
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map