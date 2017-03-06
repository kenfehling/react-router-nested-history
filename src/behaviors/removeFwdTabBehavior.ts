import H from '../model/HistoryStack'

/**
 * Forward history is removed when switching containers
 */
export const E_to_D = (h:H, E:H, D:H) => new H({
  ...h,
  forward: D.forward
})