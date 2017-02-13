import {Location} from 'history'
import LocationTitle from './LocationTitle'

interface Action {
  type: string
}

export type LocationAction  = Action & {
  location: Location
}

export type AddTitleAction = LocationTitle & Action