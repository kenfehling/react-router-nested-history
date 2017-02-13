import {Location} from 'history'
import LocationTitle from './LocationTitle'

interface LocationState {
  readonly location: Location
  readonly titles: LocationTitle[]
}

export default LocationState