import LocationTitle from './LocationTitle'

interface LocationState {
  readonly pathname: string
  readonly titles: LocationTitle[]
}

export default LocationState