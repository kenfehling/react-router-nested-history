import {HistoryStack as H} from '../model/Pages'

/**
 * Forward history is removed when switching containers
 */
export const E_to_D = (h:H, E:H, D:H) => h