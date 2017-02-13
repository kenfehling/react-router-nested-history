import HistoryStack from '../model/HistoryStack'

/**
 * Switch tab using mobile-app like behavior (with a default tab: A)
 */
export const A_to_B = (A:HistoryStack, B:HistoryStack) => new HistoryStack({
  back: [...A.back, A.current, ...B.back],
  current: B.current,
  forward: B.forward
})

export const B_to_C = (A:HistoryStack, B:HistoryStack, C:HistoryStack) => new HistoryStack({
  back: [...A.back, A.current, ...C.back],
  current: C.current,
  forward: C.forward
})

export const B_to_A = (A:HistoryStack, B:HistoryStack) => A