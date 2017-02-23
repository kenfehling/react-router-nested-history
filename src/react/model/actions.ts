import LocationTitle from './LocationTitle'
import IUpdateData from '../../model/interfaces/IUpdateData'

interface Action {
  type: string
}

export type LocationAction  = Action & IUpdateData

export type AddTitleAction = LocationTitle & Action