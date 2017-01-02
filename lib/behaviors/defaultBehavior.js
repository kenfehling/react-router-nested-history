'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 * @param Ab {Page[]} back pages (default tab)
 * @param A {Page} current page (default tab)
 * @param Af {Page[]} forward pages (default tab)
 * @param Bb {Page[]} back pages
 * @param B {Page} current page
 * @param Bf {Array} forward pages
 * @param Cb {Page[]} back pages
 * @param C {Page} current page
 * @param Cf {Page[]} forward pages
 * @return {History} representing browser history
 */
var A_to_B = exports.A_to_B = function A_to_B(_ref, _ref2, _ref3) {
  var _ref6 = _slicedToArray(_ref, 3),
      Ab = _ref6[0],
      A = _ref6[1],
      Af = _ref6[2];

  var _ref5 = _slicedToArray(_ref2, 3),
      Bb = _ref5[0],
      B = _ref5[1],
      Bf = _ref5[2];

  var _ref4 = _slicedToArray(_ref3, 3),
      Cb = _ref4[0],
      C = _ref4[1],
      Cf = _ref4[2];

  return [[].concat(_toConsumableArray(Ab), [A], _toConsumableArray(Bb)), B, Bf];
};
var B_to_C = exports.B_to_C = function B_to_C(_ref7, _ref8, _ref9) {
  var _ref12 = _slicedToArray(_ref7, 3),
      Ab = _ref12[0],
      A = _ref12[1],
      Af = _ref12[2];

  var _ref11 = _slicedToArray(_ref8, 3),
      Bb = _ref11[0],
      B = _ref11[1],
      Bf = _ref11[2];

  var _ref10 = _slicedToArray(_ref9, 3),
      Cb = _ref10[0],
      C = _ref10[1],
      Cf = _ref10[2];

  return [[].concat(_toConsumableArray(Ab), [A], _toConsumableArray(Cb)), C, Cf];
};
var B_to_A = exports.B_to_A = function B_to_A(_ref13, _ref14, _ref15) {
  var _ref18 = _slicedToArray(_ref13, 3),
      Ab = _ref18[0],
      A = _ref18[1],
      Af = _ref18[2];

  var _ref17 = _slicedToArray(_ref14, 3),
      Bb = _ref17[0],
      B = _ref17[1],
      Bf = _ref17[2];

  var _ref16 = _slicedToArray(_ref15, 3),
      Cb = _ref16[0],
      C = _ref16[1],
      Cf = _ref16[2];

  return [Ab, A, Af];
};

/**
 * Load from a URL
 * @param A {Page} initial page (default tab)
 * @param A1 {Page} any other matching page (default tab)
 * @param B {Page} initial page
 * @param B1 {Page} any other matching page
 * @return {History} representing browser history
 */
var load_A = exports.load_A = function load_A(_ref19, _ref20) {
  var _ref22 = _slicedToArray(_ref19, 2),
      A = _ref22[0],
      A1 = _ref22[1];

  var _ref21 = _slicedToArray(_ref20, 2),
      B = _ref21[0],
      B1 = _ref21[1];

  return [[], A, []];
};
var load_A1 = exports.load_A1 = function load_A1(_ref23, _ref24) {
  var _ref26 = _slicedToArray(_ref23, 2),
      A = _ref26[0],
      A1 = _ref26[1];

  var _ref25 = _slicedToArray(_ref24, 2),
      B = _ref25[0],
      B1 = _ref25[1];

  return [[A], A1, []];
};
var load_B = exports.load_B = function load_B(_ref27, _ref28) {
  var _ref30 = _slicedToArray(_ref27, 2),
      A = _ref30[0],
      A1 = _ref30[1];

  var _ref29 = _slicedToArray(_ref28, 2),
      B = _ref29[0],
      B1 = _ref29[1];

  return [[A], B, []];
};
var load_B1 = exports.load_B1 = function load_B1(_ref31, _ref32) {
  var _ref34 = _slicedToArray(_ref31, 2),
      A = _ref34[0],
      A1 = _ref34[1];

  var _ref33 = _slicedToArray(_ref32, 2),
      B = _ref33[0],
      B1 = _ref33[1];

  return [[A, B], B1, []];
};