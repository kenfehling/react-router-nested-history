import H from '../model/HistoryStack'

/**
 * Allow inter-container history (e.g. different full window screens)
 */

export const D_to_E = (h:H, D:H, E:H) => new H({
  ...h,
  back: [...D.back, D.current, ...h.back]
})

export const E_to_D = (h:H, E:H, D:H) => new H({
  ...h,
  forward: [E.current, ...E.forward]
})