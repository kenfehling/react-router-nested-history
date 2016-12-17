import { createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducer, {initialState} from './reducers'

const store = createStore(reducer, initialState, autoRehydrate())
persistStore(store)

export default store