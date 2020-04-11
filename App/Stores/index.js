import { combineReducers } from 'redux'
import { configureStore } from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as WeatherReducer } from './Weather/Reducers'
import { reducer as UserReducer } from './User/Reducers'

export default () => {
  const rootReducer = combineReducers({
    user: UserReducer,
    weather: WeatherReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
