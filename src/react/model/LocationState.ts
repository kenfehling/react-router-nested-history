import LocationTitle from './LocationTitle'
import Action from '../../model/Action'

interface LocationState {
  readonly pathname: string
  readonly lastAction: Action
  readonly titles: LocationTitle[]
}

export default LocationState