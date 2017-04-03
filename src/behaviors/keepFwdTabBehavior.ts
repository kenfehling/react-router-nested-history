import H from '../model/HistoryStack'

/**
 * In this world, forward history is kept even if it's a different tab
 */

export const E_to_D = (h:H, E:H, D:H) => new H({
  ...h,
  forward: [E.current, ...E.forward]
})

export const D_to_E = (h:H, D:H, E:H) => h