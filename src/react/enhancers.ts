import {shouldUpdate} from 'recompose'

export const neverUpdate = shouldUpdate(
  (props, nextProps) => false
)