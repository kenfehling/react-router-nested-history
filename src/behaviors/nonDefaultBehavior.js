import type { Page } from '../types';

/**
 * Switch tab with no default (all tabs are equal)
 * @param Ab {Array} back pages
 * @param A {Page} current page
 * @param Af {Array} forward pages
 * @param Bb {Array} back pages
 * @param B {Page} current page
 * @param Bf {Array} forward pages
 * @param Cb {Array} back pages
 * @param C {Page} current page
 * @param Cf {Array} forward pages
 * @return {Array} of [Array, Object, Array] representing browser history
 */
const A_to_B = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [Bb, B, Bf];
const B_to_C = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [Cb, C, Cf];
const B_to_A = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [Ab, A, Af];

/**
 * Load from a URL
 * @param A {Page} initial page (default tab)
 * @param A1 {?Page} any other matching page (default tab)
 * @param B {Page} initial page
 * @param B1 {?Page} any other matching page
 * @return {Page} of [Array, Object, Array] representing browser history
 */
const load_A = ([A, A1], [B, B1]) => [[], A, []];
const load_A1 = ([A, A1], [B, B1]) => [[A], A1, []];
const load_B = ([A, A1], [B, B1]) => [[], B, []];
const load_B1 = ([A, A1], [B, B1]) => [[B], B1, []];