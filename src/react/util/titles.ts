import * as R from 'ramda'
import LocationTitle from '../model/LocationTitle'

export const getTitleForUrl = (titles:LocationTitle[], url:string):string|null => {
  const found = R.find(t => t.pathname === url, titles)
  return found ? found.title : null
}