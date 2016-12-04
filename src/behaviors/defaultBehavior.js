import type { BrowserPage } from '../types';

/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 * @param Ab {BrowserPage[]} back pages (default tab)
 * @param A {BrowserPage} current page (default tab)
 * @param Af {BrowserPage[]} forward pages (default tab)
 * @param Bb {BrowserPage[]} back pages
 * @param B {BrowserPage} current page
 * @param Bf {Array} forward pages
 * @param Cb {BrowserPage[]} back pages
 * @param C {BrowserPage} current page
 * @param Cf {BrowserPage[]} forward pages
 * @return {BrowserPage[]} of [Array, Object, Array] representing browser history
 */
export const A_to_B = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [[...Ab, A, ...Bb], B, Bf];
export const B_to_C = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [[...Ab, A, ...Cb], C, Cf];
export const B_to_A = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [Ab, A, Af];

/**
 * Load from a URL
 * @param A {Page} initial page (default tab)
 * @param A1 {?Page} any other matching page (default tab)
 * @param B {Page} initial page
 * @param B1 {?Page} any other matching page
 * @return {Page} of [Array, Object, Array] representing browser history
 */
export const load_A = ([A, A1], [B, B1]) => [[], A, []];
export const load_A1 = ([A, A1], [B, B1]) => [[A], A1, []];
export const load_B = ([A, A1], [B, B1]) => [[A], B, []];
export const load_B1 = ([A, A1], [B, B1]) => [[A, B], B1, []];