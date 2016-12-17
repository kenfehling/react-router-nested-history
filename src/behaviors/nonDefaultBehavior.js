import type { Page } from '../types'

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
export const B_to_C = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [Cb, C, Cf]

/**
 * Load from a URL
 * @param A {Page} initial page (default tab)
 * @param A1 {Page} any other matching page (default tab)
 * @param B {Page} initial page
 * @param B1 {Page} any other matching page
 * @return {Array} - [Page[], Page, Page[]] representing browser history
 */
export const load_B = ([A, A1], [B, B1]) => [[], B, []]
export const load_B1 = ([A, A1], [B, B1]) => [[B], B1, []]