import * as R from 'ramda'

type IError = Function & {
  new (...params: any[]): Error
}

export function catchType<R>(error:Error, type:IError, callback:(()=>R)|R):R {
  if (error instanceof type) {
    return callback instanceof Function ? callback() : callback
  }
  else {
    throw error
  }
}

export function catchTypes<R>(error:Error, types:IError[], callback:(()=>R)|R):R {
  if (R.any((type:IError) => error instanceof type, types)) {
    return callback instanceof Function ? callback() : callback
  }
  else {
    throw error
  }
}