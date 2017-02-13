import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import {Store} from 'react-redux'
import LocationState from './model/LocationState'

const store:Store<LocationState> = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store