'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Switch tab with no default (all tabs are equal)
 * @param Bb {Page[]} back pages
 * @param B {Page} current page
 * @param Bf {Array} forward pages
 * @param Cb {Page[]} back pages
 * @param C {Page} current page
 * @param Cf {Page[]} forward pages
 * @return {Array} - [Page[], Page, Page[]] representing browser history
 */
var B_to_C = exports.B_to_C = function B_to_C(_ref, _ref2, _ref3) {
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

  return [Cb, C, Cf];
};

/**
 * Load from a URL
 * @param A {Page} initial page (default tab)
 * @param A1 {Page} any other matching page (default tab)
 * @param B {Page} initial page
 * @param B1 {Page} any other matching page
 * @return {Array} - [Page[], Page, Page[]] representing browser history
 */
var load_B = exports.load_B = function load_B(_ref7, _ref8) {
  var _ref10 = _slicedToArray(_ref7, 2),
      A = _ref10[0],
      A1 = _ref10[1];

  var _ref9 = _slicedToArray(_ref8, 2),
      B = _ref9[0],
      B1 = _ref9[1];

  return [[], B, []];
};
var load_B1 = exports.load_B1 = function load_B1(_ref11, _ref12) {
  var _ref14 = _slicedToArray(_ref11, 2),
      A = _ref14[0],
      A1 = _ref14[1];

  var _ref13 = _slicedToArray(_ref12, 2),
      B = _ref13[0],
      B1 = _ref13[1];

  return [[B], B1, []];
};