import {HistoryStack as H} from '../model/Pages'

/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 */

/**
 * Default to non-default
 */
export const A_to_B = (h:H, A:H, B:H) => new H({
  ...h,
  back: [...A.back, A.current, ...h.back]
})

/**
 * Non-default to default
 */
export const B_to_A = (h:H, A:H, B:H) => h

/**
 * Non-default to non-default
 */
export const B_to_C = (h:H, A:H, B:H, C:H) => new H({
  ...h,
  back: [...A.back, A.current, ...h.back]
})