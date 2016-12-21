import type { Page, History } from '../types'

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
export const A_to_B = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [[...Ab, A, ...Bb], B, Bf]
export const B_to_C = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [[...Ab, A, ...Cb], C, Cf]
export const B_to_A = ([Ab, A, Af], [Bb, B, Bf], [Cb, C, Cf]) => [Ab, A, Af]

/**
 * Load from a URL
 * @param A {Page} initial page (default tab)
 * @param A1 {Page} any other matching page (default tab)
 * @param B {Page} initial page
 * @param B1 {Page} any other matching page
 * @return {History} representing browser history
 */
export const load_A = ([A, A1], [B, B1]) => [[], A, []]
export const load_A1 = ([A, A1], [B, B1]) => [[A], A1, []]
export const load_B = ([A, A1], [B, B1]) => [[A], B, []]
export const load_B1 = ([A, A1], [B, B1]) => [[A, B], B1, []]


export const reload = ([A, A1], [B, B1]) => [A]