import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'
declare const window:any

export const canUseWindowLocation = canUseDOM &&
                                    window.location instanceof Object