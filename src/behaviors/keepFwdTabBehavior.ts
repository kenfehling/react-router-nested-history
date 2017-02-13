import HistoryStack from '../model/HistoryStack'

/**
 * In this world, forward history is kept even if it's a different tab
 */
export const B_to_A = (A:HistoryStack, B:HistoryStack) => new HistoryStack({
  back: A.back,
  current: A.current,
  forward: [B.current, ...B.forward]
})